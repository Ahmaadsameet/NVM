from datetime import datetime, timezone
import sqlite3

from fastapi import APIRouter, HTTPException, status

from ..database import get_connection
from ..notifications import send_notification
from ..schemas import Inquiry, InquiryCreate


router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])


@router.post("", response_model=Inquiry, status_code=status.HTTP_201_CREATED)
def create_inquiry(payload: InquiryCreate) -> Inquiry:
    created_at = datetime.now(timezone.utc)
    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO inquiries (name, email, message, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (payload.name, str(payload.email), payload.message, created_at.isoformat()),
            )
            connection.commit()
            inquiry_id = cursor.lastrowid
    except sqlite3.Error as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The inquiry could not be saved. Please try again.",
        ) from error

    inquiry = Inquiry(
        id=inquiry_id,
        name=payload.name,
        email=payload.email,
        message=payload.message,
        created_at=created_at,
    )
    send_notification(
        "New North Weave Mills inquiry",
        f"Name: {inquiry.name}\nEmail: {inquiry.email}\n\n{inquiry.message}",
    )
    return inquiry


@router.get("", response_model=list[Inquiry])
def list_inquiries() -> list[Inquiry]:
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT id, name, email, message, created_at FROM inquiries ORDER BY id DESC"
        ).fetchall()
    return [Inquiry(**dict(row)) for row in rows]
