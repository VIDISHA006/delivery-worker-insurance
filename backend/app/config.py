"""Application configuration."""
from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


def _env_flag(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class Settings:
    app_name: str
    app_version: str
    app_env: str
    demo_mode: bool
    log_level: str
    enable_background_jobs: bool
    trigger_poll_interval_seconds: int
    claim_review_interval_seconds: int
    database_url: str
    allowed_origins: list[str]
    jwt_secret: str
    jwt_algorithm: str
    access_token_expiry_minutes: int
    rate_limit_per_minute: int
    otp_expiry_seconds: int
    otp_cooldown_seconds: int
    demo_otp: str
    seed_demo_data: bool
    support_email: str
    support_phone: str
    admin_username: str
    admin_password: str
    twilio_account_sid: str
    twilio_auth_token: str
    twilio_from_number: str
    kyc_base_url: str
    kyc_api_key: str
    payment_gateway_base_url: str
    payment_gateway_api_key: str
    razorpay_key_id: str
    razorpay_key_secret: str
    guidewire_base_url: str
    guidewire_client_id: str
    guidewire_client_secret: str
    cron_secret: str


def get_settings() -> Settings:
    backend_dir = Path(__file__).resolve().parents[1]
    default_db_path = backend_dir / "gigbuddy.db"

    database_url = os.getenv("GIGBUDDY_DATABASE_URL")
    if not database_url:
        db_path = Path(os.getenv("GIGBUDDY_DB_PATH", str(default_db_path))).expanduser().resolve()
        database_url = f"sqlite:///{db_path}"

    default_origins = ",".join([
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:4173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8080",
        "http://localhost:8080",
    ])
    raw_origins = os.getenv("GIGBUDDY_ALLOWED_ORIGINS", default_origins)
    allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

    app_env = os.getenv("GIGBUDDY_ENV", "development").strip().lower()
    seed_default = app_env != "production"
    demo_mode = _env_flag("GIGBUDDY_DEMO_MODE", app_env != "production")

    return Settings(
        app_name=os.getenv("GIGBUDDY_APP_NAME", "GigBuddy API"),
        app_version=os.getenv("GIGBUDDY_APP_VERSION", "2.1.0"),
        app_env=app_env,
        demo_mode=demo_mode,
        log_level=os.getenv("GIGBUDDY_LOG_LEVEL", "INFO").upper(),
        enable_background_jobs=_env_flag("GIGBUDDY_ENABLE_BACKGROUND_JOBS", True),
        trigger_poll_interval_seconds=int(os.getenv("GIGBUDDY_TRIGGER_POLL_INTERVAL_SECONDS", "300")),
        claim_review_interval_seconds=int(os.getenv("GIGBUDDY_CLAIM_REVIEW_INTERVAL_SECONDS", "180")),
        database_url=database_url,
        allowed_origins=allowed_origins,
        jwt_secret=os.getenv("GIGBUDDY_JWT_SECRET", "gigbuddy-dev-secret-change-me"),
        jwt_algorithm=os.getenv("GIGBUDDY_JWT_ALGORITHM", "HS256"),
        access_token_expiry_minutes=int(os.getenv("GIGBUDDY_ACCESS_TOKEN_EXPIRY_MINUTES", "720")),
        rate_limit_per_minute=int(os.getenv("GIGBUDDY_RATE_LIMIT_PER_MINUTE", "120")),
        otp_expiry_seconds=int(os.getenv("GIGBUDDY_OTP_EXPIRY_SECONDS", "300")),
        otp_cooldown_seconds=int(os.getenv("GIGBUDDY_OTP_COOLDOWN_SECONDS", "60")),
        demo_otp=os.getenv("GIGBUDDY_DEMO_OTP", "1234"),
        seed_demo_data=_env_flag("GIGBUDDY_SEED_DEMO_DATA", seed_default),
        support_email=os.getenv("GIGBUDDY_SUPPORT_EMAIL", "support@gigbuddy.example"),
        support_phone=os.getenv("GIGBUDDY_SUPPORT_PHONE", "+91-00000-00000"),
        admin_username=os.getenv("GIGBUDDY_ADMIN_USERNAME", "admin@gigbuddy.local"),
        admin_password=os.getenv("GIGBUDDY_ADMIN_PASSWORD", "GigBuddyAdmin123!"),
        twilio_account_sid=os.getenv("GIGBUDDY_TWILIO_ACCOUNT_SID", ""),
        twilio_auth_token=os.getenv("GIGBUDDY_TWILIO_AUTH_TOKEN", ""),
        twilio_from_number=os.getenv("GIGBUDDY_TWILIO_FROM_NUMBER", ""),
        kyc_base_url=os.getenv("GIGBUDDY_KYC_BASE_URL", ""),
        kyc_api_key=os.getenv("GIGBUDDY_KYC_API_KEY", ""),
        payment_gateway_base_url=os.getenv("GIGBUDDY_PAYMENT_GATEWAY_BASE_URL", ""),
        payment_gateway_api_key=os.getenv("GIGBUDDY_PAYMENT_GATEWAY_API_KEY", ""),
        razorpay_key_id=os.getenv("GIGBUDDY_RAZORPAY_KEY_ID", ""),
        razorpay_key_secret=os.getenv("GIGBUDDY_RAZORPAY_KEY_SECRET", ""),
        guidewire_base_url=os.getenv("GIGBUDDY_GUIDEWIRE_BASE_URL", ""),
        guidewire_client_id=os.getenv("GIGBUDDY_GUIDEWIRE_CLIENT_ID", ""),
        guidewire_client_secret=os.getenv("GIGBUDDY_GUIDEWIRE_CLIENT_SECRET", ""),
        cron_secret=os.getenv("CRON_SECRET", os.getenv("GIGBUDDY_CRON_SECRET", "")),
    )


settings = get_settings()
