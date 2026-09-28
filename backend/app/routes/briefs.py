from fastapi import APIRouter, HTTPException, status

from ..notifications import NotificationError, send_notification
from ..schemas import ProjectBriefCreate


router = APIRouter(prefix="/api/project-briefs", tags=["Project briefs"])


@router.post("", response_model=ProjectBriefCreate, status_code=status.HTTP_201_CREATED)
def create_project_brief(payload: ProjectBriefCreate) -> ProjectBriefCreate:
    try:
        send_notification(
            "New North Weave Mills project brief",
            "\n".join(
                [
                    f"Brand: {payload.brand_name}",
                    f"Instagram: {payload.instagram or 'Not provided'}",
                    f"Contact email: {payload.contact_email}",
                    f"Product: {payload.product_type}",
                    f"Total pieces: {payload.total_pieces}",
                    f"Tech packs available: {'Yes' if payload.tech_packs_available else 'No'}",
                    f"Colours: {payload.colours}",
                    f"Pieces per style: {payload.pieces_per_style}",
                ]
            ),
            reply_to=str(payload.contact_email),
        )
    except NotificationError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The project brief could not be emailed. Please try again.",
        ) from error
    return payload
