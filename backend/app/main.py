from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import initialize_database
from .routes.health import router as health_router
from .routes.briefs import router as briefs_router
from .routes.inquiries import router as inquiries_router
from .settings import get_cors_origins


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


app = FastAPI(
    title="North Weave Mills API",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-Admin-Token"],
)
app.include_router(health_router)
app.include_router(inquiries_router)
app.include_router(briefs_router)
