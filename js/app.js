/* ==========================================================
   Digital Safety Guide – app logic (no build step, no server)
   Hash router:  #/home  #/check  #/emergency  #/emergency/link  #/done/link
                 #/learn/sms  #/practice  #/help
                 #/quiz/sms/<position>  #/quiz/sms/<position>/right|wrong
                 #/quiz/sms/done
   ========================================================== */

const app = document.getElementById("app");
const APP_NAME = "Digital Safety Guide";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $img = (name, alt = "", cls = "") =>
  `<img src="${IMG}${name}.png" alt="${alt}" ${cls ? `class="${cls}"` : ""}>`;

/* ---------- safe storage helpers (storage can be blocked) ---------- */
function readJSON(store, key, fallback) {
  try { return JSON.parse(window[store].getItem(key)) || fallback; } catch (e) { return fallback; }
}
function writeJSON(store, key, value) {
  try { window[store].setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

/* ---------- text size (helps older readers) ---------- */
const TEXT_SIZES = [
  { pct: 100, name: "Normal" },
  { pct: 118, name: "Large" },
  { pct: 136, name: "Extra large" }
];
let textSize = Math.min(Math.max(+readJSON("localStorage", "dsg-ts", 0) || 0, 0), TEXT_SIZES.length - 1);
function applyTextSize() {
  document.documentElement.style.fontSize = TEXT_SIZES[textSize].pct + "%";
}
function cycleTextSize() {
  textSize = (textSize + 1) % TEXT_SIZES.length;
  writeJSON("localStorage", "dsg-ts", textSize);
  applyTextSize();
  document.querySelectorAll("[data-textsize]").forEach((b) =>
    b.setAttribute("aria-label", `Text size: ${TEXT_SIZES[textSize].name}. Tap to change.`));
  announce(`Text size ${TEXT_SIZES[textSize].name}`);
}
applyTextSize();

function textSizeBtn(cls = "") {
  return `<button class="ts-btn ${cls}" data-textsize aria-label="Text size: ${TEXT_SIZES[textSize].name}. Tap to change."><span aria-hidden="true">A<small>A</small></span></button>`;
}

/* ---------- screen-reader announcements ---------- */
const live = document.createElement("div");
live.className = "sr";
live.setAttribute("aria-live", "polite");
live.setAttribute("role", "status");
document.body.appendChild(live);
function announce(msg) {
  live.textContent = "";
  setTimeout(() => { live.textContent = msg; }, 30);
}

/* ---------- practice quiz state (session) ----------
   quiz[cat] = { order:[question indexes], answers:[true|false|undefined per position] }
   The first N positions are the scored round. Missed questions are appended
   once at the end as a review round that does not change the score.        */
let quiz = readJSON("sessionStorage", "dsg-quiz2", {});
const saveQuiz = () => writeJSON("sessionStorage", "dsg-quiz2", quiz);
const qCount = (cat) => CATEGORIES[cat].quiz.questions.length;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function startQuiz(cat) {
  quiz[cat] = { order: shuffle([...Array(qCount(cat)).keys()]), answers: [] };
  saveQuiz();
  return quiz[cat];
}
function ensureQuiz(cat) {
  const st = quiz[cat];
  const ok = st && Array.isArray(st.order) && st.order.length >= qCount(cat) &&
    st.order.every((n) => Number.isInteger(n) && n >= 0 && n < qCount(cat));
  return ok ? st : startQuiz(cat);
}
function scoreOf(cat) {
  const st = ensureQuiz(cat);
  const n = qCount(cat);
  return st.answers.slice(0, n).filter((r) => r === true).length;
}

/* best scores live on this device only */
const getBest = () => readJSON("localStorage", "dsg-best2", {});
function saveBest(cat, score) {
  const best = getBest();
  if (!best[cat] || score > best[cat].score) {
    best[cat] = { score, total: qCount(cat) };
    writeJSON("localStorage", "dsg-best2", best);
  }
}
function bestBadge(cat) {
  const b = getBest()[cat];
  return b ? `<span class="best" title="Your best score on this device">Best ${b.score}/${b.total}</span>` : "";
}

/* ---------- emergency checklist state (session) ---------- */
let steps = readJSON("sessionStorage", "dsg-steps", {});
const saveSteps = () => writeJSON("sessionStorage", "dsg-steps", steps);
const stepsFor = (key) => {
  const n = EMERGENCY[key].steps.length;
  const cur = steps[key];
  if (!Array.isArray(cur) || cur.length !== n) steps[key] = new Array(n).fill(false);
  return steps[key];
};

/* ---------- shared pieces ---------- */
const go = (hash) => { location.hash = hash; };

function topbar({ back, brand = APP_NAME, cls = "", tools = true }) {
  return `
    <div class="topbar ${cls}">
      ${back ? `<button class="back" data-go="${back}" aria-label="Go back">${$img("icon-back")}</button>` : `<span class="back-gap"></span>`}
      <div class="brand">${brand}</div>
      ${tools ? textSizeBtn() : `<span class="back-gap"></span>`}
    </div>`;
}

/* The same three tabs appear on every screen. */
function tabbar(active) {
  const tab = (key, hash, icon, label) =>
    `<button class="tab ${active === key ? "active" : ""}" data-go="${hash}" ${active === key ? 'aria-current="page"' : ""}>${$img(icon)}${label}</button>`;
  return `<nav class="tabbar" aria-label="Main">
      ${tab("home", "#/home", "icon-book", "Home")}
      ${tab("practice", "#/practice", "icon-spy", "Spot a Scam")}
      ${tab("help", "#/help", "icon-help", "Get Help")}
    </nav>`;
}

/* shell(content, { bg, active, title, focus }) – renders a screen with the tab bar */
function shell(content, { bg = "", active = "home", title = "", focus = "" } = {}) {
  app.innerHTML = `<main class="screen ${bg}" tabindex="-1" aria-label="${esc(title || APP_NAME)}">${content}</main>${tabbar(active)}`;
  document.title = title ? `${title} – ${APP_NAME}` : APP_NAME;
  const main = app.querySelector("main");
  main.scrollTop = 0;
  window.scrollTo(0, 0);
  // move keyboard / screen-reader focus to the new screen
  const target = (focus && app.querySelector(focus)) || main;
  if (target !== main) target.setAttribute("tabindex", "-1");
  try { target.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
}

/* ---------- screens ---------- */
function screenHome() {
  const best = getBest();
  const done = CAT_ORDER.filter((k) => best[k]).length;

  const cards = CAT_ORDER.map((k) => {
    const c = CATEGORIES[k];
    return `<button class="cat-card cat-${c.cls}" data-go="#/learn/${k}">
        <span><div class="t">${c.home.title}</div><div class="s">${c.home.sub}</div>${bestBadge(k)}</span>
        ${$img(c.home.img)}
      </button>`;
  }).join("");

  const progress = done
    ? `<div class="progress" role="status"><div class="bar"><span style="width:${(done / CAT_ORDER.length) * 100}%"></span></div>
        <div class="ptxt">Practice progress: ${done} of ${CAT_ORDER.length} topics completed</div></div>`
    : "";

  shell(`
    <section class="home">
      ${textSizeBtn("home-ts")}
      <h1>${APP_NAME}</h1>
      <div class="welcome">Welcome!</div>
      <p class="lead">Learn how to stay safe from online scams in simple steps.</p>

      <div class="urgent">
        <p>Tapped a suspicious link or lost money?</p>
        <button class="btn-red" data-go="#/emergency">What to Do Right Now</button>
      </div>

      <button class="check-card" data-go="#/check">
        <span><div class="t">Check a Message</div>
        <div class="s">Paste a suspicious text to see its warning signs.</div></span>
        <span class="check-ico" aria-hidden="true">🔍</span>
      </button>

      ${cards}

      <button class="practice-card" data-go="#/practice">
        <span><div class="t">Practice: Spot a Scam</div>
        <div class="s">Test your skills with safe, real-world examples.</div></span>
        ${$img("detective")}
      </button>
      ${progress}
    </section>`, { active: "home", title: "Home" });
}

function screenEmergency() {
  const opts = Object.entries(EMERGENCY).map(([k, e]) => `
    <button class="option" data-go="#/emergency/${k}">
      ${$img(e.icon)}
      <span><div class="t">${e.menuTitle}</div><div class="s">${e.menuText}</div></span>
    </button>`).join("");

  shell(`
    ${topbar({ back: "#/home", brand: "Emergency Scam Response", cls: "titled" })}
    <div class="alert-box">
      ${$img("shield-alert")}
      <div class="h">Stay Calm. Act Quickly.</div>
      <div class="p">Choose what happened to you to get the right safety steps.</div>
    </div>
    ${opts}
    <p class="safety-note">Your safety comes first.<br>Never share your OTP, PIN, or password.</p>`,
    { active: "help", title: "Emergency Scam Response" });
}

function screenSteps(key) {
  const e = EMERGENCY[key];
  if (!e) return go("#/emergency");
  const state = stepsFor(key);

  const items = e.steps.map((s, i) => `
    <li>
      <button class="step ${state[i] ? "done" : ""}" role="checkbox" aria-checked="${state[i]}" data-step="${i}">
        <span class="num" aria-hidden="true">${state[i] ? "✓" : i + 1}</span>
        <span class="stxt"><span class="st">${s[0]}</span><span class="sd">${s[1]}</span></span>
      </button>
    </li>`).join("");

  shell(`
    ${topbar({ back: "#/emergency", brand: "", cls: "slim" })}
    ${$img("shield-alert", "", "hero-icon")}
    <h1 class="page-title title-sm">${e.title}</h1>
    <p class="sub">${e.sub}</p>
    <p class="tick-hint">Tap each step when you have done it.</p>
    <ol class="steps">${items}</ol>
    <div class="steps-progress" id="stepsProgress" role="status"></div>
    <div class="reminder">
      <div class="h">⚠️ Important Reminder</div>
      <div class="p">${e.reminder}</div>
    </div>
    <button class="btn-green" id="finishBtn" data-go="#/done/${key}">I've Completed These Steps</button>
    <button class="btn-grey" data-go="#/help">I Need More Help</button>`,
    { active: "help", title: e.title, focus: ".page-title" });

  const refresh = () => {
    const n = state.filter(Boolean).length;
    const all = n === state.length;
    const btn = document.getElementById("finishBtn");
    btn.disabled = !all;
    btn.textContent = all ? "I've Completed These Steps" : `Finish: ${n} of ${state.length} steps done`;
    document.getElementById("stepsProgress").textContent =
      all ? "All steps done. Well done!" : `${n} of ${state.length} steps done`;
  };
  refresh();

  app.querySelectorAll("[data-step]").forEach((b) =>
    b.addEventListener("click", () => {
      const i = +b.dataset.step;
      state[i] = !state[i];
      saveSteps();
      b.classList.toggle("done", state[i]);
      b.setAttribute("aria-checked", String(state[i]));
      b.querySelector(".num").textContent = state[i] ? "✓" : i + 1;
      refresh();
    }));
}

function screenDone(key) {
  const e = EMERGENCY[key];
  if (!e) return go("#/emergency");
  if (!stepsFor(key).every(Boolean)) return go(`#/emergency/${key}`);   // no skipping the checklist

  const items = e.done.items.map((it) => `
    <li>${$img("check-circle")}<div><div class="ct">${it[0]}</div><div class="cd">${it[1]}</div></div></li>`).join("");

  shell(`
    <section class="complete">
      <div class="kicker">ACTION COMPLETE!</div>
      ${$img("shield-success", "", "shield")}
      <h2>${e.done.title}</h2>
      <p class="desc">${e.done.desc}</p>
      <ul class="checks">${items}</ul>
      <div class="next-help">Still worried? <button class="linkbtn" data-go="#/help">See who to contact</button></div>
      <div class="spacer"></div>
      <button class="btn-green" data-go="#/home">Return to Home</button>
    </section>`, { active: "help", title: e.done.title, focus: "h2" });
}

function screenLearn(cat) {
  const c = CATEGORIES[cat];
  if (!c) return go("#/home");
  const L = c.learn;
  const flags = L.flags.map((f, i) => `
    <li><span class="num" aria-hidden="true">${i + 1}</span>
      <div><div class="ft">${f[0]}</div><div class="fd">${f[1]}</div></div></li>`).join("");

  const comparison = L.comparison ? `
    <div class="diff-title">Spotting the Difference</div>
    <div class="diff">
      <div class="box safe">
        <h3>SAFE MESSAGE</h3>
        <div class="bubble">BDO Advisory: Your statement for Oct is ready in your official app. We will never send links via text.</div>
        <ul><li><span aria-hidden="true">✅</span><span class="sr">Good sign: </span> Official Sender Name</li><li><span aria-hidden="true">✅</span><span class="sr">Good sign: </span> No External Links</li></ul>
      </div>
      <div class="box scam">
        <h3>SCAM MESSAGE</h3>
        <div class="bubble">UnionBank ALERT: Account potentially compromised. We have temporarily blocked your card. Reply Y/N to confirm.</div>
        <ul><li><span aria-hidden="true">❌</span><span class="sr">Red flag: </span> Unknown Mobile Number</li><li><span aria-hidden="true">❌</span><span class="sr">Red flag: </span> Urgency &amp; Threat</li><li><span aria-hidden="true">❌</span><span class="sr">Red flag: </span> Asks for direct reply Y/N</li></ul>
      </div>
    </div>` : "";

  const images = L.images.map((im) =>
    `<img class="infographic" src="${INFO}${im[0]}" alt="${esc(im[1])}" loading="lazy" width="800" data-zoom>`).join("");

  shell(`
    ${topbar({ back: "#/home" })}
    <div class="pill">${L.pill}</div>
    <div class="card"><h2>${L.introTitle}</h2><p>${L.intro}</p></div>
    <div class="card">
      <div class="warn-title">WARNING: <span aria-hidden="true">🚩</span> Common Red Flags</div>
      <ul class="flags">${flags}</ul>
    </div>
    ${comparison}
    <p class="zoom-hint">Tap a picture to enlarge it.</p>
    ${images}
    <button class="btn-green learn-cta" data-start-quiz="${cat}">Start Practice Quiz</button>`,
    { bg: `bg-${c.cls}`, active: "home", title: L.pill, focus: ".pill" });
}

function screenHub() {
  const cards = CAT_ORDER.map((k) => {
    const c = CATEGORIES[k];
    return `<div class="hub-card ${c.cls}">
      <span class="tag">${c.hub.tag}</span> ${bestBadge(k)}
      <h3>${c.hub.title}</h3>
      <p>${c.hub.text} (${qCount(k)} questions)</p>
      <button class="go" data-start-quiz="${k}">Start Quiz →</button>
    </div>`;
  }).join("");

  shell(`
    ${topbar({ back: "#/home" })}
    <div class="hub-banner">
      <div class="t">SPOT A SCAM: Practice Hub</div>
      <div class="s">Choose a topic below to test your scam identification skills with realistic examples.</div>
    </div>
    ${cards}`, { active: "practice", title: "Spot a Scam", focus: ".hub-banner .t" });
}

function screenHelp() {
  const callBtn = (c) => `<a class="call" href="tel:${c.tel}"><span class="cico" aria-hidden="true">📞</span>
      <span class="clabel">${c.label}</span><span class="cnum">${c.show}</span></a>`;
  const linkBtn = (c) => {
    const ext = c.href.startsWith("http");
    const ico = c.href.startsWith("tel:") ? "📞" : c.href.startsWith("mailto:") ? "✉️" : "🌐";
    return `<a class="call" href="${c.href}" ${ext ? 'target="_blank" rel="noopener noreferrer"' : ""}><span class="cico" aria-hidden="true">${ico}</span>
      <span class="clabel">${c.label}</span><span class="cnum">${c.show}</span></a>`;
  };
  const contacts = HELP_CONTACTS.map((c) => `
    <div class="help-card"><h3>${c.title}</h3><p>${c.text}</p>
      ${c.calls ? `<div class="calls">${c.calls.map(callBtn).join("")}</div>` : ""}
      ${c.links ? `<div class="calls">${c.links.map(linkBtn).join("")}</div>` : ""}
      ${c.hint ? `<p class="hint">${c.hint}</p>` : ""}</div>`).join("");
  const links = Object.entries(EMERGENCY).map(([k, e]) =>
    `<button data-go="#/emergency/${k}">${$img(e.icon)}${e.menuTitle}</button>`).join("");

  shell(`
    ${topbar({ back: "#/home", brand: "Get Help", cls: "titled" })}
    <p class="help-intro">Not sure where to start? Pick what happened, then reach out to the right place.</p>
    <div class="help-h">What happened?</div>
    <div class="help-links">${links}</div>
    <div class="help-h">Who to contact</div>
    ${contacts}
    <p class="updated">Contact details last checked: ${HELP_UPDATED}.</p>
    <div class="reminder"><div class="h">⚠️ Important Reminder</div>
      <div class="p">Never share your password, PIN, or OTP with anyone claiming to help you.</div></div>`,
    { active: "help", title: "Get Help", focus: ".brand" });
}

/* ----- message checker (runs on this device only; nothing is sent anywhere) ----- */
const CHECKS = [
  { id: "link", bad: true,
    test: (t) => /(https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(com|net|org|xyz|top|info|site|online|link|click|vip|cc|me|co|club|shop|work)(\/\S*)?\b/i.exec(t),
    title: "Contains a link",
    why: (m) => `The link “${esc(m[0].slice(0, 60))}” could be a fake website. Banks and agencies don't text you links to log in or “unlock” accounts. Open the official app or type the website yourself.` },
  { id: "short", bad: true,
    test: (t) => /\b(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|shorturl\.\w+|tiny\.cc)\/\S*/i.exec(t),
    title: "Shortened link",
    why: () => "Shortened links hide where they really go." },
  { id: "urgent", bad: true,
    test: (t) => /\b(urgent|immediately|act now|asap|last chance|within \d+ ?(hours?|hrs?|mins?|minutes?|days?)|expires? (today|soon|in)|expiring|today only|final notice)\b/i.exec(t),
    title: "Pressure to act fast",
    why: () => "Scammers rush you so you don't stop to check. Real organisations give you time to verify." },
  { id: "threat", bad: true,
    test: (t) => /\b(suspended|suspension|blocked|locked|deactivat\w+|terminat\w+|legal action|arrest|warrant|penalty|compromised|will be (deleted|closed|disabled))\b/i.exec(t),
    title: "Threat of something bad happening",
    why: () => "Fear (blocked account, penalty, arrest) is a common trick to make you click or reply." },
  { id: "creds", bad: true,
    test: (raw) => {
      // ignore warning sentences such as "Never share your OTP" or "We will never ask for it"
      const t = raw.split(/(?<=[.!?])\s+/).filter((s) => !/\b(do not|don't|never|won't|will not)\b/i.test(s)).join(" ");
      return /\b(send|share|give|reply|provide|read|forward|enter|confirm|verify|text)\b.{0,50}\b(otp|one[- ]time|pin|mpin|password|cvv|cvc|verification code|security code|\d-?digit code|card number)\b/i.exec(t) ||
             /\b(otp|one[- ]time|pin|mpin|password|cvv|verification code)\b.{0,40}\b(to (confirm|verify|cancel|unlock|claim|refund)|so (i|we) can)\b/i.exec(t);
    },
    title: "Asks for a code, PIN or password",
    why: () => "No real bank, e-wallet or platform will ever ask you to send or read out an OTP, PIN or password." },
  { id: "money", bad: true,
    test: (t) => /\b(you(?:'ve| have)? won|winner|congratulations|raffle|claim (your )?(prize|reward|cash)|processing fee|release fee|gift card|reservation fee|send (me )?(₱|php|p)?\s?\d|pay (a |the )?(small )?fee|reserve.{0,15}(gcash|pay))\b/i.exec(t),
    title: "Prize, fee or money request",
    why: () => "Real prizes never require you to pay first, and genuine emergencies can wait for a verification call." },
  { id: "reply", bad: true,
    test: (t) => /\breply\s+(with\s+)?["“']?(y|yes|n|no|stop|claim|verify|confirm)\b/i.exec(t),
    title: "Asks you to reply with a keyword",
    why: () => "Replying confirms your number is active and can start more scams." },
  { id: "mobile", bad: true,
    test: (t) => /(\+?63|\b0)9\d{2}[ -]?\d{3}[ -]?\d{4}\b/.exec(t),
    title: "Includes a personal mobile number",
    why: (m) => `Official organisations use official hotlines, not a personal 09XX number like ${esc(m[0])}. Look up the real number yourself.` },
  { id: "newnum", bad: true,
    test: (t) => /\b(new number|changed my number|my phone (broke|fell|got|was)|lost my phone|don'?t call)\b/i.exec(t),
    title: "“New number” or “don't call” story",
    why: () => "A common trick where scammers pretend to be a relative. Call your family member on their old number." },
  { id: "toogood", bad: true,
    test: (t) => /\b(guaranteed|easy money|work from home|double your|daily income|earn (up to )?(₱|php|p)?\s?\d|\d{2}% off|investment)\b/i.exec(t),
    title: "Too-good-to-be-true offer",
    why: () => "Guaranteed earnings and huge discounts are bait." },
  { id: "app", bad: false,
    test: (t) => /\b(in the (\w+ )?app|official app|your app)\b/i.exec(t),
    title: "Points you to the official app", why: () => "Looking things up inside your own app is the safe way to check." },
  { id: "warn", bad: false,
    test: (t) => /\b(do not|don't|never)\b.{0,30}\b(share|give)\b/i.exec(t),
    title: "Warns you not to share codes", why: () => "Real messages carry this warning. Scams usually ask for the code." }
];

function runChecks(text) {
  const bad = [], good = [];
  CHECKS.forEach((c) => {
    const m = c.test(text);
    if (m) (c.bad ? bad : good).push({ title: c.title, why: c.why(m) });
  });
  return { bad, good };
}

function renderCheckResult(text) {
  const { bad, good } = runChecks(text);
  const strong = bad.some((b) => /code, PIN|Prize, fee/.test(b.title));
  let level, cls, headline, advice;
  if (bad.length >= 3 || strong) {
    level = "high"; cls = "r-high"; headline = "Very likely a scam";
    advice = "Do not click, reply or pay. Block the sender and report it.";
  } else if (bad.length >= 1) {
    level = "mid"; cls = "r-mid"; headline = "Warning signs found";
    advice = "Be careful. Check using the official app or hotline, not anything in the message.";
  } else {
    level = "low"; cls = "r-low"; headline = "No obvious red flags found";
    advice = "That does not prove it is safe. If it asks for money, a code or a login, verify with the official app or hotline first.";
  }
  const li = (arr, mark, sr) => arr.map((x) =>
    `<li><span aria-hidden="true">${mark}</span><span class="sr">${sr}</span><div><b>${x.title}</b><br>${x.why}</div></li>`).join("");

  return `<div class="result ${cls}" id="checkResult" tabindex="-1" aria-live="polite">
      <div class="rh">${headline}</div>
      <p class="radvice">${advice}</p>
      ${bad.length ? `<h4>Red flags (${bad.length})</h4><ul class="rl">${li(bad, "❌", "Red flag: ")}</ul>` : ""}
      ${good.length ? `<h4>Good signs</h4><ul class="rl">${li(good, "✅", "Good sign: ")}</ul>` : ""}
      <div class="rnote">This checker looks for common patterns only and can miss scams. When unsure, contact the organisation using a number you find yourself.</div>
      <button class="btn-grey tight" data-go="#/help">Who to contact</button>
    </div>`;
}

function screenCheck() {
  shell(`
    ${topbar({ back: "#/home", brand: "Check a Message", cls: "titled" })}
    <p class="help-intro">Paste a text or chat message you are unsure about. It is checked on your phone only. Nothing is sent or saved.</p>
    <label class="check-label" for="msgInput">Message to check</label>
    <textarea id="msgInput" class="msg-input" rows="6" maxlength="1500" placeholder="Paste the message here…"></textarea>
    <div class="check-actions">
      <button class="btn-green" id="checkBtn">Check this message</button>
      <button class="btn-grey tight" id="clearBtn">Clear</button>
    </div>
    <div id="checkOut"></div>`, { active: "home", title: "Check a Message", focus: ".brand" });

  const input = document.getElementById("msgInput");
  const out = document.getElementById("checkOut");
  document.getElementById("checkBtn").addEventListener("click", () => {
    const t = input.value.trim();
    if (!t) { out.innerHTML = `<div class="result r-mid"><div class="rh">Paste a message first</div></div>`; return; }
    out.innerHTML = renderCheckResult(t);
    const r = document.getElementById("checkResult");
    const main = app.querySelector("main");        // scroll the screen itself, not the page
    main.scrollTo({ top: Math.max(0, r.offsetTop - 12), behavior: "smooth" });
    r.focus({ preventScroll: true });
  });
  document.getElementById("clearBtn").addEventListener("click", () => {
    input.value = ""; out.innerHTML = ""; input.focus();
  });
}

/* ----- quiz ----- */
function bubbleHTML(q) {
  if (q.inline && q.head) return `<span class="mh">${q.head}</span> ${q.body}`;
  const head = q.head ? `<div class="mh">${q.head}</div>` : "";
  const gap = q.head ? `<div class="bgap${q.gap ? " big" : ""}"></div>` : "";
  return `${head}${gap}<div>${q.body}</div>`;
}

function progressLabel(cat, pos) {
  const n = qCount(cat), st = ensureQuiz(cat);
  return pos < n ? `Question ${pos + 1} of ${n}` : `Review ${pos - n + 1} of ${st.order.length - n}`;
}

function screenQuestion(cat, pos) {
  const c = CATEGORIES[cat];
  if (!c) return go("#/practice");
  const st = ensureQuiz(cat);
  if (!(pos >= 0 && pos < st.order.length)) return go(`#/quiz/${cat}/done`);
  const q = c.quiz.questions[st.order[pos]];

  shell(`
    ${topbar({ back: "#/practice" })}
    <div class="quiz-banner">
      <div><div class="t">Practice: Spot a Scam</div><div class="s">Test your skills with safe, real-world examples.</div></div>
      ${$img("detective")}
    </div>
    <div class="pill">${c.quiz.pill}</div>
    <div class="quiz-desc">${c.quiz.desc}</div>
    <div class="qcount flush">${progressLabel(cat, pos)}</div>

    <div class="q-area">
      <div class="msg-bubble">${bubbleHTML(q)}</div>
      <div class="q-prompt" id="qprompt">Is this message Safe or a Scam?</div>
      <div class="answers" role="group" aria-labelledby="qprompt">
        <button class="ans real" data-answer="safe">REAL / SAFE</button>
        <button class="ans fake" data-answer="scam">FAKE / SCAM</button>
      </div>
    </div>`, { bg: `bg-${c.cls}`, active: "practice", title: `${c.quiz.pill}: ${progressLabel(cat, pos)}`, focus: ".qcount" });

  app.querySelectorAll("[data-answer]").forEach((b) =>
    b.addEventListener("click", () => {
      const correct = (b.dataset.answer === "scam") === q.scam;
      if (st.answers[pos] === undefined) {            // first try counts
        st.answers[pos] = correct;
        // a missed question comes back once in the review round
        if (!correct && pos < qCount(cat)) st.order.push(st.order[pos]);
        saveQuiz();
      }
      go(`#/quiz/${cat}/${pos}/${correct ? "right" : "wrong"}`);
    }));
}

function screenFeedback(cat, pos, right) {
  const c = CATEGORIES[cat];
  if (!c) return go("#/practice");
  const st = ensureQuiz(cat);
  if (!(pos >= 0 && pos < st.order.length)) return go("#/practice");
  if (st.answers[pos] === undefined) return go(`#/quiz/${cat}/${pos}`);   // must answer first
  const q = c.quiz.questions[st.order[pos]];
  const mark = q.scam ? "❌" : "✅";
  const sr = q.scam ? "Red flag: " : "Good sign: ";
  const heading = q.scam ? "Red Flags Breakdown:" : "Safe Indicators Breakdown:";
  const verdict = q.scam ? "a SCAM" : "REAL";
  const points = q.points.map((p) =>
    `<li><span aria-hidden="true">${mark}</span><span class="sr">${sr}</span> <b>${p[0]}</b> ${p[1]}</li>`).join("");
  const more = pos + 1 < st.order.length;

  const title = right
    ? `<div class="fb-title good" role="status">🎉 Correct! This is ${verdict}.</div>`
    : `<div class="fb-title bad" role="status">⚠️ Not Quite!<br>This is actually ${verdict}</div>`;
  const again = !right && pos < qCount(cat)
    ? `<p class="again">Don't worry. You'll see this one again at the end.</p>` : "";

  let btn;
  if (more) btn = `<button class="btn-green btn-fb" data-go="#/quiz/${cat}/${pos + 1}">Next Question →</button>`;
  else btn = `<button class="btn-green btn-fb" data-go="#/quiz/${cat}/done">See My Results →</button>`;

  shell(`
    ${topbar({ back: `#/quiz/${cat}/${pos}` })}
    <div class="pill">${c.quiz.pill}</div>
    <div class="qcount flush">${progressLabel(cat, pos)}</div>
    <div class="fb-card">
      <div class="msg-bubble">${bubbleHTML(q)}</div>
      ${title}
      ${again}
      <h4>${heading}</h4>
      <ul style="list-style:none">${points}</ul>
      <div class="fb-spacer"></div>
      ${btn}
    </div>`, { bg: `bg-${c.cls}`, active: "practice", title: `${right ? "Correct" : "Not quite"} – ${c.quiz.pill}`, focus: ".fb-title" });
}

function screenQuizDone(cat) {
  const c = CATEGORIES[cat];
  if (!c) return go("#/practice");
  const st = ensureQuiz(cat);
  const n = qCount(cat);
  const firstOpen = st.order.findIndex((_, i) => st.answers[i] === undefined);
  if (firstOpen !== -1) return go(`#/quiz/${cat}/${firstOpen}`);   // finish every question first

  const score = scoreOf(cat);
  saveBest(cat, score);
  const missed = st.order.length - n;
  const note = missed
    ? `You reviewed ${missed} question${missed > 1 ? "s" : ""} you missed. Try the quiz again for a fresh order.`
    : "Perfect round! Try another topic.";

  shell(`
    <section class="complete-wrap">
      ${topbar({ back: null })}
      <div class="pill">${c.quiz.pill}</div>
      <div class="done-card">
        ${$img("trophy", "Trophy", "trophy")}
        <h2>Category Completed!</h2>
        <div class="score">${score} / ${n} Correct</div>
        <p>${c.quiz.doneText}</p>
        <p class="note">${note}</p>
      </div>
      <button class="btn-green btn-big" data-go="#/practice">Practice More Categories →</button>
      <button class="btn-grey tight" data-start-quiz="${cat}">Try This Topic Again</button>
      <button class="btn-grey tight" data-go="#/home">Return to Home</button>
    </section>`, { bg: `bg-${c.cls}`, active: "practice", title: "Quiz results", focus: "h2" });
}

/* ---------- router ---------- */
function route() {
  const parts = (location.hash.replace(/^#\/?/, "") || "home").split("/");
  const [a, b, c, d] = parts;

  switch (a) {
    case "home":      return screenHome();
    case "check":     return screenCheck();
    case "emergency": return b ? screenSteps(b) : screenEmergency();
    case "help":      return screenHelp();
    case "done":      return screenDone(b);
    case "learn":     return screenLearn(b);
    case "practice":  return screenHub();
    case "quiz":
      if (!CATEGORIES[b]) return screenHub();
      if (c === undefined) return go(`#/quiz/${b}/0`);
      if (c === "done") return screenQuizDone(b);
      if (d === "right") return screenFeedback(b, +c, true);
      if (d === "wrong") return screenFeedback(b, +c, false);
      return screenQuestion(b, +c);
    default:          return screenHome();
  }
}

/* ---------- picture zoom ---------- */
function openZoom(src, alt) {
  const o = document.createElement("div");
  o.className = "zoom";
  o.setAttribute("role", "dialog");
  o.setAttribute("aria-label", "Enlarged picture. Tap to close.");
  o.innerHTML = `<img src="${src}" alt="${esc(alt)}"><button class="zoom-x" aria-label="Close picture">✕</button>`;
  const close = () => { o.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  o.addEventListener("click", close);
  document.addEventListener("keydown", onKey);
  (document.querySelector(".device-screen") || document.body).appendChild(o);
  o.querySelector("button").focus();
}

/* ---------- global click handling ---------- */
document.addEventListener("click", (e) => {
  const z = e.target.closest("[data-zoom]");
  if (z) return openZoom(z.currentSrc || z.src, z.alt);
  if (e.target.closest("[data-textsize]")) return cycleTextSize();
  const start = e.target.closest("[data-start-quiz]");
  if (start) {
    const cat = start.dataset.startQuiz;
    startQuiz(cat);
    if (location.hash === `#/quiz/${cat}/0`) return route();
    return go(`#/quiz/${cat}/0`);
  }
  const nav = e.target.closest("[data-go]");
  if (nav && !nav.disabled) go(nav.dataset.go);
});

window.addEventListener("hashchange", route);
route();

/* ---------- offline support (only on http/https, not file://) ---------- */
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

/* ---------- fit the iPhone frame to the browser window (laptops/tablets only) ---------- */
const stage = document.getElementById("stage");
const device = document.getElementById("device");
const FRAME_W = 417, FRAME_H = 876;
function fitDevice() {
  if (window.innerWidth < 600) {            // real phone: fill the screen, no frame
    stage.style.width = stage.style.height = "";
    device.style.transform = "";
    return;
  }
  const s = Math.min(1, (window.innerHeight - 24) / FRAME_H, (window.innerWidth - 24) / FRAME_W);
  stage.style.width = FRAME_W * s + "px";
  stage.style.height = FRAME_H * s + "px";
  device.style.transform = `scale(${s})`;
}
window.addEventListener("resize", fitDevice);
fitDevice();
