# GigShield Architecture

This document describes the architecture that exists in the repo today, plus the clear extension points for the DEVTrails Guidewire story.

## Current System

```mermaid
flowchart LR
    User["Worker Browser UI"] --> Nginx["Frontend nginx"]
    Admin["Admin Browser UI"] --> Nginx
    Nginx -->|"/api/*"| API["FastAPI Backend"]
    Nginx -->|"/health /ready /metrics /docs"| API

    API --> Auth["Auth + Session Layer"]
    API --> Policy["Policy Service"]
    API --> Claims["Claims Service"]
    API --> Trigger["Trigger Engine"]
    API --> Premium["Premium Engine"]

    Premium --> ML["XGBoost-style Risk Model"]
    Claims --> Fraud["Fraud Engine"]
    Trigger --> External["Sandbox External API Adapters"]

    API --> DB[("PostgreSQL or SQLite")]
```

## Current Deployment Shape

- `frontend/` is served by nginx and reverse-proxies API traffic to the backend.
- `backend/` runs as a FastAPI service and can use PostgreSQL via `docker-compose.yml`.
- `/health`, `/ready`, and `/metrics` expose operational state for reviewers and deployment checks.
- Request logs include an `X-Request-ID` correlation header for traceability.

## Judge-Facing Technical Highlights

### Pricing

- Zone-based premium scoring
- Explainable factor breakdowns
- Synthetic-data model training for the submission environment

### Claims

- Trigger-driven claim creation
- Fraud-tiered processing
- Admin review queue and payout history

### Operations

- Environment-driven configuration
- Containerized local stack
- Rate limiting, readiness checks, and metrics snapshot

## Guidewire Extension Points

The repository does not contain a live Guidewire integration today, but the architecture is organized so those integrations can slot in cleanly:

```mermaid
flowchart TD
    Premium["Premium Engine Output"] --> Rating["Guidewire Rating Engine"]
    Policy["Policy Lifecycle Events"] --> PolicyCenter["PolicyCenter"]
    Claims["Claim Decisions"] --> ClaimCenter["ClaimCenter"]
    Fraud["Fraud / Trigger ML"] --> Functions["Guidewire Functions"]
    Claims --> Autopilot["Autopilot Workflow"]
```

Recommended next integration order:

1. Rating Engine mapping for premium output
2. PolicyCenter sync for issuance and renewal
3. ClaimCenter FNOL creation
4. Autopilot orchestration for AMBER/RED claims
5. Functions for model inference offload
