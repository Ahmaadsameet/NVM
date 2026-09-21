from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class InquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)


class Inquiry(InquiryCreate):
    id: int
    created_at: datetime


class ProjectBriefCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    brand_name: str = Field(min_length=2, max_length=160)
    instagram: str | None = Field(default=None, max_length=160)
    contact_email: EmailStr
    product_type: str = Field(min_length=2, max_length=500)
    total_pieces: int = Field(gt=0, le=10_000_000)
    tech_packs_available: bool
    colours: str = Field(min_length=2, max_length=1000)
    pieces_per_style: str = Field(min_length=1, max_length=1000)


class ProjectBrief(ProjectBriefCreate):
    id: int
    created_at: datetime
