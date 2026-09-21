from datetime import datetime, timezone
import sqlite3

from fastapi import APIRouter, HTTPException, status

from ..database import get_connection
from ..notifications import send_notification
from ..schemas import ProjectBrief, ProjectBriefCreate


router = APIRouter(prefix="/api/project-briefs", tags=["Project briefs"])


@router.post("", response_model=ProjectBrief, status_code=status.HTTP_201_CREATED)
def create_project_brief(payload: ProjectBriefCreate) -> ProjectBrief:
    created_at = datetime.now(timezone.utc)
    try:
        with get_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO project_briefs (
                    brand_name, instagram, contact_email, product_type,
                    total_pieces, tech_packs_available, colours,
                    pieces_per_style, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    payload.brand_name,
                    payload.instagram,
                    str(payload.contact_email),
                    payload.product_type,
                    payload.total_pieces,
                    int(payload.tech_packs_available),
                    payload.colours,
                    payload.pieces_per_style,
                    created_at.isoformat(),
                ),
            )
            connection.commit()
            brief_id = cursor.lastrowid
    except sqlite3.Error as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The project brief could not be saved. Please try again.",
        ) from error

    brief = ProjectBrief(id=brief_id, created_at=created_at, **payload.model_dump())
    send_notification(
        "New North Weave Mills project brief",
        "\n".join(
            [
                f"Brand: {brief.brand_name}",
                f"Instagram: {brief.instagram or 'Not provided'}",
                f"Contact email: {brief.contact_email}",
                f"Product: {brief.product_type}",
                f"Total pieces: {brief.total_pieces}",
                f"Tech packs available: {'Yes' if brief.tech_packs_available else 'No'}",
                f"Colours: {brief.colours}",
                f"Pieces per style: {brief.pieces_per_style}",
            ]
        ),
    )
    return brief
