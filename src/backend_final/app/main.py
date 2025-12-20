from fastapi import FastAPI

from backend_upload.routes_upload import router as upload_router
from backend_youtube.routes_youtube import router as youtube_router
from common.results import router as results_router

app = FastAPI()

app.include_router(upload_router, prefix="/api/v1")
app.include_router(youtube_router, prefix="/api/v1")
app.include_router(results_router, prefix="/api/v1")
