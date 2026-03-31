# GigShield

Parametric income protection for gig and q-commerce delivery workers.

This repository now reflects the code that actually ships in the workspace today: a deployable FastAPI backend, a static frontend, sandboxed onboarding and payout flows, dynamic premium scoring, claims automation, and an admin dashboard for review/demo operations.

## What This Repo Is

- A submission-grade full-stack demo for the GigShield concept
- A real FastAPI service that can be run locally or in containers
- A browser-based worker/admin interface served as static assets
- A sandbox environment for policy, trigger, claim, and payout workflows

## What This Repo Is Not

- Not a React Native mobile app in its current form
- Not a live Guidewire Cloud deployment
- Not connected to production OTP, eKYC, UPI mandate, or insurer systems yet
- Not a licensed insurance operations stack ready for regulated launch without further integration work

That distinction matters. A strong submission is polished and honest. This README is intentionally aligned with the actual codebase so judges, reviewers, and operators can trust what they see.

## Implemented Capabilities

### Worker flow

- Register a worker with consent capture for terms, privacy, and automated decisioning
- Send and verify OTP with provider-backed session handling and sandbox fallback
- Complete mock eKYC with a live-capable provider gateway
- Configure UPI payout details with mandate metadata and gateway fallback
- View profile, premium, policy, and claims data in-app
- Delete account in-app with anonymized financial record retention

### Policy and pricing

- Zone-based premium calculation driven by an XGBoost-style model trained on synthetic Bengaluru risk data
- Worker policy purchase, renewal, pause, and reactivation
- Explainable premium breakdowns and risk tiers
- Guidewire-ready quote and sync abstraction for premium and policy records

### Claims and payouts

- Trigger-based claim creation
- Fraud-tiered claim processing
- Admin review queue for held claims
- Sandbox payout history and claim lifecycle views
- Background claim review release flow and payout gateway abstraction

### Admin operations

- Token-protected admin login
- KPI dashboard
- Claims queue
- Trigger analytics with charted views
- Policy and payout views
- Integration readiness panel for provider and job health
- Runtime job visibility for trigger polling and claim review

### Operational hardening added in this pass

- Configurable environment-driven runtime
- Request tracing via `X-Request-ID`
- Access logging
- Per-IP rate limiting for public API traffic
- Background scheduler for trigger polling and delayed claim review
- Public live weather and air-quality feed support outside demo mode
- `/health` liveness endpoint
- `/ready` readiness endpoint with database connectivity checks
- `/metrics` operational snapshot endpoint
- Docker packaging for backend and frontend
- Root `docker-compose.yml` with PostgreSQL, backend, and frontend services

## Architecture

```text
frontend (nginx static app + reverse proxy)
        |
        +--> /api/*, /health, /ready, /docs -> backend
                                              |
                                              +--> FastAPI
                                              +--> SQLAlchemy models
                                              +--> premium / fraud / trigger services
                                              +--> PostgreSQL (docker-compose default)
```

## Stack

- Backend: FastAPI, SQLAlchemy, Pydantic
- Data: PostgreSQL in Docker Compose, SQLite supported for lightweight local runs
- ML helpers: XGBoost, scikit-learn, NumPy, pandas
- Frontend: HTML, CSS, vanilla JavaScript
- Web serving: nginx
- Auth: bearer token sessions

## Quick Start

### Option 1: Full stack with Docker Compose

1. Copy environment defaults:

```bash
cp .env.example .env
```

2. Update at least these values before sharing a build:

- `GIGSHIELD_JWT_SECRET`
- `GIGSHIELD_ADMIN_PASSWORD`
- `GIGSHIELD_SUPPORT_EMAIL`
- `GIGSHIELD_SUPPORT_PHONE`

3. Start the stack:

```bash
docker compose up --build
```

4. Open:

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend docs: [http://localhost:8080/docs](http://localhost:8080/docs)
- Liveness: [http://localhost:8080/health](http://localhost:8080/health)
- Readiness: [http://localhost:8080/ready](http://localhost:8080/ready)
- Metrics: [http://localhost:8080/metrics](http://localhost:8080/metrics)

### Option 2: Backend only for local development

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

With no database URL configured, the backend falls back to a local SQLite file under `backend/gigshield.db`.

## Runtime Configuration

Environment variables supported by the app:

- `GIGSHIELD_ENV`
- `GIGSHIELD_APP_NAME`
- `GIGSHIELD_APP_VERSION`
- `GIGSHIELD_LOG_LEVEL`
- `GIGSHIELD_DEMO_MODE`
- `GIGSHIELD_ENABLE_BACKGROUND_JOBS`
- `GIGSHIELD_TRIGGER_POLL_INTERVAL_SECONDS`
- `GIGSHIELD_CLAIM_REVIEW_INTERVAL_SECONDS`
- `GIGSHIELD_RATE_LIMIT_PER_MINUTE`
- `GIGSHIELD_DATABASE_URL`
- `CRON_SECRET`
- `GIGSHIELD_ALLOWED_ORIGINS`
- `GIGSHIELD_JWT_SECRET`
- `GIGSHIELD_OTP_EXPIRY_SECONDS`
- `GIGSHIELD_OTP_COOLDOWN_SECONDS`
- `GIGSHIELD_DEMO_OTP`
- `GIGSHIELD_SEED_DEMO_DATA`
- `GIGSHIELD_SUPPORT_EMAIL`
- `GIGSHIELD_SUPPORT_PHONE`
- `GIGSHIELD_ADMIN_USERNAME`
- `GIGSHIELD_ADMIN_PASSWORD`
- `GIGSHIELD_TWILIO_ACCOUNT_SID`
- `GIGSHIELD_TWILIO_AUTH_TOKEN`
- `GIGSHIELD_TWILIO_FROM_NUMBER`
- `GIGSHIELD_KYC_BASE_URL`
- `GIGSHIELD_KYC_API_KEY`
- `GIGSHIELD_PAYMENT_GATEWAY_BASE_URL`
- `GIGSHIELD_PAYMENT_GATEWAY_API_KEY`
- `GIGSHIELD_RAZORPAY_KEY_ID`
- `GIGSHIELD_RAZORPAY_KEY_SECRET`
- `GIGSHIELD_GUIDEWIRE_BASE_URL`
- `GIGSHIELD_GUIDEWIRE_CLIENT_ID`
- `GIGSHIELD_GUIDEWIRE_CLIENT_SECRET`

See `.env.example` for a working starting point.

## Judge Guide

If you are reviewing this project for the submission, these are the fastest places to inspect:

- `backend/app/main.py`
  Runtime entrypoint, CORS, request logging, health and readiness
- `backend/app/routers/auth.py`
  Onboarding, OTP dispatch, support metadata, account deletion
- `backend/app/routers/policies.py`
  Policy lifecycle and Guidewire-ready quote/sync hooks
- `backend/app/routers/claims.py`
  Claims access and admin actions
- `backend/app/services/provider_gateway.py`
  Live-capable OTP, KYC, payment, and Guidewire provider abstraction
- `backend/app/services/scheduler.py`
  Background trigger polling and delayed claim review release
- `backend/app/services/premium_engine.py`
  Dynamic pricing logic
- `docs/architecture.md`
  High-signal system diagram for reviewers
- `docs/api-spec.yaml`
  API contract generated from the live FastAPI app
- `docker-compose.yml`
  Full-stack local deployment path

## Core Endpoints

- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/kyc`
- `POST /api/auth/setup-upi`
- `GET /api/auth/me`
- `DELETE /api/auth/account`
- `GET /api/auth/support`
- `POST /api/policies/create`
- `GET /api/policies/me`
- `GET /api/claims/me`
- `GET /api/admin/dashboard`
- `GET /api/triggers/poll`
- `GET /api/claims/review`
- `GET /health`
- `GET /ready`
- `GET /metrics`

## Vercel Deployment

The repo is now wired for a Vercel full-stack deployment:

- `api/index.py` exposes the FastAPI app to the Vercel Python runtime
- `vercel.json` rewrites `/api/*` to the backend function and serves the SPA from `frontend/`
- Vercel Cron can invoke `GET /api/triggers/poll` and `GET /api/claims/review`
- `requirements.txt` at the repo root delegates to `backend/requirements.txt` so Vercel can install Python dependencies

Recommended production environment variables in Vercel:

- `GIGSHIELD_ENV=production`
- `GIGSHIELD_DATABASE_URL=<Neon or Vercel Postgres connection string>`
- `GIGSHIELD_JWT_SECRET=<strong random secret>`
- `CRON_SECRET=<strong random secret>`
- `GIGSHIELD_ENABLE_BACKGROUND_JOBS=false`

Recommended production flow:

1. Import the GitHub repository into Vercel.
2. Set the production environment variables above.
3. Redeploy once so the Python function and cron routes pick up the secrets.
4. Confirm `/health`, `/ready`, `/metrics`, `/api/triggers/poll`, and `/api/claims/review` respond correctly in production.

## Production Readiness Status

### Ready now

- Deployable API service
- Containerized full-stack local environment
- Database-backed worker, policy, claim, and admin flows
- Authenticated admin portal
- Background job execution for trigger polling and staged claim release
- Public live weather and AQI feeds when demo mode is off
- Provider-readiness and runtime visibility in the admin experience
- In-app support and account deletion
- Basic operational health checks

### Still sandboxed

- Twilio / OTP credentials unless configured
- Aadhaar/eKYC provider connectivity unless configured
- UPI AutoPay and payout rail unless configured
- Guidewire connectivity unless configured
- Premium model training inputs

### Still needed before real commercial launch

- Managed PostgreSQL, backups, and migrations
- Durable queue/worker infrastructure for multi-instance scheduled jobs and retries
- Contracted live provider credentials for OTP, KYC, payments, and Guidewire
- Secrets management
- Audit logging beyond current request logs
- Mobile-native client if the product strategy requires app-store distribution
- Legal, underwriting, and regulatory signoff for insurance operations

## Repository Layout

```text
backend/
  app/
    config.py
    database.py
    main.py
    models.py
    routers/
    services/
  Dockerfile
  requirements.txt

frontend/
  index.html
  app.js
  styles.css
  nginx.conf
  Dockerfile

docs/
  architecture.md
  api-spec.yaml

docker-compose.yml
.env.example
CHANGELOG.md
```

## Submission Positioning

For DEVTrails judging, the strongest framing is:

- The current repo demonstrates the end-to-end workflow and platform thinking
- The backend is genuinely deployable and observable
- The worker/admin experience is functional today
- The live insurer and fintech integrations are clearly marked as the next integration phase, not falsely presented as already running

That makes the submission more credible, not less.
