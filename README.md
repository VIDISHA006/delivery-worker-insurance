<div align="center">

<img src="https://img.shields.io/badge/DEVTrails_2026-Phase_1-1A3A5C?style=for-the-badge" />
<img src="https://img.shields.io/badge/Track-Q--Commerce-0A7A6B?style=for-the-badge" />


<br/><br/>

# 🛡️ GigShield
### Parametric Income Protection for Q-Commerce Delivery Partners

<br/>

[![Watch Demo](https://img.shields.io/badge/▶_Watch_2--Min_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/hj3z3mhUQ7Q?feature=shared)
&nbsp;
[![View PDF](https://img.shields.io/badge/📄_Full_Idea_Document_(PDF)-1A3A5C?style=for-the-badge)](https://github.com/VIDISHA006/delivery-worker-insurance/blob/main/GigShield_Phase1.pdf)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github)](https://github.com/VIDISHA006/delivery-worker-insurance)

<br/>

</div>

---

<div align="center">

| 💰 Max Weekly Premium | ⚡ Payout SLA | 📋 Claims to File | 🏆 Guidewire Bonus |
|:---:|:---:|:---:|:---:|
| **Rs. 89 / week** | **2 hours** | **Zero** | **100 pts** |
| 1.7% of income | Trigger to UPI | Fully automated | All 4 components |

</div>

---

<div align="center">

> *"When a monsoon stops Ravi from working, GigShield ensures it does not stop him from eating."*
>
> **Automated · Transparent · Instant · Built for India's 3 million Q-Commerce workers**

</div>

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 1 | [Persona, Requirement & Workflow](#1-persona-requirement--application-workflow) |
| 2 | [Weekly Premium Model & Parametric Triggers](#2-weekly-premium-model--parametric-triggers) |
| 3 | [Platform Choice](#3-platform-choice-mobile-first-architecture) |
| 4 | [AI & ML Integration](#4-ai--ml-integration-plan) |
| 5 | [Tech Stack & Guidewire Integration](#5-tech-stack--guidewire-integration) |
| 6 | [Analytics Dashboard](#6-analytics-dashboard) |
| 7 | [Onboarding, Renewal & Compliance](#7-onboarding-renewal--compliance) |
| 8 | [6-Week Development Plan](#8-6-week-development-plan) |
| 9 | [🚨 Adversarial Defense & Anti-Spoofing](#9--adversarial-defense--anti-spoofing-strategy) |
| 10 | [Key Differentiators](#10-key-differentiators--why-gigshield-wins) |

---

## Executive Summary

> India's Q-Commerce delivery partners (Zepto, Blinkit) lose **20–30% of monthly income** when extreme weather, hazardous air quality, or civic disruptions halt operations — with **zero financial protection**. **GigShield** automatically detects qualifying disruptions via real-time environmental APIs (IMD, CPCB, Google Maps) and disburses income-replacement payouts directly to a worker's UPI account within **2 hours of trigger confirmation** — no claims filing, no paperwork, no delays. Built on **Guidewire Cloud (AWS)**.

> ⛔ **Coverage scope: Loss of income only.** Vehicle repair, health, and accident costs are **explicitly excluded** per DEVTrails rules.

<div align="center">

| The Problem at a Glance | | |
|:---:|:---:|:---:|
| 🚴 **3M+** | 💸 **Rs. 740** | 🚫 **0%** |
| Q-Commerce workers in India | Lost per rainfall event | Financial protection today |
| Zepto, Blinkit, Dunzo, Swiggy Instamart | 14.2% of weekly income gone | No ESIC · No insurance · No safety net |

</div>

---

## 1. Persona, Requirement & Application Workflow

### 1.1 Why Q-Commerce?

We focus exclusively on **Q-Commerce delivery partners (Zepto / Blinkit)**. This segment is the most vulnerable for three compounding reasons:

- 🎯 **Hyperlocal exposure** — 10-minute delivery windows mean *any* sub-zone weather event immediately halts all operations with zero rerouting option
- 🚫 **No employer safety net** — Self-employed contractors with no ESIC, no paid leave, no sick days
- 🌧️ **Maximum outdoor exposure** — Riders wait at open dark-stores between assignments — maximum AQI, heat, and rain exposure with no shelter

<div align="center">

**Income loss breakdown (IMD Bengaluru 3-year data)**

| Disruption Type | Share of Annual Losses |
|:---:|:---:|
| 🌧️ Rainfall events | 55% |
| 🌫️ AQI / Air quality | 25% |
| 🔥 Heat & Other | 20% |

</div>

---

### 1.2 Primary Persona — Ravi Kumar

<div align="center">

| 👤 Field | Detail | 👤 Field | Detail |
|:---|:---|:---|:---|
| **Name** | Ravi Kumar | **Age** | 28 |
| **Platform** | Zepto | **City / Zone** | Bengaluru — Indiranagar |
| **Weekly deliveries** | ~60 | **Weekly income** | Rs. 5,200 |
| **Device** | Budget Android (4G) | **Vehicle** | 2-wheeler (petrol) |
| **Banking** | Jan Dhan + UPI | **Existing insurance** | ❌ None |
| **Savings buffer** | < 2 weeks income | **Family** | Wife + 1 child |

</div>

**💥 Real disruption event — July 14, 2024 (IMD verified data)**

```
08:00  ──▶  IMD records 62mm rainfall in 6 hours in Indiranagar zone
09:30  ──▶  Google Maps: arterial roads at Level 4-5 (severely congested / impassable)
11:00  ──▶  Zepto suspends Indiranagar zone operations for worker safety
14:00  ──▶  Operations resume; Ravi logs back in
RESULT ──▶  Rs. 740 LOST = 14.2% of weekly income.  ZERO RECOURSE.
```

---

### 1.3 Scenario Walkthroughs

<table>
<tr>
<td width="33%" valign="top">

**🌧️ Scenario A — Rainfall**

IMD confirms ≥50mm. Maps shows Level 4+ congestion. Dual-trigger fires. GPS validated.

✅ **Rs. 321 to UPI in 2 hrs**

</td>
<td width="33%" valign="top">

**🌫️ Scenario B — AQI**

CPCB confirms AQI 312. Wind below 5km/h. Policy active. Trigger fires.

✅ **70% payout auto-processed**

</td>
<td width="33%" valign="top">

**🚨 Scenario C — Fraud Blocked**

Claims flood in zone A. GPS shows movement 18km away in dry zone. Anomaly score fires.

❌ **Payout held. Flagged.**

</td>
</tr>
</table>

---

### 1.4 Application Workflow

<div align="center">

```
 ┌──────────────────────────── ONBOARDING ──────────────────────────────┐
 │                                                                       │
 │  [1]Sign Up  →  [2]Risk Score  →  [3]Pick Policy  →  [4]AutoPay     │
 │    & KYC         XGBoost           Weekly plan         Monday UPI    │
 │                                                                       │
 └───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌──────────────────────────── LIVE OPERATIONS ─────────────────────────┐
 │                                                                       │
 │  [5]Monitor   →  [6]Dual Trigger  →  [7]Fraud Check  →  [8]Payout   │
 │  IMD+CPCB+Maps   Eval logic          Isolation Forest    UPI 2 hrs   │
 │                                           │                          │
 │                                     ┌─────┴─────┐                   │
 │                                  PASS ✅       FAIL ❌               │
 │                               Instant Payout  Flag & Hold            │
 └───────────────────────────────────────────────────────────────────────┘
                                    │
                        ◄── Weekly renewal loop ──┘
```

</div>

---

### 1.5 UI Wireframes

<table>
<tr>
<td align="center" width="45%">

**Fig 1: Worker Mobile App — Onboarding**

![Mobile Wireframe](./assets/mobile_wireframe.png)

*Zone confirm + Rs. 89/wk premium quote*

</td>
<td align="center" width="55%">

**Fig 2: Jutro Admin Portal — Live Dashboard**

![Admin Wireframe](./assets/admin_wireframe.png)

*CLR 74% · Payout 2.1hr · Fraud 1.8%*

</td>
</tr>
</table>

> 📄 Full wireframes with detailed annotations on **pages 3–4** of the [Phase 1 PDF](https://github.com/VIDISHA006/delivery-worker-insurance/blob/main/GigShield_Phase1.pdf)

---

## 2. Weekly Premium Model & Parametric Triggers

### 2.1 Why Weekly?

Gig workers operate on a strict **week-to-week cash cycle**. Our weekly model:

- 💳 Deducted via **UPI AutoPay** every Monday 06:00 — zero active effort from the worker
- ⏸️ Workers can **pause coverage** on off-weeks — no lock-in, no penalty
- 💚 Rs. 52–89/week = approximately **1.0–1.7% of weekly income** (SEWA affordability threshold: 3–5%)
- 🔄 Aligns payout cycle with earnings cycle — payout arrives before next Monday drop

---

### 2.2 Actuarial Calculation

<div align="center">

**Bengaluru Zone · FY 2024–25 · IMD Historical Data**

| Variable | Calculation | Result |
|:---|:---:|:---:|
| Payable disruption events / year (IMD) | — | **8 events** |
| Average income loss per event | — | **Rs. 600** |
| Expected Annual Payout per worker | 8 × Rs. 600 | **Rs. 4,800** |
| Target loss ratio (industry benchmark) | — | **65%** |
| Required Annual Premium | Rs. 4,800 ÷ 0.65 | **Rs. 7,384** |
| Weekly base premium | Rs. 7,384 ÷ 52 | **Rs. 142 / wk** |
| Bengaluru zone multiplier (XGBoost) | 0.37 – 0.63 | — |
| ✅ **Effective weekly premium range** | — | **Rs. 52 – 89 / wk** |

</div>

> 💡 Even the highest-risk zone premium (Rs. 89) = **1.7% of Ravi's weekly income** — well within the 3% affordable threshold cited in SEWA's parametric insurance pilots for daily-wage workers in India.

**Zone-specific pricing:**

| Zone | Risk Profile | Weekly Premium |
|:---|:---|:---:|
| Whitefield | Tech corridor, lower flood risk, good drainage | **Rs. 52** |
| Rajajinagar | Industrial zone, moderate heat exposure | **Rs. 67** |
| Koramangala | Mixed commercial, moderate waterlogging | **Rs. 71** |
| Indiranagar | Urban flooding hotspot, high AQI corridor | **Rs. 89** |

---

### 2.3 Dual-Trigger System

> 🔒 **Basis Risk Policy:** No parametric system can fully eliminate basis risk. GigShield's dual-trigger approach *significantly reduces* it by requiring **two independent data signals** before any payout fires. Residual basis risk is disclosed at onboarding in plain-language Hindi / Kannada / English.

<div align="center">

| Disruption | Primary Signal (API) | Secondary Proxy | Logic | Payout % | Amount* |
|:---|:---|:---|:---:|:---:|:---:|
| 🌧️ Heavy Rainfall | IMD: ≥50mm in 6 hrs in geozone | Google Maps: Level 4+ congestion | **AND** | 80% | Rs. 321 |
| 🔥 Extreme Heat | IMD: ≥40°C for 2 consecutive days | CPCB Heat Index: Extreme Caution | **AND** | 60% | Rs. 241 |
| 🌫️ Hazardous AQI | CPCB AQI ≥300 for 1 day | IMD Wind <5 km/h (no dispersal) | **AND** | 70% | Rs. 281 |
| 🚧 Curfew / Strike | Real-time news API + Dist. Admin alerts | All three APIs below threshold | **OR** | 100% | Rs. 401 |

*\* Based on Rs. 89/wk premium × 4.5 income-replacement factor × payout %*

</div>

> ⚠️ **Why NOT Zepto's internal delivery density?** Zepto's platform API is private and inaccessible. We use **Google Maps real-time road congestion (Level 0–5)** as a verifiable, neutral, court-admissible proxy. If roads are impassable, deliveries are impossible — regardless of platform status. This design also works across Zepto, Blinkit, and Dunzo without platform-specific data-sharing agreements.

---

## 3. Platform Choice: Mobile-First Architecture

<table>
<tr>
<td width="50%" valign="top">

### 📱 React Native — Worker App

- 98% of Q-Commerce workers use smartphones as their **only** computing device
- Background GPS for fraud validation needs **native mobile APIs** unavailable in a browser
- **Offline capability** essential in low-connectivity storm zones
- UPI AutoPay mandate via Razorpay React Native SDK
- **Instant push notifications** pierce the notification shade immediately

</td>
<td width="50%" valign="top">

### 🖥️ Jutro — Insurer Admin Portal

- Jutro is a React-based **web** framework — architecturally correct for a desktop admin portal
- Native **Guidewire Cloud API** integration (ClaimCenter, Rating)
- Analytics dashboard, fraud review queue, policy management are admin tools — web is appropriate
- Earns **25-point Guidewire bonus** in its architecturally correct role

</td>
</tr>
</table>

---

## 4. AI & ML Integration Plan

> 🧠 **Core principle:** The payout trigger is **strictly deterministic** (rules-based) — auditable by IRDAI regulators and explainable to workers in plain language. AI operates in two supporting layers **only**: pricing and fraud detection.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🟦 ML Layer 1 — Dynamic Pricing                                        │
│     XGBoost weekly premium engine                                       │
├─────────────────────────────────────────────────────────────────────────┤
│  🟨 ML Layer 2 — Fraud Detection                                        │
│     Isolation Forest anomaly scoring on every claim                     │
├─────────────────────────────────────────────────────────────────────────┤
│  🟥 Deterministic Trigger Layer                                         │
│     Rules-based · IRDAI-auditable · Zero AI in payout decisions         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.1 Model 1 — Dynamic Premium Engine (XGBoost)

| Attribute | Detail |
|:---|:---|
| **Purpose** | Predict weekly disruption probability per zone; output zone risk multiplier |
| **Training data** | 3 years IMD weather history · CPCB AQI records · BBMP ward-level flood frequency data |
| **Features** | Zone ID · week-of-year · rolling 30-day rainfall · elevation · historical disruption count · 7-day AQI forecast |
| **Output** | Risk score (0.0–2.0) × base premium = final weekly premium |
| **Retraining** | Monthly on updated IMD and CPCB data |

### 4.2 Model 2 — Fraud Detection Engine (Isolation Forest + Hard Rules)

| Attribute | Detail |
|:---|:---|
| **Purpose** | Detect GPS spoofing, duplicate claims, coordinated fraud rings |
| **Algorithm** | Unsupervised Isolation Forest + deterministic pre-filter rules |
| **Hard rules** | (a) Claim zone ≠ GPS zone at trigger time → flag &nbsp; (b) >3 claims from same device in 30 days → flag &nbsp; (c) Claim >6hrs after trigger window → reject |
| **Features** | GPS trace · claim frequency · device fingerprint · RSSI signal strength · zone weather vs claimed disruption |
| **Output** | Anomaly score; above threshold → hold payout for manual review |

### 4.3 Model 3 — Onboarding Risk Profiler (Logistic Regression)

| Attribute | Detail |
|:---|:---|
| **Purpose** | Assign new workers to a risk tier at signup |
| **Input** | Zone selected · historical weather severity · declared working hours |
| **Output** | Risk tier (Low / Medium / High) → seeds initial XGBoost multiplier |

---

## 5. Tech Stack & Guidewire Integration

### 5.1 Full Technology Stack

| Layer | Technology | Role |
|:---|:---|:---|
| 📱 Worker mobile app | React Native (Expo) | iOS + Android · offline support · background GPS |
| 🖥️ Insurer admin portal | **Guidewire Jutro Digital Platform** | Web · React-based · Guidewire Cloud on AWS |
| ⚙️ Backend API | FastAPI (Python 3.11) | REST + async · hosted on **Guidewire Cloud (AWS)** |
| 🗄️ Primary database | PostgreSQL | Policies · claims · worker profiles |
| ⚡ Cache / state | Redis | Real-time trigger state · session cache |
| 🤖 ML pipeline | Python (scikit-learn + XGBoost) | Deployed as Guidewire Functions (serverless) |
| 🌦️ Weather API | OpenWeatherMap + IMD datastore | Rainfall · temperature — free tier · real data |
| 🌫️ AQI API | CPCB AQI REST API | Official India air quality data · free |
| 🗺️ Traffic proxy | Google Maps Platform (Traffic layer) | Road congestion Level 0–5 per geozone |
| 💳 Payments | Razorpay Sandbox + UPI AutoPay | Mock payout Phase 1 · live UPI from Phase 3 |
| 🔐 KYC / Identity | Aadhaar e-KYC via Setu / Digio | DigiLocker-linked eKYC at onboarding |

---

### 5.2 Guidewire Integration — 100 Bonus Points

<div align="center">

| Guidewire Component | How GigShield Uses It | Points |
|:---|:---|:---:|
| **Jutro Digital Platform** | Builds the insurer admin portal — policy management, fraud review queue, analytics dashboard — using Jutro's React component library connected to Guidewire Cloud APIs. Deployed as a **web application** (Jutro's correct context; not conflated with React Native). | **25 pts** |
| **Autopilot Workflow Service** | Orchestrates the full claim-to-payout pipeline via ClaimCenter cloud API: trigger event → fraud check → coverage validation → payout approval → UPI disbursement. Exception routing handles flagged claims. Invoked through ClaimCenter, its native host. | **25 pts** |
| **Rating Engine** | Executes dynamic weekly premium calculations. The XGBoost risk score is passed as an input variable into the Guidewire Rating engine, which applies zone rate tables and the weekly multiplier to produce the final quoted premium. | **25 pts** |
| **Functions (Serverless)** | Runs the Isolation Forest fraud detection model on every inbound claim. Also runs the three-signal trigger validation (IMD + CPCB + Google Maps) on a 15-minute polling schedule. Stateless, auto-scaling, event-driven. | **25 pts** |
| | **Total Guidewire Bonus Points** | **🏆 100 pts** |

</div>

---

## 6. Analytics Dashboard

The insurer-facing dashboard (built on Jutro) surfaces eight key KPIs:

| KPI | Definition | Target |
|:---|:---|:---:|
| 📊 Combined Loss Ratio (CLR) | (Claims paid + Expenses) / Premiums collected | **< 80%** |
| ⚡ Avg. payout latency | Trigger confirmation → UPI credit | **≤ 2 hours** |
| 🔍 Fraud detection rate | Claims flagged by Isolation Forest / total | **< 3%** |
| 🗺️ Zone trigger frequency map | Heatmap of triggers fired per zone per week | Live |
| 🔄 Policy renewal rate | Workers who renew the following week | **> 70%** |
| 💳 Premium collection rate | Successful UPI AutoPay debits / attempted | **> 95%** |
| ⚖️ Basis risk events | Triggers fired where worker GPS was inactive | **< 5%** |
| 👥 Active workers / zone | Policyholders per delivery zone | Live |

---

### 6.1 Trust Feedback Loop

> After every payout, GigShield sends Ravi a **3-question micro-survey in Kannada or Hindi** via SMS and in-app notification.

```
  Payout Sent
      │
      ▼
  SMS Survey (3 questions)          Questions:
      │                             1. Did you experience a real income loss?
      ▼                             2. Was the payout amount fair?
  Zone Trust Score Updated          3. Did the app respond in time?
      │
      ▼
  XGBoost Model Retrained ──────────────────────────────────┐
      │                                                      │
      ▼                                                      │
  Trigger Threshold Refined                                  │
      │                                                      │
      └──── Better payouts next event ◄─── feedback loop ───┘
```

The **Zone Trust Score** feeds back into XGBoost to refine trigger thresholds, flag poor proxy calibration, and improve fraud detection — continuous improvement built into the architecture.

---

## 7. Onboarding, Renewal & Compliance

### 7.1 Optimised Onboarding — Under 4 Minutes

```
Step 1  ──▶  Phone OTP verification (identity anchor; links to UPI handle)
Step 2  ──▶  Aadhaar e-KYC via Setu DigiLocker API (instant, paperless)
Step 3  ──▶  Platform ID input (Zepto partner ID validated)
Step 4  ──▶  Zone confirmation (GPS pre-fills; worker confirms on map)
Step 5  ──▶  Risk quote (XGBoost scores in <1 second; shows Rs./wk)
Step 6  ──▶  Plan selection (policy doc in Hindi / Kannada / English)
Step 7  ──▶  UPI AutoPay mandate (Razorpay SDK; deducted every Monday 06:00)
Step 8  ──▶  Basis risk disclosure (plain-language screen; triggers explained)
```

### 7.2 Weekly Renewal & Lapse Handling

| Rule | Detail |
|:---|:---|
| ✅ Coverage window | Monday 00:01 to Sunday 23:59 upon successful deduction |
| ⚠️ AutoPay failure | SMS + in-app alert · 24-hour grace period to pay manually |
| 🔴 After grace period | Policy lapses for that week · reactivates following Monday |
| 🆓 No penalties | No lock-in · no cancellation fee · workers control their coverage |
| 🔄 Re-profiling | Workers lapsing >4 consecutive weeks re-profiled at next activation |

### 7.3 Regulatory Compliance

> GigShield will seek approval under the **IRDAI Insurance Regulatory Sandbox** (Regulation 2019, amended 2023), which specifically enables parametric and index-based insurance experiments. Product: General Insurance — income protection sub-type. Underwriting partner: Bajaj Allianz or ICICI Lombard (both have existing parametric product experience). GigShield operates as the **technology platform and licensed distribution layer (POSP)**.

---

## 8. 6-Week Development Plan

| Phase | Timeline | Key Deliverables | Success Criteria |
|:---:|:---:|:---|:---|
| **Phase 1** | Wks 1–2 · Mar 4–20 | Idea Document · README · 2-min video · Figma prototype · public GitHub repo | ✅ Submitted by Mar 20 EOD |
| **Phase 2** | Wks 3–4 | FastAPI backend · PostgreSQL schema · Guidewire Rating integration · IMD + CPCB + Maps API wiring · React Native onboarding | Policy creation and premium quote working end-to-end |
| **Phase 3** | Week 5 | XGBoost on IMD data · Isolation Forest fraud engine · Autopilot workflow in ClaimCenter · trigger logic tested | Fraud flag fires on GPS spoof test case |
| **Phase 4** | Week 6 | Razorpay payout sandbox · Jutro admin portal · full end-to-end demo · analytics dashboard · 100-concurrent stress test | Full demo: onboard → payout in under 2 minutes on video |

```
Week:   1    2    3    4    5    6
        ├────┤
P1: Ideation ████████
P2: Core Build          ████████
P3: AI + Fraud               ████████
P4: Demo + Polish                  ████████
```

---

### DEVTrails Economy — Survival Strategy

<div align="center">

**Seed Capital: DC 100,000**

| Item | DC Cost | Running Balance |
|:---|:---:|:---:|
| 🌱 Seed capital | — | **DC 100,000** |
| 🔥 Mandatory 6-week burn (non-negotiable) | − DC 75,000 | DC 25,000 |
| | | |
| Architecture Review (Phase 2) | − DC 8,000 | |
| API Credits (IMD + CPCB + Maps) | − DC 6,000 | |
| UI/UX Review (Phase 3) | − DC 5,000 | |
| Stress Testing Credits | − DC 4,000 | |
| Reserve buffer | − DC 5,000 | |
| **Total strategic spend** | **− DC 28,000** | |
| | | |
| **Total 6-week cost (burn + spend)** | **DC 103,000** | ⚠️ DC −3,000 without revenue |
| | | |
| ✅ 4-Star ratings Phase 2 & 3 (DC 62,000 each) | + DC 124,000 | |
| ✅ First-to-Finish Bounty | + DC 8,000 | |
| **Total revenue** | **+ DC 132,000** | |
| | | |
| 🏆 **Net position after 6 weeks** | | **DC 29,000 PROFIT** |

</div>

> **Conclusion:** Seed (DC 100,000) + Revenue (DC 132,000) − Total cost (DC 103,000) = **DC 29,000 end-balance. We remain solvent and profitable throughout the hackathon.**

---

## 9. 🚨 Adversarial Defense & Anti-Spoofing Strategy

> **24-Hour Crisis Response:** A syndicate of 500 workers using GPS-spoofing apps and coordinated Telegram groups has exploited a competitor's parametric platform, draining its liquidity pool via mass false payouts. **Simple GPS verification is officially obsolete.** GigShield's response is below.

### 9.1 The Threat Model

```
Layer 1 — GPS Spoofing
    Mock-GPS apps broadcast fabricated location (flooded Indiranagar)
    while device sits safely at home in a dry zone 15km away

Layer 2 — Coordination
    Telegram groups synchronise the attack window so 200+ claims
    arrive within minutes of a real weather trigger, overwhelming
    manual review queues

Layer 3 — Pattern Laundering
    Ring members rotate devices, SIMs, and partner IDs to avoid
    hitting per-account velocity limits
```

---

### 9.2 The 6-Signal Verification Stack

| # | Signal | What it detects | Spoof Resistance |
|:---:|:---|:---|:---|
| **1** | GPS coordinates | Baseline location cross-check | ⚠️ Weak alone — easily faked |
| **2** | Accelerometer + gyroscope | Real riding motion vs. stationary phone (vibration, turns, stops) | ✅ Cannot be faked by GPS app; requires hardware-level exploit |
| **3** | Cell-tower triangulation | Independent location via network (no app permission needed) | ✅ Disagrees with spoofed GPS if worker is truly at home |
| **4** | Ambient noise fingerprint | Heavy rain has a distinct audio signature vs. silence at home | ✅ Hard to fake; indoor vs. outdoor audio is distinct |
| **5** | Network signal strength (RSSI) | Genuine outdoor storm = degraded 4G; indoor worker = strong stable Wi-Fi | ✅ Device reports RSSI honestly; no GPS spoof app alters this |
| **6** | Peer-zone density check | Cross-references verified workers claiming same disruption simultaneously | ✅ Ring detection: anomalous 100%+ correlated claim bursts |

---

### 9.3 Ring Detection — Identifying Coordinated Syndicates

```
Graph Anomaly Layer — treats claims as a network

  ◉ Temporal clustering
    > 15 claims from same geozone within 10 minutes
    → entire batch quarantined and individually re-scored

  ◉ Device graph edges
    Shared device fingerprints, same-SSID Wi-Fi, overlapping
    Bluetooth scan logs across multiple partner IDs
    → device-sharing ring flagged

  ◉ Velocity fingerprinting
    Legitimate riders: irregular intervals correlated with weather
    Ring members: uniform timing within seconds of each other
    → velocity anomaly flag

  ◉ Pre-trigger signal
    Claims arriving BEFORE a weather alert fires
    → indicates advance Telegram coordination
    → elevated suspicion score applied
```

---

### 9.4 Three-Tier Resolution — Protecting Honest Workers

> ✅ A genuine worker in a real storm will also have degraded GPS, weak signal, and noisy accelerometer data. Our system is designed **never to punish an honest worker for bad weather causing bad telemetry.**

| Tier | Score Range | Outcome | Worker Experience |
|:---:|:---|:---|:---|
| 🟢 **GREEN** | 0.0 – 0.45 | Instant automatic payout within 2 hours | Zero friction · payout arrives silently |
| 🟡 **AMBER** | 0.45 – 0.70 | Payout held 24 hrs · 10-second passive liveness check (move phone, capture ambient audio) | One-tap confirmation · shown "verification in progress" not "fraud suspected" |
| 🔴 **RED** | 0.70+ | Claim quarantined · human review · notified within 4 hours with reason + appeal option | Worker sees reason code · can upload evidence · decision within 24 hours |

> 🌊 **Network-drop grace rule:** If GPS drops entirely during a confirmed weather event (IMD + Maps dual-trigger already fired), GigShield uses the **last known verified location for up to 45 minutes** before requiring re-verification. Honest workers in flood zones are **never penalised** for bad signal.

---

## 10. Key Differentiators & Why GigShield Wins

| Differentiator | Why It Wins Points |
|:---|:---|
| 🎯 **Dual-Trigger Design** | Two independent data signals required before any payout fires. Significantly reduces basis risk. No dependency on private platform APIs. Every trigger is auditable and court-admissible. |
| 🧠 **Named Explainable AI** | XGBoost (pricing) and Isolation Forest (fraud) named with specific training data and feature sets. Trigger logic is deterministic. Satisfies IRDAI auditability requirements and worker trust simultaneously. |
| 🌐 **Public API Stack Only** | Every trigger uses publicly accessible APIs (IMD, CPCB, Google Maps). Launches across Zepto, Blinkit, and Dunzo without platform-specific agreements. |
| 🏗️ **Correct Guidewire Architecture** | Jutro on the web admin portal (not React Native). Autopilot via ClaimCenter. Rating for the premium engine. Functions for ML inference. Every component in its architecturally correct role. |
| 📱 **Worker-First Design** | 4-minute onboarding. Hindi / Kannada / English UI. UPI AutoPay with no active effort. No lock-in. Designed for a Rs. 5,200/week earner on a budget Android. |
| 📐 **Actuarially Grounded** | Premium formula worked through with real IMD data. Rs. 142/wk base with 0.37–0.63 zone multiplier. Loss ratio target of 65% stated and justified — not hand-waved. |
| 💬 **Trust Feedback Loop** | Post-payout micro-survey aggregates into Zone Trust Score that retrains XGBoost monthly. Continuous improvement built into the architecture. |
| 📡 **Real-Time Curfew Detection** | Civic disruption triggers use live news APIs and District Admin social alerts as primary signal (gazette = post-hoc confirmation). Ensures 2-hour payout SLA for sudden civic events. |
| 🛡️ **Anti-Spoofing Architecture** | 6-signal verification stack + graph anomaly layer defeats coordinated GPS-spoofing syndicates while protecting honest workers through a three-tier resolution system with a 45-minute network-drop grace rule. |

---

<div align="center">

---

## 📄 Full Idea Document

[![View Full PDF](https://img.shields.io/badge/📄_View_Full_16--Page_Idea_Document-1A3A5C?style=for-the-badge)](https://github.com/VIDISHA006/delivery-worker-insurance/blob/main/GigShield_Phase1.pdf)

*The PDF contains all diagrams, charts, wireframes, Gantt timeline, actuarial math,*
*Guidewire architecture, and everything the judges need in one polished document.*

---

## 🎥 Demo Video

[![Watch Demo](https://img.shields.io/badge/▶_Watch_2--Minute_Demo_on_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/hj3z3mhUQ7Q?feature=shared)

---

<br/>

**GigShield · DEVTrails 2026 · Phase 1**

*When a monsoon stops Ravi from working, GigShield ensures it does not stop him from eating.*

<br/>

</div>
