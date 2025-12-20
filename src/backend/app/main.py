from fastapi import FastAPI

from src.backend.app.upload_engine.api.v1.routes_upload import router as upload_router
from src.backend.app.youtube_engine.evaluation.routes import router as youtube_router
from src.backend.app.common.results_store import router as results_router

app = FastAPI()

app.include_router(upload_router, prefix="/api/v1")
app.include_router(youtube_router, prefix="/api/v1")
app.include_router(results_router, prefix="/api/v1")
