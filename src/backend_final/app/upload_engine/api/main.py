import sys
import os

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.append(ROOT_DIR)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.backend.app.api.v1.routes_upload import router as upload_router
from src.backend.app.api.v1.routes_health import router as health_router
from src.backend.app.api.v1.routes_results import router as results_router
from src.backend.app.api.v1 import routes_score
# app/main.py
from src.backend.app.api.main import app



from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"status": "FastAPI working on Vercel!"}





app = FastAPI(title="MentorMind AI Accessibility API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api/v1")
app.include_router(health_router, prefix="/api/v1")
app.include_router(results_router, prefix="/api/v1")
app.include_router(routes_score.router)


@app.get("/")
def home():
    return {"message": "Backend is running"}

