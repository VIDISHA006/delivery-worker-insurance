"""Database configuration with lightweight migration and health helpers."""
from __future__ import annotations

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.config import settings

engine_kwargs = {"pool_pre_ping": True}
if settings.database_url.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    # Hosted Postgres connections are healthier with shorter recycling windows.
    engine_kwargs["pool_recycle"] = 300

engine = create_engine(settings.database_url, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def _timestamp_sql() -> str:
    return "DATETIME" if engine.dialect.name == "sqlite" else "TIMESTAMP"


def run_migrations() -> None:
    """Apply lightweight schema migrations for local/demo environments."""
    inspector = inspect(engine)
    if "workers" not in inspector.get_table_names():
        return

    worker_columns = {col["name"] for col in inspector.get_columns("workers")}
    statements: list[str] = []
    timestamp_type = _timestamp_sql()

    if "is_deleted" not in worker_columns:
        statements.append("ALTER TABLE workers ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT 0")
    if "deleted_at" not in worker_columns:
        statements.append(f"ALTER TABLE workers ADD COLUMN deleted_at {timestamp_type}")
    if "terms_accepted_at" not in worker_columns:
        statements.append(f"ALTER TABLE workers ADD COLUMN terms_accepted_at {timestamp_type}")
    if "privacy_accepted_at" not in worker_columns:
        statements.append(f"ALTER TABLE workers ADD COLUMN privacy_accepted_at {timestamp_type}")
    if "ai_notice_accepted_at" not in worker_columns:
        statements.append(f"ALTER TABLE workers ADD COLUMN ai_notice_accepted_at {timestamp_type}")
    if "last_login_at" not in worker_columns:
        statements.append(f"ALTER TABLE workers ADD COLUMN last_login_at {timestamp_type}")
    if "renewal_credit_balance" not in worker_columns:
        statements.append("ALTER TABLE workers ADD COLUMN renewal_credit_balance FLOAT NOT NULL DEFAULT 0")

    if not statements:
        return

    with engine.begin() as connection:
        for statement in statements:
            connection.execute(text(statement))


def check_database_health() -> dict:
    """Run a lightweight connectivity check for readiness endpoints."""
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"ok": True, "dialect": engine.dialect.name}
    except Exception as exc:  # pragma: no cover - surfaced via API response
        return {"ok": False, "dialect": engine.dialect.name, "error": str(exc)}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
