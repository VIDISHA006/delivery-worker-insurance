"""GigBuddy FastAPI application entry point and operational endpoints."""
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging
from time import monotonic, perf_counter
from uuid import uuid4

from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import engine, Base, run_migrations, check_database_health, SessionLocal
from app.models import Claim, Policy, PolicyStatus, Trigger, TriggerStatus, Worker
from app.routers import auth, policies, premium, claims, triggers, admin
from app.seed import seed_database
from app.services.provider_gateway import get_integration_status
from app.services.runtime_state import get_runtime_state, update_integrations
from app.services.scheduler import start_scheduler, stop_scheduler

SERVICE_STARTED_AT = datetime.now(timezone.utc)
RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_EXEMPT_PATHS = {"/health", "/ready", "/metrics", "/openapi.json"}
rate_limit_buckets: dict[str, deque[float]] = defaultdict(deque)
logger = logging.getLogger("gigbuddy.api")
if not logging.getLogger().handlers:
    logging.basicConfig(
        level=getattr(logging, settings.log_level, logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )
logger.setLevel(getattr(logging, settings.log_level, logging.INFO))

# Create tables
Base.metadata.create_all(bind=engine)
run_migrations()

@asynccontextmanager
async def lifespan(_: FastAPI):
    """Initialize demo data and log startup metadata."""
    logger.info(
        "Starting %s version=%s env=%s demo_mode=%s database=%s",
        settings.app_name,
        settings.app_version,
        settings.app_env,
        settings.demo_mode,
        engine.dialect.name,
    )
    if settings.seed_demo_data:
        seed_database()
    update_integrations(get_integration_status())
    
    import os
    if os.getenv("VERCEL") != "1":
        start_scheduler()
    
    yield
    
    if os.getenv("VERCEL") != "1":
        stop_scheduler()


app = FastAPI(
    title=settings.app_name,
    description="Automatic disruption payouts for delivery partners facing verified citywide disruption signals.",
    version=settings.app_version,
    docs_url="/docs",
    lifespan=lifespan,
)

# CORS — allow frontend (production Vercel domains + local dev)
import os as _os
_cors_origins = list(settings.allowed_origins) if settings.allowed_origins else [
    "http://127.0.0.1:5500", "http://localhost:5500",
]
if _os.getenv("VERCEL") == "1":
    _cors_origins.append("https://*.vercel.app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if _os.getenv("VERCEL") == "1" else _cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(policies.router)
app.include_router(premium.router)
app.include_router(claims.router)
app.include_router(triggers.router)
app.include_router(admin.router)


def _collect_runtime_counts() -> dict:
    """Collect a small set of operational counters for probes and metrics."""
    db = SessionLocal()
    try:
        return {
            "workers_total": db.query(Worker).count(),
            "workers_active": db.query(Worker).filter(Worker.is_deleted.is_(False)).count(),
            "policies_active": db.query(Policy).filter(Policy.status == PolicyStatus.ACTIVE).count(),
            "claims_total": db.query(Claim).count(),
            "triggers_active": db.query(Trigger).filter(Trigger.status == TriggerStatus.ACTIVE).count(),
            "triggers_total": db.query(Trigger).count(),
        }
    finally:
        db.close()


@app.middleware("http")
async def request_context_middleware(request: Request, call_next):
    """Attach a request id and emit a simple structured access log."""
    request_id = request.headers.get("x-request-id") or uuid4().hex
    request.state.request_id = request_id
    started = perf_counter()
    response = None
    try:
        response = await call_next(request)
        return response
    finally:
        duration_ms = round((perf_counter() - started) * 1000, 2)
        status_code = response.status_code if response is not None else 500
        logger.info(
            "request_id=%s method=%s path=%s status=%s duration_ms=%.2f client=%s",
            request_id,
            request.method,
            request.url.path,
            status_code,
            duration_ms,
            request.client.host if request.client else "unknown",
        )
        if response is not None:
            response.headers["X-Request-ID"] = request_id


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Apply a lightweight per-IP rate limit for public API traffic."""
    path = request.url.path
    if path in RATE_LIMIT_EXEMPT_PATHS or path.startswith("/docs"):
        return await call_next(request)

    client_ip = request.client.host if request.client else "unknown"
    if client_ip == "testclient":
        return await call_next(request)

    now = monotonic()
    bucket = rate_limit_buckets[client_ip]

    while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SECONDS:
        bucket.popleft()

    if len(bucket) >= settings.rate_limit_per_minute:
        return JSONResponse(
            status_code=429,
            content={
                "detail": "Rate limit exceeded. Please retry in a minute.",
                "limit_per_minute": settings.rate_limit_per_minute,
            },
        )

    bucket.append(now)
    return await call_next(request)


@app.get("/api/info")
def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "description": "Automatic disruption payouts for delivery partners facing verified citywide disruption signals.",
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/auth",
            "policies": "/api/policies",
            "premium": "/api/premium",
            "claims": "/api/claims",
            "triggers": "/api/triggers",
            "admin": "/api/admin",
        },
        "environment": settings.app_env,
        "demo_mode": settings.demo_mode,
        "support_email": settings.support_email,
    }


@app.get("/health")
def health():
    """Liveness probe."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.app_env,
    }


@app.get("/ready")
def ready():
    """Readiness probe with database connectivity and runtime metadata."""
    db_health = check_database_health()
    uptime_seconds = int((datetime.now(timezone.utc) - SERVICE_STARTED_AT).total_seconds())
    status_text = "ready" if db_health["ok"] else "degraded"
    return {
        "status": status_text,
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.app_env,
        "demo_mode": settings.demo_mode,
        "database": db_health,
        "uptime_seconds": uptime_seconds,
        "seed_demo_data": settings.seed_demo_data,
        "allowed_origins": settings.allowed_origins,
        "counts": _collect_runtime_counts() if db_health["ok"] else {},
        "runtime": get_runtime_state(),
    }


@app.get("/metrics")
def metrics():
    """Operational snapshot for the hackathon deployment."""
    uptime_seconds = int((datetime.now(timezone.utc) - SERVICE_STARTED_AT).total_seconds())
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "environment": settings.app_env,
        "demo_mode": settings.demo_mode,
        "uptime_seconds": uptime_seconds,
        "database": check_database_health(),
        "rate_limit_per_minute": settings.rate_limit_per_minute,
        "counts": _collect_runtime_counts(),
        "runtime": get_runtime_state(),
    }


# ── Mount Frontend Static Files ───────────────────────────────────────
# IMPORTANT: This MUST be the last thing registered on the app.
# StaticFiles at "/" will catch any path not matched by a route above.
import os as _os
_frontend_dir = _os.path.join(_os.path.dirname(__file__), "..", "..", "frontend")
if not _os.path.exists(_frontend_dir):
    _frontend_dir = _os.path.join(_os.path.dirname(__file__), "..", "frontend")

if _os.path.exists(_frontend_dir):
    logger.info("Mounting frontend static files from %s", _frontend_dir)
    app.mount("/", StaticFiles(directory=_frontend_dir, html=True), name="frontend")
else:
    logger.warning("Frontend directory not found at %s. API will run headless.", _frontend_dir)
