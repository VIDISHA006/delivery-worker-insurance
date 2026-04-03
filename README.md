---
title: GigBuddy
emoji: 🚦
colorFrom: cyan
colorTo: teal
sdk: docker
pinned: false
app_port: 7860
---
# GigBuddy

Automatic disruption payouts for delivery workers.

GigBuddy is a full-stack demo that turns verified city signals into income-relief payouts for gig and q-commerce delivery partners. It is built around a simple idea: when work is materially disrupted by rain, flooding, air quality, heat, or civic shutdowns, the worker should not be forced to open a claim form and start proving the obvious.

This repo has been overhauled for Phase 2 to be more honest, more distinctive, and more defensible in judging:

- unique public-facing branding instead of copycat insurance naming
- clearer positioning around city-signal payouts, not vague "AI insurance"
- real worker feedback capture after payout, with a renewal credit loop
- sharper separation between what is implemented now and what is still sandboxed

## What Makes This Submission Different

Most hackathon insurance demos stop at pricing + dashboard + fake claims. GigBuddy goes further in three ways:

1. It treats disruption as an operations problem, not just a claim form.
   Dual-signal triggers drive creation, review posture, and payout movement.

2. It treats workers as participants, not just policy holders.
   After a paid event, workers can submit structured payout feedback and earn a real renewal credit stored in the backend.

3. It is designed for low-friction worker use, not only insurer optics.
   The worker flow is short, multilingual, and built around OTP, KYC, UPI, pause/resume, and support visibility.

## What Is Implemented Today

### Worker flow

- registration with explicit terms, privacy, and automated-decision consent
- OTP send/verify with provider-backed fallback behavior
- mock Aadhaar eKYC
- UPI mandate setup
- in-app profile, policy, claim, and support views
- account deletion with anonymized financial retention

### Pricing and protection

- zone-specific weekly premium calculation
- explainable factor breakdowns and risk tiers
- purchase, renewal, pause, and reactivation flows
- renewal credit balance for worker feedback participation

### Triggers, claims, and payouts

- five disruption modes: rainfall, AQI, heat, curfew, flooding
- dual-signal trigger logic
- automated claim creation
- fraud-tiered routing
- admin review queue for held claims
- payout history and claim lifecycle views
- post-payout worker feedback stored in the backend

### Operations

- admin login and operations dashboard
- trigger analytics and live zone intelligence
- readiness, health, and metrics endpoints
- request tracing and rate limiting
- background polling and delayed claim review jobs
- Docker and `docker-compose` local deployment

## What Is Deliberately Not Overclaimed

- This is not a live production insurer stack.
- Guidewire, OTP, eKYC, and payout provider connections are abstractions with sandbox fallbacks unless configured.
- Premium training data is synthetic and calibrated for demo realism; it is not a filed actuarial model.
- This repo is deployable and testable, but it is not launch-ready for regulated insurance operations without further integration and compliance work.

That honesty is intentional. The repo should be inspectable without forcing judges to guess what is real.

## Architecture

```text
frontend (static SPA)
        |
        +--> /api/*, /health, /ready, /docs -> backend
                                              |
                                              +--> FastAPI
                                              +--> SQLAlchemy models
                                              +--> premium / trigger / fraud / payout services
                                              +--> PostgreSQL or SQLite
```

See `docs/architecture.md` for the reviewer-facing system walkthrough.

## Stack

- Backend: FastAPI, SQLAlchemy, Pydantic
- Data: PostgreSQL via Docker Compose, SQLite for local fallback
- Modeling: XGBoost or GradientBoosting fallback
- Frontend: HTML, CSS, vanilla JavaScript
- Serving: nginx
- Auth: bearer token sessions

## Quick Start

### Option 1: Full stack with Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

Open:

- Frontend: `http://localhost:8080`
- Backend docs: `http://localhost:8080/docs`
- Health: `http://localhost:8080/health`
- Ready: `http://localhost:8080/ready`
- Metrics: `http://localhost:8080/metrics`

### Option 2: Backend only

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Without a database URL, the backend falls back to `backend/gigbuddy.db`.

## Runtime Configuration

The app uses the `GIGBUDDY_*` environment variable prefix throughout local and container setups.

Important variables:

- `GIGBUDDY_APP_NAME`
- `GIGBUDDY_ENV`
- `GIGBUDDY_DEMO_MODE`
- `GIGBUDDY_DATABASE_URL`
- `GIGBUDDY_JWT_SECRET`
- `GIGBUDDY_ADMIN_USERNAME`
- `GIGBUDDY_ADMIN_PASSWORD`
- `GIGBUDDY_SUPPORT_EMAIL`
- `GIGBUDDY_SUPPORT_PHONE`
- `CRON_SECRET`

See `.env.example` for a working local starting point.

## Fastest Demo Path

If you only have two minutes:

1. Worker login: `9876543210` / `1234`
2. Open Dashboard and Claims to show active protection plus the feedback-credit loop
3. Switch to Admin and simulate heavy rainfall or flooding
4. Show that claims move through automation and review instead of a claim form

## Judge Guide

If you only inspect a few files, start here:

- `backend/app/main.py`
  app entrypoint, health, readiness, metrics, logging
- `backend/app/routers/auth.py`
  onboarding, OTP, support, account deletion
- `backend/app/routers/policies.py`
  purchase, renewal, pause/reactivation, renewal credit application
- `backend/app/routers/claims.py`
  worker claims, post-payout feedback, admin review actions
- `backend/app/services/trigger_engine.py`
  dual-signal disruption logic
- `backend/app/services/external_apis.py`
  public weather and AQI feed integration plus calibrated simulation fallback
- `backend/app/services/premium_engine.py`
  explainable premium model output
- `frontend/index.html`
  worker and admin product surfaces
- `frontend/app.js`
  UI behavior, multilingual UX, feedback-credit flow
- `docs/judge-guide.md`
  evaluator-facing story, proof points, and honest boundaries

## Core Endpoints

- `POST /api/auth/register`
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/kyc`
- `POST /api/auth/setup-upi`
- `GET /api/auth/me`
- `GET /api/auth/support`
- `DELETE /api/auth/account`
- `POST /api/policies/create`
- `PUT /api/policies/{policy_id}/renew`
- `GET /api/claims/me`
- `GET /api/claims/feedback/pending`
- `POST /api/claims/{claim_id}/feedback`
- `GET /api/admin/dashboard`
- `GET /api/triggers/poll`
- `GET /api/claims/review`
- `GET /health`
- `GET /ready`
- `GET /metrics`

## Reviewer Story

The strongest Phase 2 framing is:

- This is not "AI wrote an insurance app."
- This is a concrete product thesis about verified disruption relief for delivery workers.
- The dual-signal trigger model is visible.
- The worker feedback loop is visible.
- The operational and regulatory boundaries are visible.

That combination makes the project easier to trust and harder to confuse with a generic generated submission.

## Production Readiness Snapshot

### Ready now

- deployable full-stack demo
- database-backed worker, policy, claim, payout, and admin flows
- worker feedback captured after payout
- containerized local environment
- health, readiness, and metrics endpoints

### Still sandboxed

- OTP, KYC, and payout providers unless credentials are configured
- carrier-platform integrations unless configured
- actuarial data and filed pricing workflows

### Still required before commercial launch

- durable migration and queue infrastructure
- managed secrets and audit logging
- legal and compliance review
- regulated insurer and payment partnerships
- production-grade fraud and dispute operations
