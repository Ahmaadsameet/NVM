from fastapi import APIRouter, HTTPException, status

from ..notifications import NotificationError, send_notification
from ..schemas import InquiryCreate


router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])


@router.post("", response_model=InquiryCreate, status_code=status.HTTP_201_CREATED)
def create_inquiry(payload: InquiryCreate) -> InquiryCreate:
    try:
        send_notification(
            "New North Weave Mills inquiry",
            f"Name: {payload.name}\nEmail: {payload.email}\n\n{payload.message}",
            reply_to=str(payload.email),
        )
    except NotificationError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The inquiry could not be emailed. Please try again.",
        ) from error
    return payload
