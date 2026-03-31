# Changelog

## 2026-03-31

### Submission hardening

- Reworked the README so it reflects the codebase that actually exists today
- Added Docker packaging for backend and frontend
- Added root `docker-compose.yml` with PostgreSQL, backend, and frontend services
- Added `.env.example` for deployment configuration
- Added nginx reverse proxy routing for `/api`, `/health`, `/ready`, `/metrics`, and `/docs`

### Backend operations

- Added env-driven app metadata and rate-limit configuration
- Added request tracing with `X-Request-ID`
- Added liveness, readiness, and metrics endpoints
- Added database health checks and runtime counters
- Made lightweight schema migrations safer across SQLite and PostgreSQL
- Added Vercel-safe cron endpoints for trigger polling and claim review
- Added cron request authentication via `CRON_SECRET`
- Added live-capable provider gateway scaffolding for OTP, KYC, payouts, and Guidewire sync
- Added background scheduler support for trigger polling and staged claim review release
- Added public-feed weather and air-quality readiness outside demo mode

### Compliance and app hardening

- Added authenticated worker/admin session handling
- Removed unsafe fallback behavior to seeded worker data
- Added in-app support metadata
- Added in-app account deletion with anonymized audit retention
- Locked admin surfaces behind authentication

### Quality and submission assets

- Added smoke tests for the main API surface
- Added GitHub Actions CI workflow
- Added architecture documentation
- Generated OpenAPI spec from the live FastAPI app
- Expanded smoke coverage for runtime visibility and OTP session metadata

### Frontend product polish

- Added professional charted analytics across worker, premium, and admin experiences
- Added provider and background-job readiness panels to the admin portal
- Added richer OTP UX with send/resend flows and surfaced provider metadata in the onboarding experience
- Aligned the frontend API contract with the live backend routes for policies, premiums, zone status, and trigger simulation
