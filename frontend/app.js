/* ═══════════════════════════════════════════════════════════════════
   GigBuddy — Frontend Application
   DEVTrails 2026 · Phase 2
   ═══════════════════════════════════════════════════════════════════ */

// ── i18n Translations ────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    "nav.worker": "Worker App", "nav.admin": "Admin Portal",
    "tab.onboarding": "Onboarding", "tab.dashboard": "Dashboard", "tab.claims": "Claims", "tab.premium": "Premium", "tab.settings": "Settings",
    "hero.title": "When it rains, your income doesn't have to stop.",
    "hero.subtitle": "GigBuddy watches verified city signals and moves disruption payouts to your UPI when delivery work is materially disrupted.",
    "hero.stat1": "Max weekly premium", "hero.stat2": "Payout SLA", "hero.stat3": "Claims to file",
    "trust.1.title": "Automatic Payouts", "trust.1.desc": "Dual-signal disruption checks decide when a payout should move, without claim forms",
    "trust.2.title": "Calibrated Pricing", "trust.2.desc": "Premiums come from a risk model calibrated to Bengaluru disruption patterns",
    "trust.3.title": "Dual-Trigger Verified", "trust.3.desc": "Two independent data sources must confirm before any payout fires",
    "reg.title": "Worker Registration", "reg.desc": "Enter your details to get started",
    "reg.name": "Full Name", "reg.phone": "Phone Number", "reg.platform": "Platform", "reg.zone": "Zone",
    "reg.income": "Weekly Income (₹)", "reg.vehicle": "Vehicle", "reg.submit": "Register & Get OTP",
    "reg.login_link": "Already have an account? Login",
    "login.title": "Worker Login", "login.desc": "Welcome back to GigBuddy",
    "login.phone": "Phone Number", "login.otp": "OTP", "login.hint": "Demo worker: Ravi Kumar, 9876543210, OTP 1234. You can also request a one-time password.",
    "login.send_otp": "Send OTP", "login.submit": "Login", "login.register_link": "New worker? Register here",
    "consent.terms": "I agree to the Terms of Service.",
    "consent.privacy": "I have reviewed the Privacy Notice and support contact details.",
    "consent.ai": "I understand pricing and fraud checks may use automated models, with human review available on appeal.",
    "otp.title": "Verify Phone", "otp.desc": "Enter the OTP sent to your phone", "otp.hint": "A 4-digit code has been sent via SMS.", "otp.resend": "Resend OTP", "otp.verify": "Verify OTP",
    "kyc.title": "Identity Check", "kyc.desc": "Paperless verification flow with sandbox fallback", "kyc.aadhaar": "Aadhaar Number", "kyc.verify": "Verify Aadhaar",
    "quote.title": "Your Risk Profile & Premium", "quote.desc": "Calibrated pricing based on local disruption signals", "quote.accept": "Accept & Setup UPI",
    "upi.title": "UPI AutoPay Setup", "upi.desc": "Set up weekly automatic payment", "upi.id": "UPI ID",
    "upi.deduction": "Weekly Deduction", "upi.day": "Deduction Day", "upi.lockin": "Lock-in", "upi.none": "None — pause anytime", "upi.complete": "Complete Onboarding & Buy Policy",
    "success.title": "Welcome to GigBuddy!", "success.desc": "Your policy is now ACTIVE. You're covered.", "success.go": "Go to Dashboard",
    "dash.greeting": "Welcome", "dash.active": "Policy Active", "dash.logout": "Logout",
    "dash.policy": "Active Policy", "dash.weekly": "Weekly Premium", "dash.coverage": "Coverage",
    "dash.weeks": "Weeks Active", "dash.paid": "Total Paid", "dash.claimed": "Total Claimed", "dash.credit": "Renewal Credit",
    "dash.renew": "Renew", "dash.pause": "Pause", "dash.zone_status": "Zone Live Status",
    "dash.recent": "Recent Claims",
    "claims.title": "Claims History", "claims.desc": "Automatic payouts with worker feedback after each paid event",
    "prem.title": "Dynamic Premium Pricing", "prem.desc": "A calibrated risk model turns signal intensity into zone-specific weekly pricing",
    "prem.how": "How Pricing Works",
    "settings.title": "Settings & Privacy", "settings.desc": "Account control, support, and data management",
    "settings.account": "Account", "settings.support": "Support & Human Review", "settings.credit": "Renewal Credit",
    "settings.delete": "Delete Account", "settings.delete_btn": "Delete My Account",
    "push.alert": "Disruption alert detected in your area!", "push.payout": "Your GigBuddy payout is being processed.",
    "push.confirmed": "has been sent to your UPI.",
  },
  hi: {
    "nav.worker": "कर्मचारी ऐप", "nav.admin": "एडमिन पोर्टल",
    "tab.onboarding": "ऑनबोर्डिंग", "tab.dashboard": "डैशबोर्ड", "tab.claims": "दावे", "tab.premium": "प्रीमियम", "tab.settings": "सेटिंग्स",
    "hero.title": "जब बारिश होती है, तो आपकी आय को रुकना नहीं चाहिए।",
    "hero.subtitle": "GigBuddy सत्यापित शहर संकेतों को देखकर व्यवधान होने पर आपके UPI पर भुगतान भेजता है।",
    "hero.stat1": "अधिकतम साप्ताहिक प्रीमियम", "hero.stat2": "भुगतान SLA", "hero.stat3": "दावे दाखिल करने",
    "reg.title": "कर्मचारी पंजीकरण", "reg.desc": "शुरू करने के लिए अपना विवरण दर्ज करें",
    "reg.name": "पूरा नाम", "reg.phone": "फ़ोन नंबर", "reg.submit": "पंजीकरण करें और OTP प्राप्त करें",
    "login.title": "कर्मचारी लॉगिन", "login.desc": "GigBuddy में वापस स्वागत है",
    "otp.title": "फ़ोन सत्यापित करें", "otp.verify": "OTP सत्यापित करें",
    "kyc.title": "पहचान जांच", "kyc.verify": "आधार सत्यापित करें",
    "success.title": "GigBuddy में आपका स्वागत है!", "success.go": "डैशबोर्ड पर जाएं",
    "dash.greeting": "स्वागत है", "dash.active": "पॉलिसी सक्रिय",
    "claims.title": "दावे इतिहास", "prem.title": "गतिशील प्रीमियम मूल्य निर्धारण",
    "settings.title": "सेटिंग्स और गोपनीयता",
  },
  kn: {
    "nav.worker": "ಕಾರ್ಮಿಕ ಅಪ್ಲಿಕೇಶನ್", "nav.admin": "ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್",
    "tab.onboarding": "ಆನ್‌ಬೋರ್ಡಿಂಗ್", "tab.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "tab.claims": "ಕ್ಲೈಮ್‌ಗಳು", "tab.premium": "ಪ್ರೀಮಿಯಂ", "tab.settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "hero.title": "ಮಳೆ ಬಂದಾಗ, ನಿಮ್ಮ ಆದಾಯ ನಿಲ್ಲಬೇಕಾಗಿಲ್ಲ.",
    "hero.subtitle": "GigBuddy ಪರಿಶೀಲಿತ ನಗರ ಸೂಚನೆಗಳನ್ನು ನೋಡಿ ಕೆಲಸಕ್ಕೆ ವ್ಯತ್ಯಯವಾದಾಗ ನಿಮ್ಮ UPI ಗೆ ಪಾವತಿಯನ್ನು ಕಳುಹಿಸುತ್ತದೆ.",
    "hero.stat1": "ಗರಿಷ್ಠ ಸಾಪ್ತಾಹಿಕ ಪ್ರೀಮಿಯಂ", "hero.stat2": "ಪಾವತಿ SLA", "hero.stat3": "ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು",
    "reg.title": "ಕಾರ್ಮಿಕ ನೋಂದಣಿ", "reg.desc": "ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    "success.title": "GigBuddy ಗೆ ಸ್ವಾಗತ!", "success.go": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ",
    "dash.greeting": "ಸ್ವಾಗತ", "dash.active": "ಪಾಲಿಸಿ ಸಕ್ರಿಯ",
    "claims.title": "ಕ್ಲೈಮ್ ಇತಿಹಾಸ", "prem.title": "ಡೈನಾಮಿಕ್ ಪ್ರೀಮಿಯಂ ಬೆಲೆ",
    "settings.title": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ",
  }
};

let currentLang = 'en';

Object.assign(TRANSLATIONS.en, {
  "hero.evidence.1.kicker": "Real-Time Detection",
  "hero.evidence.1.title": "Weather, AQI, flood and traffic signals are checked continuously.",
  "hero.evidence.1.desc": "Payouts move only when multiple signals agree, reducing basis risk for workers and operators.",
  "hero.evidence.2.kicker": "Fast Relief",
  "hero.evidence.2.title": "Trigger, review, and payout logic are wired as an operational flow rather than a claims form.",
  "hero.evidence.2.desc": "Low-risk payouts move quickly, while held claims stay visible for manual review.",
  "hero.evidence.3.kicker": "Worker-First Design",
  "hero.evidence.3.title": "Short steps, large targets, and multilingual copy keep the flow calm under pressure.",
  "hero.evidence.3.desc": "The experience is optimized for quick comprehension, unstable networks, and low-friction weekly protection.",
  "demo.kicker": "2-Minute Demo Path",
  "demo.title": "The fastest way to understand why GigBuddy is different",
  "demo.desc": "Start with a worker flow, then close the loop with a disruption trigger and a feedback credit.",
  "demo.step1.title": "Login as Ravi",
  "demo.step1.desc": "Use 9876543210 and 1234 to open an active policy, claims history, and live zone status.",
  "demo.step2.title": "Show the feedback-credit loop",
  "demo.step2.desc": "Open Claims and submit the post-payout survey to add a visible renewal credit.",
  "demo.step3.title": "Run a disruption scenario",
  "demo.step3.desc": "Switch to Admin, simulate heavy rainfall or flooding, and watch trigger logic produce claims.",
  "demo.step4.title": "Explain the ops posture",
  "demo.step4.desc": "Point out that green claims move faster while amber and red claims remain reviewable.",
  "section.driver_cockpit": "Driver cockpit",
  "section.claims_timeline": "Claims timeline",
  "section.pricing_intelligence": "Pricing intelligence",
  "section.privacy_support": "Privacy & support",
  "survey.badge": "Post-Payout Survey",
  "survey.claim_summary": "Last payout: {amount} for {trigger} in {zone}.",
  "survey.pending": "Answer these questions once and we will add a renewal credit.",
  "survey.q3": "How did the disruption affect your shift?",
  "survey.stopped": "Stopped",
  "survey.slowed": "Slowed",
  "survey.normal": "Normal",
  "prem.model": "Model",
  "prem.training": "Training Data",
  "prem.features": "Features",
  "prem.output": "Output",
  "prem.retrain": "Retraining",
  "settings.legal": "Terms & Privacy",
  "settings.legal_open": "Open the legal summary",
  "settings.legal_text": "Workers can review pricing, policy status, claim history, payout handling, and renewal credit inside the app. If a claim is flagged or denied, support can review the case manually. Deleting your account removes personal profile data and payout identifiers while retaining anonymised financial records required for audit.",
  "settings.delete_desc": "This removes your personal profile data. This cannot be undone.",
  "settings.otp": "OTP Confirmation",
  "settings.confirm": "Type DELETE to confirm",
  "common.bengaluru": "Bengaluru",
  "common.standard_plan": "Standard Plan",
  "common.standard": "Standard",
  "common.active": "Active",
  "common.verified": "Verified",
  "common.pending": "Pending",
  "quote.detected_zone": "Detected Zone",
  "quote.period": "per week · auto-debited Monday 06:00",
  "quote.period_day": "Monday 06:00",
  "quote.model": "Model",
  "quote.risk_score": "Risk Score",
  "quote.tier.high": "HIGH RISK",
  "quote.tier.medium": "MEDIUM",
  "quote.tier.low": "LOW RISK",
  "success.plan": "Plan",
  "success.weekly": "Weekly Premium",
  "success.coverage": "Coverage",
  "success.status": "Status",
  "toast.thank_you_discount": "Thank you! ₹5 renewal credit is ready for your next renewal.",
  "toast.complete_survey": "Answer all 3 survey questions",
  "toast.survey_saved": "Feedback saved. ₹5 renewal credit added.",
  "toast.fill_fields": "Please fill in all fields",
  "toast.accept_consents": "Please accept all consent items",
  "toast.sign_in_to": "Please sign in to {label}.",
  "toast.enter_phone": "Enter your phone number",
  "toast.otp_sent": "OTP sent",
  "toast.failed": "Failed",
  "toast.register_first": "Register first",
  "toast.otp_resent": "OTP resent",
  "toast.enter_phone_otp": "Enter phone and OTP",
  "toast.welcome_back": "Welcome back!",
  "toast.enter_4digit_otp": "Enter 4-digit OTP",
  "toast.enter_12digit_aadhaar": "Enter 12-digit Aadhaar",
  "toast.kyc_verified": "KYC verified successfully.",
  "toast.enter_upi": "Enter UPI ID",
  "toast.policy_activated": "Policy Activated",
  "toast.session_ended": "Session ended",
  "toast.account_deleted": "Account deleted.",
  "toast.enter_delete": "Enter OTP and type DELETE",
  "toast.policy_renewed": "Policy renewed for another week!",
  "toast.policy_paused": "Policy paused. You can resume anytime.",
  "toast.enter_credentials": "Enter credentials",
  "toast.admin_session_started": "Admin session started",
  "toast.claim_approved": "Claim approved",
  "toast.claim_rejected": "Claim rejected",
  "otp.status.provider": "Provider",
  "otp.status.expires": "Expires",
  "otp.status.demo": "Demo OTP",
  "ui.now": "Now",
  "ui.not_yet": "Not yet",
  "zone.rainfall": "Rainfall",
  "zone.aqi": "AQI",
  "zone.temperature": "Temperature",
  "zone.traffic": "Traffic",
  "zone.flood_level": "Flood Level",
  "zone.level.normal": "Normal",
  "zone.level.elevated": "Elevated",
  "zone.level.critical": "Critical",
  "zone.live_telemetry": "Live zone telemetry",
  "claims.none": "No claims yet — you're protected!",
  "claims.fraud": "Fraud",
  "trigger.rainfall": "Heavy Rainfall",
  "trigger.aqi": "Hazardous AQI",
  "trigger.heat": "Extreme Heat",
  "trigger.curfew": "Curfew / Strike",
  "trigger.flooding": "Urban Flooding",
  "support.review_note": "Need a human review? Reach support at {phone} or {email}.",
  "prem.risk_score": "Risk Score",
  "prem.zone_mult": "Zone Mult.",
  "prem.season": "Season",
  "prem.savings": "Savings",
  "settings.name": "Name",
  "settings.phone": "Phone",
  "settings.zone": "Zone",
  "settings.platform": "Platform",
  "settings.risk_tier": "Risk Tier",
  "settings.kyc": "KYC",
  "settings.email": "Email",
  "settings.hours": "Hours"
});

Object.assign(TRANSLATIONS.hi, {
  "trust.1.title": "स्वचालित भुगतान",
  "trust.1.desc": "ड्यूल-सिग्नल जांच तय करती है कि भुगतान कब जारी होना चाहिए",
  "trust.2.title": "कैलिब्रेटेड प्राइसिंग",
  "trust.2.desc": "जोखिम मॉडल बेंगलुरु के व्यवधान पैटर्न के आधार पर प्रीमियम तय करता है",
  "trust.3.title": "ड्यूल-ट्रिगर सत्यापन",
  "trust.3.desc": "भुगतान से पहले दो स्वतंत्र संकेतों का मिलान आवश्यक है",
  "step.register": "पंजीकरण",
  "step.otp": "OTP सत्यापन",
  "step.kyc": "KYC",
  "step.quote": "कोट",
  "step.upi": "UPI सेटअप",
  "reg.platform": "प्लेटफ़ॉर्म", "reg.zone": "ज़ोन", "reg.income": "साप्ताहिक आय (₹)", "reg.vehicle": "वाहन",
  "reg.login_link": "पहले से खाता है? लॉगिन करें",
  "login.phone": "फ़ोन नंबर", "login.otp": "OTP", "login.hint": "डेमो वर्कर: Ravi Kumar, 9876543210, OTP 1234. चाहें तो OTP भी मंगा सकते हैं।",
  "login.send_otp": "OTP भेजें", "login.submit": "लॉगिन", "login.register_link": "नए कर्मचारी हैं? यहाँ पंजीकरण करें",
  "consent.terms": "मैं सेवा की शर्तों से सहमत हूँ।",
  "consent.privacy": "मैंने गोपनीयता सूचना और सहायता विवरण पढ़ लिया है।",
  "consent.ai": "मैं समझता हूँ कि प्राइसिंग और फ्रॉड जाँच में स्वचालित मॉडल उपयोग हो सकते हैं।",
  "otp.desc": "अपने फ़ोन पर भेजा गया OTP दर्ज करें", "otp.hint": "4 अंकों का कोड SMS से भेजा गया है।", "otp.resend": "OTP दोबारा भेजें",
  "kyc.desc": "सैंडबॉक्स बैकअप के साथ पेपरलेस सत्यापन प्रवाह", "kyc.aadhaar": "आधार नंबर",
  "quote.title": "आपकी जोखिम प्रोफ़ाइल और प्रीमियम", "quote.desc": "स्थानीय व्यवधान संकेतों पर आधारित कैलिब्रेटेड प्राइसिंग", "quote.accept": "स्वीकार करें और UPI सेट करें",
  "upi.title": "UPI ऑटोपे सेटअप", "upi.desc": "साप्ताहिक स्वचालित भुगतान सेट करें", "upi.id": "UPI आईडी",
  "upi.deduction": "साप्ताहिक कटौती", "upi.day": "कटौती का दिन", "upi.lockin": "लॉक-इन", "upi.none": "कोई नहीं — कभी भी रोकें", "upi.complete": "ऑनबोर्डिंग पूरी करें और पॉलिसी खरीदें",
  "success.desc": "आपकी पॉलिसी अब सक्रिय है। आप सुरक्षित हैं।",
  "dash.logout": "लॉगआउट", "dash.policy": "सक्रिय पॉलिसी", "dash.weekly": "साप्ताहिक प्रीमियम", "dash.coverage": "कवरेज",
  "dash.weeks": "सक्रिय सप्ताह", "dash.paid": "कुल भुगतान", "dash.claimed": "कुल प्राप्त दावा", "dash.renew": "नवीनीकरण", "dash.pause": "रोकें",
  "dash.zone_status": "ज़ोन की लाइव स्थिति", "dash.recent": "हाल के दावे",
  "dash.chart_fin": "वित्तीय अवलोकन", "dash.chart_prot": "सुरक्षा संतुलन", "dash.chart_risk": "लाइव जोखिम", "dash.chart_radar": "ज़ोन सिग्नल रडार", "dash.chart_perf": "दावा प्रदर्शन", "dash.chart_trend": "भुगतान प्रवृत्ति",
  "claims.desc": "ट्रिगर होने पर दावे अपने आप प्रोसेस होते हैं",
  "survey.intro": "बेहतर बनाने में मदद करें — अपने पिछले भुगतान पर 3 छोटे प्रश्नों के उत्तर दें:",
  "survey.q1": "क्या आपने अपने कार्य क्षेत्र में यह व्यवधान अनुभव किया?", "survey.yes": "हाँ", "survey.no": "नहीं",
  "survey.q2": "क्या भुगतान राशि उपयोगी थी?", "survey.low": "बहुत कम", "survey.right": "ठीक थी", "survey.high": "उम्मीद से अधिक", "survey.submit": "जमा करें और ₹5 क्रेडिट पाएं",
  "prem.desc": "कैलिब्रेटेड जोखिम मॉडल सिग्नल तीव्रता को साप्ताहिक प्रीमियम में बदलता है",
  "prem.how": "प्राइसिंग कैसे काम करती है",
  "prem.landscape": "प्राइसिंग परिदृश्य", "prem.zone_chart": "ज़ोन प्रीमियम तुलना", "prem.model": "मॉडल", "prem.training": "प्रशिक्षण डेटा", "prem.features": "फ़ीचर्स", "prem.output": "आउटपुट", "prem.retrain": "री-ट्रेनिंग",
  "settings.desc": "खाता नियंत्रण, सहायता और डेटा प्रबंधन", "settings.account": "खाता", "settings.support": "सहायता और मानव समीक्षा",
  "settings.legal": "शर्तें और गोपनीयता", "settings.legal_open": "कानूनी सारांश खोलें", "settings.legal_text": "कर्मचारी ऐप के भीतर प्राइसिंग, पॉलिसी स्थिति, दावा इतिहास और भुगतान प्रबंधन देख सकते हैं। यदि दावा फ़्लैग या अस्वीकार होता है, तो सहायता टीम मैन्युअल समीक्षा कर सकती है।",
  "settings.delete": "खाता हटाएँ", "settings.delete_desc": "यह आपकी व्यक्तिगत प्रोफ़ाइल जानकारी हटाएगा। इसे वापस नहीं किया जा सकता।", "settings.otp": "OTP पुष्टि", "settings.confirm": "पुष्टि के लिए DELETE लिखें", "settings.delete_btn": "मेरा खाता हटाएँ",
  "hero.evidence.1.kicker": "रियल-टाइम पहचान", "hero.evidence.1.title": "मौसम, AQI, बाढ़ और ट्रैफिक संकेत लगातार जांचे जाते हैं।", "hero.evidence.1.desc": "भुगतान तभी ट्रिगर होते हैं जब पर्यावरणीय और व्यवहारिक संकेत मेल खाते हैं।",
  "hero.evidence.2.kicker": "स्वचालित भुगतान", "hero.evidence.2.title": "ट्रिगर से UPI तक तेज़ ऑटो-अप्रूवल प्रवाह।", "hero.evidence.2.desc": "फ्रॉड स्कोरिंग, अनुमोदन और भुगतान एक साफ़ परिचालन प्रवाह में होते हैं।",
  "hero.evidence.3.kicker": "वर्कर-फर्स्ट डिज़ाइन", "hero.evidence.3.title": "छोटे स्टेप, बड़े टच टारगेट और बहुभाषी कॉपी।", "hero.evidence.3.desc": "अनुभव तेज़ समझ, अस्थिर नेटवर्क और कम-फ्रिक्शन सुरक्षा के लिए अनुकूलित है।",
  "demo.kicker": "2 मिनट डेमो पथ",
  "demo.title": "GigBuddy को अलग क्या बनाता है, इसे समझने का सबसे तेज़ तरीका",
  "demo.desc": "वर्कर फ्लो से शुरू करें, फिर व्यवधान ट्रिगर और फीडबैक क्रेडिट के साथ लूप पूरा करें।",
  "demo.step1.title": "Ravi के रूप में लॉगिन करें",
  "demo.step1.desc": "9876543210 और 1234 का उपयोग करके सक्रिय पॉलिसी, क्लेम इतिहास और लाइव ज़ोन स्थिति खोलें।",
  "demo.step2.title": "फीडबैक-क्रेडिट लूप दिखाएँ",
  "demo.step2.desc": "Claims खोलें और पोस्ट-पेआउट सर्वे जमा करके दिखाई देने वाला renewal credit जोड़ें।",
  "demo.step3.title": "व्यवधान परिदृश्य चलाएँ",
  "demo.step3.desc": "Admin में जाएँ, भारी बारिश या बाढ़ सिम्युलेट करें और देखें कि ट्रिगर लॉजिक कैसे क्लेम बनाता है।",
  "demo.step4.title": "ऑप्स posture समझाएँ",
  "demo.step4.desc": "दिखाएँ कि green claims तेज़ी से बढ़ते हैं, जबकि amber और red claims समीक्षा के लिए दिखते रहते हैं।",
  "section.driver_cockpit": "ड्राइवर कॉकपिट", "section.claims_timeline": "दावा टाइमलाइन", "section.pricing_intelligence": "प्राइसिंग इंटेलिजेंस", "section.privacy_support": "गोपनीयता और सहायता",
  "survey.badge": "भुगतान के बाद सर्वेक्षण",
  "common.bengaluru": "बेंगलुरु", "common.standard_plan": "स्टैंडर्ड प्लान", "common.standard": "स्टैंडर्ड", "common.active": "सक्रिय", "common.verified": "सत्यापित", "common.pending": "लंबित",
  "quote.detected_zone": "पता चला ज़ोन", "quote.period": "प्रति सप्ताह · सोमवार 06:00 पर ऑटो-डेबिट", "quote.model": "मॉडल", "quote.risk_score": "जोखिम स्कोर", "quote.tier.high": "उच्च जोखिम", "quote.tier.medium": "मध्यम", "quote.tier.low": "कम जोखिम",
  "quote.period_day": "सोमवार 06:00",
  "success.plan": "प्लान", "success.weekly": "साप्ताहिक प्रीमियम", "success.coverage": "कवरेज", "success.status": "स्थिति",
  "toast.thank_you_discount": "धन्यवाद! अगले नवीनीकरण के लिए ₹5 क्रेडिट तैयार है।", "toast.fill_fields": "कृपया सभी फ़ील्ड भरें", "toast.accept_consents": "कृपया सभी सहमति स्वीकार करें", "toast.sign_in_to": "{label} के लिए साइन इन करें।", "toast.enter_phone": "अपना फ़ोन नंबर दर्ज करें", "toast.otp_sent": "OTP भेज दिया गया", "toast.failed": "असफल", "toast.register_first": "पहले पंजीकरण करें", "toast.otp_resent": "OTP फिर भेजा गया", "toast.enter_phone_otp": "फ़ोन और OTP दर्ज करें", "toast.welcome_back": "वापसी पर स्वागत है!", "toast.enter_4digit_otp": "4 अंकों का OTP दर्ज करें", "toast.enter_12digit_aadhaar": "12 अंकों का आधार दर्ज करें", "toast.kyc_verified": "KYC सफलतापूर्वक सत्यापित हुआ।", "toast.enter_upi": "UPI आईडी दर्ज करें", "toast.policy_activated": "पॉलिसी सक्रिय हुई", "toast.session_ended": "सत्र समाप्त", "toast.account_deleted": "खाता हटाया गया।", "toast.enter_delete": "OTP दर्ज करें और DELETE लिखें", "toast.policy_renewed": "पॉलिसी एक और सप्ताह के लिए नवीनीकृत हुई!", "toast.policy_paused": "पॉलिसी रोकी गई। आप कभी भी फिर शुरू कर सकते हैं।", "toast.enter_credentials": "क्रेडेंशियल दर्ज करें", "toast.admin_session_started": "एडमिन सत्र शुरू हुआ", "toast.claim_approved": "दावा स्वीकृत", "toast.claim_rejected": "दावा अस्वीकृत",
  "otp.status.provider": "प्रदाता", "otp.status.expires": "समाप्ति", "otp.status.demo": "डेमो OTP", "ui.now": "अभी", "ui.not_yet": "अभी नहीं",
  "zone.rainfall": "वर्षा", "zone.aqi": "AQI", "zone.temperature": "तापमान", "zone.traffic": "ट्रैफिक", "zone.flood_level": "जल स्तर", "zone.level.normal": "सामान्य", "zone.level.elevated": "उच्च", "zone.level.critical": "गंभीर", "zone.live_telemetry": "लाइव ज़ोन टेलीमेट्री",
  "claims.none": "अभी कोई दावा नहीं — आप सुरक्षित हैं!", "claims.fraud": "धोखाधड़ी", "support.review_note": "मानव समीक्षा चाहिए? सहायता के लिए {phone} या {email} पर संपर्क करें।",
  "trigger.rainfall": "भारी वर्षा", "trigger.aqi": "खतरनाक AQI", "trigger.heat": "अत्यधिक गर्मी", "trigger.curfew": "कर्फ्यू / हड़ताल", "trigger.flooding": "शहरी बाढ़",
  "prem.risk_score": "जोखिम स्कोर", "prem.zone_mult": "ज़ोन गुणक", "prem.season": "सीज़न", "prem.savings": "बचत",
  "settings.name": "नाम", "settings.phone": "फ़ोन", "settings.zone": "ज़ोन", "settings.platform": "प्लेटफ़ॉर्म", "settings.risk_tier": "जोखिम स्तर", "settings.kyc": "KYC", "settings.email": "ईमेल", "settings.hours": "समय"
});

Object.assign(TRANSLATIONS.kn, {
  "trust.1.title": "ಸ್ವಯಂಚಾಲಿತ ಪಾವತಿ", "trust.1.desc": "ಡ್ಯುಯಲ್-ಸಿಗ್ನಲ್ ಪರಿಶೀಲನೆ ಪಾವತಿ ಯಾವಾಗ ಸಾಗಬೇಕು ಎಂದು ನಿರ್ಧರಿಸುತ್ತದೆ",
  "trust.2.title": "ಕ್ಯಾಲಿಬ್ರೇಟ್ ಮಾಡಿದ ಪ್ರೈಸಿಂಗ್", "trust.2.desc": "ಅಪಾಯ ಮಾದರಿ ಬೆಂಗಳೂರಿನ ವ್ಯತ್ಯಯ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ಪ್ರೀಮಿಯಂ ನಿಗದಿಪಡಿಸುತ್ತದೆ",
  "trust.3.title": "ಡ್ಯುಯಲ್-ಟ್ರಿಗರ್ ದೃಢೀಕರಣ", "trust.3.desc": "ಪಾವತಿಗೆ ಮೊದಲು ಎರಡು ಸ್ವತಂತ್ರ ಸೂಚನೆಗಳು ಹೊಂದಬೇಕು",
  "step.register": "ನೋಂದಣಿ", "step.otp": "OTP ಪರಿಶೀಲನೆ", "step.kyc": "KYC", "step.quote": "ದರ", "step.upi": "UPI ಸೆಟಪ್",
  "reg.name": "ಪೂರ್ಣ ಹೆಸರು", "reg.phone": "ಫೋನ್ ಸಂಖ್ಯೆ", "reg.platform": "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್", "reg.zone": "ಝೋನ್", "reg.income": "ವಾರದ ಆದಾಯ (₹)", "reg.vehicle": "ವಾಹನ", "reg.submit": "ನೋಂದಣಿ ಮಾಡಿ OTP ಪಡೆಯಿರಿ", "reg.login_link": "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೆ? ಲಾಗಿನ್ ಮಾಡಿ",
  "login.title": "ಕಾರ್ಮಿಕ ಲಾಗಿನ್", "login.desc": "GigBuddy ಗೆ ಮತ್ತೆ ಸ್ವಾಗತ", "login.phone": "ಫೋನ್ ಸಂಖ್ಯೆ", "login.otp": "OTP", "login.hint": "ಡೆಮೊ ವರ್ಕರ್: Ravi Kumar, 9876543210, OTP 1234. ಇಲ್ಲವಾದರೆ OTP ಕೋರಬಹುದು.", "login.send_otp": "OTP ಕಳುಹಿಸಿ", "login.submit": "ಲಾಗಿನ್", "login.register_link": "ಹೊಸ ಕಾರ್ಮಿಕರಾ? ಇಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ",
  "consent.terms": "ನಾನು ಸೇವಾ ನಿಯಮಗಳಿಗೆ ಒಪ್ಪುತ್ತೇನೆ.", "consent.privacy": "ನಾನು ಗೌಪ್ಯತಾ ಸೂಚನೆ ಮತ್ತು ಸಹಾಯ ವಿವರಗಳನ್ನು ಓದಿದ್ದೇನೆ.", "consent.ai": "ಪ್ರೈಸಿಂಗ್ ಮತ್ತು ವಂಚನೆ ಪರಿಶೀಲನೆಗೆ ಸ್ವಯಂಚಾಲಿತ ಮಾದರಿಗಳನ್ನು ಬಳಸಬಹುದು ಎಂಬುದು ನನಗೆ ಅರ್ಥವಾಗಿದೆ.",
  "otp.desc": "ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಕಳುಹಿಸಿದ OTP ನಮೂದಿಸಿ", "otp.hint": "4 ಅಂಕೆಯ ಕೋಡ್ SMS ಮೂಲಕ ಕಳುಹಿಸಲಾಗಿದೆ.", "otp.resend": "OTP ಮರುಕಳುಹಿಸಿ",
  "kyc.title": "ಗುರುತು ಪರಿಶೀಲನೆ", "kyc.desc": "ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ಬ್ಯಾಕಪ್ ಜೊತೆಗೆ ಪೇಪರ್‌ಲೆಸ್ ಪರಿಶೀಲನೆ ಹರಿವು", "kyc.aadhaar": "ಆಧಾರ್ ಸಂಖ್ಯೆ",
  "quote.title": "ನಿಮ್ಮ ಅಪಾಯ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಪ್ರೀಮಿಯಂ", "quote.desc": "ಸ್ಥಳೀಯ ವ್ಯತ್ಯಯ ಸೂಚನೆಗಳ ಆಧಾರದ ಮೇಲೆ ಕ್ಯಾಲಿಬ್ರೇಟ್ ಮಾಡಿದ ಪ್ರೈಸಿಂಗ್", "quote.accept": "ಸ್ವೀಕರಿಸಿ ಮತ್ತು UPI ಸೆಟಪ್ ಮಾಡಿ",
  "upi.title": "UPI ಆಟೋಪೇ ಸೆಟಪ್", "upi.desc": "ವಾರದ ಸ್ವಯಂ ಪಾವತಿಯನ್ನು ಸೆಟಪ್ ಮಾಡಿ", "upi.id": "UPI ಐಡಿ", "upi.deduction": "ವಾರದ ಕಡಿತ", "upi.day": "ಕಡಿತ ದಿನ", "upi.lockin": "ಲಾಕ್-ಇನ್", "upi.none": "ಯಾವುದೂ ಇಲ್ಲ — ಯಾವಾಗ ಬೇಕಾದರೂ ನಿಲ್ಲಿಸಬಹುದು", "upi.complete": "ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಮುಗಿಸಿ ಪಾಲಿಸಿ ಖರೀದಿಸಿ",
  "success.desc": "ನಿಮ್ಮ ಪಾಲಿಸಿ ಈಗ ಸಕ್ರಿಯವಾಗಿದೆ. ನೀವು ರಕ್ಷಿತರಾಗಿದ್ದೀರಿ.", "dash.logout": "ಲಾಗ್ ಔಟ್", "dash.policy": "ಸಕ್ರಿಯ ಪಾಲಿಸಿ", "dash.weekly": "ವಾರದ ಪ್ರೀಮಿಯಂ", "dash.coverage": "ಕವರೆಜ್", "dash.weeks": "ಸಕ್ರಿಯ ವಾರಗಳು", "dash.paid": "ಒಟ್ಟು ಪಾವತಿ", "dash.claimed": "ಒಟ್ಟು ದಾವೆ ಪಾವತಿ", "dash.renew": "ಪುನರ್ನವೀಕರಣ", "dash.pause": "ವಿರಾಮ", "dash.zone_status": "ಲೈವ್ ಝೋನ್ ಸ್ಥಿತಿ", "dash.recent": "ಇತ್ತೀಚಿನ ದಾವೆಗಳು",
  "dash.chart_fin": "ಆರ್ಥಿಕ ಅವಲೋಕನ", "dash.chart_prot": "ರಕ್ಷಣಾ ಸಮತೋಲನ", "dash.chart_risk": "ಲೈವ್ ಅಪಾಯ", "dash.chart_radar": "ಝೋನ್ ಸಿಗ್ನಲ್ ರಡಾರ್", "dash.chart_perf": "ದಾವೆ ಕಾರ್ಯಕ್ಷಮತೆ", "dash.chart_trend": "ಪಾವತಿ ಧೋರಣೆ",
  "claims.desc": "ಟ್ರಿಗರ್ ಆಗುತ್ತಿದ್ದಂತೆ ದಾವೆಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರೊಸೆಸ್ ಆಗುತ್ತವೆ",
  "survey.intro": "ಸುಧಾರಣೆಗೆ ಸಹಾಯ ಮಾಡಿ — ನಿಮ್ಮ ಕೊನೆಯ ಪಾವತಿಯ ಬಗ್ಗೆ 3 ಚಿಕ್ಕ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ:", "survey.q1": "ನೀವು ನಿಮ್ಮ ಕೆಲಸದ ಪ್ರದೇಶದಲ್ಲಿ ಈ ವ್ಯತ್ಯಯ ಅನುಭವಿಸಿದ್ದೀರಾ?", "survey.yes": "ಹೌದು", "survey.no": "ಇಲ್ಲ", "survey.q2": "ಪಾವತಿ ಮೊತ್ತ ಉಪಯುಕ್ತವಾಗಿತ್ತೇ?", "survey.low": "ತುಂಬಾ ಕಡಿಮೆ", "survey.right": "ಸರಿಯಿತ್ತು", "survey.high": "ನಿರೀಕ್ಷೆಗಿಂತ ಹೆಚ್ಚು", "survey.submit": "ಸಲ್ಲಿಸಿ ಮತ್ತು ₹5 ಕ್ರೆಡಿಟ್ ಪಡೆಯಿರಿ",
  "prem.desc": "ಕ್ಯಾಲಿಬ್ರೇಟ್ ಮಾಡಿದ ಅಪಾಯ ಮಾದರಿ ಸಿಗ್ನಲ್ ತೀವ್ರತೆಯನ್ನು ವಾರದ ಪ್ರೀಮಿಯಂ ಆಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ", "prem.how": "ಪ್ರೈಸಿಂಗ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", "prem.landscape": "ಪ್ರೈಸಿಂಗ್ ಲ್ಯಾಂಡ್‌ಸ್ಕೇಪ್", "prem.zone_chart": "ಝೋನ್ ಪ್ರೀಮಿಯಂ ಹೋಲಿಕೆ", "prem.model": "ಮಾದರಿ", "prem.training": "ಪ್ರಶಿಕ್ಷಣ ಡೇಟಾ", "prem.features": "ಲಕ್ಷಣಗಳು", "prem.output": "ಔಟ್‌ಪುಟ್", "prem.retrain": "ಮರುಪ್ರಶಿಕ್ಷಣ",
  "settings.desc": "ಖಾತೆ ನಿಯಂತ್ರಣ, ಸಹಾಯ ಮತ್ತು ಡೇಟಾ ನಿರ್ವಹಣೆ", "settings.account": "ಖಾತೆ", "settings.support": "ಸಹಾಯ ಮತ್ತು ಮಾನವ ವಿಮರ್ಶೆ", "settings.legal": "ನಿಯಮಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ", "settings.legal_open": "ಕಾನೂನು ಸಾರಾಂಶ ತೆರೆಯಿರಿ", "settings.legal_text": "ಕಾರ್ಮಿಕರು ಆಪ್‌ನೊಳಗೆ ಪ್ರೈಸಿಂಗ್, ಪಾಲಿಸಿ ಸ್ಥಿತಿ, ದಾವೆ ಇತಿಹಾಸ ಮತ್ತು ಪಾವತಿ ನಿರ್ವಹಣೆಯನ್ನು ನೋಡಬಹುದು. ದಾವೆ ಗುರುತಿಸಲ್ಪಟ್ಟರೆ ಅಥವಾ ತಿರಸ್ಕರಿಸಿದರೆ, ಸಹಾಯ ತಂಡವು ಕೈಯಾರೆ ವಿಮರ್ಶೆ ಮಾಡಬಹುದು.", "settings.delete": "ಖಾತೆ ಅಳಿಸಿ", "settings.delete_desc": "ಇದು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿಯನ್ನು ಅಳಿಸುತ್ತದೆ. ಇದನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.", "settings.otp": "OTP ದೃಢೀಕರಣ", "settings.confirm": "ದೃಢೀಕರಿಸಲು DELETE ಟೈಪ್ ಮಾಡಿ", "settings.delete_btn": "ನನ್ನ ಖಾತೆ ಅಳಿಸಿ",
  "hero.evidence.1.kicker": "ರಿಯಲ್-ಟೈಮ್ ಪತ್ತೆ", "hero.evidence.1.title": "ಹವಾಮಾನ, AQI, ನೆರೆ ಮತ್ತು ಟ್ರಾಫಿಕ್ ಸೂಚನೆಗಳನ್ನು ನಿರಂತರವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.", "hero.evidence.1.desc": "ಪರಿಸರ ಮತ್ತು ವರ್ತನಾ ಸೂಚನೆಗಳು ಹೊಂದಿದಾಗ ಮಾತ್ರ ಪಾವತಿಗಳು ಟ್ರಿಗರ್ ಆಗುತ್ತವೆ.",
  "hero.evidence.2.kicker": "ಸ್ವಯಂ ಪಾವತಿಗಳು", "hero.evidence.2.title": "ಟ್ರಿಗರ್‌ನಿಂದ UPI ವರೆಗೆ ವೇಗವಾದ ಸ್ವಯಂ-ಅನುಮೋದಿತ ಹರಿವು.", "hero.evidence.2.desc": "ವಂಚನೆ ಅಂಕೆ, ಅನುಮೋದನೆ ಮತ್ತು ಪಾವತಿಗಳು ಸ್ವಚ್ಛ ಕಾರ್ಯಾಚರಣಾ ಹರಿವಿನಲ್ಲಿ ನಡೆಯುತ್ತವೆ.",
  "hero.evidence.3.kicker": "ಕಾರ್ಮಿಕ-ಮುಖ್ಯ ವಿನ್ಯಾಸ", "hero.evidence.3.title": "ಸಣ್ಣ ಹಂತಗಳು, ದೊಡ್ಡ ಟಚ್ ಟಾರ್ಗೆಟ್‌ಗಳು ಮತ್ತು ಬಹುಭಾಷಾ ಪ್ರತಿಗಳು.", "hero.evidence.3.desc": "ವೇಗವಾದ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವಿಕೆ, ದುರ್ಬಲ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ಕಡಿಮೆ ಘರ್ಷಣೆಯ ರಕ್ಷಣೆಗೆ ಅನುಗುಣವಾಗಿದೆ.",
  "demo.kicker": "2 ನಿಮಿಷದ ಡೆಮೋ ಪಥ",
  "demo.title": "GigBuddy ಏಕೆ ವಿಭಿನ್ನವಾಗಿದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಅತ್ಯಂತ ವೇಗವಾದ ಮಾರ್ಗ",
  "demo.desc": "ಕಾರ್ಮಿಕ ಹರಿವಿನಿಂದ ಪ್ರಾರಂಭಿಸಿ, ನಂತರ ವ್ಯತ್ಯಯ ಟ್ರಿಗರ್ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯಾ ಕ್ರೆಡಿಟ್‌ನೊಂದಿಗೆ ಲೂಪ್ ಮುಗಿಸಿ.",
  "demo.step1.title": "Ravi ಆಗಿ ಲಾಗಿನ್ ಮಾಡಿ",
  "demo.step1.desc": "9876543210 ಮತ್ತು 1234 ಬಳಸಿ ಸಕ್ರಿಯ ಪಾಲಿಸಿ, ದಾವೆ ಇತಿಹಾಸ ಮತ್ತು ಲೈವ್ ಝೋನ್ ಸ್ಥಿತಿ ತೆರೆಯಿರಿ.",
  "demo.step2.title": "ಪ್ರತಿಕ್ರಿಯೆ-ಕ್ರೆಡಿಟ್ ಲೂಪ್ ತೋರಿಸಿ",
  "demo.step2.desc": "Claims ತೆರೆದು, ಪಾವತಿಯ ನಂತರದ ಸಮೀಕ್ಷೆಯನ್ನು ಸಲ್ಲಿಸಿ ಗೋಚರಿಸುವ renewal credit ಅನ್ನು ಸೇರಿಸಿ.",
  "demo.step3.title": "ವ್ಯತ್ಯಯ ದೃಶ್ಯವನ್ನು ಚಾಲನೆ ಮಾಡಿ",
  "demo.step3.desc": "Admin ಗೆ ಬದಲಿಸಿ, ಭಾರೀ ಮಳೆ ಅಥವಾ ನೆರೆ ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ ಮತ್ತು ಟ್ರಿಗರ್ ಲಾಜಿಕ್ ದಾವೆಗಳನ್ನು ಹೇಗೆ ರಚಿಸುತ್ತದೆ ನೋಡಿ.",
  "demo.step4.title": "ಆಪ್ಸ್ ಸ್ಥಿತಿಯನ್ನು ವಿವರಿಸಿ",
  "demo.step4.desc": "green claims ವೇಗವಾಗಿ ಸಾಗುತ್ತವೆ, amber ಮತ್ತು red claims ಪರಿಶೀಲನೆಗೆ ಗೋಚರಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ತೋರಿಸಿ.",
  "section.driver_cockpit": "ಡ್ರೈವರ್ ಕಾಕ್ಪಿಟ್", "section.claims_timeline": "ದಾವೆ ಟೈಮ್‌ಲೈನ್", "section.pricing_intelligence": "ಪ್ರೈಸಿಂಗ್ ಇಂಟೆಲಿಜೆನ್ಸ್", "section.privacy_support": "ಗೌಪ್ಯತೆ ಮತ್ತು ಸಹಾಯ", "survey.badge": "ಪಾವತಿಯ ನಂತರದ ಸಮೀಕ್ಷೆ",
  "common.bengaluru": "ಬೆಂಗಳೂರು", "common.standard_plan": "ಸ್ಟಾಂಡರ್ಡ್ ಪ್ಲಾನ್", "common.standard": "ಸ್ಟಾಂಡರ್ಡ್", "common.active": "ಸಕ್ರಿಯ", "common.verified": "ಪರಿಶೀಲಿತ", "common.pending": "ಬಾಕಿ",
  "quote.detected_zone": "ಪತ್ತೆಯಾದ ಝೋನ್", "quote.period": "ವಾರಕ್ಕೊಮ್ಮೆ · ಸೋಮವಾರ 06:00ಕ್ಕೆ ಆಟೋ-ಡೆಬಿಟ್", "quote.model": "ಮಾದರಿ", "quote.risk_score": "ಅಪಾಯ ಅಂಕೆ", "quote.tier.high": "ಹೆಚ್ಚಿನ ಅಪಾಯ", "quote.tier.medium": "ಮಧ್ಯಮ", "quote.tier.low": "ಕಡಿಮೆ ಅಪಾಯ",
  "quote.period_day": "ಸೋಮವಾರ 06:00",
  "success.plan": "ಪ್ಲಾನ್", "success.weekly": "ವಾರದ ಪ್ರೀಮಿಯಂ", "success.coverage": "ಕವರೆಜ್", "success.status": "ಸ್ಥಿತಿ",
  "toast.thank_you_discount": "ಧನ್ಯವಾದಗಳು! ಮುಂದಿನ ನವೀಕರಣಕ್ಕೆ ₹5 ಕ್ರೆಡಿಟ್ ಸಿದ್ಧವಾಗಿದೆ.", "toast.fill_fields": "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ತುಂಬಿ", "toast.accept_consents": "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಒಪ್ಪಿಗೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ", "toast.sign_in_to": "{label} ಮಾಡಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.", "toast.enter_phone": "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ", "toast.otp_sent": "OTP ಕಳುಹಿಸಲಾಗಿದೆ", "toast.failed": "ವಿಫಲವಾಗಿದೆ", "toast.register_first": "ಮೊದಲು ನೋಂದಣಿ ಮಾಡಿ", "toast.otp_resent": "OTP ಮರುಕಳುಹಿಸಲಾಗಿದೆ", "toast.enter_phone_otp": "ಫೋನ್ ಮತ್ತು OTP ನಮೂದಿಸಿ", "toast.welcome_back": "ಮತ್ತೆ ಸ್ವಾಗತ!", "toast.enter_4digit_otp": "4 ಅಂಕೆಯ OTP ನಮೂದಿಸಿ", "toast.enter_12digit_aadhaar": "12 ಅಂಕೆಯ ಆಧಾರ್ ನಮೂದಿಸಿ", "toast.kyc_verified": "KYC ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.", "toast.enter_upi": "UPI ಐಡಿ ನಮೂದಿಸಿ", "toast.policy_activated": "ಪಾಲಿಸಿ ಸಕ್ರಿಯಗೊಂಡಿದೆ", "toast.session_ended": "ಸೆಷನ್ ಮುಕ್ತಾಯವಾಗಿದೆ", "toast.account_deleted": "ಖಾತೆ ಅಳಿಸಲಾಗಿದೆ.", "toast.enter_delete": "OTP ನಮೂದಿಸಿ ಮತ್ತು DELETE ಟೈಪ್ ಮಾಡಿ", "toast.policy_renewed": "ಪಾಲಿಸಿ ಇನ್ನೊಂದು ವಾರಕ್ಕೆ ನವೀಕರಿಸಲಾಗಿದೆ!", "toast.policy_paused": "ಪಾಲಿಸಿಯನ್ನು ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ. ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಮತ್ತೆ ಆರಂಭಿಸಬಹುದು.", "toast.enter_credentials": "ಕ್ರೆಡೆನ್ಶಿಯಲ್‌ಗಳನ್ನು ನಮೂದಿಸಿ", "toast.admin_session_started": "ಆಡ್ಮಿನ್ ಸೆಷನ್ ಆರಂಭವಾಗಿದೆ", "toast.claim_approved": "ದಾವೆ ಅಂಗೀಕರಿಸಲಾಗಿದೆ", "toast.claim_rejected": "ದಾವೆ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
  "otp.status.provider": "ಪ್ರೊವೈಡರ್", "otp.status.expires": "ಅವಧಿ", "otp.status.demo": "ಡೆಮೋ OTP", "ui.now": "ಈಗ", "ui.not_yet": "ಇನ್ನೂ ಇಲ್ಲ",
  "zone.rainfall": "ಮಳೆ", "zone.aqi": "AQI", "zone.temperature": "ತಾಪಮಾನ", "zone.traffic": "ಟ್ರಾಫಿಕ್", "zone.flood_level": "ನೀರಿನ ಮಟ್ಟ", "zone.level.normal": "ಸಾಮಾನ್ಯ", "zone.level.elevated": "ಏರಿಕೆ", "zone.level.critical": "ಗಂಭೀರ", "zone.live_telemetry": "ಲೈವ್ ಝೋನ್ ಟೆಲಿಮೆಟ್ರಿ",
  "claims.none": "ಇನ್ನೂ ಯಾವುದೇ ದಾವೆ ಇಲ್ಲ — ನೀವು ರಕ್ಷಿತರಾಗಿದ್ದೀರಿ!", "claims.fraud": "ವಂಚನೆ", "support.review_note": "ಮಾನವ ವಿಮರ್ಶೆ ಬೇಕೇ? {phone} ಅಥವಾ {email} ನಲ್ಲಿ ಸಹಾಯವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  "trigger.rainfall": "ಭಾರಿ ಮಳೆ", "trigger.aqi": "ಅಪಾಯಕಾರಿ AQI", "trigger.heat": "ತಿೀವ್ರ ಬಿಸಿ", "trigger.curfew": "ಕರ್ಫ್ಯೂ / ಮುಷ್ಕರ", "trigger.flooding": "ನಗರ ನೆರೆ",
  "prem.risk_score": "ಅಪಾಯ ಅಂಕೆ", "prem.zone_mult": "ಝೋನ್ ಮಲ್ಟಿಪ್ಲೈಯರ್", "prem.season": "ಸೀಸನ್", "prem.savings": "ಉಳಿತಾಯ",
  "settings.name": "ಹೆಸರು", "settings.phone": "ಫೋನ್", "settings.zone": "ಝೋನ್", "settings.platform": "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್", "settings.risk_tier": "ಅಪಾಯ ಮಟ್ಟ", "settings.kyc": "KYC", "settings.email": "ಇಮೇಲ್", "settings.hours": "ಸಮಯ"
});

Object.assign(TRANSLATIONS.en, {
  "common.yes": "Yes",
  "common.no": "No",
  "common.na": "N/A",
  "status.paid": "PAID",
  "status.auto_approved": "AUTO APPROVED",
  "status.pending_review": "PENDING REVIEW",
  "status.rejected": "REJECTED",
  "status.active": "ACTIVE",
  "chart.premium_paid": "Premium Paid",
  "chart.claims_paid": "Claims Paid",
  "chart.risk_pct": "Risk %",
  "chart.payout": "Payout",
  "chart.no_claims": "No claims",
  "zone.heat": "Heat",
  "zone.flood": "Flood",
  "admin.sign_in_title": "Admin Sign In",
  "admin.sign_in_desc": "Protected operations access",
  "admin.username": "Admin Username",
  "admin.password": "Password",
  "admin.sign_in_action": "Sign In to Admin Portal",
  "admin.section.operations": "Operations",
  "admin.tab.dashboard": "Dashboard",
  "admin.tab.policies": "Policies",
  "admin.tab.claims": "Claims Queue",
  "admin.tab.triggers": "Triggers",
  "admin.tab.analytics": "Analytics",
  "admin.mode": "Operational Mode",
  "admin.mode_value": "Operations Review",
  "admin.logout": "Logout",
  "admin.header.kicker": "Operations",
  "admin.header.title": "Operations & Disruption Command Center",
  "admin.header.desc": "Live pricing, fraud posture, feedback credits, and zone disruption monitoring across Bengaluru.",
  "admin.meta.environment": "Environment",
  "admin.meta.environment_value": "Demo runtime + public feeds",
  "admin.meta.session": "Session",
  "admin.meta.session_value": "Ops reviewer",
  "admin.dashboard.claim_pipeline": "Claim Pipeline",
  "admin.dashboard.pipeline_mix": "Pipeline Mix",
  "admin.dashboard.zone_pricing": "Zone Pricing",
  "admin.dashboard.zone_premium_comp": "Zone Premium Comparison",
  "admin.dashboard.operations": "Operations",
  "admin.dashboard.daily_ops": "Daily Claims, Triggers & Payouts",
  "admin.dashboard.live_map": "Live Zone Trigger Map",
  "admin.dashboard.decision_logic": "Decision logic",
  "admin.dashboard.autopilot_posture": "Autopilot approval posture",
  "admin.dashboard.system_readiness": "System Readiness",
  "admin.dashboard.providers_jobs": "Providers & Background Jobs",
  "admin.decision.1": "Coverage is validated against an active weekly policy before release.",
  "admin.decision.2": "Dual-trigger confirmation is required before claim creation proceeds.",
  "admin.decision.3": "AMBER claims are held for review, while GREEN claims move to payout immediately.",
  "admin.decision.4": "Payout references, survey credits, and runtime signals stay visible to operations.",
  "admin.policies.kicker": "Policy inventory",
  "admin.policies.title": "All Policies",
  "admin.claims.kicker": "Fraud workflow",
  "admin.claims.title": "Claims Review Queue",
  "admin.claims.desc": "Review AMBER and RED tier claims requiring manual verification",
  "admin.claims.all": "All Claims",
  "admin.triggers.kicker": "Parametric controls",
  "admin.triggers.title": "Trigger Control Center",
  "admin.triggers.desc": "Run a visible disruption scenario to demonstrate the payout pipeline",
  "admin.triggers.simulate_title": "Simulate a Trigger Event",
  "admin.triggers.config_title": "Trigger Configuration — Dual-Signal Thresholds",
  "admin.triggers.history_title": "Trigger History",
  "admin.analytics.kicker": "Portfolio intelligence",
  "admin.analytics.title": "Analytics",
  "admin.analytics.pricing": "Pricing",
  "admin.analytics.premium_vs_risk": "Premium vs Risk Score",
  "admin.analytics.workforce": "Workforce",
  "admin.analytics.workers_by_zone": "Workers by Zone",
  "admin.analytics.triggers": "Triggers",
  "admin.analytics.trigger_freq": "Trigger Frequency",
  "admin.analytics.fraud": "Fraud",
  "admin.analytics.fraud_tiers": "Fraud Tier Distribution",
  "admin.analytics.activity": "Activity",
  "admin.analytics.timeline": "7-Day Activity Timeline",
  "admin.analytics.heatmap": "Heatmap",
  "admin.analytics.pressure": "Operational Pressure by Zone",
  "admin.analytics.runtime": "Runtime",
  "admin.analytics.runtime_status": "Integration & Job Status",
  "admin.kpi.total_workers": "Total Workers",
  "admin.kpi.active_policies": "Active Policies",
  "admin.kpi.total_claims": "Total Claims",
  "admin.kpi.total_payouts": "Total Payouts",
  "admin.kpi.active_triggers": "Active Triggers",
  "admin.kpi.active_platform": "Active platform",
  "admin.kpi.zones_covered": "{count} zones covered",
  "admin.kpi.pending": "{count} pending",
  "admin.kpi.completed": "{count} completed",
  "admin.kpi.loss_ratio": "Loss ratio {value}%",
  "admin.button.approve": "Approve",
  "admin.button.reject": "Reject",
  "admin.readiness.empty": "No readiness data.",
  "admin.claims_queue.empty": "No claims pending review.",
  "admin.zone.empty": "No zone data.",
  "admin.trigger.history.empty": "No triggers fired yet.",
  "admin.table.id": "ID",
  "admin.table.worker": "Worker",
  "admin.table.zone": "Zone",
  "admin.table.premium": "Premium",
  "admin.table.coverage": "Coverage",
  "admin.table.status": "Status",
  "admin.table.weeks": "Weeks",
  "admin.table.trigger": "Trigger",
  "admin.table.amount": "Amount",
  "admin.table.fraud": "Fraud",
  "admin.table.date": "Date",
  "admin.table.type": "Type",
  "admin.table.severity": "Severity",
  "admin.table.description": "Description",
  "admin.table.fired_at": "Fired At",
  "trigger.simulate_action": "Run Trigger Simulation",
  "trigger.simulate_running": "Running...",
  "trigger.result.fired": "Trigger Fired",
  "trigger.result.not_met": "Trigger Not Met",
  "trigger.result.zone": "Zone",
  "trigger.result.type": "Type",
  "trigger.result.severity": "Severity",
  "trigger.result.payout": "Payout",
  "trigger.result.primary": "Primary",
  "trigger.result.secondary": "Secondary",
  "trigger.result.claims_processed": "Claims Processed",
  "trigger.description.default": "Signal threshold met",
  "trigger.push.body": "Severity: {severity}. Claims are being processed for affected workers.",
  "readiness.provider": "Provider",
  "readiness.configured": "Configured",
  "readiness.enabled": "Enabled",
  "readiness.last": "Last",
  "admin.metric.workers": "Workers",
  "admin.metric.triggers": "Triggers",
  "admin.metric.claims": "Claims",
  "toast.admin_session_ended": "Admin session ended"
});

Object.assign(TRANSLATIONS.hi, {
  "common.yes": "हाँ",
  "common.no": "नहीं",
  "common.na": "उपलब्ध नहीं",
  "status.paid": "भुगतान हुआ",
  "status.auto_approved": "स्वतः स्वीकृत",
  "status.pending_review": "समीक्षा लंबित",
  "status.rejected": "अस्वीकृत",
  "status.active": "सक्रिय",
  "chart.premium_paid": "भुगतान किया प्रीमियम",
  "chart.claims_paid": "दावा भुगतान",
  "chart.risk_pct": "जोखिम %",
  "chart.payout": "भुगतान",
  "chart.no_claims": "कोई दावा नहीं",
  "zone.heat": "गर्मी",
  "zone.flood": "बाढ़",
  "admin.sign_in_title": "एडमिन साइन इन",
  "admin.sign_in_desc": "सुरक्षित संचालन प्रवेश",
  "admin.username": "एडमिन यूज़रनेम",
  "admin.password": "पासवर्ड",
  "admin.sign_in_action": "एडमिन पोर्टल में साइन इन करें",
  "admin.section.operations": "संचालन",
  "admin.tab.dashboard": "डैशबोर्ड",
  "admin.tab.policies": "पॉलिसियाँ",
  "admin.tab.claims": "दावा कतार",
  "admin.tab.triggers": "ट्रिगर्स",
  "admin.tab.analytics": "एनालिटिक्स",
  "admin.mode": "ऑपरेशनल मोड",
  "admin.mode_value": "ऑपरेशंस रिव्यू",
  "admin.logout": "लॉगआउट",
  "admin.header.kicker": "संचालन",
  "admin.header.title": "ऑपरेशंस और डिसरप्शन कमांड सेंटर",
  "admin.header.desc": "बेंगलुरु में लाइव प्राइसिंग, फ्रॉड स्थिति, फीडबैक क्रेडिट और ज़ोन व्यवधान निगरानी।",
  "admin.meta.environment": "पर्यावरण",
  "admin.meta.environment_value": "डेमो रनटाइम + पब्लिक फीड्स",
  "admin.meta.session": "सेशन",
  "admin.meta.session_value": "ऑप्स रिव्यूअर",
  "admin.dashboard.claim_pipeline": "दावा पाइपलाइन",
  "admin.dashboard.pipeline_mix": "पाइपलाइन मिश्रण",
  "admin.dashboard.zone_pricing": "ज़ोन प्राइसिंग",
  "admin.dashboard.zone_premium_comp": "ज़ोन प्रीमियम तुलना",
  "admin.dashboard.operations": "संचालन",
  "admin.dashboard.daily_ops": "दैनिक दावे, ट्रिगर और भुगतान",
  "admin.dashboard.live_map": "लाइव ज़ोन ट्रिगर मैप",
  "admin.dashboard.decision_logic": "निर्णय लॉजिक",
  "admin.dashboard.autopilot_posture": "ऑटोपायलट अनुमोदन स्थिति",
  "admin.dashboard.system_readiness": "सिस्टम तैयारी",
  "admin.dashboard.providers_jobs": "प्रदाता और बैकग्राउंड जॉब्स",
  "admin.decision.1": "रिलीज़ से पहले कवरेज सक्रिय साप्ताहिक पॉलिसी से सत्यापित होती है।",
  "admin.decision.2": "दावा बनने से पहले ड्यूल-ट्रिगर पुष्टि आवश्यक है।",
  "admin.decision.3": "AMBER दावे समीक्षा के लिए रोके जाते हैं, जबकि GREEN दावे तुरंत भुगतान की ओर बढ़ते हैं।",
  "admin.decision.4": "भुगतान संदर्भ, सर्वे क्रेडिट और रनटाइम संकेत संचालन टीम को दिखाई देते हैं।",
  "admin.policies.kicker": "पॉलिसी सूची",
  "admin.policies.title": "सभी पॉलिसियाँ",
  "admin.claims.kicker": "फ्रॉड वर्कफ़्लो",
  "admin.claims.title": "दावा समीक्षा कतार",
  "admin.claims.desc": "मैन्युअल सत्यापन वाले AMBER और RED दावों की समीक्षा करें",
  "admin.claims.all": "सभी दावे",
  "admin.triggers.kicker": "पैरामेट्रिक कंट्रोल",
  "admin.triggers.title": "ट्रिगर कंट्रोल सेंटर",
  "admin.triggers.desc": "दिखने वाला व्यवधान परिदृश्य चलाकर भुगतान पाइपलाइन दिखाएँ",
  "admin.triggers.simulate_title": "ट्रिगर इवेंट सिमुलेट करें",
  "admin.triggers.config_title": "ट्रिगर कॉन्फ़िगरेशन — ड्यूल-सिग्नल थ्रेशोल्ड",
  "admin.triggers.history_title": "ट्रिगर इतिहास",
  "admin.analytics.kicker": "पोर्टफोलियो इंटेलिजेंस",
  "admin.analytics.title": "एनालिटिक्स",
  "admin.analytics.pricing": "प्राइसिंग",
  "admin.analytics.premium_vs_risk": "प्रीमियम बनाम जोखिम स्कोर",
  "admin.analytics.workforce": "वर्कफ़ोर्स",
  "admin.analytics.workers_by_zone": "ज़ोन अनुसार कर्मचारी",
  "admin.analytics.triggers": "ट्रिगर्स",
  "admin.analytics.trigger_freq": "ट्रिगर आवृत्ति",
  "admin.analytics.fraud": "फ्रॉड",
  "admin.analytics.fraud_tiers": "फ्रॉड स्तर वितरण",
  "admin.analytics.activity": "गतिविधि",
  "admin.analytics.timeline": "7-दिवसीय गतिविधि टाइमलाइन",
  "admin.analytics.heatmap": "हीटमैप",
  "admin.analytics.pressure": "ज़ोन अनुसार ऑपरेशनल दबाव",
  "admin.analytics.runtime": "रनटाइम",
  "admin.analytics.runtime_status": "इंटीग्रेशन और जॉब स्थिति",
  "admin.kpi.total_workers": "कुल कर्मचारी",
  "admin.kpi.active_policies": "सक्रिय पॉलिसियाँ",
  "admin.kpi.total_claims": "कुल दावे",
  "admin.kpi.total_payouts": "कुल भुगतान",
  "admin.kpi.active_triggers": "सक्रिय ट्रिगर्स",
  "admin.kpi.active_platform": "सक्रिय प्लेटफ़ॉर्म",
  "admin.kpi.zones_covered": "{count} ज़ोन कवर",
  "admin.kpi.pending": "{count} लंबित",
  "admin.kpi.completed": "{count} पूर्ण",
  "admin.kpi.loss_ratio": "लॉस रेशियो {value}%",
  "admin.button.approve": "स्वीकृत करें",
  "admin.button.reject": "अस्वीकृत करें",
  "admin.readiness.empty": "कोई तैयारी डेटा नहीं।",
  "admin.claims_queue.empty": "समीक्षा हेतु कोई दावा लंबित नहीं।",
  "admin.zone.empty": "कोई ज़ोन डेटा नहीं।",
  "admin.trigger.history.empty": "अभी तक कोई ट्रिगर नहीं चला।",
  "admin.table.id": "आईडी",
  "admin.table.worker": "कर्मचारी",
  "admin.table.zone": "ज़ोन",
  "admin.table.premium": "प्रीमियम",
  "admin.table.coverage": "कवरेज",
  "admin.table.status": "स्थिति",
  "admin.table.weeks": "सप्ताह",
  "admin.table.trigger": "ट्रिगर",
  "admin.table.amount": "राशि",
  "admin.table.fraud": "फ्रॉड",
  "admin.table.date": "तारीख",
  "admin.table.type": "प्रकार",
  "admin.table.severity": "गंभीरता",
  "admin.table.description": "विवरण",
  "admin.table.fired_at": "फायर समय",
  "trigger.simulate_action": "ट्रिगर सिमुलेशन चलाएँ",
  "trigger.simulate_running": "चल रहा है...",
  "trigger.result.fired": "ट्रिगर चला",
  "trigger.result.not_met": "ट्रिगर नहीं मिला",
  "trigger.result.zone": "ज़ोन",
  "trigger.result.type": "प्रकार",
  "trigger.result.severity": "गंभीरता",
  "trigger.result.payout": "भुगतान",
  "trigger.result.primary": "प्राइमरी",
  "trigger.result.secondary": "सेकेंडरी",
  "trigger.result.claims_processed": "प्रोसेस किए गए दावे",
  "trigger.description.default": "सिग्नल थ्रेशोल्ड पूरा हुआ",
  "trigger.push.body": "गंभीरता: {severity}. प्रभावित कर्मचारियों के लिए दावे प्रोसेस हो रहे हैं।",
  "readiness.provider": "प्रदाता",
  "readiness.configured": "कॉन्फ़िगर",
  "readiness.enabled": "सक्रिय",
  "readiness.last": "अंतिम",
  "admin.metric.workers": "कर्मचारी",
  "admin.metric.triggers": "ट्रिगर्स",
  "admin.metric.claims": "दावे",
  "toast.admin_session_ended": "एडमिन सत्र समाप्त"
});

Object.assign(TRANSLATIONS.kn, {
  "common.yes": "ಹೌದು",
  "common.no": "ಇಲ್ಲ",
  "common.na": "ಲಭ್ಯವಿಲ್ಲ",
  "status.paid": "ಪಾವತಿಸಲಾಗಿದೆ",
  "status.auto_approved": "ಸ್ವಯಂ ಅನುಮೋದಿತ",
  "status.pending_review": "ವಿಮರ್ಶೆ ಬಾಕಿ",
  "status.rejected": "ತಿರಸ್ಕೃತ",
  "status.active": "ಸಕ್ರಿಯ",
  "chart.premium_paid": "ಪಾವತಿಸಿದ ಪ್ರೀಮಿಯಂ",
  "chart.claims_paid": "ದಾವೆ ಪಾವತಿಗಳು",
  "chart.risk_pct": "ಅಪಾಯ %",
  "chart.payout": "ಪಾವತಿ",
  "chart.no_claims": "ಯಾವುದೇ ದಾವೆ ಇಲ್ಲ",
  "zone.heat": "ಬಿಸಿ",
  "zone.flood": "ನೆರೆ",
  "admin.sign_in_title": "ಆಡ್ಮಿನ್ ಸೈನ್ ಇನ್",
  "admin.sign_in_desc": "ರಕ್ಷಿತ ಕಾರ್ಯಾಚರಣೆ ಪ್ರವೇಶ",
  "admin.username": "ಆಡ್ಮಿನ್ ಬಳಕೆದಾರ ಹೆಸರು",
  "admin.password": "ಪಾಸ್ವರ್ಡ್",
  "admin.sign_in_action": "ಆಡ್ಮಿನ್ ಪೋರ್ಟಲ್‌ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
  "admin.section.operations": "ಕಾರ್ಯಾಚರಣೆಗಳು",
  "admin.tab.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "admin.tab.policies": "ಪಾಲಿಸಿಗಳು",
  "admin.tab.claims": "ದಾವೆ ಸರದಿ",
  "admin.tab.triggers": "ಟ್ರಿಗರ್‌ಗಳು",
  "admin.tab.analytics": "ವಿಶ್ಲೇಷಣೆ",
  "admin.mode": "ಆಪರೇಷನಲ್ ಮೋಡ್",
  "admin.mode_value": "ಆಪರೇಷನ್ಸ್ ರಿವ್ಯೂ",
  "admin.logout": "ಲಾಗ್ ಔಟ್",
  "admin.header.kicker": "ಕಾರ್ಯಾಚರಣೆಗಳು",
  "admin.header.title": "ಆಪರೇಷನ್ಸ್ ಮತ್ತು ವ್ಯತ್ಯಯ ಕಮಾಂಡ್ ಸೆಂಟರ್",
  "admin.header.desc": "ಬೆಂಗಳೂರುದಾದ್ಯಂತ ಲೈವ್ ಪ್ರೈಸಿಂಗ್, ವಂಚನೆ ಸ್ಥಿತಿ, ಸಮೀಕ್ಷಾ ಕ್ರೆಡಿಟ್ ಮತ್ತು ಝೋನ್ ವ್ಯತ್ಯಯ ಮೇಲ್ವಿಚಾರಣೆ.",
  "admin.meta.environment": "ಪರಿಸರ",
  "admin.meta.environment_value": "ಡೆಮೊ ರನ್‌ಟೈಮ್ + ಪಬ್ಲಿಕ್ ಫೀಡ್ಸ್",
  "admin.meta.session": "ಸೆಷನ್",
  "admin.meta.session_value": "ಆಪ್ಸ್ ವಿಮರ್ಶಕ",
  "admin.dashboard.claim_pipeline": "ದಾವೆ ಪೈಪ್‌ಲೈನ್",
  "admin.dashboard.pipeline_mix": "ಪೈಪ್‌ಲೈನ್ ಮಿಶ್ರಣ",
  "admin.dashboard.zone_pricing": "ಝೋನ್ ಪ್ರೈಸಿಂಗ್",
  "admin.dashboard.zone_premium_comp": "ಝೋನ್ ಪ್ರೀಮಿಯಂ ಹೋಲಿಕೆ",
  "admin.dashboard.operations": "ಕಾರ್ಯಾಚರಣೆಗಳು",
  "admin.dashboard.daily_ops": "ದೈನಂದಿನ ದಾವೆಗಳು, ಟ್ರಿಗರ್‌ಗಳು ಮತ್ತು ಪಾವತಿಗಳು",
  "admin.dashboard.live_map": "ಲೈವ್ ಝೋನ್ ಟ್ರಿಗರ್ ನಕ್ಷೆ",
  "admin.dashboard.decision_logic": "ನಿರ್ಧಾರ ತರ್ಕ",
  "admin.dashboard.autopilot_posture": "ಆಟೋಪೈಲಟ್ ಅನುಮೋದನೆ ಸ್ಥಿತಿ",
  "admin.dashboard.system_readiness": "ವ್ಯವಸ್ಥೆ ಸಿದ್ಧತೆ",
  "admin.dashboard.providers_jobs": "ಪ್ರೊವೈಡರ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್ ಕೆಲಸಗಳು",
  "admin.decision.1": "ಪಾವತಿಯ ಮೊದಲು ಕವರೆಜ್ ಸಕ್ರಿಯ ವಾರದ ಪಾಲಿಸಿಗೆ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.",
  "admin.decision.2": "ದಾವೆ ಸೃಷ್ಟಿಗೆ ಮುನ್ನ ಡ್ಯುಯಲ್-ಟ್ರಿಗರ್ ದೃಢೀಕರಣ ಅಗತ್ಯ.",
  "admin.decision.3": "AMBER ದಾವೆಗಳನ್ನು ವಿಮರ್ಶೆಗೆ ಹಿಡಿಯಲಾಗುತ್ತದೆ, GREEN ದಾವೆಗಳು ತಕ್ಷಣ ಪಾವತಿಗೆ ಸಾಗುತ್ತವೆ.",
  "admin.decision.4": "ಪಾವತಿ ಉಲ್ಲೇಖಗಳು, ಸಮೀಕ್ಷಾ ಕ್ರೆಡಿಟ್ ಮತ್ತು ರನ್‌ಟೈಮ್ ಸಿಗ್ನಲ್‌ಗಳು ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಗೋಚರಿಸುತ್ತವೆ.",
  "admin.policies.kicker": "ಪಾಲಿಸಿ ಪಟ್ಟೆ",
  "admin.policies.title": "ಎಲ್ಲಾ ಪಾಲಿಸಿಗಳು",
  "admin.claims.kicker": "ವಂಚನೆ ವರ್ಕ್‌ಫ್ಲೋ",
  "admin.claims.title": "ದಾವೆ ವಿಮರ್ಶಾ ಸರದಿ",
  "admin.claims.desc": "ಕೈಯಾರೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿರುವ AMBER ಮತ್ತು RED ದಾವೆಗಳನ್ನು ವಿಮರ್ಶಿಸಿ",
  "admin.claims.all": "ಎಲ್ಲಾ ದಾವೆಗಳು",
  "admin.triggers.kicker": "ಪ್ಯಾರಮೆಟ್ರಿಕ್ ನಿಯಂತ್ರಣಗಳು",
  "admin.triggers.title": "ಟ್ರಿಗರ್ ಕಂಟ್ರೋಲ್ ಸೆಂಟರ್",
  "admin.triggers.desc": "ಗೋಚರಿಸುವ ವ್ಯತ್ಯಯ ದೃಶ್ಯವನ್ನು ಚಾಲನೆ ಮಾಡಿ ಪಾವತಿ ಪೈಪ್‌ಲೈನ್ ತೋರಿಸಿ",
  "admin.triggers.simulate_title": "ಟ್ರಿಗರ್ ಘಟನೆ ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ",
  "admin.triggers.config_title": "ಟ್ರಿಗರ್ ಸಂರಚನೆ — ಡ್ಯುಯಲ್-ಸಿಗ್ನಲ್ ಥ್ರೆಶ್‌ಹೋಲ್ಡ್‌ಗಳು",
  "admin.triggers.history_title": "ಟ್ರಿಗರ್ ಇತಿಹಾಸ",
  "admin.analytics.kicker": "ಪೋರ್ಟ್‌ಫೋಲಿಯೋ ಇಂಟೆಲಿಜೆನ್ಸ್",
  "admin.analytics.title": "ವಿಶ್ಲೇಷಣೆ",
  "admin.analytics.pricing": "ಪ್ರೈಸಿಂಗ್",
  "admin.analytics.premium_vs_risk": "ಪ್ರೀಮಿಯಂ ವಿರುದ್ಧ ಅಪಾಯ ಅಂಕೆ",
  "admin.analytics.workforce": "ವರ್ಕ್‌ಫೋರ್ಸ್",
  "admin.analytics.workers_by_zone": "ಝೋನ್ ಪ್ರಕಾರ ಕಾರ್ಮಿಕರು",
  "admin.analytics.triggers": "ಟ್ರಿಗರ್‌ಗಳು",
  "admin.analytics.trigger_freq": "ಟ್ರಿಗರ್ ಆವೃತ್ತಿ",
  "admin.analytics.fraud": "ವಂಚನೆ",
  "admin.analytics.fraud_tiers": "ವಂಚನೆ ಮಟ್ಟ ವಿತರಣೆ",
  "admin.analytics.activity": "ಚಟುವಟಿಕೆ",
  "admin.analytics.timeline": "7 ದಿನಗಳ ಚಟುವಟಿಕೆ ಟೈಮ್‌ಲೈನ್",
  "admin.analytics.heatmap": "ಹೀಟ್‌ಮ್ಯಾಪ್",
  "admin.analytics.pressure": "ಝೋನ್ ಪ್ರಕಾರ ಕಾರ್ಯಾಚರಣಾ ಒತ್ತಡ",
  "admin.analytics.runtime": "ರನ್‌ಟೈಮ್",
  "admin.analytics.runtime_status": "ಇಂಟಿಗ್ರೇಷನ್ ಮತ್ತು ಕೆಲಸದ ಸ್ಥಿತಿ",
  "admin.kpi.total_workers": "ಒಟ್ಟು ಕಾರ್ಮಿಕರು",
  "admin.kpi.active_policies": "ಸಕ್ರಿಯ ಪಾಲಿಸಿಗಳು",
  "admin.kpi.total_claims": "ಒಟ್ಟು ದಾವೆಗಳು",
  "admin.kpi.total_payouts": "ಒಟ್ಟು ಪಾವತಿಗಳು",
  "admin.kpi.active_triggers": "ಸಕ್ರಿಯ ಟ್ರಿಗರ್‌ಗಳು",
  "admin.kpi.active_platform": "ಸಕ್ರಿಯ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
  "admin.kpi.zones_covered": "{count} ಝೋನ್‌ಗಳು ಒಳಗೊಂಡಿವೆ",
  "admin.kpi.pending": "{count} ಬಾಕಿ",
  "admin.kpi.completed": "{count} ಪೂರ್ಣ",
  "admin.kpi.loss_ratio": "ನಷ್ಟ ಅನುಪಾತ {value}%",
  "admin.button.approve": "ಅನುಮೋದಿಸಿ",
  "admin.button.reject": "ತಿರಸ್ಕರಿಸಿ",
  "admin.readiness.empty": "ಯಾವುದೇ ಸಿದ್ಧತೆ ಡೇಟಾ ಇಲ್ಲ.",
  "admin.claims_queue.empty": "ವಿಮರ್ಶೆಗೆ ಯಾವುದೇ ದಾವೆಗಳು ಇಲ್ಲ.",
  "admin.zone.empty": "ಝೋನ್ ಡೇಟಾ ಇಲ್ಲ.",
  "admin.trigger.history.empty": "ಇನ್ನೂ ಯಾವುದೇ ಟ್ರಿಗರ್ ಆಗಿಲ್ಲ.",
  "admin.table.id": "ಐಡಿ",
  "admin.table.worker": "ಕಾರ್ಮಿಕ",
  "admin.table.zone": "ಝೋನ್",
  "admin.table.premium": "ಪ್ರೀಮಿಯಂ",
  "admin.table.coverage": "ಕವರೆಜ್",
  "admin.table.status": "ಸ್ಥಿತಿ",
  "admin.table.weeks": "ವಾರಗಳು",
  "admin.table.trigger": "ಟ್ರಿಗರ್",
  "admin.table.amount": "ಮೊತ್ತ",
  "admin.table.fraud": "ವಂಚನೆ",
  "admin.table.date": "ದಿನಾಂಕ",
  "admin.table.type": "ಪ್ರಕಾರ",
  "admin.table.severity": "ತೀವ್ರತೆ",
  "admin.table.description": "ವಿವರಣೆ",
  "admin.table.fired_at": "ಆರಂಭವಾದ ಸಮಯ",
  "trigger.simulate_action": "ಟ್ರಿಗರ್ ಸಿಮ್ಯುಲೇಶನ್ ಓಡಿಸಿ",
  "trigger.simulate_running": "ಚಾಲನೆಯಲ್ಲಿದೆ...",
  "trigger.result.fired": "ಟ್ರಿಗರ್ ಸಕ್ರಿಯಗೊಂಡಿದೆ",
  "trigger.result.not_met": "ಟ್ರಿಗರ್ ತಲುಪಿಲ್ಲ",
  "trigger.result.zone": "ಝೋನ್",
  "trigger.result.type": "ಪ್ರಕಾರ",
  "trigger.result.severity": "ತೀವ್ರತೆ",
  "trigger.result.payout": "ಪಾವತಿ",
  "trigger.result.primary": "ಪ್ರಾಥಮಿಕ",
  "trigger.result.secondary": "ದ್ವಿತೀಯ",
  "trigger.result.claims_processed": "ಪ್ರಕ್ರಿಯೆಯಾದ ದಾವೆಗಳು",
  "trigger.description.default": "ಸಿಗ್ನಲ್ ಮಿತಿ ತಲುಪಿದೆ",
  "trigger.push.body": "ತೀವ್ರತೆ: {severity}. ಪ್ರಭಾವಿತ ಕಾರ್ಮಿಕರ ದಾವೆಗಳು ಪ್ರಕ್ರಿಯೆಯಾಗುತ್ತಿವೆ.",
  "readiness.provider": "ಪ್ರೊವೈಡರ್",
  "readiness.configured": "ಸಂರಚಿಸಲಾಗಿದೆ",
  "readiness.enabled": "ಸಕ್ರಿಯ",
  "readiness.last": "ಕೊನೆಯದು",
  "admin.metric.workers": "ಕಾರ್ಮಿಕರು",
  "admin.metric.triggers": "ಟ್ರಿಗರ್‌ಗಳು",
  "admin.metric.claims": "ದಾವೆಗಳು",
  "toast.admin_session_ended": "ಆಡ್ಮಿನ್ ಸೆಷನ್ ಮುಕ್ತಾಯವಾಗಿದೆ"
});

Object.assign(TRANSLATIONS.en, {
  "admin.zone.live_loading": "Live feeds loading",
  "admin.zone.updated": "Updated {time}",
  "admin.zone.monitored": "Zones monitored",
  "admin.zone.live_feeds": "Live feeds",
  "admin.zone.critical_now": "Critical now",
  "admin.zone.workers_watch": "Workers watched",
  "admin.zone.workers": "Workers",
  "admin.zone.policies": "Policies",
  "admin.zone.claims": "Claims",
  "admin.zone.delay": "Delay",
  "admin.zone.rainfall": "Rainfall",
  "admin.zone.active_triggers": "Active triggers",
  "admin.zone.no_trigger": "No dual-trigger match right now",
  "admin.zone.live": "LIVE",
  "admin.zone.simulated": "SIMULATED",
  "admin.zone.feed": "Feed",
  "admin.zone.risk": "Risk",
  "admin.zone.flood": "Flood",
  "admin.zone.aqi": "AQI"
});

Object.assign(TRANSLATIONS.hi, {
  "admin.zone.live_loading": "लाइव फ़ीड लोड हो रहे हैं",
  "admin.zone.updated": "{time} पर अपडेट",
  "admin.zone.monitored": "मॉनिटर किए गए ज़ोन",
  "admin.zone.live_feeds": "लाइव फ़ीड",
  "admin.zone.critical_now": "अभी क्रिटिकल",
  "admin.zone.workers_watch": "निगरानी में कर्मचारी",
  "admin.zone.workers": "कर्मचारी",
  "admin.zone.policies": "पॉलिसियाँ",
  "admin.zone.claims": "दावे",
  "admin.zone.delay": "विलंब",
  "admin.zone.rainfall": "वर्षा",
  "admin.zone.active_triggers": "सक्रिय ट्रिगर्स",
  "admin.zone.no_trigger": "अभी कोई ड्यूल-ट्रिगर मैच नहीं",
  "admin.zone.live": "लाइव",
  "admin.zone.simulated": "सिम्युलेटेड",
  "admin.zone.feed": "फ़ीड",
  "admin.zone.risk": "जोखिम",
  "admin.zone.flood": "बाढ़",
  "admin.zone.aqi": "AQI"
});

Object.assign(TRANSLATIONS.kn, {
  "admin.zone.live_loading": "ಲೈವ್ ಫೀಡ್‌ಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ",
  "admin.zone.updated": "{time} ಅಪ್ಡೇಟ್",
  "admin.zone.monitored": "ಮಾನಿಟರ್ ಮಾಡಿದ ಝೋನ್‌ಗಳು",
  "admin.zone.live_feeds": "ಲೈವ್ ಫೀಡ್‌ಗಳು",
  "admin.zone.critical_now": "ಈಗ ಕ್ರಿಟಿಕಲ್",
  "admin.zone.workers_watch": "ನಿಗಾದಲ್ಲಿರುವ ಕಾರ್ಮಿಕರು",
  "admin.zone.workers": "ಕಾರ್ಮಿಕರು",
  "admin.zone.policies": "ಪಾಲಿಸಿಗಳು",
  "admin.zone.claims": "ದಾವೆಗಳು",
  "admin.zone.delay": "ವಿಳಂಬ",
  "admin.zone.rainfall": "ಮಳೆ",
  "admin.zone.active_triggers": "ಸಕ್ರಿಯ ಟ್ರಿಗರ್‌ಗಳು",
  "admin.zone.no_trigger": "ಈಗ ಯಾವುದೇ ಡ್ಯುಯಲ್-ಟ್ರಿಗರ್ ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ",
  "admin.zone.live": "ಲೈವ್",
  "admin.zone.simulated": "ಸಿಮ್ಯುಲೇಟೆಡ್",
  "admin.zone.feed": "ಫೀಡ್",
  "admin.zone.risk": "ಅಪಾಯ",
  "admin.zone.flood": "ನೆರೆ",
  "admin.zone.aqi": "AQI"
});

Object.assign(TRANSLATIONS.en, {
  "dash.zone_status_desc": "Each signal shows how close your zone is to a payout trigger right now.",
  "dash.chart_prot_desc": "Compare what you have paid, what you are covered for, and what GigBuddy has already returned.",
  "dash.chart_signal_pressure": "Zone Signal Pressure",
  "dash.chart_signal_desc": "A clear view of which live signals are building toward a disruption payout.",
  "dash.chart_trend_desc": "Recent payouts show how disruptions have affected earnings over time.",
  "dash.recent_desc": "A fast read on payout amount, trigger reason, and fraud posture for each event.",
  "prem.zone_chart_desc": "Compare weekly premium and risk intensity across Bengaluru zones in one view.",
  "admin.dashboard.pipeline_desc": "Distribution of claims by automation outcome and manual review posture.",
  "admin.dashboard.zone_pricing_desc": "Compare premium levels across zones to spot underpriced exposure and concentration.",
  "admin.dashboard.daily_ops_desc": "Daily throughput across claims intake, triggers fired, and payout release.",
  "admin.analytics.premium_desc": "Check whether premium levels are tracking risk across each zone.",
  "admin.analytics.workers_desc": "See where workforce concentration is highest before disruption hits.",
  "admin.analytics.trigger_desc": "Understand which disruption modes are driving most operational load.",
  "admin.analytics.fraud_desc": "Monitor the balance between fast payout automation and manual investigation.",
  "admin.analytics.activity_desc": "Seven-day operating tempo for claims volume and payout release.",
  "chart.empty": "No meaningful data yet",
  "fact.weekly_premium": "Weekly premium",
  "fact.protection_multiple": "Protection multiple",
  "fact.recovered_ratio": "Recovered vs paid",
  "fact.strongest_signal": "Strongest signal",
  "fact.trigger_readiness": "Trigger readiness",
  "fact.zone_exposure": "Zone exposure",
  "fact.latest_payout": "Latest payout",
  "fact.average_payout": "Average payout",
  "fact.paid_claims": "Paid claims",
  "fact.cheapest_zone": "Cheapest zone",
  "fact.costliest_zone": "Costliest zone",
  "fact.zone_spread": "Zone spread",
  "fact.total_claims": "Total claims",
  "fact.auto_share": "Straight-through share",
  "fact.review_queue": "Review queue",
  "fact.pricing_floor": "Pricing floor",
  "fact.pricing_peak": "Pricing peak",
  "fact.active_gap": "Active gap",
  "fact.busiest_day": "Busiest day",
  "fact.weekly_payouts": "Weekly payouts",
  "fact.daily_claims_avg": "Daily claims avg",
  "fact.riskiest_zone": "Riskiest zone",
  "fact.rate_adequacy": "Rate adequacy",
  "fact.highest_density": "Highest density",
  "fact.total_workers": "Total workers",
  "fact.most_common_trigger": "Most common trigger",
  "fact.trigger_volume": "Trigger volume",
  "fact.trigger_modes": "Trigger modes",
  "fact.green_share": "GREEN share",
  "fact.red_share": "RED share",
  "fact.reviewed_claims": "Reviewed claims"
});

Object.assign(TRANSLATIONS.hi, {
  "dash.zone_status_desc": "हर सिग्नल दिखाता है कि आपका ज़ोन अभी भुगतान ट्रिगर के कितना करीब है।",
  "dash.chart_prot_desc": "आपने कितना भुगतान किया, आपको कितनी सुरक्षा मिली, और GigBuddy ने कितना लौटाया।",
  "dash.chart_signal_pressure": "ज़ोन सिग्नल प्रेशर",
  "dash.chart_signal_desc": "कौन से लाइव सिग्नल व्यवधान भुगतान की ओर बढ़ रहे हैं, इसे साफ़ देखें।",
  "dash.chart_trend_desc": "हाल के भुगतान दिखाते हैं कि व्यवधानों ने आय को कैसे प्रभावित किया।",
  "dash.recent_desc": "हर घटना के लिए भुगतान राशि, ट्रिगर कारण और फ्रॉड स्थिति का तेज़ सारांश।",
  "prem.zone_chart_desc": "एक ही दृश्य में बेंगलुरु के ज़ोन के अनुसार साप्ताहिक प्रीमियम और जोखिम तीव्रता की तुलना करें।",
  "admin.dashboard.pipeline_desc": "ऑटोमेशन परिणाम और मैन्युअल समीक्षा स्थिति के अनुसार दावों का वितरण।",
  "admin.dashboard.zone_pricing_desc": "कम मूल्यांकित जोखिम और अधिक एक्सपोज़र वाले ज़ोन पहचानें।",
  "admin.dashboard.daily_ops_desc": "दैनिक दावा इनटेक, ट्रिगर और भुगतान रिलीज़ का प्रवाह।",
  "admin.analytics.premium_desc": "देखें कि हर ज़ोन में प्रीमियम स्तर जोखिम के अनुरूप हैं या नहीं।",
  "admin.analytics.workers_desc": "व्यवधान आने से पहले सबसे अधिक कार्यबल घनत्व कहाँ है, देखें।",
  "admin.analytics.trigger_desc": "कौन से व्यवधान मोड सबसे अधिक संचालन भार पैदा कर रहे हैं, समझें।",
  "admin.analytics.fraud_desc": "तेज़ ऑटोमेशन और मैन्युअल जांच के संतुलन की निगरानी करें।",
  "admin.analytics.activity_desc": "सात दिनों की दावा और भुगतान संचालन गति।",
  "chart.empty": "अभी पर्याप्त डेटा नहीं है",
  "fact.weekly_premium": "साप्ताहिक प्रीमियम",
  "fact.protection_multiple": "सुरक्षा गुणक",
  "fact.recovered_ratio": "भुगतान के मुकाबले वापसी",
  "fact.strongest_signal": "सबसे मजबूत सिग्नल",
  "fact.trigger_readiness": "ट्रिगर तैयारी",
  "fact.zone_exposure": "ज़ोन एक्सपोज़र",
  "fact.latest_payout": "नवीनतम भुगतान",
  "fact.average_payout": "औसत भुगतान",
  "fact.paid_claims": "भुगतान दावे",
  "fact.cheapest_zone": "सबसे सस्ता ज़ोन",
  "fact.costliest_zone": "सबसे महँगा ज़ोन",
  "fact.zone_spread": "ज़ोन अंतर",
  "fact.total_claims": "कुल दावे",
  "fact.auto_share": "सीधा ऑटो शेयर",
  "fact.review_queue": "समीक्षा कतार",
  "fact.pricing_floor": "न्यूनतम मूल्य",
  "fact.pricing_peak": "अधिकतम मूल्य",
  "fact.active_gap": "सक्रिय अंतर",
  "fact.busiest_day": "सबसे व्यस्त दिन",
  "fact.weekly_payouts": "साप्ताहिक भुगतान",
  "fact.daily_claims_avg": "औसत दैनिक दावे",
  "fact.riskiest_zone": "सबसे जोखिमभरा ज़ोन",
  "fact.rate_adequacy": "रेट पर्याप्तता",
  "fact.highest_density": "उच्चतम घनत्व",
  "fact.total_workers": "कुल कर्मचारी",
  "fact.most_common_trigger": "सबसे सामान्य ट्रिगर",
  "fact.trigger_volume": "ट्रिगर मात्रा",
  "fact.trigger_modes": "ट्रिगर प्रकार",
  "fact.green_share": "GREEN हिस्सा",
  "fact.red_share": "RED हिस्सा",
  "fact.reviewed_claims": "समीक्षित दावे"
});

Object.assign(TRANSLATIONS.kn, {
  "dash.zone_status_desc": "ಪ್ರತಿ ಸೂಚನೆ ನಿಮ್ಮ ಝೋನ್ ಪಾವತಿ ಟ್ರಿಗರ್‌ಗೆ ಎಷ್ಟು ಹತ್ತಿರವಿದೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.",
  "dash.chart_prot_desc": "ನೀವು ಎಷ್ಟು ಪಾವತಿಸಿದ್ದೀರಿ, ಎಷ್ಟು ರಕ್ಷಣೆ ಇದೆ, ಮತ್ತು GigBuddy ಎಷ್ಟು ಮರಳಿ ನೀಡಿದೆ ಎಂಬುದನ್ನು ನೋಡಿ.",
  "dash.chart_signal_pressure": "ಝೋನ್ ಸಿಗ್ನಲ್ ಒತ್ತಡ",
  "dash.chart_signal_desc": "ಯಾವ ಲೈವ್ ಸೂಚನೆಗಳು ವ್ಯತ್ಯಯ ಪಾವತಿಗೆ ಹತ್ತಿರವಾಗುತ್ತಿವೆ ಎಂಬುದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನೋಡಿ.",
  "dash.chart_trend_desc": "ಇತ್ತೀಚಿನ ಪಾವತಿಗಳು ವ್ಯತ್ಯಯಗಳು ಆದಾಯದ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರಿದವು ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತವೆ.",
  "dash.recent_desc": "ಪ್ರತಿ ಘಟನೆಯ ಪಾವತಿ ಮೊತ್ತ, ಟ್ರಿಗರ್ ಕಾರಣ ಮತ್ತು ವಂಚನೆ ಸ್ಥಿತಿಯ ವೇಗದ ಓದು.",
  "prem.zone_chart_desc": "ಒಂದು ದೃಶ್ಯದಲ್ಲಿ ಬೆಂಗಳೂರು ಝೋನ್‌ಗಳ ವಾರದ ಪ್ರೀಮಿಯಂ ಮತ್ತು ಅಪಾಯ ತೀವ್ರತೆಯನ್ನು ಹೋಲಿಸಿ.",
  "admin.dashboard.pipeline_desc": "ಸ್ವಯಂಚಾಲಿತ ಫಲಿತಾಂಶ ಮತ್ತು ಮಾನವ ವಿಮರ್ಶಾ ಸ್ಥಿತಿಯ ಪ್ರಕಾರ ದಾವೆಗಳ ಹಂಚಿಕೆ.",
  "admin.dashboard.zone_pricing_desc": "ಕಡಿಮೆ ಬೆಲೆಯಲ್ಲಿರುವ ಅಪಾಯ ಮತ್ತು ಹೆಚ್ಚು ಎಕ್ಸ್‌ಪೋಶರ್ ಇರುವ ಝೋನ್‌ಗಳನ್ನು ಗುರುತಿಸಿ.",
  "admin.dashboard.daily_ops_desc": "ದೈನಂದಿನ ದಾವೆ ಒಳಹರಿವು, ಟ್ರಿಗರ್ ಮತ್ತು ಪಾವತಿ ಬಿಡುಗಡೆ ಹರಿವು.",
  "admin.analytics.premium_desc": "ಪ್ರತಿ ಝೋನ್‌ನಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಮಟ್ಟಗಳು ಅಪಾಯವನ್ನು ಅನುಸರಿಸುತ್ತಿವೆಯೇ ಎಂದು ನೋಡಿ.",
  "admin.analytics.workers_desc": "ವ್ಯತ್ಯಯಕ್ಕೂ ಮೊದಲು ಕಾರ್ಯಬಲದ ಸಾಂದ್ರತೆ ಎಲ್ಲಿದೆ ಎಂದು ನೋಡಿ.",
  "admin.analytics.trigger_desc": "ಯಾವ ವ್ಯತ್ಯಯ ಮಾದರಿಗಳು ಹೆಚ್ಚಿನ ಕಾರ್ಯಾಚರಣಾ ಒತ್ತಡ ತರುತ್ತಿವೆ ಎಂದು ತಿಳಿಯಿರಿ.",
  "admin.analytics.fraud_desc": "ವೇಗದ ಆಟೋಮೇಶನ್ ಮತ್ತು ಮಾನವ ತನಿಖೆಯ ಸಮತೋಲನವನ್ನು ನೋಡಿರಿ.",
  "admin.analytics.activity_desc": "ಏಳು ದಿನಗಳ ದಾವೆ ಮತ್ತು ಪಾವತಿ ಕಾರ್ಯಾಚರಣೆ ವೇಗ.",
  "chart.empty": "ಇನ್ನೂ ಸಾಕಷ್ಟು ಡೇಟಾ ಇಲ್ಲ",
  "fact.weekly_premium": "ವಾರದ ಪ್ರೀಮಿಯಂ",
  "fact.protection_multiple": "ರಕ್ಷಣಾ ಗುಣಕ",
  "fact.recovered_ratio": "ಪಾವತಿಸಿದದಕ್ಕೆ ವಿರುದ್ಧವಾಗಿ ಮರಳಿ ಬಂದದು",
  "fact.strongest_signal": "ಬಲವಾದ ಸೂಚನೆ",
  "fact.trigger_readiness": "ಟ್ರಿಗರ್ ಸಿದ್ಧತೆ",
  "fact.zone_exposure": "ಝೋನ್ ಎಕ್ಸ್‌ಪೋಶರ್",
  "fact.latest_payout": "ಇತ್ತೀಚಿನ ಪಾವತಿ",
  "fact.average_payout": "ಸರಾಸರಿ ಪಾವತಿ",
  "fact.paid_claims": "ಪಾವತಿಸಿದ ದಾವೆಗಳು",
  "fact.cheapest_zone": "ಕಡಿಮೆ ಬೆಲೆಯ ಝೋನ್",
  "fact.costliest_zone": "ಹೆಚ್ಚು ಬೆಲೆಯ ಝೋನ್",
  "fact.zone_spread": "ಝೋನ್ ವ್ಯತ್ಯಾಸ",
  "fact.total_claims": "ಒಟ್ಟು ದಾವೆಗಳು",
  "fact.auto_share": "ನೇರ ಆಟೋ ಹಂಚಿಕೆ",
  "fact.review_queue": "ವಿಮರ್ಶಾ ಸರತಿ",
  "fact.pricing_floor": "ಕನಿಷ್ಠ ಬೆಲೆ",
  "fact.pricing_peak": "ಗರಿಷ್ಠ ಬೆಲೆ",
  "fact.active_gap": "ಸಕ್ರಿಯ ಅಂತರ",
  "fact.busiest_day": "ಅತ್ಯಂತ ವ್ಯಸ್ತ ದಿನ",
  "fact.weekly_payouts": "ವಾರದ ಪಾವತಿಗಳು",
  "fact.daily_claims_avg": "ಸರಾಸರಿ ದಿನಸಿ ದಾವೆಗಳು",
  "fact.riskiest_zone": "ಅತ್ಯಂತ ಅಪಾಯದ ಝೋನ್",
  "fact.rate_adequacy": "ದರ ಸಮರ್ಪಕತೆ",
  "fact.highest_density": "ಅತ್ಯಧಿಕ ಸಾಂದ್ರತೆ",
  "fact.total_workers": "ಒಟ್ಟು ಕಾರ್ಮಿಕರು",
  "fact.most_common_trigger": "ಅತಿ ಸಾಮಾನ್ಯ ಟ್ರಿಗರ್",
  "fact.trigger_volume": "ಟ್ರಿಗರ್ ಪ್ರಮಾಣ",
  "fact.trigger_modes": "ಟ್ರಿಗರ್ ವಿಧಗಳು",
  "fact.green_share": "GREEN ಹಂಚಿಕೆ",
  "fact.red_share": "RED ಹಂಚಿಕೆ",
  "fact.reviewed_claims": "ವಿಮರ್ಶಿಸಲಾದ ದಾವೆಗಳು"
});

function formatText(template, vars = {}) {
  return Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), template);
}

function t(key, fallback = '', vars = {}) {
  const template = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.en[key] || fallback || key;
  return formatText(template, vars);
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!el.dataset.i18nDefault) el.dataset.i18nDefault = el.textContent;
    const text = t(key, el.dataset.i18nDefault || '');
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (!el.dataset.i18nDefaultHtml) el.dataset.i18nDefaultHtml = el.innerHTML;
    const text = t(key, el.dataset.i18nDefaultHtml || '');
    if (text) el.innerHTML = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!el.dataset.i18nDefaultPlaceholder) el.dataset.i18nDefaultPlaceholder = el.getAttribute('placeholder') || '';
    const text = t(key, el.dataset.i18nDefaultPlaceholder || '');
    if (text) el.setAttribute('placeholder', text);
  });
  refreshLocalizedUI();
}

function refreshLocalizedUI() {
  const triggerSelect = document.getElementById('sim-trigger-type');
  if (triggerSelect) {
    Array.from(triggerSelect.options).forEach(option => {
      option.textContent = triggerName(option.value);
    });
  }

  if (state.registrationOtpSession) updateOtpStatus('register-otp-status', state.registrationOtpSession);
  if (state.loginOtpSession) updateOtpStatus('login-otp-status', state.loginOtpSession);

  if (state.premiumData && document.getElementById('step-4')?.classList.contains('active')) {
    renderPremiumQuoteCard(state.premiumData, state.worker?.zone || document.getElementById('reg-zone')?.value || '');
  }
  if (state.policy && document.getElementById('step-success')?.classList.contains('active')) {
    showSuccessStep(state.policy);
  }

  const activeWorkerPage = document.querySelector('#worker-view .page.active')?.id;
  if (state.authToken && activeWorkerPage === 'page-dashboard') loadDashboard();
  if (state.authToken && activeWorkerPage === 'page-claims') loadClaimsPage();
  if (activeWorkerPage === 'page-premium') loadPremiumPage();
  if (state.authToken && activeWorkerPage === 'page-settings') loadSettingsPage();

  const activeAdminPage = document.querySelector('#admin-view .page.active')?.id;
  if (state.adminToken && activeAdminPage === 'page-admin-dashboard') loadAdminDashboard();
  if (state.adminToken && activeAdminPage === 'page-admin-policies') loadAdminPolicies();
  if (state.adminToken && activeAdminPage === 'page-admin-claims') loadAdminClaims();
  if (state.adminToken && activeAdminPage === 'page-admin-triggers') loadAdminTriggers();
  if (state.adminToken && activeAdminPage === 'page-admin-analytics') loadAdminAnalytics();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ── API Layer ────────────────────────────────────────────────────
function getApiBase() {
  if (window.GIGBUDDY_API_BASE) return window.GIGBUDDY_API_BASE.replace(/\/$/, '');

  if (window.location.protocol === 'file:') {
    return 'http://127.0.0.1:8000';
  }

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal && !['8000', '7860', '8080'].includes(window.location.port)) {
    return `http://${window.location.hostname}:8000`;
  }

  return window.location.origin.replace(/\/$/, '');
}

const API = getApiBase();
const STORAGE_KEYS = {
  worker: 'gigbuddy.workerToken',
  admin: 'gigbuddy.adminToken',
};

// ── State ────────────────────────────────────────────────────────
let state = {
  currentStep: 1, worker: null, workerId: null, policy: null, premiumData: null,
  authToken: localStorage.getItem(STORAGE_KEYS.worker),
  adminToken: localStorage.getItem(STORAGE_KEYS.admin),
  supportInfo: null, registrationOtpSession: null, loginOtpSession: null, pendingFeedback: null, surveyDraft: {}, charts: {},
};

if (window.Chart) {
  Chart.defaults.color = '#64748b';
  Chart.defaults.borderColor = '#f1f5f9';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.boxHeight = 8;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.register({
    id: 'gigBuddyCenterLabel',
    afterDraw(chart, _args, pluginOptions) {
      if (!pluginOptions || chart.config.type !== 'doughnut') return;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const lines = Array.isArray(pluginOptions.lines) ? pluginOptions.lines : [];
      if (!lines.length) return;

      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const primary = lines[0] || {};
      ctx.fillStyle = primary.color || '#0f172a';
      ctx.font = primary.font || "700 26px Inter";
      ctx.fillText(primary.text || '', x, y - (lines.length > 1 ? 10 : 0));

      if (lines[1]) {
        const secondary = lines[1];
        ctx.fillStyle = secondary.color || '#64748b';
        ctx.font = secondary.font || "600 11px Inter";
        ctx.fillText(secondary.text || '', x, y + 16);
      }
      ctx.restore();
    }
  });
  Chart.register({
    id: 'gigBuddyEmptyState',
    afterDraw(chart) {
      const datasets = chart.data?.datasets || [];
      const hasData = datasets.some(ds => Array.isArray(ds.data) && ds.data.some(value => Number(value || 0) > 0));
      if (hasData) return;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      ctx.save();
      ctx.fillStyle = '#94a3b8';
      ctx.font = "600 13px Inter";
      ctx.textAlign = 'center';
      ctx.fillText(t('chart.empty', 'No meaningful data yet'), (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
      ctx.restore();
    }
  });
}

const TRIGGER_BADGES = { rainfall: 'RN', aqi: 'AQ', heat: 'HT', curfew: 'CF', flooding: 'FL' };
const TRIGGER_NAMES = { rainfall: 'Heavy Rainfall', aqi: 'Hazardous AQI', heat: 'Extreme Heat', curfew: 'Curfew / Strike', flooding: 'Urban Flooding' };
const TRIGGER_CODES = { rainfall: 'RN', aqi: 'AQ', heat: 'HT', curfew: 'CF', flooding: 'FL' };

function triggerName(type) {
  return t(`trigger.${type}`, TRIGGER_NAMES[type] || type || '—');
}

function statusName(status) {
  const fallback = String(status || '').replace(/_/g, ' ').toUpperCase() || '—';
  return t(`status.${status}`, fallback);
}

function yesNo(value) {
  return value ? t('common.yes', 'Yes') : t('common.no', 'No');
}

function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  return digits;
}

// ── Navigation ───────────────────────────────────────────────────
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const view = tab.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    if (view === 'admin') { syncAdminUI(); if (state.adminToken) loadAdminDashboard(); }
  });
});

document.querySelectorAll('.sub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const page = tab.dataset.page;
    if (!page) return;
    const parent = tab.closest('.sub-nav');
    parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const container = tab.closest('.view');
    container.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    const loaders = {
      dashboard: loadDashboard, claims: loadClaimsPage, premium: loadPremiumPage, settings: loadSettingsPage,
      'admin-dashboard': loadAdminDashboard, 'admin-policies': loadAdminPolicies, 'admin-claims': loadAdminClaims,
      'admin-triggers': loadAdminTriggers, 'admin-analytics': loadAdminAnalytics,
    };
    if (loaders[page]) loaders[page]();
  });
});

// ── Helpers ──────────────────────────────────────────────────────
function authHeaders(role = 'public') {
  const h = { 'Content-Type': 'application/json' };
  if (role === 'worker' && state.authToken) h.Authorization = `Bearer ${state.authToken}`;
  if (role === 'admin' && state.adminToken) h.Authorization = `Bearer ${state.adminToken}`;
  return h;
}

function setWorkerSession(token, worker) {
  state.authToken = token; state.worker = worker; state.workerId = worker?.id ?? null;
  if (token) {
    localStorage.setItem(STORAGE_KEYS.worker, token);
  }
}

function clearWorkerSession(msg) {
  state.authToken = null; state.worker = null; state.workerId = null; state.policy = null; state.pendingFeedback = null; state.surveyDraft = {};
  localStorage.removeItem(STORAGE_KEYS.worker);
  if (msg) showToast(msg);
}

function setAdminSession(token) {
  state.adminToken = token;
  localStorage.setItem(STORAGE_KEYS.admin, token);
  syncAdminUI();
}
function clearAdminSession(msg) {
  state.adminToken = null;
  localStorage.removeItem(STORAGE_KEYS.admin);
  syncAdminUI();
  if (msg) showToast(msg);
}

function requireWorkerSession(label = 'continue') {
  if (state.authToken) return true;
  document.getElementById('nav-worker').click();
  document.getElementById('sub-onboarding').click();
  toggleAuth('login');
  showToast(t('toast.sign_in_to', 'Please sign in to {label}.', { label }));
  return false;
}

function syncAdminUI() {
  const locked = document.getElementById('admin-auth-locked');
  const content = document.getElementById('admin-auth-content');
  const btn = document.getElementById('admin-logout-btn');
  if (!locked || !content || !btn) return;
  const a = Boolean(state.adminToken);
  locked.classList.toggle('hidden', a);
  content.classList.toggle('hidden', !a);
  btn.classList.toggle('hidden', !a);
}

async function api(endpoint, options = {}, role = 'public') {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`${API}${endpoint}`, { headers: { ...authHeaders(role), ...(options.headers || {}) }, ...options, signal: ctrl.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if ((res.status === 401 || res.status === 403) && role === 'worker') clearWorkerSession();
      if ((res.status === 401 || res.status === 403) && role === 'admin') clearAdminSession();
      return { ...data, detail: data.detail || `Request failed (${res.status})`, status_code: res.status };
    }
    return data;
  } catch (e) {
    return { detail: e.name === 'AbortError' ? 'Request timed out.' : 'API connection error.' };
  } finally { clearTimeout(tid); }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  t.classList.remove('hidden'); t.classList.add('visible');
  setTimeout(() => { t.classList.remove('visible'); t.classList.add('hidden'); }, 3500);
}

function destroyChart(id) { if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; } }

function renderChart(id, config) {
  const c = document.getElementById(id);
  if (!c || !window.Chart) return;
  destroyChart(id);

  const ctx = c.getContext('2d');
  config.data.datasets.forEach(ds => {
    if (ds.type === 'line' || (!ds.type && config.type === 'line')) {
      if (ds.backgroundColor && typeof ds.backgroundColor === 'string' && ds.backgroundColor.startsWith('rgba')) {
         const grad = ctx.createLinearGradient(0, 0, 0, 300);
         grad.addColorStop(0, ds.backgroundColor);
         grad.addColorStop(1, ds.backgroundColor.replace(/[\d.]+\)$/, '0)'));
         ds.backgroundColor = grad;
         ds.fill = true;
         ds.borderWidth = 2;
         ds.tension = 0.45;
         ds.pointRadius = 0;
         ds.pointHoverRadius = 4;
      }
    }
    // Force strict minimal aesthetics, disable previous gradient conversions
    if (ds.type === 'bar' || (!ds.type && config.type === 'bar')) {
       ds.borderWidth = 0;
       ds.borderRadius = ds.borderRadius ?? 10;
       ds.maxBarThickness = ds.maxBarThickness ?? 44;
    }
    if (config.type === 'doughnut') {
       if (!config.options) config.options = {};
       config.options.cutout = config.options.cutout || '72%';
       config.options.spacing = config.options.spacing ?? 6;
       ds.borderRadius = ds.borderRadius ?? 8;
       ds.borderWidth = ds.borderWidth ?? 0;
    }
  });

  const mergedScales = { ...(config.options?.scales || {}) };
  for (const key in mergedScales) {
      if (mergedScales[key].grid && mergedScales[key].grid.display !== false) {
          mergedScales[key].grid.color = '#f1f5f9';
          mergedScales[key].grid.drawBorder = false;
      }
      if (!mergedScales[key].grid) {
          mergedScales[key].grid = { color: '#f1f5f9', drawBorder: false };
      }
      if (mergedScales[key].ticks) {
         mergedScales[key].ticks.padding = 8;
      }
  }

  const mergedPlugins = {
    ...(config.options?.plugins || {}),
    legend: {
      labels: { usePointStyle: true, boxWidth: 8, padding: 16 },
      ...(config.options?.plugins?.legend || {})
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#111827',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 4,
      usePointStyle: true,
      titleFont: { weight: '600' },
      ...(config.options?.plugins?.tooltip || {})
    }
  };

  const optionRest = { ...(config.options || {}) };
  delete optionRest.plugins;
  delete optionRest.scales;

  state.charts[id] = new Chart(c, {
    ...config,
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 6, right: 6, bottom: 0, left: 2 } },
      interaction: { mode: 'index', intersect: false },
      ...optionRest,
      plugins: mergedPlugins,
      scales: Object.keys(mergedScales).length > 0 ? mergedScales : undefined
    },
  });
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Number(value || 0)));
}

function pct(part, total) {
  return total > 0 ? `${Math.round((Number(part || 0) / total) * 100)}%` : '0%';
}

function average(values) {
  if (!Array.isArray(values) || !values.length) return 0;
  return values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length;
}

function maxBy(items, getter) {
  return (items || []).reduce((best, item) => (best == null || getter(item) > getter(best) ? item : best), null);
}

function minBy(items, getter) {
  return (items || []).reduce((best, item) => (best == null || getter(item) < getter(best) ? item : best), null);
}

function setFactStrip(id, facts) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = (facts || []).filter(fact => fact && fact.label);
  el.innerHTML = items.map(fact => `
    <div class="chart-fact ${fact.tone ? `is-${fact.tone}` : ''}">
      <span class="chart-fact-label">${fact.label}</span>
      <strong class="chart-fact-value">${fact.value}</strong>
      ${fact.note ? `<span class="chart-fact-note">${fact.note}</span>` : ''}
    </div>
  `).join('');
}

function buildZoneSignals(zone) {
  const weather = zone.weather || {};
  const air = zone.aqi || {};
  const traffic = zone.traffic || {};
  const flood = zone.flood || {};
  const signals = [
    { key: 'rainfall', label: t('zone.rainfall', 'Rainfall'), value: `${weather.rainfall_6hr_mm || 0}mm / 6hr`, score: clamp(((weather.rainfall_6hr_mm || 0) / 50) * 100) },
    { key: 'aqi', label: t('zone.aqi', 'AQI'), value: `${air.aqi || 0} (${air.category || 'Good'})`, score: clamp(((air.aqi || 0) / 300) * 100) },
    { key: 'temperature', label: t('zone.temperature', 'Temperature'), value: `${weather.temperature_c || 0}°C`, score: clamp(((weather.temperature_c || 0) / 42) * 100) },
    { key: 'traffic', label: t('zone.traffic', 'Traffic'), value: `Level ${traffic.congestion_level || 0}/5`, score: clamp(((traffic.congestion_level || 0) / 5) * 100) },
    { key: 'flood', label: t('zone.flood_level', 'Flood Level'), value: `${flood.water_level_m || 0}m`, score: clamp(((flood.water_level_m || 0) / 0.5) * 100) },
  ];
  return signals.map(signal => ({
    ...signal,
    level: signal.score >= 75 ? 'critical' : signal.score >= 45 ? 'elevated' : 'normal'
  }));
}

function f$(v) { return `₹${Number(v||0).toLocaleString('en-IN',{maximumFractionDigits:0})}`; }
function fDate(v) { if (!v) return t('ui.now', 'Now'); return new Date(v).toLocaleDateString('en-IN',{month:'short',day:'numeric'}); }
function fTime(v) { if (!v) return t('ui.not_yet', 'Not yet'); return new Date(v).toLocaleString('en-IN',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
function fRelative(v) {
  if (!v) return t('ui.not_yet', 'Not yet');
  const delta = Math.max(0, Math.round((Date.now() - new Date(v).getTime()) / 60000));
  if (delta < 1) return t('ui.now', 'Now');
  if (delta < 60) return `${delta}m ago`;
  const hours = Math.round(delta / 60);
  return `${hours}h ago`;
}

function goToStep(step) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`step-${step}`);
  if (el) el.classList.add('active');
  document.querySelectorAll('.step-progress .step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.remove('active', 'completed');
    if (n < step) s.classList.add('completed');
    if (n === step) s.classList.add('active');
  });
  state.currentStep = step;
}

function toggleAuth(type) {
  document.getElementById('register-card').style.display = type === 'login' ? 'none' : 'block';
  document.getElementById('login-card').style.display = type === 'login' ? 'block' : 'none';
}

// ── Push Notification Simulation ─────────────────────────────────
function showPush(icon, title, body) {
  const el = document.getElementById('push-notification');
  document.getElementById('push-icon').textContent = icon;
  document.getElementById('push-title').textContent = title;
  document.getElementById('push-body').textContent = body;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 8000);
}
function dismissPush() { document.getElementById('push-notification').classList.add('hidden'); }

// ── Survey ───────────────────────────────────────────────────────
function answerSurvey(q, val) {
  state.surveyDraft[q] = val;
  document.querySelectorAll(`[data-survey-q="${q}"]`).forEach(btn => {
    btn.classList.toggle('active', btn.dataset.surveyValue === val);
  });
}

function dismissSurvey() {
  document.getElementById('micro-survey-banner')?.classList.add('hidden');
}

async function submitSurvey() {
  const claimId = state.pendingFeedback?.claim?.id;
  if (!claimId) return;
  if (!state.surveyDraft[1] || !state.surveyDraft[2] || !state.surveyDraft[3]) {
    return showToast(t('toast.complete_survey', 'Answer all 3 survey questions'));
  }

  const res = await api(`/api/claims/${claimId}/feedback`, {
    method: 'POST',
    body: JSON.stringify({
      experienced_disruption: state.surveyDraft[1] === 'yes',
      payout_helpfulness: state.surveyDraft[2],
      route_status: state.surveyDraft[3],
    }),
  }, 'worker');
  if (res?.detail) return showToast(res.detail);

  state.pendingFeedback = null;
  state.surveyDraft = {};
  if (state.worker) state.worker.renewal_credit_balance = res.renewal_credit_balance || 0;
  showToast(t('toast.survey_saved', 'Feedback saved. ₹5 renewal credit added.'));
  dismissSurvey();

  const activeWorkerPage = document.querySelector('#worker-view .page.active')?.id;
  if (activeWorkerPage === 'page-claims') await loadClaimsPage();
  if (activeWorkerPage === 'page-dashboard') await loadDashboard();
  if (activeWorkerPage === 'page-settings') await loadSettingsPage();
}

function renderPendingFeedbackBanner(payload) {
  const banner = document.getElementById('micro-survey-banner');
  if (!banner) return;

  state.pendingFeedback = payload?.has_pending_feedback ? payload : null;
  state.surveyDraft = {};
  document.querySelectorAll('[data-survey-q]').forEach(btn => btn.classList.remove('active'));

  if (!payload?.has_pending_feedback || !payload.claim) {
    banner.classList.add('hidden');
    return;
  }

  const summary = document.getElementById('survey-claim-summary');
  if (summary) {
    summary.textContent = t('survey.claim_summary', 'Last payout: {amount} for {trigger} in {zone}.', {
      amount: f$(payload.claim.amount || 0),
      trigger: triggerName(payload.claim.trigger_type),
      zone: payload.claim.zone || state.worker?.zone || 'your zone',
    });
  }

  const note = document.getElementById('survey-credit-note');
  if (note) {
    note.textContent = t('survey.pending', 'Answer these questions once and we will add a renewal credit.');
  }

  answerSurvey(2, 'right');
  banner.classList.remove('hidden');
}

// ── OTP auto-advance ─────────────────────────────────────────────
document.querySelectorAll('.otp-input').forEach((inp, i, arr) => {
  inp.addEventListener('input', () => { if (inp.value.length === 1 && i < arr.length - 1) arr[i+1].focus(); });
  inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && i > 0) arr[i-1].focus(); });
});

// ── Auth Flows ───────────────────────────────────────────────────
async function registerWorker() {
  const name = document.getElementById('reg-name').value;
  const phoneInput = document.getElementById('reg-phone');
  const phone = normalizePhone(phoneInput?.value);
  const platform = document.getElementById('reg-platform').value;
  const zone = document.getElementById('reg-zone').value;
  const income = document.getElementById('reg-income').value;
  const vehicle = document.getElementById('reg-vehicle').value;
  const acceptedTerms = document.getElementById('reg-consent-terms').checked;
  const acceptedPrivacy = document.getElementById('reg-consent-privacy').checked;
  const acceptedAutomation = document.getElementById('reg-consent-automation').checked;
  if (phoneInput) phoneInput.value = phone;
  if (!name || !phone) return showToast(t('toast.fill_fields', 'Please fill in all fields'));
  if (!acceptedTerms || !acceptedPrivacy || !acceptedAutomation) return showToast(t('toast.accept_consents', 'Please accept all consent items'));
  const res = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, phone, zone, city: 'Bengaluru', platform, partner_id: `GB-${Date.now()}`, vehicle_type: vehicle, weekly_income: Number(income) || 5200, accepted_terms: acceptedTerms, accepted_privacy: acceptedPrivacy, accepted_automated_decisions: acceptedAutomation }) });
  if (res.detail) return showToast(res.detail);
  state.worker = res; state.workerId = res.id;
  if (res.otp_session) { state.registrationOtpSession = res.otp_session; updateOtpStatus('register-otp-status', res.otp_session); }
  goToStep(2);
}

function updateOtpStatus(id, meta) {
  const el = document.getElementById(id);
  if (!el || !meta) return;
  const parts = [
    `${t('otp.status.provider', 'Provider')}: ${meta.provider_name || meta.provider_mode || 'otp'}`,
    `${t('otp.status.expires', 'Expires')}: ${Math.round((meta.expires_in||0)/60)||1}m`
  ];
  if (meta.demo_otp) parts.push(`${t('otp.status.demo', 'Demo OTP')}: ${meta.demo_otp}`);
  el.textContent = parts.join(' · ');
}

async function requestLoginOtp() {
  const phoneInput = document.getElementById('login-phone');
  const phone = normalizePhone(phoneInput?.value);
  if (phoneInput) phoneInput.value = phone;
  if (!phone) return showToast(t('toast.enter_phone', 'Enter your phone number'));
  const res = await api('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone, purpose: 'login' }) });
  if (res?.success) { state.loginOtpSession = res; updateOtpStatus('login-otp-status', res); showToast(t('toast.otp_sent', 'OTP sent')); }
  else showToast(res?.detail || t('toast.failed', 'Failed'));
}

async function resendRegistrationOtp() {
  const phone = state.worker?.phone;
  if (!phone) return showToast(t('toast.register_first', 'Register first'));
  const res = await api('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone, purpose: 'registration' }) });
  if (res?.success) { state.registrationOtpSession = res; updateOtpStatus('register-otp-status', res); showToast(t('toast.otp_resent', 'OTP resent')); }
  else showToast(res?.detail || t('toast.failed', 'Failed'));
}

async function loginWorker() {
  const phoneInput = document.getElementById('login-phone');
  const phone = normalizePhone(phoneInput?.value);
  const otp = document.getElementById('login-otp').value;
  if (phoneInput) phoneInput.value = phone;
  if (!phone || !otp) return showToast(t('toast.enter_phone_otp', 'Enter phone and OTP'));
  const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ phone, otp, session_id: state.loginOtpSession?.session_id || '' }) });
  if (res.detail) return showToast(res.detail);
  setWorkerSession(res.access_token, res.worker);
  showToast(t('toast.welcome_back', 'Welcome back!'));
  if (res.has_active_policy) {
    document.getElementById('sub-dashboard').click();
  } else {
    document.getElementById('sub-onboarding').click();
  }
}

async function verifyOTP() {
  const otp = [1,2,3,4].map(i => document.getElementById(`otp-${i}`).value).join('');
  if (otp.length !== 4) return showToast(t('toast.enter_4digit_otp', 'Enter 4-digit OTP'));
  const res = await api('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone: state.worker?.phone, otp, session_id: state.registrationOtpSession?.session_id || '' }) });
  if (res.detail) return showToast(res.detail);
  setWorkerSession(res.access_token, res.worker);
  goToStep(3);
}

async function verifyKYC() {
  const aadhaar = document.getElementById('kyc-aadhaar').value;
  if (!aadhaar || aadhaar.length < 12) return showToast(t('toast.enter_12digit_aadhaar', 'Enter 12-digit Aadhaar'));
  const res = await api('/api/auth/kyc', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, aadhaar_number: aadhaar }) }, 'worker');
  if (res.detail) return showToast(res.detail);
  showToast(t('toast.kyc_verified', 'KYC verified successfully.'));
  await loadPremiumQuote();
  goToStep(4);
}

async function loadPremiumQuote() {
  const zone = state.worker?.zone || document.getElementById('reg-zone').value;
  const res = await api('/api/premium/calculate', {
    method: 'POST',
    body: JSON.stringify({ zone, worker_id: state.workerId || null }),
  });
  if (res.detail) return;
  state.premiumData = res;
  renderPremiumQuoteCard(res, zone);
  const autopay = document.getElementById('autopay-amount');
  if (autopay) autopay.textContent = f$(res.final_premium);
}

function renderPremiumQuoteCard(res, zone) {
  const container = document.getElementById('premium-quote-card');
  if (!container || !res) return;
  const tierClass = res.risk_score >= 0.55 ? 'tier-high' : res.risk_score >= 0.35 ? 'tier-medium' : 'tier-low';
  const tierLabel = res.risk_score >= 0.55 ? t('quote.tier.high', 'HIGH RISK') : res.risk_score >= 0.35 ? t('quote.tier.medium', 'MEDIUM') : t('quote.tier.low', 'LOW RISK');
  container.innerHTML = `
    <div class="quote-header"><div class="quote-zone-wrap"><span class="quote-kicker">${t('quote.detected_zone', 'Detected Zone')}</span><span class="quote-zone">${zone}</span></div><span class="quote-tier ${tierClass}">${tierLabel}</span></div>
    <div class="quote-premium"><div class="quote-amount">${f$(res.final_premium)}</div><div class="quote-period">${t('quote.period', 'per week · auto-debited Monday 06:00')}</div></div>
    <div class="quote-factors">${(res.factors||[]).map(f => {
      const color = f.value > 0.6 ? '#ef4444' : f.value > 0.4 ? '#f59e0b' : '#22c55e';
      return `<div class="factor-row"><span class="factor-name">${f.factor_name}</span><div class="factor-bar"><div class="factor-fill" style="width:${f.value*100}%;background:${color}"></div></div></div>`;
    }).join('')}</div>
    <div style="margin-top:14px;font-size:12px;color:var(--text-dim)">${t('quote.model', 'Model')}: ${res.model} · ${t('quote.risk_score', 'Risk Score')}: ${(res.risk_score*100).toFixed(1)}%</div>`;
}

async function setupUPI() {
  const upi = document.getElementById('upi-id').value;
  if (!upi) return showToast(t('toast.enter_upi', 'Enter UPI ID'));
  const res = await api('/api/auth/setup-upi', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, upi_id: upi }) }, 'worker');
  if (res.detail) return showToast(res.detail);
  const policyRes = await api('/api/policies/create', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, plan_type: 'standard' }) }, 'worker');
  if (policyRes.detail) return showToast(policyRes.detail);
  state.policy = policyRes;
  showSuccessStep(policyRes);
  showPush('PL', t('toast.policy_activated', 'Policy Activated'), `${t('dash.active', 'Policy Active')} · ${t('dash.weekly', 'Weekly Premium')}: ${f$(state.premiumData?.final_premium || 0)}`);
}

function showSuccessStep(data) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-success').classList.add('active');
  document.querySelectorAll('.step-progress .step').forEach(s => s.classList.add('completed'));
  const d = document.getElementById('success-details');
  if (d && data) d.innerHTML = `
    <div class="success-item"><span class="label">${t('success.plan', 'Plan')}</span><span class="value">${data.plan_type || t('common.standard', 'Standard')}</span></div>
    <div class="success-item"><span class="label">${t('success.weekly', 'Weekly Premium')}</span><span class="value">${f$(data.weekly_premium)}</span></div>
    <div class="success-item"><span class="label">${t('success.coverage', 'Coverage')}</span><span class="value">${f$(data.coverage_amount)}</span></div>
    <div class="success-item"><span class="label">${t('success.status', 'Status')}</span><span class="value" style="color:var(--green)">${t('common.active', 'Active')}</span></div>`;
}

function showDashboard() { document.getElementById('sub-dashboard').click(); }
function logout() { clearWorkerSession(t('toast.session_ended', 'Session ended')); document.getElementById('sub-onboarding').click(); toggleAuth('login'); }

// ── Dashboard ────────────────────────────────────────────────────
async function loadDashboard() {
  if (!requireWorkerSession(t('tab.dashboard', 'Dashboard'))) return;
  const [profileRes, policyRes, claimsRes, zoneRes, pendingFeedbackRes] = await Promise.all([
    api('/api/auth/me', {}, 'worker'),
    api('/api/policies/me', {}, 'worker'),
    api('/api/claims/me', {}, 'worker'),
    api(`/api/triggers/zone-status/${encodeURIComponent(state.worker?.zone || 'Koramangala')}`),
    api('/api/claims/feedback/pending', {}, 'worker'),
  ]);
  if (profileRes && !profileRes.detail) {
    state.worker = profileRes;
    state.workerId = profileRes.id;
  }
  if (policyRes && !policyRes.detail) {
    const policies = Array.isArray(policyRes) ? policyRes : [policyRes];
    state.policy = policies.find(p => p.status === 'active') || policies[0] || null;
  }
  const p = state.policy || {};
  document.getElementById('dash-greeting').textContent = `${t('dash.greeting', 'Welcome')}, ${state.worker?.name?.split(' ')[0] || ''}`;
  document.getElementById('dash-zone').textContent = `${state.worker?.zone || ''}, ${t('common.bengaluru', 'Bengaluru')}`;
  const plan = document.getElementById('dash-plan');
  if (plan) plan.textContent = p.plan_type === 'standard' ? t('common.standard_plan', 'Standard Plan') : `${(p.plan_type || 'standard').replace(/_/g, ' ')}`;
  document.getElementById('dash-premium').textContent = f$(p.weekly_premium);
  document.getElementById('dash-coverage').textContent = f$(p.coverage_amount);
  document.getElementById('dash-weeks').textContent = p.weeks_active || '—';
  document.getElementById('dash-total-paid').textContent = f$(p.total_premiums_paid);
  document.getElementById('dash-total-claimed').textContent = f$(p.total_claims_paid);
  const creditEl = document.getElementById('dash-credit');
  if (creditEl) creditEl.textContent = f$(state.worker?.renewal_credit_balance || 0);

  const zone = zoneRes && !zoneRes.detail ? zoneRes : {};
  renderZoneStatus(zone);
  renderWorkerCharts(p, zone, Array.isArray(claimsRes) ? claimsRes : []);
  renderClaimsList('dash-claims-list', Array.isArray(claimsRes) ? claimsRes.slice(0, 5) : []);
  renderPendingFeedbackBanner(pendingFeedbackRes && !pendingFeedbackRes.detail ? pendingFeedbackRes : null);
}

function renderZoneStatus(zone) {
  const grid = document.getElementById('zone-status-grid');
  if (!grid) return;
  const signals = buildZoneSignals(zone);
  grid.innerHTML = signals.map(signal => `<div class="zone-signal ${signal.level}">
      <div class="zone-signal-top">
        <div class="zone-signal-name">${signal.label}</div>
        <span class="zone-signal-badge">${t(`zone.level.${signal.level}`, signal.level)}</span>
      </div>
      <div class="zone-signal-value">${signal.value}</div>
      <div class="zone-signal-meter"><span class="zone-signal-meter-fill ${signal.level}" style="width:${Math.max(10, signal.score)}%"></span></div>
      <div class="zone-signal-caption-row">
        <div class="zone-signal-caption">${t('zone.live_telemetry', 'Live zone telemetry')}</div>
        <div class="zone-signal-mini">${signal.score}%</div>
      </div>
    </div>`).join('');
}

function renderClaimsList(containerId, claims) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!claims.length) { el.innerHTML = `<p class="muted-note">${t('claims.none', "No claims yet — you're protected!")}</p>`; return; }
  el.innerHTML = claims.map(c => {
    const statusClass = c.status === 'paid' ? 'status-paid' : c.status === 'auto_approved' ? 'status-auto' : c.status === 'pending_review' ? 'status-pending' : 'status-rejected';
    const triggerCode = TRIGGER_CODES[c.trigger_type] || 'GB';
    return `<div class="claim-card">
      <div class="claim-icon"><span>${triggerCode}</span></div>
      <div class="claim-info">
        <div class="claim-type">${triggerName(c.trigger_type)}</div>
        <div class="claim-meta">${c.zone || ''} · ${fDate(c.created_at)}</div>
        <div class="claim-meta-pills">
          <span class="claim-meta-pill">${t('claims.fraud', 'Fraud')} ${(Number(c.fraud_score || 0) * 100).toFixed(0)}%</span>
          <span class="claim-meta-pill">${(c.fraud_tier || 'green').toUpperCase()}</span>
        </div>
      </div>
      <div>
        <div class="claim-amount">${f$(c.amount)}</div>
        <div class="claim-status ${statusClass}">${statusName(c.status)}</div>
      </div>
    </div>`;
  }).join('');
}

function renderWorkerCharts(policy, zone, claims) {
  const coverage = Number(policy?.coverage_amount || 0);
  const totalPaid = Number(policy?.total_premiums_paid || 0);
  const totalClaimed = Number(policy?.total_claims_paid || 0);
  const weeklyPremium = Number(policy?.weekly_premium || 0);
  renderChart('worker-protection-chart', {
    type: 'bar',
    data: {
      labels: [t('chart.premium_paid', 'Premium Paid'), t('dash.coverage', 'Coverage'), t('chart.claims_paid', 'Claims Paid')],
      datasets: [{
        label: 'INR',
        data: [totalPaid, coverage, totalClaimed],
        backgroundColor: ['#0F6CBD', '#059669', '#D97706']
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { callback: value => f$(value) } }
      }
    }
  });
  setFactStrip('worker-protection-facts', [
    { label: t('fact.weekly_premium', 'Weekly premium'), value: f$(weeklyPremium) },
    { label: t('fact.protection_multiple', 'Protection multiple'), value: weeklyPremium ? `${(coverage / weeklyPremium).toFixed(1)}x` : '—', tone: 'good' },
    { label: t('fact.recovered_ratio', 'Recovered vs paid'), value: pct(totalClaimed, Math.max(totalPaid, 1)), tone: totalClaimed > totalPaid ? 'good' : 'neutral' }
  ]);

  const signals = buildZoneSignals(zone);
  const strongestSignal = maxBy(signals, signal => signal.score);
  renderChart('worker-signal-chart', {
    type: 'bar',
    data: {
      labels: signals.map(signal => signal.label),
      datasets: [{
        label: t('chart.risk_pct', 'Risk %'),
        data: signals.map(signal => signal.score),
        backgroundColor: signals.map(signal => signal.level === 'critical' ? '#DC2626' : signal.level === 'elevated' ? '#D97706' : '#0F766E'),
        maxBarThickness: 26
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, max: 100, ticks: { callback: value => `${value}%` } },
        y: { grid: { display: false } }
      }
    }
  });
  setFactStrip('worker-signal-facts', [
    { label: t('fact.strongest_signal', 'Strongest signal'), value: strongestSignal ? strongestSignal.label : '—', tone: strongestSignal?.level === 'critical' ? 'danger' : strongestSignal?.level === 'elevated' ? 'warn' : 'good' },
    { label: t('fact.trigger_readiness', 'Trigger readiness'), value: `${signals.filter(signal => signal.score >= 75).length}/5` },
    { label: t('fact.zone_exposure', 'Zone exposure'), value: strongestSignal ? t(`zone.level.${strongestSignal.level}`, strongestSignal.level) : '—' }
  ]);

  const paidClaims = (claims || []).filter(claim => claim.status === 'paid');
  const trend = paidClaims.slice(0, 6).reverse();
  renderChart('worker-claims-chart', {
    type: 'line',
    data: {
      labels: trend.length ? trend.map(claim => fDate(claim.created_at)) : [t('chart.no_claims', 'No claims')],
      datasets: [{
        label: t('chart.payout', 'Payout'),
        data: trend.length ? trend.map(claim => Number(claim.amount || 0)) : [0],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.12)',
        pointBackgroundColor: '#059669'
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { callback: value => f$(value) } }
      }
    }
  });
  setFactStrip('worker-claims-facts', [
    { label: t('fact.latest_payout', 'Latest payout'), value: paidClaims.length ? f$(paidClaims[0].amount) : '—', tone: 'good' },
    { label: t('fact.average_payout', 'Average payout'), value: paidClaims.length ? f$(average(paidClaims.map(claim => claim.amount))) : '—' },
    { label: t('fact.paid_claims', 'Paid claims'), value: String(paidClaims.length) }
  ]);
}

// ── Claims Page ──────────────────────────────────────────────────
async function loadClaimsPage() {
  if (!requireWorkerSession(t('tab.claims', 'Claims'))) return;
  const [res, pendingFeedbackRes] = await Promise.all([
    api('/api/claims/me', {}, 'worker'),
    api('/api/claims/feedback/pending', {}, 'worker'),
  ]);
  renderClaimsList('claims-list-full', Array.isArray(res) ? res : []);
  const supportNote = document.getElementById('claims-support-note');
  if (supportNote && state.supportInfo) {
    supportNote.textContent = t('support.review_note', 'Need a human review? Reach support at {phone} or {email}.', {
      phone: state.supportInfo.support_phone,
      email: state.supportInfo.support_email
    });
  }
  renderPendingFeedbackBanner(pendingFeedbackRes && !pendingFeedbackRes.detail ? pendingFeedbackRes : null);
}

// ── Premium Page ─────────────────────────────────────────────────
async function loadPremiumPage() {
  const res = await api('/api/premium/zones');
  if (!Array.isArray(res)) return;
  renderChart('premium-landscape-chart', {
    type: 'bar',
    data: {
      labels: res.map(zone => zone.zone),
      datasets: [
        {
          label: t('dash.weekly', 'Weekly Premium'),
          data: res.map(zone => Number(zone.final_premium || 0)),
          backgroundColor: res.map(zone => zone.risk_score >= 0.55 ? '#DC2626' : zone.risk_score >= 0.35 ? '#D97706' : '#0F766E')
        },
        {
          type: 'line',
          label: t('chart.risk_pct', 'Risk %'),
          data: res.map(zone => Math.round((zone.risk_score || 0) * 100)),
          yAxisID: 'r',
          borderColor: '#0F766E',
          backgroundColor: 'rgba(15, 118, 110, 0.12)',
          pointBackgroundColor: '#0F766E'
        }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { callback: value => f$(value) } },
        r: { position: 'right', beginAtZero: true, max: 100, grid: { display: false }, ticks: { callback: value => `${value}%` } }
      }
    }
  });
  const cheapestZone = minBy(res, zone => Number(zone.final_premium || 0));
  const costliestZone = maxBy(res, zone => Number(zone.final_premium || 0));
  setFactStrip('premium-landscape-facts', [
    { label: t('fact.cheapest_zone', 'Cheapest zone'), value: cheapestZone ? `${cheapestZone.zone} · ${f$(cheapestZone.final_premium)}` : '—', tone: 'good' },
    { label: t('fact.costliest_zone', 'Costliest zone'), value: costliestZone ? `${costliestZone.zone} · ${f$(costliestZone.final_premium)}` : '—', tone: 'danger' },
    { label: t('fact.zone_spread', 'Zone spread'), value: cheapestZone && costliestZone ? f$(Number(costliestZone.final_premium || 0) - Number(cheapestZone.final_premium || 0)) : '—' }
  ]);
  const grid = document.getElementById('premium-zones-grid');
  if (grid) grid.innerHTML = res.map(z => {
    const tc = z.risk_score >= 0.55 ? 'tier-high' : z.risk_score >= 0.35 ? 'tier-medium' : 'tier-low';
    return `<div class="premium-zone-card"><div class="pzc-header"><span class="pzc-zone">${z.zone}</span><span class="pzc-premium">${f$(z.final_premium)}</span></div><div class="pzc-details"><div class="pzc-detail"><span>${t('prem.risk_score', 'Risk Score')}</span><span class="quote-tier ${tc}">${(z.risk_score*100).toFixed(0)}%</span></div><div class="pzc-detail"><span>${t('prem.zone_mult', 'Zone Mult.')}</span><span>${z.zone_multiplier}×</span></div><div class="pzc-detail"><span>${t('prem.season', 'Season')}</span><span>${z.seasonal_factor}×</span></div><div class="pzc-detail"><span>${t('prem.savings', 'Savings')}</span><span style="color:var(--green)">${f$(z.savings_vs_max)}</span></div></div></div>`;
  }).join('');
}

// ── Settings Page ────────────────────────────────────────────────
async function loadSettingsPage() {
  if (!requireWorkerSession(t('tab.settings', 'Settings'))) return;
  const d = document.getElementById('settings-account-summary');
  if (d && state.worker) d.innerHTML = `
    <div class="detail-row"><span>${t('settings.name', 'Name')}</span><strong>${state.worker.name}</strong></div>
    <div class="detail-row"><span>${t('settings.phone', 'Phone')}</span><strong>${state.worker.phone}</strong></div>
    <div class="detail-row"><span>${t('settings.zone', 'Zone')}</span><strong>${state.worker.zone}</strong></div>
    <div class="detail-row"><span>${t('settings.platform', 'Platform')}</span><strong>${state.worker.platform}</strong></div>
    <div class="detail-row"><span>${t('settings.risk_tier', 'Risk Tier')}</span><strong>${state.worker.risk_tier}</strong></div>
    <div class="detail-row"><span>${t('settings.credit', 'Renewal Credit')}</span><strong>${f$(state.worker.renewal_credit_balance || 0)}</strong></div>
    <div class="detail-row"><span>${t('settings.kyc', 'KYC')}</span><strong>${state.worker.aadhaar_verified ? t('common.verified', 'Verified') : t('common.pending', 'Pending')}</strong></div>`;
  const s = document.getElementById('settings-support-details');
  if (s && state.supportInfo) s.innerHTML = `
    <div class="detail-row"><span>${t('settings.email', 'Email')}</span><strong>${state.supportInfo.support_email}</strong></div>
    <div class="detail-row"><span>${t('settings.phone', 'Phone')}</span><strong>${state.supportInfo.support_phone}</strong></div>
    <div class="detail-row"><span>${t('settings.hours', 'Hours')}</span><strong>${state.supportInfo.support_hours}</strong></div>
    <p class="settings-note">${state.supportInfo.automated_decisions_notice || ''}</p>`;
}

async function deleteAccount() {
  const otp = document.getElementById('delete-account-otp').value;
  const confirm = document.getElementById('delete-account-confirm').value;
  if (!otp || confirm !== 'DELETE') return showToast(t('toast.enter_delete', 'Enter OTP and type DELETE'));
  const res = await api('/api/auth/account', { method: 'DELETE', body: JSON.stringify({ otp, confirmation_text: confirm }) }, 'worker');
  if (res.detail && !res.success) return showToast(res.detail);
  showToast(t('toast.account_deleted', 'Account deleted.'));
  clearWorkerSession();
  document.getElementById('sub-onboarding').click();
}

async function renewPolicy() {
  if (!requireWorkerSession(t('dash.renew', 'Renew')) || !state.policy?.id) return;
  const res = await api(`/api/policies/${state.policy.id}/renew`, { method: 'PUT' }, 'worker');
  if (res.detail) return showToast(res.detail);
  if (state.worker) state.worker.renewal_credit_balance = res.renewal_credit_balance || 0;
  showToast(res.renewal_credit_applied > 0
    ? `${t('toast.policy_renewed', 'Policy renewed for another week!')} ${f$(res.renewal_credit_applied)} ${t('settings.credit', 'Renewal Credit').toLowerCase()} used.`
    : t('toast.policy_renewed', 'Policy renewed for another week!'));
  await loadDashboard();
}

async function pausePolicy() {
  if (!requireWorkerSession(t('dash.pause', 'Pause')) || !state.policy?.id) return;
  const res = await api(`/api/policies/${state.policy.id}/pause`, { method: 'PUT' }, 'worker');
  if (res.detail) return showToast(res.detail);
  showToast(t('toast.policy_paused', 'Policy paused. You can resume anytime.'));
  await loadDashboard();
}

// ── Admin Portal ─────────────────────────────────────────────────
async function adminLogin() {
  const u = document.getElementById('admin-username').value;
  const p = document.getElementById('admin-password').value;
  if (!u || !p) return showToast(t('toast.enter_credentials', 'Enter credentials'));
  const res = await api('/api/auth/admin/login', { method: 'POST', body: JSON.stringify({ username: u, password: p }) });
  if (res.detail) return showToast(res.detail);
  setAdminSession(res.access_token);
  showToast(t('toast.admin_session_started', 'Admin session started'));
  loadAdminDashboard();
}

function logoutAdmin() { clearAdminSession(t('toast.admin_session_ended', 'Admin session ended')); }

async function loadAdminDashboard() {
  if (!state.adminToken) return;
  const [res, analytics, liveIntel] = await Promise.all([
    api('/api/admin/dashboard', {}, 'admin'),
    api('/api/admin/analytics', {}, 'admin'),
    api('/api/admin/live-zone-intelligence', {}, 'admin'),
  ]);
  if (res.detail) return;
  const kpis = [
    { label: t('admin.kpi.total_workers', 'Total Workers'), value: res.total_workers || 0, change: t('admin.kpi.active_platform', 'Active platform'), css: 'kpi-good' },
    { label: t('admin.kpi.active_policies', 'Active Policies'), value: res.active_policies || 0, change: t('admin.kpi.zones_covered', '{count} zones covered', { count: String(res.zones_covered || 0) }), css: 'kpi-good' },
    { label: t('admin.kpi.total_claims', 'Total Claims'), value: res.total_claims || 0, change: t('admin.kpi.pending', '{count} pending', { count: String(res.claims_pending || 0) }), css: res.claims_pending > 0 ? 'kpi-warn' : 'kpi-good' },
    { label: t('admin.kpi.total_payouts', 'Total Payouts'), value: f$(res.total_claims_amount || 0), change: t('admin.kpi.completed', '{count} completed', { count: String(res.claims_paid || 0) }), css: 'kpi-good' },
    { label: t('admin.kpi.active_triggers', 'Active Triggers'), value: res.active_triggers || 0, change: t('admin.kpi.loss_ratio', 'Loss ratio {value}%', { value: String(res.combined_loss_ratio || 0) }), css: res.active_triggers > 0 ? 'kpi-warn' : 'kpi-good' },
  ];
  const kpiGrid = document.getElementById('kpi-grid');
  if (kpiGrid) kpiGrid.innerHTML = kpis.map(k => `<div class="kpi-card"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.value}</div><div class="kpi-change ${k.css}">${k.change}</div></div>`).join('');
  if (analytics && !analytics.detail) {
    renderAdminCharts(analytics);
    renderReadinessPanel('admin-readiness-panel', analytics.integrations || res.integrations || {}, analytics.runtime || res.runtime || {});
  } else {
    renderReadinessPanel('admin-readiness-panel', res.integrations || {}, res.runtime || {});
  }
  renderLiveZoneIntel(liveIntel && !liveIntel.detail ? liveIntel : null);
}

function renderAdminCharts(a) {
  const pipeline = a.claim_pipeline || {};
  const totalClaims = (pipeline.paid || 0) + (pipeline.auto_approved || 0) + (pipeline.pending_review || 0) + (pipeline.rejected || 0);
  renderChart('admin-pipeline-chart', {
    type: 'doughnut',
    data: {
      labels: [t('status.paid', 'PAID'), t('status.auto_approved', 'AUTO APPROVED'), t('status.pending_review', 'PENDING REVIEW'), t('status.rejected', 'REJECTED')],
      datasets: [{
        data: [pipeline.paid || 0, pipeline.auto_approved || 0, pipeline.pending_review || 0, pipeline.rejected || 0],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        gigBuddyCenterLabel: {
          lines: [
            { text: String(totalClaims), font: "800 28px Inter", color: '#0f172a' },
            { text: t('fact.total_claims', 'Total claims'), font: "700 11px Inter", color: '#64748b' }
          ]
        }
      }
    }
  });
  setFactStrip('admin-pipeline-facts', [
    { label: t('fact.total_claims', 'Total claims'), value: String(totalClaims) },
    { label: t('fact.auto_share', 'Straight-through share'), value: pct((pipeline.paid || 0) + (pipeline.auto_approved || 0), Math.max(totalClaims, 1)), tone: 'good' },
    { label: t('fact.review_queue', 'Review queue'), value: String((pipeline.pending_review || 0) + (pipeline.rejected || 0)), tone: pipeline.pending_review ? 'warn' : 'neutral' }
  ]);

  const premiumZones = a.premium_by_zone || [];
  const adminMinZone = minBy(premiumZones, zone => Number(zone.premium || 0));
  const adminMaxZone = maxBy(premiumZones, zone => Number(zone.premium || 0));
  const rankedPremiumZones = [...premiumZones].sort((left, right) => Number(right.premium || 0) - Number(left.premium || 0));
  renderChart('admin-zone-premium-chart', {
    type: 'bar',
    data: {
      labels: rankedPremiumZones.map(zone => zone.zone),
      datasets: [{
        label: t('admin.table.premium', 'Premium'),
        data: rankedPremiumZones.map(zone => Number(zone.premium || 0)),
        backgroundColor: rankedPremiumZones.map(zone => zone.risk_score >= 0.55 ? '#DC2626' : zone.risk_score >= 0.35 ? '#D97706' : '#0F6CBD'),
        maxBarThickness: 18
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, ticks: { callback: value => f$(value) } },
        y: { grid: { display: false } }
      }
    }
  });
  setFactStrip('admin-zone-premium-facts', [
    { label: t('fact.pricing_floor', 'Pricing floor'), value: adminMinZone ? f$(adminMinZone.premium) : '—', note: adminMinZone ? adminMinZone.zone : '', tone: 'good' },
    { label: t('fact.pricing_peak', 'Pricing peak'), value: adminMaxZone ? f$(adminMaxZone.premium) : '—', note: adminMaxZone ? adminMaxZone.zone : '', tone: 'danger' },
    { label: t('fact.active_gap', 'Active gap'), value: adminMinZone && adminMaxZone ? f$(Number(adminMaxZone.premium || 0) - Number(adminMinZone.premium || 0)) : '—' }
  ]);

  const dailyActivity = a.daily_activity || [];
  const busiestDay = maxBy(dailyActivity, day => Number(day.claims || 0) + Number(day.triggers || 0));
  renderChart('admin-daily-activity-chart', {
    type: 'bar',
    data: {
      labels: dailyActivity.map(day => fDate(day.date)),
      datasets: [
        { label: t('admin.metric.claims', 'Claims'), data: dailyActivity.map(day => day.claims || 0), backgroundColor: '#3B82F6' },
        { label: t('admin.metric.triggers', 'Triggers'), data: dailyActivity.map(day => day.triggers || 0), backgroundColor: '#F59E0B' },
        { type: 'line', label: t('chart.payout', 'Payout'), data: dailyActivity.map(day => Number(day.payouts || 0)), borderColor: '#10B981', pointBackgroundColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.12)', yAxisID: 'money' }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true },
        money: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { callback: value => f$(value) } }
      }
    }
  });
  setFactStrip('admin-daily-activity-facts', [
    { label: t('fact.busiest_day', 'Busiest day'), value: busiestDay ? fDate(busiestDay.date) : '—' },
    { label: t('fact.weekly_payouts', 'Weekly payouts'), value: f$(dailyActivity.reduce((sum, day) => sum + Number(day.payouts || 0), 0)), tone: 'good' },
    { label: t('fact.daily_claims_avg', 'Daily claims avg'), value: dailyActivity.length ? average(dailyActivity.map(day => day.claims || 0)).toFixed(1) : '0.0' }
  ]);
}

let adminMap = null;
const zoneCoords = {
  'Indiranagar': [12.9784, 77.6408],
  'Koramangala': [12.9279, 77.6271],
  'Whitefield': [12.9698, 77.7499],
  'Rajajinagar': [12.9982, 77.5530],
  'HSR Layout': [12.9121, 77.6446],
  'Marathahalli': [12.9569, 77.7011],
  'Electronic City': [12.8399, 77.6770],
  'Jayanagar': [12.9299, 77.5826]
};

function renderLiveZoneIntel(payload) {
    const meta = document.getElementById('zone-intel-meta');
    const summary = document.getElementById('zone-intel-summary');
    const grid = document.getElementById('zone-intel-grid');

    if (!payload || !Array.isArray(payload.zones) || !payload.zones.length) {
        if (meta) meta.textContent = t('admin.zone.live_loading', 'Live feeds loading');
        if (summary) summary.innerHTML = '';
        if (grid) grid.innerHTML = '';
        initAdminMap([]);
        return;
    }

    if (meta) {
        meta.textContent = `${payload.summary.zones_with_live_feeds}/${payload.summary.zones_monitored} ${t('admin.zone.live_feeds', 'Live feeds')} · ${t('admin.zone.updated', 'Updated {time}', { time: fRelative(payload.generated_at) })}`;
    }

    if (summary) {
        summary.innerHTML = `
          <div class="zone-intel-chip"><span>${t('admin.zone.monitored', 'Zones monitored')}</span><strong>${payload.summary.zones_monitored}</strong></div>
          <div class="zone-intel-chip"><span>${t('admin.zone.live_feeds', 'Live feeds')}</span><strong>${payload.summary.zones_with_live_feeds}</strong></div>
          <div class="zone-intel-chip is-critical"><span>${t('admin.zone.critical_now', 'Critical now')}</span><strong>${payload.summary.critical_zones}</strong></div>
          <div class="zone-intel-chip"><span>${t('admin.zone.workers_watch', 'Workers watched')}</span><strong>${payload.summary.workers_monitored}</strong></div>
        `;
    }

    if (grid) {
        grid.innerHTML = payload.zones.slice(0, 4).map(zone => {
            const triggers = zone.live_triggers?.length
                ? zone.live_triggers.map(trigger => `<span class="zone-trigger-pill ${trigger.severity}">${trigger.name} · ${Math.round((trigger.payout_pct || 0) * 100)}%</span>`).join('')
                : `<span class="zone-trigger-muted">${t('admin.zone.no_trigger', 'No dual-trigger match right now')}</span>`;
            const feedMode = zone.live_signal_count > 0 ? t('admin.zone.live', 'LIVE') : t('admin.zone.simulated', 'SIMULATED');
            return `
              <div class="zone-intel-card ${zone.status}">
                <div class="zone-intel-top">
                  <div>
                    <div class="zone-intel-name">${zone.zone}</div>
                    <div class="zone-intel-source">${t('admin.zone.feed', 'Feed')}: ${feedMode}</div>
                  </div>
                  <div class="zone-intel-risk">${t('admin.zone.risk', 'Risk')} ${zone.composite_risk_pct}%</div>
                </div>
                <div class="zone-intel-metrics">
                  <span>${t('admin.zone.rainfall', 'Rainfall')}: <strong>${zone.weather.rainfall_6hr_mm}mm</strong></span>
                  <span>${t('admin.zone.aqi', 'AQI')}: <strong>${zone.aqi.aqi}</strong></span>
                  <span>${t('admin.zone.delay', 'Delay')}: <strong>${zone.traffic.estimated_delay_minutes}m</strong></span>
                  <span>${t('admin.zone.flood', 'Flood')}: <strong>${zone.flood.water_level_m}m</strong></span>
                  <span>${t('admin.zone.workers', 'Workers')}: <strong>${zone.workers}</strong></span>
                  <span>${t('admin.zone.policies', 'Policies')}: <strong>${zone.active_policies}</strong></span>
                  <span>${t('admin.zone.claims', 'Claims')}: <strong>${zone.open_claims}</strong></span>
                  <span>${t('admin.zone.active_triggers', 'Active triggers')}: <strong>${zone.live_triggers.length}</strong></span>
                </div>
                <div class="zone-intel-triggers">${triggers}</div>
              </div>
            `;
        }).join('');
    }

    initAdminMap(payload.zones);
}

function initAdminMap(zones) {
    if (!document.getElementById('live-zone-map') || !window.L) return;
    if (!adminMap) {
        adminMap = L.map('live-zone-map', { zoomControl: false, attributionControl: false }).setView([12.9716, 77.5946], 11);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(adminMap);
    }
    
    adminMap.eachLayer((layer) => { if (layer instanceof L.CircleMarker) adminMap.removeLayer(layer); });
    const bounds = [];

    zones.forEach(zone => {
        const coords = zone.coordinates || zoneCoords[zone.zone];
        if (!coords) return;
        const latLng = [coords.lat, coords.lng];
        bounds.push(latLng);
        const color = zone.status === 'critical' ? '#EF4444' : zone.status === 'elevated' ? '#F59E0B' : '#10B981';
        const radius = Math.max(8, Math.min(18, 8 + Math.round((zone.composite_risk_pct || 0) / 12)));

        const marker = L.circleMarker(latLng, {
            radius,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.92,
            className: zone.status === 'critical' ? 'pulse-marker' : ''
        }).addTo(adminMap);

        const triggerText = zone.live_triggers?.length
          ? zone.live_triggers.map(trigger => trigger.name).join(', ')
          : t('admin.zone.no_trigger', 'No dual-trigger match right now');

        marker.bindPopup(`
          <div class="map-popup">
            <strong>${zone.zone}</strong>
            <div>${t('admin.zone.risk', 'Risk')}: ${zone.composite_risk_pct}%</div>
            <div>${t('admin.zone.rainfall', 'Rainfall')}: ${zone.weather.rainfall_6hr_mm}mm · ${t('admin.zone.aqi', 'AQI')}: ${zone.aqi.aqi}</div>
            <div>${t('admin.zone.delay', 'Delay')}: ${zone.traffic.estimated_delay_minutes}m · ${t('admin.zone.flood', 'Flood')}: ${zone.flood.water_level_m}m</div>
            <div>${t('admin.zone.active_triggers', 'Active triggers')}: ${triggerText}</div>
          </div>
        `);

        marker.bindTooltip(`<b>${zone.zone}</b><br>${t('admin.zone.risk', 'Risk')}: ${zone.composite_risk_pct}%`, {
            permanent: false,
            className: 'map-tooltip',
            direction: 'top'
        });
    });

    if (bounds.length) {
        adminMap.fitBounds(bounds, { padding: [24, 24] });
    } else {
        adminMap.setView([12.9716, 77.5946], 11);
    }

    requestAnimationFrame(() => {
        setTimeout(() => adminMap.invalidateSize(), 160);
    });
}

function toneFromMode(mode, configured) {
  if (mode === 'unavailable' || mode === 'error') return 'is-error';
  if (mode === 'disabled') return 'is-disabled';
  if (String(mode).includes('live')) return 'is-live';
  return configured ? 'is-live' : 'is-sandbox';
}

function renderReadinessPanel(id, integrations, runtime) {
  const el = document.getElementById(id);
  if (!el) return;
  const cards = Object.entries(integrations).map(([n, i]) => `<div class="readiness-card ${toneFromMode(i.mode, i.configured)}"><div class="readiness-top"><span class="readiness-name">${n.replace(/_/g,' ')}</span><span class="readiness-badge">${i.mode||'unknown'}</span></div><div class="readiness-meta"><span>${t('readiness.provider', 'Provider')}: <strong>${i.provider||t('common.na', 'N/A')}</strong></span><span>${t('readiness.configured', 'Configured')}: <strong>${yesNo(i.configured)}</strong></span></div></div>`);
  const jobs = Object.entries(runtime?.jobs || {}).map(([n, j]) => { const m = j.last_status || (j.enabled ? 'live' : 'disabled'); return `<div class="readiness-card ${toneFromMode(m, j.enabled)}"><div class="readiness-top"><span class="readiness-name">${n.replace(/_/g,' ')}</span><span class="readiness-badge">${m}</span></div><div class="readiness-meta"><span>${t('readiness.enabled', 'Enabled')}: <strong>${yesNo(j.enabled)}</strong></span><span>${t('readiness.last', 'Last')}: <strong>${fTime(j.last_run_at)}</strong></span></div></div>`; });
  el.innerHTML = [...cards, ...jobs].join('') || `<p class="muted-note">${t('admin.readiness.empty', 'No readiness data.')}</p>`;
}

async function loadAdminPolicies() {
  const res = await api('/api/policies/all', {}, 'admin');
  const el = document.getElementById('admin-policies-table');
  if (!el || !Array.isArray(res)) return;
  el.innerHTML = `<table class="data-table"><thead><tr><th>${t('admin.table.id', 'ID')}</th><th>${t('admin.table.worker', 'Worker')}</th><th>${t('admin.table.zone', 'Zone')}</th><th>${t('admin.table.premium', 'Premium')}</th><th>${t('admin.table.coverage', 'Coverage')}</th><th>${t('admin.table.status', 'Status')}</th><th>${t('admin.table.weeks', 'Weeks')}</th></tr></thead><tbody>${res.map(p => `<tr><td>${p.id}</td><td>${p.worker_name||'—'}</td><td>${p.zone||'—'}</td><td>${f$(p.weekly_premium)}</td><td>${f$(p.coverage_amount)}</td><td><span class="claim-status ${p.status==='active'?'status-paid':'status-pending'}">${statusName(p.status)}</span></td><td>${p.weeks_active||0}</td></tr>`).join('')}</tbody></table>`;
}

async function loadAdminClaims() {
  const res = await api('/api/claims/all/summary', {}, 'admin');
  if (!Array.isArray(res)) return;
  const pending = res.filter(c => c.status === 'pending_review');
  const q = document.getElementById('admin-claims-queue');
  if (q) q.innerHTML = pending.length ? pending.map(c => `<div class="review-card">
      <div class="review-header">
        <div>
          <strong>${c.worker_name}</strong>
          <div class="claim-meta">${triggerName(c.trigger_type)} · ${c.worker_zone}</div>
        </div>
        <div class="review-actions"><button class="btn-sm btn-approve" onclick="approveClaim(${c.id})">${t('admin.button.approve', 'Approve')}</button><button class="btn-sm btn-reject" onclick="rejectClaim(${c.id})">${t('admin.button.reject', 'Reject')}</button></div>
      </div>
      <div class="review-metrics">
        <span class="claim-meta-pill">${t('claims.fraud', 'Fraud')} ${(Number(c.fraud_score || 0) * 100).toFixed(0)}%</span>
        <span class="claim-meta-pill">${(c.fraud_tier || '').toUpperCase()}</span>
        <span class="claim-meta-pill">${f$(c.amount)}</span>
      </div>
    </div>`).join('') : `<p class="muted-note">${t('admin.claims_queue.empty', 'No claims pending review.')}</p>`;
  const all = document.getElementById('admin-all-claims');
  if (all) all.innerHTML = `<table class="data-table"><thead><tr><th>${t('admin.table.id', 'ID')}</th><th>${t('admin.table.worker', 'Worker')}</th><th>${t('admin.table.trigger', 'Trigger')}</th><th>${t('admin.table.amount', 'Amount')}</th><th>${t('admin.table.fraud', 'Fraud')}</th><th>${t('admin.table.status', 'Status')}</th><th>${t('admin.table.date', 'Date')}</th></tr></thead><tbody>${res.map(c => { const sc = c.status==='paid'?'status-paid':c.status==='pending_review'?'status-pending':'status-rejected'; return `<tr><td>${c.id}</td><td>${c.worker_name}</td><td><span class="table-token">${TRIGGER_BADGES[c.trigger_type]||'GB'}</span>${triggerName(c.trigger_type)}</td><td>${f$(c.amount)}</td><td><span class="quote-tier ${c.fraud_tier==='green'?'tier-low':c.fraud_tier==='amber'?'tier-medium':'tier-high'}">${c.fraud_tier.toUpperCase()} ${(c.fraud_score*100).toFixed(0)}%</span></td><td><span class="claim-status ${sc}">${statusName(c.status)}</span></td><td>${fDate(c.created_at)}</td></tr>`; }).join('')}</tbody></table>`;
}

async function approveClaim(id) {
  await api(`/api/claims/${id}/approve`, { method: 'PUT' }, 'admin');
  showToast(t('toast.claim_approved', 'Claim approved')); loadAdminClaims();
}

async function rejectClaim(id) {
  await api(`/api/claims/${id}/reject`, { method: 'PUT' }, 'admin');
  showToast(t('toast.claim_rejected', 'Claim rejected')); loadAdminClaims();
}

async function loadAdminTriggers() {
  const [configRes, historyRes] = await Promise.all([
    api('/api/triggers/config'),
    api('/api/triggers/history', {}, 'admin'),
  ]);
  const cfg = document.getElementById('trigger-config-table');
  if (cfg && configRes && !configRes.detail) {
    cfg.innerHTML = `<div class="trigger-config-grid">${Object.entries(configRes).map(([k,v]) => `<div class="trigger-config-item"><div class="tc-code">${TRIGGER_BADGES[k] || 'GB'}</div><div class="tc-name">${v.name}</div><div class="tc-desc">${v.description}</div><div class="tc-payout">${Math.round(v.payout_pct*100)}% payout</div></div>`).join('')}</div>`;
  }
  const hist = document.getElementById('trigger-history');
  if (hist && Array.isArray(historyRes)) {
    hist.innerHTML = historyRes.length ? `<table class="data-table"><thead><tr><th>${t('admin.table.type', 'Type')}</th><th>${t('admin.table.zone', 'Zone')}</th><th>${t('admin.table.severity', 'Severity')}</th><th>${t('admin.table.status', 'Status')}</th><th>${t('admin.table.description', 'Description')}</th><th>${t('admin.table.fired_at', 'Fired At')}</th></tr></thead><tbody>${historyRes.map(item => `<tr><td><span class="table-token">${TRIGGER_BADGES[item.type]||'GB'}</span>${triggerName(item.type)}</td><td>${item.zone}</td><td>${item.severity}</td><td>${item.status}</td><td>${item.description || t('trigger.description.default', 'Signal threshold met')}</td><td>${fDate(item.fired_at)}</td></tr>`).join('')}</tbody></table>` : `<p class="muted-note">${t('admin.trigger.history.empty', 'No triggers fired yet.')}</p>`;
  }
}

async function simulateTrigger() {
  const type = document.getElementById('sim-trigger-type').value;
  const zone = document.getElementById('sim-zone').value;
  const btn = document.getElementById('sim-btn');
  btn.disabled = true; btn.textContent = t('trigger.simulate_running', 'Running...');
  const res = await api(`/api/triggers/simulate/${encodeURIComponent(type)}?zone=${encodeURIComponent(zone)}`, { method: 'POST' }, 'admin');
  btn.disabled = false; btn.textContent = t('trigger.simulate_action', 'Run Trigger Simulation');
  const el = document.getElementById('trigger-result');
  if (!el) return;
  el.classList.remove('hidden');
  if (res.detail) { el.innerHTML = `<p>${res.detail}</p>`; return; }
  const badge = TRIGGER_BADGES[type] || 'GB';
  const trigger = res.trigger || {};
  el.innerHTML = `<h4><span class="table-token">${badge}</span>${trigger.id ? t('trigger.result.fired', 'Trigger Fired') : t('trigger.result.not_met', 'Trigger Not Met')}</h4>
    <div class="trigger-detail-grid">
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.zone', 'Zone')}</span><span class="trigger-detail-value">${trigger.zone || zone}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.type', 'Type')}</span><span class="trigger-detail-value">${triggerName(type)}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.severity', 'Severity')}</span><span class="trigger-detail-value">${trigger.severity || t('common.na', 'N/A')}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.payout', 'Payout')}</span><span class="trigger-detail-value">${Math.round((trigger.payout_percentage||0)*100)}%</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.primary', 'Primary')}</span><span class="trigger-detail-value">${trigger.primary || '—'}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.secondary', 'Secondary')}</span><span class="trigger-detail-value">${trigger.secondary || '—'}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">${t('trigger.result.claims_processed', 'Claims Processed')}</span><span class="trigger-detail-value">${res.claims_processed || 0}</span></div>
    </div>`;
  if (trigger.id) showPush(badge, `${triggerName(type)} · ${zone}`, t('trigger.push.body', 'Severity: {severity}. Claims are being processed for affected workers.', { severity: trigger.severity || t('common.na', 'N/A') }));
}

async function loadAdminAnalytics() {
  const res = await api('/api/admin/analytics', {}, 'admin');
  if (res.detail) return;
  const premiumByZone = res.premium_by_zone || [];
  const riskiestZone = maxBy(premiumByZone, zone => Number(zone.risk_score || 0));
  const highestPremiumZone = maxBy(premiumByZone, zone => Number(zone.premium || 0));
  renderChart('analytics-premium-chart', {
    type: 'bar',
    data: {
      labels: premiumByZone.map(zone => zone.zone),
      datasets: [
        { label: t('admin.table.premium', 'Premium'), data: premiumByZone.map(zone => Number(zone.premium || 0)), backgroundColor: '#0F6CBD' },
        { type: 'line', label: t('chart.risk_pct', 'Risk %'), data: premiumByZone.map(zone => Math.round((zone.risk_score || 0) * 100)), yAxisID: 'r', borderColor: '#134E4A', backgroundColor: 'rgba(19, 78, 74, 0.1)', pointBackgroundColor: '#134E4A' }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { callback: value => f$(value) } },
        r: { position: 'right', beginAtZero: true, max: 100, grid: { display: false }, ticks: { callback: value => `${value}%` } }
      }
    }
  });
  setFactStrip('analytics-premium-facts', [
    { label: t('fact.riskiest_zone', 'Riskiest zone'), value: riskiestZone ? `${riskiestZone.zone} · ${Math.round((riskiestZone.risk_score || 0) * 100)}%` : '—', tone: 'danger' },
    { label: t('fact.pricing_peak', 'Pricing peak'), value: highestPremiumZone ? `${highestPremiumZone.zone} · ${f$(highestPremiumZone.premium)}` : '—' },
    { label: t('fact.rate_adequacy', 'Rate adequacy'), value: premiumByZone.length ? `${Math.round(average(premiumByZone.map(zone => Number(zone.risk_score || 0))) * 100)}%` : '—' }
  ]);

  const zoneDistribution = res.zone_distribution || [];
  const highestDensity = maxBy(zoneDistribution, zone => Number(zone.workers || 0));
  renderChart('analytics-zone-chart', {
    type: 'bar',
    data: {
      labels: zoneDistribution.map(item => item.zone),
      datasets: [{ label: t('admin.metric.workers', 'Workers'), data: zoneDistribution.map(item => Number(item.workers || 0)), backgroundColor: '#0F766E', maxBarThickness: 22 }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
  });
  setFactStrip('analytics-zone-facts', [
    { label: t('fact.highest_density', 'Highest density'), value: highestDensity ? `${highestDensity.zone} · ${highestDensity.workers}` : '—', tone: 'good' },
    { label: t('fact.total_workers', 'Total workers'), value: String(zoneDistribution.reduce((sum, zone) => sum + Number(zone.workers || 0), 0)) },
    { label: t('fact.zone_spread', 'Zone spread'), value: String(zoneDistribution.length) }
  ]);

  const triggerFrequency = res.trigger_frequency || [];
  const mostCommonTrigger = maxBy(triggerFrequency, item => Number(item.count || 0));
  renderChart('analytics-trigger-chart', {
    type: 'bar',
    data: {
      labels: triggerFrequency.map(item => triggerName(item.type)),
      datasets: [{ label: t('admin.metric.triggers', 'Triggers'), data: triggerFrequency.map(item => Number(item.count || 0)), backgroundColor: ['#0F6CBD', '#D97706', '#DC2626', '#059669', '#0F766E'] }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
  });
  setFactStrip('analytics-trigger-facts', [
    { label: t('fact.most_common_trigger', 'Most common trigger'), value: mostCommonTrigger ? `${triggerName(mostCommonTrigger.type)} · ${mostCommonTrigger.count}` : '—', tone: 'warn' },
    { label: t('fact.trigger_volume', 'Trigger volume'), value: String(triggerFrequency.reduce((sum, item) => sum + Number(item.count || 0), 0)) },
    { label: t('fact.trigger_modes', 'Trigger modes'), value: String(triggerFrequency.length) }
  ]);

  const fraudDistribution = res.fraud_distribution || [];
  const totalReviewed = fraudDistribution.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const greenCount = (fraudDistribution.find(item => item.tier === 'green') || {}).count || 0;
  const redCount = (fraudDistribution.find(item => item.tier === 'red') || {}).count || 0;
  renderChart('analytics-fraud-chart', {
    type: 'doughnut',
    data: {
      labels: fraudDistribution.map(item => item.tier.toUpperCase()),
      datasets: [{ data: fraudDistribution.map(item => Number(item.count || 0)), backgroundColor: ['#059669', '#D97706', '#DC2626'] }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        gigBuddyCenterLabel: {
          lines: [
            { text: String(totalReviewed), font: "800 28px Inter", color: '#0f172a' },
            { text: t('fact.reviewed_claims', 'Reviewed claims'), font: "700 11px Inter", color: '#64748b' }
          ]
        }
      }
    }
  });
  setFactStrip('analytics-fraud-facts', [
    { label: t('fact.green_share', 'GREEN share'), value: pct(greenCount, Math.max(totalReviewed, 1)), tone: 'good' },
    { label: t('fact.red_share', 'RED share'), value: pct(redCount, Math.max(totalReviewed, 1)), tone: redCount ? 'danger' : 'neutral' },
    { label: t('fact.reviewed_claims', 'Reviewed claims'), value: String(totalReviewed) }
  ]);

  const analyticsActivity = res.daily_activity || [];
  const busiestAnalyticsDay = maxBy(analyticsActivity, day => Number(day.claims || 0) + Number(day.payouts || 0));
  renderChart('analytics-activity-chart', {
    type: 'line',
    data: {
      labels: analyticsActivity.map(day => fDate(day.date)),
      datasets: [
        { label: t('admin.metric.claims', 'Claims'), data: analyticsActivity.map(day => Number(day.claims || 0)), borderColor: '#0F6CBD', backgroundColor: 'rgba(15, 108, 189, 0.1)', pointBackgroundColor: '#0F6CBD' },
        { label: t('chart.payout', 'Payout'), data: analyticsActivity.map(day => Number(day.payouts || 0)), borderColor: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.08)', pointBackgroundColor: '#059669', yAxisID: 'money' }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true },
        money: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { callback: value => f$(value) } }
      }
    }
  });
  setFactStrip('analytics-activity-facts', [
    { label: t('fact.busiest_day', 'Busiest day'), value: busiestAnalyticsDay ? fDate(busiestAnalyticsDay.date) : '—' },
    { label: t('fact.weekly_payouts', 'Weekly payouts'), value: f$(analyticsActivity.reduce((sum, day) => sum + Number(day.payouts || 0), 0)), tone: 'good' },
    { label: t('fact.daily_claims_avg', 'Daily claims avg'), value: analyticsActivity.length ? average(analyticsActivity.map(day => day.claims || 0)).toFixed(1) : '0.0' }
  ]);
  renderZoneHeatmap('analytics-heatmap', res.zone_heatmap || []);
  renderReadinessPanel('analytics-runtime-panel', res.integrations || {}, res.runtime || {});
}

function renderZoneHeatmap(id, zones) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!zones.length) { el.innerHTML = `<p class="muted-note">${t('admin.zone.empty', 'No zone data.')}</p>`; return; }
  el.innerHTML = zones.map(z => { const pressure = (z.claims||0)+(z.triggers||0); const tone = pressure>=6?'high':pressure>=3?'medium':'low'; return `<div class="heatmap-card ${tone}"><h4>${z.zone}</h4><div class="heatmap-stats"><span>${t('admin.metric.workers', 'Workers')}: <strong>${z.workers}</strong></span><span>${t('admin.metric.triggers', 'Triggers')}: <strong>${z.triggers}</strong></span><span>${t('admin.metric.claims', 'Claims')}: <strong>${z.claims}</strong></span></div></div>`; }).join('');
}

// ── Init ─────────────────────────────────────────────────────────
async function loadSupportInfo() {
  const res = await api('/api/auth/support');
  if (res && !res.detail) state.supportInfo = res;
}

document.addEventListener('DOMContentLoaded', async () => {
  setLanguage(currentLang);
  syncAdminUI();
  await loadSupportInfo();
  if (state.authToken) {
    const res = await api('/api/auth/me', {}, 'worker');
    if (res && !res.detail) { state.worker = res; state.workerId = res.id; }
    else clearWorkerSession();
  }
  if (state.adminToken) {
    const res = await api('/api/admin/dashboard', {}, 'admin');
    if (!res || res.detail) clearAdminSession();
  }
});
