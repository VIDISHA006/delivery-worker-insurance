"""Authentication and authorization helpers."""
from datetime import datetime, timedelta, timezone
import secrets
from typing import Optional

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Worker

bearer_scheme = HTTPBearer(auto_error=False)


def create_access_token(subject: str, role: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expiry_minutes)
    payload = {
        "sub": subject,
        "role": role,
        "exp": expires_at,
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session. Please sign in again.",
        ) from exc


def _require_credentials(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> HTTPAuthorizationCredentials:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required.",
        )
    return credentials


def get_current_worker(
    credentials: HTTPAuthorizationCredentials = Depends(_require_credentials),
    db: Session = Depends(get_db),
) -> Worker:
    payload = decode_token(credentials.credentials)
    if payload.get("role") != "worker":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Worker access required.")

    subject = payload.get("sub")
    if subject is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session payload.")

    worker = db.query(Worker).filter(Worker.id == int(subject)).first()
    if not worker:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Worker session is no longer valid.")
    if worker.is_deleted:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This account has been deleted.")
    return worker


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_require_credentials),
) -> dict:
    payload = decode_token(credentials.credentials)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required.")
    return payload


def require_cron_access(request: Request) -> None:
    """Authorize scheduled invocations in production while keeping local testing simple."""
    if not settings.cron_secret:
        if settings.app_env == "production":
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="CRON_SECRET is not configured for production.",
            )
        return

    actual = request.headers.get("authorization", "")
    expected = f"Bearer {settings.cron_secret}"
    if not secrets.compare_digest(actual, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid cron credentials.",
        )
