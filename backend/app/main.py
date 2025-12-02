from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes_upload import router as upload_router

app = FastAPI(title="MentorMind AI Accessibility API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api/v1")

@app.get("/")
def home():
    return {"message": "Backend is running"}

