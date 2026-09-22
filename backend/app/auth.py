import secrets

from fastapi import Header, HTTPException, status

from .settings import get_admin_token


def require_admin_token(x_admin_token: str | None = Header(default=None)) -> None:
    configured_token = get_admin_token()
    if not configured_token:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The admin endpoint is not configured.",
        )
    if not x_admin_token or not secrets.compare_digest(x_admin_token, configured_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="A valid admin token is required.",
        )
