/* ═══════════════════════════════════════════════════════════════════
   GigShield — Premium Frontend Application
   DEVTrails 2026 · Phase 2
   ═══════════════════════════════════════════════════════════════════ */

// ── i18n Translations ────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    "nav.worker": "Worker App", "nav.admin": "Admin Portal",
    "tab.onboarding": "Onboarding", "tab.dashboard": "Dashboard", "tab.claims": "Claims", "tab.premium": "Premium", "tab.settings": "Settings",
    "hero.title": "When it rains, your income doesn't have to stop.",
    "hero.subtitle": "GigShield automatically detects weather disruptions and sends income-replacement payouts to your UPI — no claims, no paperwork, no waiting.",
    "hero.stat1": "Max weekly premium", "hero.stat2": "Payout SLA", "hero.stat3": "Claims to file",
    "trust.1.title": "Zero-Touch Claims", "trust.1.desc": "Payouts triggered automatically by weather APIs — no forms ever",
    "trust.2.title": "AI-Powered Pricing", "trust.2.desc": "XGBoost ML model calculates fair premiums based on real risk data",
    "trust.3.title": "Dual-Trigger Verified", "trust.3.desc": "Two independent data sources must confirm before any payout fires",
    "reg.title": "Worker Registration", "reg.desc": "Enter your details to get started",
    "reg.name": "Full Name", "reg.phone": "Phone Number", "reg.platform": "Platform", "reg.zone": "Zone",
    "reg.income": "Weekly Income (₹)", "reg.vehicle": "Vehicle", "reg.submit": "Register & Get OTP",
    "reg.login_link": "Already have an account? Login",
    "login.title": "Worker Login", "login.desc": "Welcome back to GigShield",
    "login.phone": "Phone Number", "login.otp": "OTP", "login.hint": "Request a one-time password to sign in.",
    "login.send_otp": "Send OTP", "login.submit": "Login", "login.register_link": "New worker? Register here",
    "consent.terms": "I agree to the Terms of Service.",
    "consent.privacy": "I have reviewed the Privacy Notice and support contact details.",
    "consent.ai": "I understand pricing and fraud checks may use automated models, with human review available on appeal.",
    "otp.title": "Verify Phone", "otp.desc": "Enter the OTP sent to your phone", "otp.hint": "A 4-digit code has been sent via SMS.", "otp.resend": "Resend OTP", "otp.verify": "Verify OTP",
    "kyc.title": "Aadhaar e-KYC", "kyc.desc": "Instant paperless verification via DigiLocker", "kyc.aadhaar": "Aadhaar Number", "kyc.verify": "Verify Aadhaar",
    "quote.title": "Your Risk Profile & Premium", "quote.desc": "AI-powered pricing based on zone risk factors", "quote.accept": "Accept & Setup UPI",
    "upi.title": "UPI AutoPay Setup", "upi.desc": "Set up weekly automatic payment", "upi.id": "UPI ID",
    "upi.deduction": "Weekly Deduction", "upi.day": "Deduction Day", "upi.lockin": "Lock-in", "upi.none": "None — pause anytime", "upi.complete": "Complete Onboarding & Buy Policy",
    "success.title": "Welcome to GigShield!", "success.desc": "Your policy is now ACTIVE. You're covered.", "success.go": "Go to Dashboard",
    "dash.greeting": "Welcome", "dash.active": "Policy Active", "dash.logout": "Logout",
    "dash.policy": "Active Policy", "dash.weekly": "Weekly Premium", "dash.coverage": "Coverage",
    "dash.weeks": "Weeks Active", "dash.paid": "Total Paid", "dash.claimed": "Total Claimed",
    "dash.renew": "Renew", "dash.pause": "Pause", "dash.zone_status": "Zone Live Status",
    "dash.recent": "Recent Claims",
    "claims.title": "Claims History", "claims.desc": "Zero-touch claims — automatically processed when triggers fire",
    "prem.title": "Dynamic Premium Pricing", "prem.desc": "XGBoost ML model calculates zone-specific premiums from real environmental data",
    "prem.how": "How the ML Model Works",
    "settings.title": "Settings & Privacy", "settings.desc": "Account control, support, and data management",
    "settings.account": "Account", "settings.support": "Support & Human Review",
    "settings.delete": "Delete Account", "settings.delete_btn": "Delete My Account",
    "push.alert": "Weather alert detected in your area!", "push.payout": "Your GigShield payout is being processed.",
    "push.confirmed": "has been sent to your UPI.",
  },
  hi: {
    "nav.worker": "कर्मचारी ऐप", "nav.admin": "एडमिन पोर्टल",
    "tab.onboarding": "ऑनबोर्डिंग", "tab.dashboard": "डैशबोर्ड", "tab.claims": "दावे", "tab.premium": "प्रीमियम", "tab.settings": "सेटिंग्स",
    "hero.title": "जब बारिश होती है, तो आपकी आय को रुकना नहीं चाहिए।",
    "hero.subtitle": "GigShield स्वचालित रूप से मौसम व्यवधानों का पता लगाता है और आपके UPI पर आय-प्रतिस्थापन भुगतान भेजता है।",
    "hero.stat1": "अधिकतम साप्ताहिक प्रीमियम", "hero.stat2": "भुगतान SLA", "hero.stat3": "दावे दाखिल करने",
    "reg.title": "कर्मचारी पंजीकरण", "reg.desc": "शुरू करने के लिए अपना विवरण दर्ज करें",
    "reg.name": "पूरा नाम", "reg.phone": "फ़ोन नंबर", "reg.submit": "पंजीकरण करें और OTP प्राप्त करें",
    "login.title": "कर्मचारी लॉगिन", "login.desc": "GigShield में वापस स्वागत है",
    "otp.title": "फ़ोन सत्यापित करें", "otp.verify": "OTP सत्यापित करें",
    "kyc.title": "आधार e-KYC", "kyc.verify": "आधार सत्यापित करें",
    "success.title": "GigShield में आपका स्वागत है!", "success.go": "डैशबोर्ड पर जाएं",
    "dash.greeting": "स्वागत है", "dash.active": "पॉलिसी सक्रिय",
    "claims.title": "दावे इतिहास", "prem.title": "गतिशील प्रीमियम मूल्य निर्धारण",
    "settings.title": "सेटिंग्स और गोपनीयता",
  },
  kn: {
    "nav.worker": "ಕಾರ್ಮಿಕ ಅಪ್ಲಿಕೇಶನ್", "nav.admin": "ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್",
    "tab.onboarding": "ಆನ್‌ಬೋರ್ಡಿಂಗ್", "tab.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", "tab.claims": "ಕ್ಲೈಮ್‌ಗಳು", "tab.premium": "ಪ್ರೀಮಿಯಂ", "tab.settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "hero.title": "ಮಳೆ ಬಂದಾಗ, ನಿಮ್ಮ ಆದಾಯ ನಿಲ್ಲಬೇಕಾಗಿಲ್ಲ.",
    "hero.subtitle": "GigShield ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹವಾಮಾನ ಅಡೆತಡೆಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ನಿಮ್ಮ UPI ಗೆ ಆದಾಯ-ಬದಲಿ ಪಾವತಿಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ.",
    "hero.stat1": "ಗರಿಷ್ಠ ಸಾಪ್ತಾಹಿಕ ಪ್ರೀಮಿಯಂ", "hero.stat2": "ಪಾವತಿ SLA", "hero.stat3": "ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು",
    "reg.title": "ಕಾರ್ಮಿಕ ನೋಂದಣಿ", "reg.desc": "ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    "success.title": "GigShield ಗೆ ಸ್ವಾಗತ!", "success.go": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ",
    "dash.greeting": "ಸ್ವಾಗತ", "dash.active": "ಪಾಲಿಸಿ ಸಕ್ರಿಯ",
    "claims.title": "ಕ್ಲೈಮ್ ಇತಿಹಾಸ", "prem.title": "ಡೈನಾಮಿಕ್ ಪ್ರೀಮಿಯಂ ಬೆಲೆ",
    "settings.title": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಗೌಪ್ಯತೆ",
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key];
    if (text) el.textContent = text;
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ── API Layer ────────────────────────────────────────────────────
function getApiBase() {
  if (window.GIGSHIELD_API_BASE) return window.GIGSHIELD_API_BASE.replace(/\/$/, '');

  if (window.location.protocol === 'file:') {
    return 'http://127.0.0.1:8000';
  }

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal && window.location.port !== '8000') {
    return `http://${window.location.hostname}:8000`;
  }

  return window.location.origin.replace(/\/$/, '');
}

const API = getApiBase();

// ── State ────────────────────────────────────────────────────────
let state = {
  currentStep: 1, worker: null, workerId: null, policy: null, premiumData: null,
  authToken: localStorage.getItem('gigshield.workerToken'),
  adminToken: localStorage.getItem('gigshield.adminToken'),
  supportInfo: null, registrationOtpSession: null, loginOtpSession: null, charts: {},
};

if (window.Chart) {
  Chart.defaults.color = '#64748b';
  Chart.defaults.borderColor = '#e2e8f0';
  Chart.defaults.font.family = "'Inter', sans-serif";
}

const TRIGGER_EMOJI = { rainfall: '🌧️', aqi: '🌫️', heat: '🔥', curfew: '🚧', flooding: '🌊' };
const TRIGGER_NAMES = { rainfall: 'Heavy Rainfall', aqi: 'Hazardous AQI', heat: 'Extreme Heat', curfew: 'Curfew / Strike', flooding: 'Urban Flooding' };

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
  if (token) localStorage.setItem('gigshield.workerToken', token);
}

function clearWorkerSession(msg) {
  state.authToken = null; state.worker = null; state.workerId = null; state.policy = null;
  localStorage.removeItem('gigshield.workerToken');
  if (msg) showToast(msg);
}

function setAdminSession(token) { state.adminToken = token; localStorage.setItem('gigshield.adminToken', token); syncAdminUI(); }
function clearAdminSession(msg) { state.adminToken = null; localStorage.removeItem('gigshield.adminToken'); syncAdminUI(); if (msg) showToast(msg); }

function requireWorkerSession(label = 'continue') {
  if (state.authToken) return true;
  document.getElementById('nav-worker').click();
  document.getElementById('sub-onboarding').click();
  toggleAuth('login');
  showToast(`Please sign in to ${label}.`);
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
  state.charts[id] = new Chart(c, {
    ...config,
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8, padding: 16 } }, ...(config.options?.plugins || {}) },
      ...(config.options || {}),
    },
  });
}

function f$(v) { return `₹${Number(v||0).toLocaleString('en-IN',{maximumFractionDigits:0})}`; }
function fDate(v) { if (!v) return 'Now'; return new Date(v).toLocaleDateString('en-IN',{month:'short',day:'numeric'}); }
function fTime(v) { if (!v) return 'Not yet'; return new Date(v).toLocaleString('en-IN',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }

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
function answerSurvey(q, val) { /* track survey answers */ }
function dismissSurvey() { document.getElementById('micro-survey-banner').classList.add('hidden'); }
function submitSurvey() { showToast('Thank you! ₹5 discount applied to next renewal.'); dismissSurvey(); }

// ── OTP auto-advance ─────────────────────────────────────────────
document.querySelectorAll('.otp-input').forEach((inp, i, arr) => {
  inp.addEventListener('input', () => { if (inp.value.length === 1 && i < arr.length - 1) arr[i+1].focus(); });
  inp.addEventListener('keydown', e => { if (e.key === 'Backspace' && !inp.value && i > 0) arr[i-1].focus(); });
});

// ── Auth Flows ───────────────────────────────────────────────────
async function registerWorker() {
  const name = document.getElementById('reg-name').value;
  const phone = document.getElementById('reg-phone').value;
  const platform = document.getElementById('reg-platform').value;
  const zone = document.getElementById('reg-zone').value;
  const income = document.getElementById('reg-income').value;
  const vehicle = document.getElementById('reg-vehicle').value;
  const t = document.getElementById('reg-consent-terms').checked;
  const p = document.getElementById('reg-consent-privacy').checked;
  const a = document.getElementById('reg-consent-automation').checked;
  if (!name || !phone) return showToast('Please fill in all fields');
  if (!t || !p || !a) return showToast('Please accept all consent items');
  const res = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, phone, zone, city: 'Bengaluru', platform, partner_id: `GS-${Date.now()}`, vehicle_type: vehicle, weekly_income: Number(income) || 5200, accepted_terms: t, accepted_privacy: p, accepted_automated_decisions: a }) });
  if (res.detail) return showToast('⚠️ ' + res.detail);
  state.worker = res; state.workerId = res.id;
  if (res.otp_session) { state.registrationOtpSession = res.otp_session; updateOtpStatus('register-otp-status', res.otp_session); }
  goToStep(2);
}

function updateOtpStatus(id, meta) {
  const el = document.getElementById(id);
  if (!el || !meta) return;
  const parts = [`Provider: ${meta.provider_name || meta.provider_mode || 'otp'}`, `Expires: ${Math.round((meta.expires_in||0)/60)||1}m`];
  if (meta.demo_otp) parts.push(`Demo OTP: ${meta.demo_otp}`);
  el.textContent = parts.join(' · ');
}

async function requestLoginOtp() {
  const phone = document.getElementById('login-phone').value;
  if (!phone) return showToast('Enter your phone number');
  const res = await api('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone, purpose: 'login' }) });
  if (res?.success) { state.loginOtpSession = res; updateOtpStatus('login-otp-status', res); showToast('OTP sent'); }
  else showToast('⚠️ ' + (res?.detail || 'Failed'));
}

async function resendRegistrationOtp() {
  const phone = state.worker?.phone;
  if (!phone) return showToast('Register first');
  const res = await api('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone, purpose: 'registration' }) });
  if (res?.success) { state.registrationOtpSession = res; updateOtpStatus('register-otp-status', res); showToast('OTP resent'); }
  else showToast('⚠️ ' + (res?.detail || 'Failed'));
}

async function loginWorker() {
  const phone = document.getElementById('login-phone').value;
  const otp = document.getElementById('login-otp').value;
  if (!phone || !otp) return showToast('Enter phone and OTP');
  const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ phone, otp, session_id: state.loginOtpSession?.session_id || '' }) });
  if (res.detail) return showToast('⚠️ ' + res.detail);
  setWorkerSession(res.access_token, res.worker);
  showToast('Welcome back!');
  if (res.has_active_policy) {
    document.getElementById('sub-dashboard').click();
  } else {
    document.getElementById('sub-onboarding').click();
  }
}

async function verifyOTP() {
  const otp = [1,2,3,4].map(i => document.getElementById(`otp-${i}`).value).join('');
  if (otp.length !== 4) return showToast('Enter 4-digit OTP');
  const res = await api('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone: state.worker?.phone, otp, session_id: state.registrationOtpSession?.session_id || '' }) });
  if (res.detail) return showToast('⚠️ ' + res.detail);
  setWorkerSession(res.access_token, res.worker);
  goToStep(3);
}

async function verifyKYC() {
  const aadhaar = document.getElementById('kyc-aadhaar').value;
  if (!aadhaar || aadhaar.length < 12) return showToast('Enter 12-digit Aadhaar');
  const res = await api('/api/auth/kyc', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, aadhaar_number: aadhaar }) }, 'worker');
  if (res.detail) return showToast('⚠️ ' + res.detail);
  showToast('✅ KYC Verified!');
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
  const container = document.getElementById('premium-quote-card');
  if (!container) return;
  const tierClass = res.risk_score >= 0.55 ? 'tier-high' : res.risk_score >= 0.35 ? 'tier-medium' : 'tier-low';
  const tierLabel = res.risk_score >= 0.55 ? 'HIGH RISK' : res.risk_score >= 0.35 ? 'MEDIUM' : 'LOW RISK';
  container.innerHTML = `
    <div class="quote-header"><span class="quote-zone">📍 ${zone}</span><span class="quote-tier ${tierClass}">${tierLabel}</span></div>
    <div class="quote-premium"><div class="quote-amount">${f$(res.final_premium)}</div><div class="quote-period">per week · auto-debited Monday 06:00</div></div>
    <div class="quote-factors">${(res.factors||[]).map(f => {
      const color = f.value > 0.6 ? '#ef4444' : f.value > 0.4 ? '#f59e0b' : '#22c55e';
      return `<div class="factor-row"><span class="factor-name">${f.factor_name}</span><div class="factor-bar"><div class="factor-fill" style="width:${f.value*100}%;background:${color}"></div></div></div>`;
    }).join('')}</div>
    <div style="margin-top:14px;font-size:12px;color:var(--text-dim)">Model: ${res.model} · Risk Score: ${(res.risk_score*100).toFixed(1)}%</div>`;
  const autopay = document.getElementById('autopay-amount');
  if (autopay) autopay.textContent = f$(res.final_premium);
}

async function setupUPI() {
  const upi = document.getElementById('upi-id').value;
  if (!upi) return showToast('Enter UPI ID');
  const res = await api('/api/auth/setup-upi', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, upi_id: upi }) }, 'worker');
  if (res.detail) return showToast('⚠️ ' + res.detail);
  const policyRes = await api('/api/policies/create', { method: 'POST', body: JSON.stringify({ worker_id: state.workerId, plan_type: 'standard' }) }, 'worker');
  if (policyRes.detail) return showToast('⚠️ ' + policyRes.detail);
  state.policy = policyRes;
  showSuccessStep(policyRes);
  showPush('🛡️', 'Policy Activated!', `You're now covered. Weekly premium: ${f$(state.premiumData?.final_premium || 0)}`);
}

function showSuccessStep(data) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-success').classList.add('active');
  document.querySelectorAll('.step-progress .step').forEach(s => s.classList.add('completed'));
  const d = document.getElementById('success-details');
  if (d && data) d.innerHTML = `
    <div class="success-item"><span class="label">Plan</span><span class="value">${data.plan_type || 'Standard'}</span></div>
    <div class="success-item"><span class="label">Weekly Premium</span><span class="value">${f$(data.weekly_premium)}</span></div>
    <div class="success-item"><span class="label">Coverage</span><span class="value">${f$(data.coverage_amount)}</span></div>
    <div class="success-item"><span class="label">Status</span><span class="value" style="color:var(--green)">ACTIVE ✓</span></div>`;
}

function showDashboard() { document.getElementById('sub-dashboard').click(); }
function logout() { clearWorkerSession('Session ended'); document.getElementById('sub-onboarding').click(); toggleAuth('login'); }

// ── Dashboard ────────────────────────────────────────────────────
async function loadDashboard() {
  if (!requireWorkerSession('view dashboard')) return;
  const [policyRes, claimsRes, zoneRes] = await Promise.all([
    api('/api/policies/me', {}, 'worker'),
    api('/api/claims/me', {}, 'worker'),
    api(`/api/triggers/zone-status/${encodeURIComponent(state.worker?.zone || 'Koramangala')}`),
  ]);
  if (policyRes && !policyRes.detail) {
    const policies = Array.isArray(policyRes) ? policyRes : [policyRes];
    state.policy = policies.find(p => p.status === 'active') || policies[0] || null;
  }
  const p = state.policy || {};
  document.getElementById('dash-greeting').textContent = `${TRANSLATIONS[currentLang]['dash.greeting'] || 'Welcome'}, ${state.worker?.name?.split(' ')[0] || ''}`;
  document.getElementById('dash-zone').textContent = `${state.worker?.zone || ''}, Bengaluru`;
  document.getElementById('dash-premium').textContent = f$(p.weekly_premium);
  document.getElementById('dash-coverage').textContent = f$(p.coverage_amount);
  document.getElementById('dash-weeks').textContent = p.weeks_active || '—';
  document.getElementById('dash-total-paid').textContent = f$(p.total_premiums_paid);
  document.getElementById('dash-total-claimed').textContent = f$(p.total_claims_paid);

  const zone = zoneRes && !zoneRes.detail ? zoneRes : {};
  renderZoneStatus(zone);
  renderWorkerCharts(p, zone, Array.isArray(claimsRes) ? claimsRes : []);
  renderClaimsList('dash-claims-list', Array.isArray(claimsRes) ? claimsRes.slice(0, 5) : []);
}

function renderZoneStatus(zone) {
  const grid = document.getElementById('zone-status-grid');
  if (!grid) return;
  const w = zone.weather || {}, a = zone.aqi || {}, t = zone.traffic || {}, f = zone.flood || {};
  const signals = [
    { name: 'Rainfall', value: `${w.rainfall_6hr_mm || 0}mm / 6hr`, level: (w.rainfall_6hr_mm || 0) >= 50 ? 'critical' : (w.rainfall_6hr_mm || 0) >= 25 ? 'elevated' : 'normal' },
    { name: 'AQI', value: `${a.aqi || 0} (${a.category || 'Good'})`, level: (a.aqi || 0) >= 300 ? 'critical' : (a.aqi || 0) >= 150 ? 'elevated' : 'normal' },
    { name: 'Temperature', value: `${w.temperature_c || 0}°C`, level: (w.temperature_c || 0) >= 40 ? 'critical' : (w.temperature_c || 0) >= 35 ? 'elevated' : 'normal' },
    { name: 'Traffic', value: `Level ${t.congestion_level || 0}/5`, level: (t.congestion_level || 0) >= 4 ? 'critical' : (t.congestion_level || 0) >= 3 ? 'elevated' : 'normal' },
    { name: 'Flood Level', value: `${f.water_level_m || 0}m`, level: (f.water_level_m || 0) >= 0.5 ? 'critical' : (f.water_level_m || 0) >= 0.2 ? 'elevated' : 'normal' },
  ];
  grid.innerHTML = signals.map(s => `<div class="zone-signal ${s.level}"><div class="zone-signal-name">${s.name}</div><div class="zone-signal-value">${s.value}</div></div>`).join('');
}

function renderClaimsList(containerId, claims) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!claims.length) { el.innerHTML = '<p class="muted-note">No claims yet — you\'re protected!</p>'; return; }
  el.innerHTML = claims.map(c => {
    const statusClass = c.status === 'paid' ? 'status-paid' : c.status === 'auto_approved' ? 'status-auto' : c.status === 'pending_review' ? 'status-pending' : 'status-rejected';
    return `<div class="claim-card">
      <div class="claim-icon">${TRIGGER_EMOJI[c.trigger_type] || '⚡'}</div>
      <div class="claim-info"><div class="claim-type">${TRIGGER_NAMES[c.trigger_type] || c.trigger_type}</div><div class="claim-meta">${c.zone || ''} · ${fDate(c.created_at)}</div></div>
      <div><div class="claim-amount">${f$(c.amount)}</div><div class="claim-status ${statusClass}">${c.status?.replace('_',' ').toUpperCase()}</div></div>
    </div>`;
  }).join('');
}

function renderWorkerCharts(policy, zone, claims) {
  const cov = Number(policy?.coverage_amount || 0), paid = Number(policy?.total_premiums_paid || 0), claimed = Number(policy?.total_claims_paid || 0);
  renderChart('worker-protection-chart', { type: 'bar', data: { labels: ['Premium Paid', 'Coverage', 'Claims Paid'], datasets: [{ label: 'INR', data: [paid, cov, claimed], backgroundColor: ['#0F6CBD', '#059669', '#D97706'], borderRadius: 6, maxBarThickness: 48 }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: v => f$(v) } } } } });
  const w = zone.weather || {}, a = zone.aqi || {}, t = zone.traffic || {}, fl = zone.flood || {};
  renderChart('worker-signal-chart', { type: 'radar', data: { labels: ['Rain', 'AQI', 'Traffic', 'Heat', 'Flood'], datasets: [{ label: 'Risk %', data: [Math.min((w.rainfall_6hr_mm||0)/50*100,100), Math.min((a.aqi||0)/300*100,100), Math.min((t.congestion_level||0)/5*100,100), Math.min((w.temperature_c||0)/42*100,100), Math.min((fl.water_level_m||0)/0.5*100,100)], backgroundColor: 'rgba(15, 108, 189, 0.08)', borderColor: '#0F6CBD', borderWidth: 2, pointBackgroundColor: '#0F6CBD' }] }, options: { scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, pointLabels: { color: '#4B5563', font: { weight: '600' } }, grid: { color: '#e2e8f0' }, angleLines: { color: '#e2e8f0' } } } } });
  const trend = (claims || []).slice(0, 6).reverse();
  renderChart('worker-claims-chart', { type: 'line', data: { labels: trend.length ? trend.map(c => fDate(c.created_at)) : ['No claims'], datasets: [{ label: 'Payout', data: trend.length ? trend.map(c => Number(c.amount||0)) : [0], borderColor: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.05)', pointBackgroundColor: '#059669', tension: 0.4, fill: true }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: v => f$(v) } } } } });
}

// ── Claims Page ──────────────────────────────────────────────────
async function loadClaimsPage() {
  if (!requireWorkerSession('view claims')) return;
  const res = await api('/api/claims/me', {}, 'worker');
  renderClaimsList('claims-list-full', Array.isArray(res) ? res : []);
  if (Array.isArray(res) && res.some(c => c.status === 'paid')) {
    document.getElementById('micro-survey-banner')?.classList.remove('hidden');
  }
}

// ── Premium Page ─────────────────────────────────────────────────
async function loadPremiumPage() {
  const res = await api('/api/premium/zones');
  if (!Array.isArray(res)) return;
  renderChart('premium-landscape-chart', { type: 'bar', data: { labels: res.map(z => z.zone), datasets: [{ label: 'Weekly Premium', data: res.map(z => Number(z.final_premium||0)), backgroundColor: res.map(z => z.risk_score >= 0.55 ? '#ef4444' : z.risk_score >= 0.35 ? '#f59e0b' : '#22c55e'), borderRadius: 8 }, { type: 'line', label: 'Risk %', data: res.map(z => Math.round((z.risk_score||0)*100)), yAxisID: 'r', borderColor: '#f1f5f9', pointBackgroundColor: '#f1f5f9', tension: 0.3 }] }, options: { scales: { y: { beginAtZero: true, ticks: { callback: v => f$(v) } }, r: { position: 'right', beginAtZero: true, max: 100, grid: { display: false }, ticks: { callback: v => `${v}%` } } } } });
  const grid = document.getElementById('premium-zones-grid');
  if (grid) grid.innerHTML = res.map(z => {
    const tc = z.risk_score >= 0.55 ? 'tier-high' : z.risk_score >= 0.35 ? 'tier-medium' : 'tier-low';
    return `<div class="premium-zone-card"><div class="pzc-header"><span class="pzc-zone">${z.zone}</span><span class="pzc-premium">${f$(z.final_premium)}</span></div><div class="pzc-details"><div class="pzc-detail"><span>Risk Score</span><span class="quote-tier ${tc}">${(z.risk_score*100).toFixed(0)}%</span></div><div class="pzc-detail"><span>Zone Mult.</span><span>${z.zone_multiplier}×</span></div><div class="pzc-detail"><span>Season</span><span>${z.seasonal_factor}×</span></div><div class="pzc-detail"><span>Savings</span><span style="color:var(--green)">${f$(z.savings_vs_max)}</span></div></div></div>`;
  }).join('');
}

// ── Settings Page ────────────────────────────────────────────────
async function loadSettingsPage() {
  if (!requireWorkerSession('view settings')) return;
  const d = document.getElementById('settings-account-summary');
  if (d && state.worker) d.innerHTML = `
    <div class="detail-row"><span>Name</span><strong>${state.worker.name}</strong></div>
    <div class="detail-row"><span>Phone</span><strong>${state.worker.phone}</strong></div>
    <div class="detail-row"><span>Zone</span><strong>${state.worker.zone}</strong></div>
    <div class="detail-row"><span>Platform</span><strong>${state.worker.platform}</strong></div>
    <div class="detail-row"><span>Risk Tier</span><strong>${state.worker.risk_tier}</strong></div>
    <div class="detail-row"><span>KYC</span><strong>${state.worker.aadhaar_verified ? '✅ Verified' : '❌ Pending'}</strong></div>`;
  const s = document.getElementById('settings-support-details');
  if (s && state.supportInfo) s.innerHTML = `
    <div class="detail-row"><span>Email</span><strong>${state.supportInfo.support_email}</strong></div>
    <div class="detail-row"><span>Phone</span><strong>${state.supportInfo.support_phone}</strong></div>
    <div class="detail-row"><span>Hours</span><strong>${state.supportInfo.support_hours}</strong></div>
    <p class="settings-note">${state.supportInfo.automated_decisions_notice || ''}</p>`;
}

async function deleteAccount() {
  const otp = document.getElementById('delete-account-otp').value;
  const confirm = document.getElementById('delete-account-confirm').value;
  if (!otp || confirm !== 'DELETE') return showToast('Enter OTP and type DELETE');
  const res = await api('/api/auth/account', { method: 'DELETE', body: JSON.stringify({ otp, confirmation_text: confirm }) }, 'worker');
  if (res.detail && !res.success) return showToast('⚠️ ' + res.detail);
  showToast('Account deleted.');
  clearWorkerSession();
  document.getElementById('sub-onboarding').click();
}

async function renewPolicy() {
  if (!requireWorkerSession('renew policy') || !state.policy?.id) return;
  const res = await api(`/api/policies/${state.policy.id}/renew`, { method: 'PUT' }, 'worker');
  if (res.detail) return showToast('⚠️ ' + res.detail);
  showToast('Policy renewed for another week!');
  await loadDashboard();
}

async function pausePolicy() {
  if (!requireWorkerSession('pause policy') || !state.policy?.id) return;
  const res = await api(`/api/policies/${state.policy.id}/pause`, { method: 'PUT' }, 'worker');
  if (res.detail) return showToast('⚠️ ' + res.detail);
  showToast('Policy paused. You can resume anytime.');
  await loadDashboard();
}

// ── Admin Portal ─────────────────────────────────────────────────
async function adminLogin() {
  const u = document.getElementById('admin-username').value;
  const p = document.getElementById('admin-password').value;
  if (!u || !p) return showToast('Enter credentials');
  const res = await api('/api/auth/admin/login', { method: 'POST', body: JSON.stringify({ username: u, password: p }) });
  if (res.detail) return showToast('⚠️ ' + res.detail);
  setAdminSession(res.access_token);
  showToast('Admin session started');
  loadAdminDashboard();
}

function logoutAdmin() { clearAdminSession('Admin session ended'); }

async function loadAdminDashboard() {
  if (!state.adminToken) return;
  const [res, analytics] = await Promise.all([
    api('/api/admin/dashboard', {}, 'admin'),
    api('/api/admin/analytics', {}, 'admin'),
  ]);
  if (res.detail) return;
  const kpis = [
    { label: 'Total Workers', value: res.total_workers || 0, change: 'Active platform', css: 'kpi-good' },
    { label: 'Active Policies', value: res.active_policies || 0, change: `${res.zones_covered || 0} zones covered`, css: 'kpi-good' },
    { label: 'Total Claims', value: res.total_claims || 0, change: `${res.claims_pending || 0} pending`, css: res.claims_pending > 0 ? 'kpi-warn' : 'kpi-good' },
    { label: 'Total Payouts', value: f$(res.total_claims_amount || 0), change: `${res.claims_paid || 0} completed`, css: 'kpi-good' },
    { label: 'Active Triggers', value: res.active_triggers || 0, change: `Loss ratio ${res.combined_loss_ratio || 0}%`, css: res.active_triggers > 0 ? 'kpi-warn' : 'kpi-good' },
  ];
  const kpiGrid = document.getElementById('kpi-grid');
  if (kpiGrid) kpiGrid.innerHTML = kpis.map(k => `<div class="kpi-card"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.value}</div><div class="kpi-change ${k.css}">${k.change}</div></div>`).join('');
  if (analytics && !analytics.detail) {
    renderAdminCharts(analytics);
    renderReadinessPanel('admin-readiness-panel', analytics.integrations || res.integrations || {}, analytics.runtime || res.runtime || {});
  } else {
    renderReadinessPanel('admin-readiness-panel', res.integrations || {}, res.runtime || {});
  }
}

function renderAdminCharts(a) {
  renderChart('admin-pipeline-chart', { type: 'doughnut', data: { labels: ['Paid','Auto Approved','Pending','Rejected'], datasets: [{ data: [a.claim_pipeline?.paid||0, a.claim_pipeline?.auto_approved||0, a.claim_pipeline?.pending_review||0, a.claim_pipeline?.rejected||0], backgroundColor: ['#059669','#0F6CBD','#D97706','#DC2626'], borderWidth: 0 }] }, options: { cutout: '70%' } });
  renderChart('admin-zone-premium-chart', { type: 'bar', data: { labels: (a.premium_by_zone||[]).map(z => z.zone), datasets: [{ label: 'Premium', data: (a.premium_by_zone||[]).map(z => Number(z.premium||0)), backgroundColor: '#0F6CBD', borderRadius: 4 }] }, options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: v => f$(v) } } } } });
  renderChart('admin-daily-activity-chart', { type: 'bar', data: { labels: (a.daily_activity||[]).map(d => fDate(d.date)), datasets: [{ label: 'Claims', data: (a.daily_activity||[]).map(d => d.claims||0), backgroundColor: '#0F6CBD', borderRadius: 4 }, { label: 'Triggers', data: (a.daily_activity||[]).map(d => d.triggers||0), backgroundColor: '#D97706', borderRadius: 4 }, { type: 'line', label: 'Payouts', data: (a.daily_activity||[]).map(d => Number(d.payouts||0)), borderColor: '#059669', pointBackgroundColor: '#059669', tension: 0.35, yAxisID: 'money' }] }, options: { scales: { y: { beginAtZero: true }, money: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { callback: v => f$(v) } } } } });
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
  const cards = Object.entries(integrations).map(([n, i]) => `<div class="readiness-card ${toneFromMode(i.mode, i.configured)}"><div class="readiness-top"><span class="readiness-name">${n.replace(/_/g,' ')}</span><span class="readiness-badge">${i.mode||'unknown'}</span></div><div class="readiness-meta"><span>Provider: <strong>${i.provider||'n/a'}</strong></span><span>Configured: <strong>${i.configured?'Yes':'No'}</strong></span></div></div>`);
  const jobs = Object.entries(runtime?.jobs || {}).map(([n, j]) => { const m = j.last_status || (j.enabled ? 'live' : 'disabled'); return `<div class="readiness-card ${toneFromMode(m, j.enabled)}"><div class="readiness-top"><span class="readiness-name">${n.replace(/_/g,' ')}</span><span class="readiness-badge">${m}</span></div><div class="readiness-meta"><span>Enabled: <strong>${j.enabled?'Yes':'No'}</strong></span><span>Last: <strong>${fTime(j.last_run_at)}</strong></span></div></div>`; });
  el.innerHTML = [...cards, ...jobs].join('') || '<p class="muted-note">No readiness data.</p>';
}

async function loadAdminPolicies() {
  const res = await api('/api/policies/all', {}, 'admin');
  const el = document.getElementById('admin-policies-table');
  if (!el || !Array.isArray(res)) return;
  el.innerHTML = `<table class="data-table"><thead><tr><th>ID</th><th>Worker</th><th>Zone</th><th>Premium</th><th>Coverage</th><th>Status</th><th>Weeks</th></tr></thead><tbody>${res.map(p => `<tr><td>${p.id}</td><td>${p.worker_name||'—'}</td><td>${p.zone||'—'}</td><td>${f$(p.weekly_premium)}</td><td>${f$(p.coverage_amount)}</td><td><span class="claim-status ${p.status==='active'?'status-paid':'status-pending'}">${p.status?.toUpperCase()}</span></td><td>${p.weeks_active||0}</td></tr>`).join('')}</tbody></table>`;
}

async function loadAdminClaims() {
  const res = await api('/api/claims/all/summary', {}, 'admin');
  if (!Array.isArray(res)) return;
  const pending = res.filter(c => c.status === 'pending_review');
  const q = document.getElementById('admin-claims-queue');
  if (q) q.innerHTML = pending.length ? pending.map(c => `<div class="review-card"><div class="review-header"><div><strong>${c.worker_name}</strong> · ${TRIGGER_NAMES[c.trigger_type]||c.trigger_type}<br><span style="font-size:12px;color:var(--text-muted)">${c.worker_zone} · Fraud: ${(c.fraud_score*100).toFixed(0)}% (${c.fraud_tier.toUpperCase()}) · ${f$(c.amount)}</span></div><div class="review-actions"><button class="btn-sm btn-approve" onclick="approveClaim(${c.id})">✓ Approve</button><button class="btn-sm btn-reject" onclick="rejectClaim(${c.id})">✗ Reject</button></div></div></div>`).join('') : '<p class="muted-note">No claims pending review.</p>';
  const all = document.getElementById('admin-all-claims');
  if (all) all.innerHTML = `<table class="data-table"><thead><tr><th>ID</th><th>Worker</th><th>Trigger</th><th>Amount</th><th>Fraud</th><th>Status</th><th>Date</th></tr></thead><tbody>${res.map(c => { const sc = c.status==='paid'?'status-paid':c.status==='pending_review'?'status-pending':'status-rejected'; return `<tr><td>${c.id}</td><td>${c.worker_name}</td><td>${TRIGGER_EMOJI[c.trigger_type]||''} ${TRIGGER_NAMES[c.trigger_type]||c.trigger_type}</td><td>${f$(c.amount)}</td><td><span class="quote-tier ${c.fraud_tier==='green'?'tier-low':c.fraud_tier==='amber'?'tier-medium':'tier-high'}">${c.fraud_tier.toUpperCase()} ${(c.fraud_score*100).toFixed(0)}%</span></td><td><span class="claim-status ${sc}">${c.status?.replace('_',' ').toUpperCase()}</span></td><td>${fDate(c.created_at)}</td></tr>`; }).join('')}</tbody></table>`;
}

async function approveClaim(id) {
  await api(`/api/claims/${id}/approve`, { method: 'PUT' }, 'admin');
  showToast('Claim approved'); loadAdminClaims();
}

async function rejectClaim(id) {
  await api(`/api/claims/${id}/reject`, { method: 'PUT' }, 'admin');
  showToast('Claim rejected'); loadAdminClaims();
}

async function loadAdminTriggers() {
  const [configRes, historyRes] = await Promise.all([
    api('/api/triggers/config'),
    api('/api/triggers/history', {}, 'admin'),
  ]);
  const cfg = document.getElementById('trigger-config-table');
  if (cfg && configRes && !configRes.detail) {
    cfg.innerHTML = `<div class="trigger-config-grid">${Object.entries(configRes).map(([k,v]) => `<div class="trigger-config-item"><div class="tc-emoji">${v.emoji}</div><div class="tc-name">${v.name}</div><div class="tc-desc">${v.description}</div><div class="tc-payout">${Math.round(v.payout_pct*100)}%</div></div>`).join('')}</div>`;
  }
  const hist = document.getElementById('trigger-history');
  if (hist && Array.isArray(historyRes)) {
    hist.innerHTML = historyRes.length ? `<table class="data-table"><thead><tr><th>Type</th><th>Zone</th><th>Severity</th><th>Status</th><th>Description</th><th>Fired At</th></tr></thead><tbody>${historyRes.map(t => `<tr><td>${TRIGGER_EMOJI[t.type]||''} ${TRIGGER_NAMES[t.type]||t.type}</td><td>${t.zone}</td><td>${t.severity}</td><td>${t.status}</td><td>${t.description || 'Signal threshold met'}</td><td>${fDate(t.fired_at)}</td></tr>`).join('')}</tbody></table>` : '<p class="muted-note">No triggers fired yet.</p>';
  }
}

async function simulateTrigger() {
  const type = document.getElementById('sim-trigger-type').value;
  const zone = document.getElementById('sim-zone').value;
  const btn = document.getElementById('sim-btn');
  btn.disabled = true; btn.textContent = '⏳ Firing...';
  const res = await api(`/api/triggers/simulate/${encodeURIComponent(type)}?zone=${encodeURIComponent(zone)}`, { method: 'POST' }, 'admin');
  btn.disabled = false; btn.textContent = '⚡ Fire Trigger';
  const el = document.getElementById('trigger-result');
  if (!el) return;
  el.classList.remove('hidden');
  if (res.detail) { el.innerHTML = `<p>⚠️ ${res.detail}</p>`; return; }
  const emoji = TRIGGER_EMOJI[type] || '⚡';
  const trigger = res.trigger || {};
  el.innerHTML = `<h4>${emoji} ${trigger.id ? 'TRIGGER FIRED!' : 'Trigger Not Met'}</h4>
    <div class="trigger-detail-grid">
      <div class="trigger-detail"><span class="trigger-detail-label">Zone</span><span class="trigger-detail-value">${trigger.zone || zone}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Type</span><span class="trigger-detail-value">${TRIGGER_NAMES[type]}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Severity</span><span class="trigger-detail-value">${trigger.severity || 'N/A'}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Payout</span><span class="trigger-detail-value">${Math.round((trigger.payout_percentage||0)*100)}%</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Primary</span><span class="trigger-detail-value">${trigger.primary || '—'}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Secondary</span><span class="trigger-detail-value">${trigger.secondary || '—'}</span></div>
      <div class="trigger-detail"><span class="trigger-detail-label">Claims Processed</span><span class="trigger-detail-value">${res.claims_processed || 0}</span></div>
    </div>`;
  if (trigger.id) showPush(emoji, `${TRIGGER_NAMES[type]} in ${zone}!`, `Severity: ${trigger.severity}. Claims auto-processing for affected workers.`);
}

async function loadAdminAnalytics() {
  const res = await api('/api/admin/analytics', {}, 'admin');
  if (res.detail) return;
  renderChart('analytics-premium-chart', { type: 'bar', data: { labels: (res.premium_by_zone||[]).map(z=>z.zone), datasets: [{ label: 'Premium', data: (res.premium_by_zone||[]).map(z=>Number(z.premium||0)), backgroundColor: '#0F6CBD', borderRadius: 4 }, { type: 'line', label: 'Risk %', data: (res.premium_by_zone||[]).map(z=>Math.round((z.risk_score||0)*100)), yAxisID: 'r', borderColor: '#134E4A', pointBackgroundColor: '#134E4A', tension: 0.3 }] }, options: { scales: { y: { beginAtZero: true, ticks: { callback: v=>f$(v) } }, r: { position: 'right', beginAtZero: true, max: 100, grid: { display: false }, ticks: { callback: v=>`${v}%` } } } } });
  renderChart('analytics-zone-chart', { type: 'bar', data: { labels: (res.zone_distribution||[]).map(i=>i.zone), datasets: [{ label: 'Workers', data: (res.zone_distribution||[]).map(i=>Number(i.workers||0)), backgroundColor: '#0F766E', borderRadius: 4 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } } });
  renderChart('analytics-trigger-chart', { type: 'polarArea', data: { labels: (res.trigger_frequency||[]).map(i=>TRIGGER_NAMES[i.type]||i.type), datasets: [{ data: (res.trigger_frequency||[]).map(i=>Number(i.count||0)), backgroundColor: ['#0F6CBD','#D97706','#DC2626','#059669','#0F766E'], borderWidth: 0 }] } });
  renderChart('analytics-fraud-chart', { type: 'doughnut', data: { labels: (res.fraud_distribution||[]).map(i=>i.tier.toUpperCase()), datasets: [{ data: (res.fraud_distribution||[]).map(i=>Number(i.count||0)), backgroundColor: ['#059669','#D97706','#DC2626'], borderWidth: 0 }] }, options: { cutout: '65%' } });
  renderChart('analytics-activity-chart', { type: 'line', data: { labels: (res.daily_activity||[]).map(d=>fDate(d.date)), datasets: [{ label: 'Claims', data: (res.daily_activity||[]).map(d=>Number(d.claims||0)), borderColor: '#0F6CBD', backgroundColor: 'rgba(15, 108, 189, 0.08)', pointBackgroundColor: '#0F6CBD', tension: 0.35 }, { label: 'Payouts', data: (res.daily_activity||[]).map(d=>Number(d.payouts||0)), borderColor: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.05)', pointBackgroundColor: '#059669', tension: 0.35, yAxisID: 'money' }] }, options: { scales: { y: { beginAtZero: true }, money: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { callback: v=>f$(v) } } } } });
  renderZoneHeatmap('analytics-heatmap', res.zone_heatmap || []);
  renderReadinessPanel('analytics-runtime-panel', res.integrations || {}, res.runtime || {});
}

function renderZoneHeatmap(id, zones) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!zones.length) { el.innerHTML = '<p class="muted-note">No zone data.</p>'; return; }
  el.innerHTML = zones.map(z => { const p = (z.claims||0)+(z.triggers||0); const t = p>=6?'high':p>=3?'medium':'low'; return `<div class="heatmap-card ${t}"><h4>${z.zone}</h4><div class="heatmap-stats"><span>Workers: <strong>${z.workers}</strong></span><span>Triggers: <strong>${z.triggers}</strong></span><span>Claims: <strong>${z.claims}</strong></span></div></div>`; }).join('');
}

// ── Init ─────────────────────────────────────────────────────────
async function loadSupportInfo() {
  const res = await api('/api/auth/support');
  if (res && !res.detail) state.supportInfo = res;
}

document.addEventListener('DOMContentLoaded', async () => {
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
