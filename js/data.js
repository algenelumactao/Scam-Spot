/* ==========================================================
   Content for the Digital Safety Guide (all text from the wireframe)
   ========================================================== */

const IMG = "assets/img/";
const INFO = "assets/infographics/";

/* ---------- Emergency response ---------- */
const EMERGENCY = {
  link: {
    icon: "icon-link", menuTitle: "I clicked a suspicious link",
    menuText: "Learn how to protect your device and accounts.",
    title: "Clicked a Suspicious Link?",
    sub: "Don't panic. Clicking a link doesn't automatically mean your device is compromised. Follow these steps to stay safe.",
    steps: [
      ["Close the website", "Close the suspicious page. Don't download files, allow notifications, or enter any information."],
      ["Check what happened", "Did you enter a password, share an OTP, download a file, or provide bank details?"],
      ["Secure your accounts", "If you entered a password, change it using the official website or app. Secure your email account first if needed"],
      ["Check your device", "If you downloaded or installed something, don't open it. Run your device's security scan and seek trusted technical help if needed."],
      ["Report the suspicious link", "Keep the message as evidence, avoid forwarding the link, and report it to the relevant platform or service provider."]
    ],
    reminder: "Never share your password, PIN, or OTP with anyone claiming to help you.",
    done: {
      title: "Device & Link Security Complete!",
      desc: "You have successfully taken action after tapping a suspicious link.",
      items: [
        ["Website Closed", "Closed the suspicious web page without entering information."],
        ["Activity Checked", "Verified whether passwords, OTPs, or downloads occurred."],
        ["Accounts Secured", "Changed passwords on official apps/websites if needed."],
        ["Device Scanned", "Ran security checks and avoided opening downloaded files."],
        ["Threat Reported", "Kept evidence and reported the suspicious link."]
      ]
    }
  },
  password: {
    icon: "icon-key", menuTitle: "I shared my password or OTP",
    menuText: "Secure your accounts immediately.",
    title: "Shared Password or OTP?",
    sub: "Act fast to protect your accounts and prevent unauthorized access.",
    steps: [
      ["Change Compromised Passwords Immediately", "Log into the affected account on a safe browser and update your password to a strong, new one."],
      ["Log Out of All Active Sessions", "Go to account security settings and choose \"Sign out of all other devices.\""],
      ["Check Your Recovery Settings", "Make sure your recovery email, phone number and 2-step verification were not changed by an attacker. Remove anything you don't recognize."],
      ["Secure Your Primary Email Account", "Ensure your personal email account is secure, as password reset links are sent there."],
      ["Contact Service Provider Support", "Notify the platform (e.g., Facebook, Google, Bank) that your account credentials were compromised."]
    ],
    reminder: "Never share OTPs, PINs, or passwords with anyone, including support staff.",
    done: {
      title: "Account Credentials Secured!",
      desc: "You have taken the right steps to lock down compromised accounts.",
      items: [
        ["Passwords Updated", "Changed passwords for compromised accounts immediately."],
        ["Sessions Ended", "Logged out of all active sessions on other devices."],
        ["2FA Verified", "Checked and restored recovery phone numbers and email settings."],
        ["Primary Email Secured", "Ensured main email access is safe and locked."],
        ["Support Notified", "Contacted platform support regarding compromised credentials."]
      ]
    }
  },
  money: {
    icon: "icon-wallet", menuTitle: "I lost money to a scam",
    menuText: "Contact your bank or e-wallet provider promptly.",
    title: "Lost Money to a Scam?",
    sub: "Follow these steps immediately to freeze transactions and report financial fraud.",
    steps: [
      ["Call Your Bank or E-Wallet Hotline Right Away", "Speed matters. Call official support (e.g., GCash, Maya, your bank's hotline) to lock your account or card. Recovery is not guaranteed, but acting within minutes gives the best chance."],
      ["Request a Card Block or Freeze", "Ask the representative to block further outgoing transactions and reissue compromised card numbers."],
      ["Document All Transaction Details", "Take screenshots of transaction receipts, reference numbers, dates, and amounts lost."],
      ["File an Official Scam Incident Report", "Submit an official dispute form with your bank and report to local anti-cybercrime authorities."],
      ["Monitor Linked Account Statements", "Regularly inspect linked accounts and credit/debit card statements for unrecognized charges."]
    ],
    reminder: "Official bank agents will never ask for your MPIN or full card CVV over the phone. Beware of anyone offering to \"recover\" your money for a fee. That is often a second scam.",
    done: {
      title: "Financial Fraud Report Filed!",
      desc: "You have taken the right steps to report the fraud and protect your remaining money.",
      items: [
        ["Hotline Contacted", "Reached official bank or e-wallet support promptly."],
        ["Cards Frozen", "Blocked compromised cards and stopped further outgoing transactions."],
        ["Details Documented", "Saved transaction receipts, dates, and reference numbers."],
        ["Incident Reported", "Filed an official dispute report with authorities/banks."],
        ["Statements Monitored", "Inspected linked accounts for unrecognized activity."]
      ]
    }
  },
  message: {
    icon: "icon-message", menuTitle: "I received a suspicious message",
    menuText: "Avoid clicking links or sharing personal information.",
    title: "Received a Suspicious Message?",
    sub: "If you haven't clicked or shared anything yet, you are safe! Follow these steps to clear it.",
    steps: [
      ["Do Not Click Links or Reply", "Ignore prompts urging you to reply \"STOP\", verify details, or click web links."],
      ["Block the Sender Number or Account", "Use your phone’s built-in options to block the phone number or social media profile."],
      ["Report the Sender as Spam", "Mark the message as spam/phishing inside your SMS app or messaging platform."],
      ["Delete the Suspicious Message", "Remove the message to prevent accidental taps in the future."],
      ["Spread the Word to Friends & Family", "Warn relatives about the ongoing scam tactic so they aren't caught off guard."]
    ],
    reminder: "Never click links or share an OTP, PIN or password with someone who texts or calls you first.",
    done: {
      title: "Message Blocked & Reported!",
      desc: "You handled the suspicious message safely without taking the bait.",
      items: [
        ["No Links Tapped", "Ignored prompts to click or reply to the sender."],
        ["Sender Blocked", "Blocked the phone number or social profile on your device."],
        ["Reported as Spam", "Flagged the message as phishing/spam in your app."],
        ["Message Deleted", "Removed the text to prevent future accidental taps."],
        ["Family Warned", "Shared the scam alert with friends and relatives."]
      ]
    }
  }
};

/* ---------- Categories (learn page + hub card + quiz) ---------- */
const CATEGORIES = {
  sms: {
    cls: "sms",
    home: { title: "Fake Messages & SMS", sub: "(Text scams, parcel delivery links)", img: "sms-bubble" },
    learn: {
      pill: "Fake Messages & SMS",
      introTitle: "What are SMS Scams (Smishing)?",
      intro: "Scammers send text messages pretending to be courier services, friends, or trusted companies to trick you into clicking unsafe links or sharing personal details.",
      flags: [
        ["Unexpected Package or Delivery Alerts", "Notifications claiming a parcel cannot be delivered or requires an \"address update fee,\" even when you haven't ordered anything."],
        ["Unsolicited Prize & Survey Winning Claims", "Messages announcing you won a raffle, cash prize, or shopping voucher from a contest or company you never entered."],
        ["Fake Loyalty Points Expiration", "Text alerts claiming your telecom, store, or rewards points are expiring today and must be redeemed immediately via a text link."],
        ["Impersonation of Loved Ones or Friends", "Texts from unknown numbers claiming, \"Hi Mom/Dad, my phone broke, this is my new number, please text me here or send help.\""],
        ["Requests to Text Back Keywords or OTPs", "Prompts asking you to reply with keywords (like YES, CLAIM, or VERIFY) or forward a one-time passcode to a personal number."],
        ["Fake Bank & Account Security Alerts", "Texts claiming your bank account, e-wallet, or social media profile has been suspended or locked, and demanding you click a link to unlock it."]
      ],
      comparison: true,
      images: [
        ["sms-1-phishing-screenshot.jpg", "Example of a fake PHLPOST text message"],
        ["sms-2-bdo-scam-alert.jpg", "Scam alert: fake text message targeting BDO customers"],
        ["sms-3-bir-scam-alert.jpg", "Scam alert: beware of fake BIR text messages"]
      ]
    },
    hub: {
      tag: "💬 SMS & Smishing", title: "Fake Messages & SMS",
      text: "Practice identifying fake package alerts, prize claims, and malicious link texts."
    },
    quiz: {
      pill: "Fake Messages & SMS",
      desc: "Identify fake package alerts, prize claims, and malicious link texts.",
      doneText: "Great job! You are getting better at identifying fake package links, prize scams, and unauthorized sender numbers.",
      questions: [
        {
          head: "From: +63 917 888 9999<br>Today, 10:42 AM", gap: true,
          body: "\"PHLPost: Your parcel delivery is suspended due to an incomplete home address. Update details immediately within 2 hours at: <u>http://express-parcel-ph.com</u>\"",
          scam: true,
          points: [
            ["11-Digit Personal Number:", "Couriers use official sender IDs, not personal numbers."],
            ["Fake Web Link:", "express-parcel-ph.com is an unauthorized domain."],
            ["Urgency Trap:", "\"2-hour limit\" pressures you into making quick mistakes."]
          ]
        },
        {
          head: "", body: "\"CONGRATULATIONS!<br>Your mobile number won ₱250,000 from GCash Raffle Promo! To claim your cash prize, send ₱1,500 processing fee to 0917-555-0192.\"",
          scam: true,
          points: [
            ["Advance Fee Scam:", "Legitimate lotteries and promos NEVER ask winners to pay money to claim a prize."],
            ["Unsolicited Contest:", "You cannot win a raffle or promo you never entered or registered for."],
            ["Unofficial Claim Channel:", "Official apps credit prizes directly to your account without external money transfers"]
          ]
        },
        {
          head: "LTO Alert:", body: "You have 1 unpaid traffic violation from 10/12. Pay fine now to avoid driver's license suspension: <u>http://lto-online-portal-pay.com</u>",
          scam: true,
          points: [
            ["Phishing Link:", "The official LTO portal uses .gov.ph domains, never generic .com URLs."],
            ["Threat of Penalty:", "Threatening immediate license suspension creates panic so you bypass critical thinking."],
            ["Unverified Citation:", "Official government agencies issue citations via physical mail or official government portals."]
          ]
        },
        {
          head: "", body: "GlobeAlert: Your bill for account 12345678 is now available. Amount due: ₱1,499.00. Due date: Nov 05. Pay securely via the GlobeOne app or dial *143#.",
          scam: false,
          points: [
            ["Directs to Official Channels:", "Instructs you to use the official mobile app or official USSD code (*143#)."],
            ["No Threatening Language:", "Provides routine billing details without threatening immediate service termination."],
            ["No Suspicious External Web Links:", "Contains no shortened or unverified URLs"]
          ]
        },
        {
          head: "From: +63 936 201 4477<br>Today, 4:15 PM", gap: true,
          body: "\"Hi Mom, this is my new number. My phone fell in the water and I can't use the old one. Can you send ₱5,000 to this GCash number right now? I'll explain later. Please don't call, my phone is broken.\"",
          scam: true,
          points: [
            ["Unknown \"New Number\":", "Scammers pretend to be a family member who changed numbers. Always confirm by calling the old number or another relative."],
            ["Urgent Money Request:", "Real emergencies can wait for a quick verification call."],
            ["\"Don't Call Me\":", "Scammers avoid voice calls because they can't fake your child's voice."]
          ]
        },
        {
          head: "", body: "Globe: Your SIM registration is complete. No further action is needed. Thank you for registering.",
          scam: false,
          points: [
            ["Nothing Is Asked of You:", "It only confirms something you did. It asks for no link, reply, payment or personal details."],
            ["Official Sender Name:", "Comes from the carrier's sender name, not a personal mobile number."],
            ["Compare With a Scam:", "A scam version would say your SIM will be \"deactivated\" unless you click a link to register now."]
          ]
        },
        {
          head: "", body: "Smart: Your Magic Data 99 promo is now active and valid until Nov 3. Check your balance and promo details anytime in the Smart app.",
          scam: false,
          points: [
            ["Matches Something You Did:", "This is only genuine if you actually bought the promo. If you didn't, check your account in the official app."],
            ["Points to the Official App:", "Tells you to check your balance in the app instead of tapping a link."],
            ["No Pressure, No Payment:", "No threat, no deadline to act and no request for money or codes."]
          ]
        },
        {
          head: "", body: "J&T Express: Your parcel is out for delivery today. You can track it in the J&T app using the tracking number in your order confirmation.",
          scam: false,
          points: [
            ["Matches an Order You Made:", "Only trust a delivery text if you are expecting a parcel. Check the order in the shop app too."],
            ["No Payment or Details Asked:", "Real delivery updates do not ask for an \"address fee\" or card details."],
            ["Tracking Stays in the App:", "No random link. You look it up yourself in the official app."]
          ]
        }
      ]
    }
  },

  social: {
    cls: "social",
    home: { title: "Social Media & Accounts", sub: "(Fake profiles, friend requests)", img: "person" },
    learn: {
      pill: "Social Media & Accounts",
      introTitle: "What are Social Media Scams?",
      intro: "Scammers compromise social media profiles or create fake accounts to impersonate your friends, family, or trusted brand pages. Their main goal is to gain access to your private account, steal personal data, or ask for money on behalf of someone you trust.",
      flags: [
        ["Unusual Messages from Known Friends", "Receiving sudden, out-of-character messages from a friend's account asking for urgent financial help, gift cards, or emergency favors."],
        ["Friend Requests from Existing Contacts", "Getting a new friend or follow request from someone you are already connected with, signaling a duplicated or cloned account."],
        ["\"Is This You in This Video?\" Taps", "DMs or post tags claiming to show a shocking video or picture of you, leading to a fake login page designed to steal your password."],
        ["Fake Verification & Support Alerts", "Direct messages from accounts posing as platform support (e.g., \"Instagram Security Team\") claiming your page will be deleted unless you verify credentials."],
        ["Requests for Login Verification Codes", "Someone asking you to send them a screenshot of a 6-digit code or link sent to your phone, which is actually a reset code to hack your account."]
      ],
      images: [
        ["social-1-spot-block-report.jpg", "Spot. Block. Report. Three essential steps to protect yourself from fake social media accounts"],
        ["social-2-fake-profile-warning-signs.jpg", "Warning signs of a fake social media profile"],
        ["social-3-seven-warning-signs.jpg", "7 warning signs of a fake social media account"]
      ]
    },
    hub: {
      tag: "👤 Social Media", title: "Social Media Security",
      text: "Learn to spot hacked friend requests, fake support DMs, and profile takeover traps."
    },
    quiz: {
      pill: "Social Media Security",
      desc: "Spot hacked friend requests, fake support DMs, and profile takeover traps.",
      doneText: "Great job! You are getting better at spotting hacked friend requests, fake support messages, and profile takeover traps.",
      questions: [
        {
          head: "Facebook Security Support:", body: "Your page has been reported for copyright infringement and will be deleted in 24 hours. Verify your account details here: <u>http://meta-appeal-form.net</u>",
          scam: true,
          points: [
            ["Impersonation via DM:", "Official Meta or Facebook notifications appear in your account Notification tab (🔔), never in a direct message."],
            ["External Phishing Link:", "Meta will never send you to third-party domains like .net or .com-appeal to log in or verify account ownership."],
            ["Fear & Urgency Trap:", "Threatening deletion within \"24 hours\" creates panic so you enter your credentials without verifying the source."]
          ]
        },
        {
          head: "Facebook System Notification:", body: "'A new device logged into your account from Quezon City at 2:30 PM. If this was you, no action is needed. If not, secure your account in Account Settings.’",
          scam: false,
          points: [
            ["Official In-App Notification:", "Appears directly inside your official notification center on the app, not as an unprompted private message."],
            ["No Clickable Links:", "The notification directs you to navigate to your standard in-app settings instead of sending you to an external website."],
            ["Standard Protection Alert:", "Security systems routinely inform you of new logins so you can review recent account activity safely."]
          ]
        },
        {
          head: "", body: "Hi dear! I got locked out of my Facebook account and need 2 friends to verify me. Can you text me back the 6-digit code that was just sent to your phone?",
          scam: true,
          points: [
            ["Hacked Friend Account:", "Scammers often compromise a friend's profile to target their contacts with trust-based tricks."],
            ["OTP Hijacking:", "The 6-digit code sent to your phone is actually the One-Time Password for YOUR account, allowing them to reset your password and steal your profile."],
            ["Off-Platform Request:", "Platforms like Facebook do not ask users to send verification codes to friends via SMS."]
          ]
        },
        {
          head: "", body: "Your long-time Facebook friend posts: 'Selling my pre-loved dining table for ₱2,000. Cash upon pickup at my home in Makati.'<br><br>You message her, and she replies: 'Come inspect it first, if you like it, you can pay cash.",
          scam: false,
          points: [
            ["In-Person Inspection First:", "Encourages you to view and test the item in person before any money changes hands."],
            ["No Upfront Payments Required:", "Paying cash in person upon pickup completely eliminates down-payment or reservation scam risks."],
            ["Known Profile Contact:", "The seller is an established, real friend you know personal details about."]
          ]
        },
        {
          head: "Message from your cousin:", body: "OMG is this you in this video?? 😱😱 Watch before it gets deleted: <u>http://fb-watch-clip.xyz/login</u>",
          scam: true,
          points: [
            ["Shock Bait:", "\"Is this you?\" messages use curiosity and fear so you tap before thinking."],
            ["Fake Login Page:", "The link leads to a copy of the Facebook login page that steals your password. Note the odd .xyz address."],
            ["Hacked Account Pattern:", "Your cousin's account was probably hacked and is now sending the same message to all contacts."]
          ]
        },
        {
          head: "Message from your friend Ana:", body: "Hey, did you change your number? Someone texted me using your photo and asked for money. I didn't send anything. Maybe check if your account was copied?",
          scam: false,
          points: [
            ["Warns Instead of Asks:", "This friend is trying to protect you. They are not asking for money, a code or a login."],
            ["No Link or Code Request:", "Nothing to click, send or verify."],
            ["What to Do:", "Thank her, then check whether a fake profile is using your photos and report it inside the app."]
          ]
        },
        {
          head: "Buyer on Facebook Marketplace:", body: "Hi! Is this bike still available? Where can we meet? I can come to the mall near you on Saturday afternoon.",
          scam: false,
          points: [
            ["Stays in the Platform Chat:", "The conversation is happening inside Messenger on your own listing."],
            ["Public Meeting Place:", "Suggesting a busy mall is a safe habit for in-person sales."],
            ["No Advance Payment:", "Nobody asks for a deposit, shipping fee or a code."]
          ]
        },
        {
          head: "Facebook:", body: "Your Facebook login code is 183920. Don't share it with anyone. If you didn't request this code, you can ignore this message.",
          scam: false,
          points: [
            ["You Just Tried to Log In:", "A real code only arrives right after you start a login or reset. If you didn't, someone else may be trying to get into your account, so change your password."],
            ["Includes a Warning:", "Tells you not to share the code."],
            ["Asks You to Do Nothing:", "No link, no reply, no one asking you to forward it. Compare this with the friend asking for the code."]
          ]
        }
      ]
    }
  },

  bank: {
    cls: "bank",
    home: { title: "Banking & Money Scams", sub: "(GCash/Bank impersonation)", img: "bank" },
    learn: {
      pill: "Banking & Money Scams",
      introTitle: "What are Banking & Money Scams?",
      intro: "Scammers send fake alerts pretending to be banks or e-wallets to trick you into revealing login credentials, PINs, or One-Time Passwords (OTPs).",
      flags: [
        ["Unknown 11-Digit Numbers", "Text from standard 11-digit mobile numbers (e.g., 09XX-XXX-XXXX), not a company name (e.g., GCash, BDO)."],
        ["Urgent & Threatening Tone", "(e.g., “Account locked in 24 hours”, “Act now to avoid penalty”)."],
        ["Suspicious Web Links", "Links that don't match the official domain (e.g., gcash-verify-login.com instead of the official app or website)."],
        ["Grammar & Spelling Mistakes", "Frequent errors, unlike official organization communications."],
        ["Requests for Unsolicited OTPs or Personal Data", "Official organizations will never text you asking to reply with your One-Time Password (OTP), PIN, full card number, or mother's maiden name."],
        ["Offers That Sound Too Good to Be True", "Messages promising unexpected monetary prizes, free gifts, or unearned lottery winnings designed to trick you into sharing personal details."]
      ],
      images: [
        ["bank-1-ten-common-scams.jpg", "10 common financial scams and how to avoid them"],
        ["bank-2-five-warning-signs-scammer.jpg", "5 warning signs you're talking to a scammer"],
        ["bank-3-scam-alert-investment.jpg", "Scam alert: investment and commission trap"]
      ]
    },
    hub: {
      tag: "🏦 Banking & E-Wallets", title: "Online Banking & Payments",
      text: "Test your ability to identify fake bank locks, unauthorized transfer alerts, and OTP theft."
    },
    quiz: {
      pill: "Online Banking & Payments",
      desc: "Identify fake bank locks, unauthorized transfer alerts, and OTP theft.",
      doneText: "Great job! You are getting better at identifying fake bank locks, unauthorized transfer alerts, and OTP theft.",
      questions: [
        {
          head: "BDO Alert:", inline: true, body: "Your online banking account has been temporarily LOCKED due to suspicious activity. Unlock immediately by verifying your account details: <u>http://bdo-online-security-update.com</u>",
          scam: true,
          points: [
            ["Fake Bank Domain:", "Banks use official registered domains (like .com.ph or .bdo.com.ph), never hyphenated web addresses like -online-security-update."],
            ["Link-Based Unlock Panic:", "Banks will never send you a direct text link to unlock a frozen or compromised account."],
            ["Credential Harvesting:", "Entering your username and password on unverified external sites hands full control of your funds to scammers."]
          ]
        },
        {
          head: "BPI Automated SMS:", inline: true, body: "'You requested a One-Time PIN (OTP) of 847201 for your transaction of ₱2,500.00 at Shopee. Do not share this PIN with anyone, including BPI staff.'",
          scam: false,
          points: [
            ["Prompted Action:", "Arrives instantly while you are performing an online transaction."],
            ["Explicit Warning Included:", "Clear instruction reminding you never to state or forward the PIN to anyone."],
            ["Specific Context Provided:", "Mentions the exact merchant and transaction amount you initiated."]
          ]
        },
        {
          head: "GCash Customer Support Call:", inline: true, body: "'We detected an unauthorized transfer of ₱8,500 on your account. I can cancel it right now, but please read me the 6-digit OTP sent to your phone to complete the refund.'",
          scam: true,
          points: [
            ["Verbal OTP Request:", "Official bank or e-wallet representatives will NEVER ask for your One-Time Password or PIN over the phone under any circumstances."],
            ["Artificial Panic:", "Creating urgency around a fake unauthorized transaction tricks you into acting before thinking."],
            ["Account Hijacking:", "Giving the OTP to the caller allows them to authorize the actual transfer or log in to your account."]
          ]
        },
        {
          head: "Maya SMS:", inline: true, body: "'Your Maya card purchase of ₱450.00 at Starbucks Greenbelt on 10/27 10:15 AM was successful. Available balance: ₱5,200.00.'",
          scam: false,
          points: [
            ["Verified Real-Time Alert:", "Sent immediately following an in-person payment you made."],
            ["No Action Required:", "Provides plain confirmation details without asking you to tap links or enter credentials."],
            ["Official Sender Name:", "Comes from the \"Maya\" sender name, not a random personal mobile number."]
          ]
        },
        {
          head: "BPI (in the same thread as your real BPI texts):", inline: true, body: "'Unusual transfer of ₱49,900 detected on your account. If this was not you, call 0917-123-4567 immediately to cancel.'",
          scam: true,
          points: [
            ["Spoofed Sender:", "Scammers can make texts appear in the same thread as the real bank's messages. A familiar thread does not prove it is real."],
            ["Personal Mobile Number:", "Banks do not ask you to cancel transactions by calling a 09XX number. Use the hotline on your card or in the app."],
            ["Panic and Speed:", "\"Immediately\" and a large amount push you to call before checking your app."]
          ]
        },
        {
          head: "GCash SMS:", inline: true, body: "'You have received ₱500.00 from JUAN D. Ref. No. 5031 842 119. Your new balance is ₱1,250.00.'",
          scam: false,
          points: [
            ["Plain Notification:", "Only reports a transaction. It asks you to tap, reply or pay nothing."],
            ["Check It in the App:", "You can confirm the money in your GCash transaction history before handing over goods or services."],
            ["Watch Out:", "Scammers also send fake screenshots of receipts. Never release an item because of a screenshot alone."]
          ]
        },
        {
          head: "BDO Advisory:", inline: true, body: "'Never share your OTP, PIN or password with anyone. BDO will never ask for them through SMS, email or phone calls.'",
          scam: false,
          points: [
            ["Warns Rather Than Asks:", "It tells you what the bank will never do. That is the opposite of a phishing request."],
            ["No Link and No Urgency:", "Nothing to tap and no deadline."],
            ["Consistent With Official Advice:", "Matches what banks publish about protecting your account."]
          ]
        },
        {
          head: "Bank Security Alert:", inline: true, body: "'A login to your online banking was successful on 10/27 at 9:02 AM. If this was not you, call the number on the back of your card.'",
          scam: false,
          points: [
            ["Specific, Verifiable Detail:", "States the exact time of a login you can compare with your own activity."],
            ["Directs You to a Trusted Number:", "Tells you to use the number printed on your card, not one inside the text."],
            ["No Link Included:", "Nothing to tap, and no request for credentials."]
          ]
        }
      ]
    }
  },

  shop: {
    cls: "shop",
    home: { title: "Online Shopping", sub: "(Fake stores, non-delivery)", img: "shopping-bags" },
    learn: {
      pill: "Online Shopping & Marketplaces",
      introTitle: "What are Online Shopping Scams?",
      intro: "Scammers create fake online stores, social media shop pages, or fraudulent marketplace listings to post deals that seem too good to be true. Their main goal is to collect non-refundable payments for items that are never delivered or to steal your payment card details.",
      flags: [
        ["Direct Down Payments Outside Platform", "Sellers insisting you send payment via direct bank transfer, e-wallet, or wire transfer instead of using the official checkout system."],
        ["Unrealistically Low Prices", "High-value items (like smartphones, gadgets, or designer bags) listed at 70%–90% off standard retail price under the guise of an \"emergency sale\" or \"warehouse clearance.\""],
        ["Newly Created Pages with Zero Reviews", "Seller profiles or shop pages created only a few days or weeks ago, with no verified customer reviews, hidden follower lists, or locked comment sections."],
        ["\"Pay First Before Inspection\" Parcel Delivery", "Cash-on-delivery (COD) parcels arriving unexpectedly at your door demanding payment before you can open the box, often containing cheap trinkets or rubbish."],
        ["Off-Platform Messaging Requests", "Sellers refusing to communicate inside the official marketplace chat and pressuring you to move the conversation to personal messaging apps or private numbers."]
      ],
      images: [
        ["shop-1-fake-online-store.jpg", "The fake online store: common signs and how to protect yourself"],
        ["shop-2-guide-online-shopping.jpg", "Guide for online shopping: how to avoid scams and faulty products"],
        ["shop-3-how-to-verify-seller.jpg", "How to verify an online seller: check first, pay second"]
      ]
    },
    hub: {
      tag: "🛍️ E-Commerce", title: "Safe Shopping Practices",
      text: "Identify fraudulent listings, off-platform payment demands, and fake online stores."
    },
    quiz: {
      pill: "Safe Shopping Practices",
      desc: "Identify fraudulent listings, off platform payment demands, fake online stores/sellers",
      doneText: "Great job! You are getting better at identifying fraudulent listings, off-platform payment demands, and fake online stores.",
      questions: [
        {
          head: "Shopee Seller DM:", inline: true, body: "'Hi buyer! The product is in stock, but if you cancel your app order and transfer ₱1,500 directly to my GCash (0918-777-3322), I will give you 30% off and free delivery.'",
          scam: true,
          points: [
            ["Off-Platform Payment:", "Moving transactions outside the official shopping app voids all buyer protection and refund guarantees."],
            ["Unrecoverable Funds:", "Direct peer-to-peer e-wallet transfers cannot be refunded if the seller disappears or sends a defective item."],
            ["Too-Good-To-Be-True Discount:", "Unrealistic discounts are bait used to entice buyers to bypass secure app checkout systems."]
          ]
        },
        {
          head: "Lazada App Notification:", inline: true, body: "'Your package containing (1) Senior Reading Glasses has been handed to the driver. Please prepare ₱350 cash for COD delivery today (Order #882190).'",
          scam: false,
          points: [
            ["In-App Delivery Alert:", "The message arrives directly inside the official Lazada app notification center, matching an active order you placed."],
            ["Matches Order History:", "The package contents, order ID (#882190), and total cash-on-delivery amount match your actual order history."],
            ["Standard In-Person COD:", "Paying cash to the courier upon physical receipt of a verified package is a standard, safe delivery method."]
          ]
        },
        {
          head: "", body: "A delivery courier arrives at your door with a box labeled 'Mystery Electronic Gadget' marked ₱1,250 Cash On Delivery. You don't recall ordering it, but the driver says: 'It's under your name, someone in your family must have ordered it.'",
          scam: true,
          points: [
            ["Unverified Package:", "Scammers send cheap or worthless items via COD hoping household members pay without checking active orders."],
            ["Lack of Order Record:", "Never pay for a package that does not appear in your app's \"To Receive\" order list."],
            ["Pressure to Pay:", "Couriers cannot force payment for unverified items—always inspect your active orders in the app first."]
          ]
        },
        {
          head: "", body: "An online store displaying an official 'LazMall' / 'Shopee Mall' badge offers an Electric Fan for ₱1,200. Checkout is completed entirely inside the app using GCash, including a 7-day return guarantee.",
          scam: false,
          points: [
            ["Verified Mall Badge:", "Mall badges confirm the seller is an authorized brand or registered retailer with verified business credentials."],
            ["Protected Escrow Payment:", "App payment holds your funds safely until you receive and inspect the item."],
            ["Guaranteed Return Policy:", "Includes official 7-day return and refund protection handled by the platform."]
          ]
        },
        {
          head: "Facebook Marketplace seller:", inline: true, body: "'iPhone 15 Pro Max, sealed, ₱9,500 only! Moving abroad, must sell today. Pay half via GCash to reserve, balance upon delivery.'",
          scam: true,
          points: [
            ["Price Far Below Market:", "A brand-new flagship phone at a fraction of its price is bait."],
            ["Deposit Before Seeing the Item:", "Reservation payments by e-wallet cannot be taken back."],
            ["Sob Story and Deadline:", "\"Moving abroad\" and \"today only\" are used to rush you past checking the seller."]
          ]
        },
        {
          head: "Shopee:", inline: true, body: "'Your order #SP2210547 has been shipped. Track it anytime in My Purchases > To Receive in the Shopee app.'",
          scam: false,
          points: [
            ["Points You to the App:", "Tells you to look it up inside your own Shopee app, not to tap a link."],
            ["Matches an Order You Placed:", "Check that the order number appears in your purchases."],
            ["No Payment or Login Asked:", "Nothing is requested from you."]
          ]
        },
        {
          head: "Shopee chat from a seller:", inline: true, body: "'Hi! Yes, the item is available. Please place your order through the app so I can ship today. Thank you!'",
          scam: false,
          points: [
            ["Keeps the Sale Inside the Platform:", "Ordering through the app keeps your buyer protection and refund rights."],
            ["No Off-Platform Payment:", "No GCash number, no bank account, no discount for paying outside."],
            ["Normal, Calm Tone:", "No pressure and no \"last piece\" tricks."]
          ]
        },
        {
          head: "Marketplace seller:", inline: true, body: "'Let's meet at the mall security desk this Saturday. You can test the phone first and pay cash only if you are happy with it.'",
          scam: false,
          points: [
            ["Inspect Before Paying:", "You see and test the item before any money changes hands."],
            ["Safe Meeting Place:", "A busy public place with security is the right choice."],
            ["No Advance Payment:", "Cash only after you are satisfied. Still bring a friend and check the item carefully."]
          ]
        }
      ]
    }
  }
};

const CAT_ORDER = ["sms", "social", "bank", "shop"];


/* ---------- Get Help page: who to contact ----------
   Numbers below were checked against each organisation's own contact page
   in October 2026. Phone numbers change and fake "support" pages exist, so
   update HELP_UPDATED whenever you re-check them.
   calls: tap-to-call numbers  |  links: email / website buttons            */
const HELP_UPDATED = "October 2026";
const HELP_CONTACTS = [
  { title: "Your bank or e-wallet",
    text: "Call the official hotline to lock your account or card. Do it first, because speed matters.",
    calls: [
      { label: "GCash (Globe / TM, toll-free)", show: "2882", tel: "2882" },
      { label: "GCash (landline)", show: "(02) 7213-9999", tel: "+63272139999" },
      { label: "Maya", show: "(02) 8845-7788", tel: "+63288457788" },
      { label: "Maya (toll-free)", show: "1-800-1084-57788", tel: "1800108457788" },
      { label: "BPI 24-hour contact center", show: "(02) 889-10000", tel: "+63288910000" },
      { label: "BPI (toll-free)", show: "1-800-188-89-100", tel: "180018889100" }
    ],
    hint: "BDO and other banks: use the number on the back of your card or inside the official app. Never use a number from a text message." },
  { title: "The platform where it happened",
    text: "Report the account, message or listing inside Facebook, Instagram, Shopee, Lazada, GCash, Maya or your SMS app.",
    hint: "" },
  { title: "Police and government agencies",
    text: "File an official report. Bring screenshots, reference numbers and the scammer's number or account.",
    links: [
      { label: "PNP Anti-Cybercrime Group", show: "acg@pnp.gov.ph", href: "mailto:acg@pnp.gov.ph" },
      { label: "PNP-ACG website", show: "acg.pnp.gov.ph", href: "https://acg.pnp.gov.ph" },
      { label: "NBI Cybercrime Division", show: "ccd@nbi.gov.ph", href: "mailto:ccd@nbi.gov.ph" },
      { label: "BSP Consumer Affairs", show: "(02) 8708-7087", href: "tel:+63287087087" }
    ],
    hint: "Fake police and \"support\" pages exist. Confirm contact details on the official website before sending anything." },
  { title: "Someone you trust",
    text: "Tell a family member or friend. Scammers rely on you staying quiet, and others may be targeted next.",
    hint: "" }
];
