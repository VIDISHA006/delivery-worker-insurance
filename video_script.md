# GigShield Demo Video Script (2-Minute DevTrails Hackathon Pitch)

## Deliverables Covered:
1. Registration Process
2. Insurance Policy Management
3. Dynamic Premium Calculation (AI-driven)
4. Claims Management (Zero-Touch)

---

### [0:00 - 0:15] Introduction & Worker Registration (15s)
**Visual:** Show the GigShield worker onboarding screen running locally on Vercel deployment.
**Narration:**
"Welcome to GigShield, a parametric income protection platform for gig workers. We’ve built a robust, production-ready system where delivery partners can onboard in seconds. Here’s a quick look at the registration: users provide their phone, preferred platform, and zone—like Indiranagar. Behind the scenes, we confirm their consent, complete their eKYC via Aadhar, and set up a UPI mandate for seamless automated premium deductions. It's fast, transparent, and built for the gig economy."

### [0:15 - 0:40] Dynamic Premium Calculation & AI (25s)
**Visual:** Transition to the Premium breakdown dashboard (or Postman endpoint showing ML factors), then show the Policy creation.
**Narration:**
"GigShield doesn’t do flat pricing. We use an XGBoost Machine Learning model to calculate hyper-local, dynamic weekly premiums. The API looks at 3 years of IMD weather data, BBMP flood sensors, and CPCB AQI data. For instance, if a worker operates in Whitefield—a low-risk zone—the model dynamically applies a discount, reporting back exact explainable factors. This ML-driven pricing allows workers to get adequate coverage affordably, adjusting weekly as safety conditions evolve."

### [0:40 - 0:55] Insurance Policy Management (15s)
**Visual:** Show the worker portal policy dashboard—Active, Paid, Paused statuses.
**Narration:**
"Once priced, workers activate their standard or premium policies with no lock-ins. They can view coverage amounts, easily pause coverage during a vacation, and reactivate it later with zero friction. Everything syncs natively to an upstream core system like Guidewire."

### [0:55 - 1:30] Seamless Claims Management & Automated Triggers (35s)
**Visual:** Side-by-side: Worker App on the left, Admin Event Trigger Dashboard on the right.
**Narration:**
"Here’s where GigShield shines: Parametric Zero-Touch Claims. Let’s say an extreme weather event hits. Our system continuously polls 5 automated triggers—like heavy rainfall combined with severe traffic congestion. If water levels hit 0.5m during high traffic in Koramangala, our engine fires a trigger automatically!
We then instantly locate all active workers in that zone and run our Isolation Forest fraud detection. If the ML model classifies the claim as 'Green' (low anomaly risk), the claim is auto-approved, and a payout is instantly initiated to the worker's UPI account with zero paperwork. A true zero-touch experience!"

### [1:30 - 2:00] Admin Operations & Conclusion (30s)
**Visual:** Admin dashboard showing combined loss ratio, claims queue, and integration statuses.
**Narration:**
"For insurers, our Admin portal provides comprehensive intelligence. Complex claims get flagged into an Amber or Red queue for manual review. The dashboard also tracks the combined loss ratio, active triggers, and integration health across weather APIs and payout gateways.
GigShield delivers continuous support, seamless parametric claims, and dynamic ML pricing—ensuring delivery workers receive the protection they need, precisely when they need it."

---

## Action Items Before Recording:
- Ensure `.env` is fully set up.
- Run `docker compose up --build` and ensure everything is running seamlessly.
- Open the frontend, the backend docs page (`http://localhost:8080/docs`), and keep the admin dashboard ready.
- Demonstrate the automated polling sequence during the claims management segment using the `/api/triggers/simulate` endpoint.
