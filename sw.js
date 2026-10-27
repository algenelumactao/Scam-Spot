/* Offline support. Bump CACHE whenever you change any file. */
const CACHE = "dsg-v2";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/data.js",
  "js/app.js",
  "assets/img/bank.png",
  "assets/img/check-circle.png",
  "assets/img/detective.png",
  "assets/img/icon-back.png",
  "assets/img/icon-book.png",
  "assets/img/icon-help.png",
  "assets/img/icon-key.png",
  "assets/img/icon-link.png",
  "assets/img/icon-message.png",
  "assets/img/icon-spy.png",
  "assets/img/icon-wallet.png",
  "assets/img/person.png",
  "assets/img/shield-alert.png",
  "assets/img/shield-success.png",
  "assets/img/shopping-bags.png",
  "assets/img/sms-bubble.png",
  "assets/img/trophy.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/fonts/inter-latin-300-normal.woff2",
  "assets/fonts/inter-latin-400-normal.woff2",
  "assets/fonts/inter-latin-500-normal.woff2",
  "assets/fonts/inter-latin-700-normal.woff2",
  "assets/fonts/inter-latin-800-normal.woff2",
  "assets/fonts/inter-latin-900-normal.woff2",
  "assets/infographics/bank-1-ten-common-scams.jpg",
  "assets/infographics/bank-2-five-warning-signs-scammer.jpg",
  "assets/infographics/bank-3-scam-alert-investment.jpg",
  "assets/infographics/shop-1-fake-online-store.jpg",
  "assets/infographics/shop-2-guide-online-shopping.jpg",
  "assets/infographics/shop-3-how-to-verify-seller.jpg",
  "assets/infographics/sms-1-phishing-screenshot.jpg",
  "assets/infographics/sms-2-bdo-scam-alert.jpg",
  "assets/infographics/sms-3-bir-scam-alert.jpg",
  "assets/infographics/social-1-spot-block-report.jpg",
  "assets/infographics/social-2-fake-profile-warning-signs.jpg",
  "assets/infographics/social-3-seven-warning-signs.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((hit) => {
    const net = fetch(e.request).then((res) => {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
