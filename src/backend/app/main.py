from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes_upload import router as upload_router
from app.api.v1.routes_health import router as health_router
from app.api.v1 import routes_results
from app.api.v1 import routes_score




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
app.include_router(routes_results, prefix="/api/v1")
app.include_router(routes_score.router)


@app.get("/")
def home():
    return {"message": "Backend is running"}

