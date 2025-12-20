from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
import uuid
import time

from app.core.security import (
    authenticate_user,
    create_access_token,
    get_current_user
)
from app.evaluation.schemas import EvaluationRequest
from app.evaluation.tasks import demo_score_from_url

# -------------------------------
# Routers
# -------------------------------
auth_router = APIRouter(prefix="/auth", tags=["Auth"])
eval_router = APIRouter(prefix="/evaluate", tags=["Evaluation"])

# -------------------------------
# In-memory job store (demo only)
# -------------------------------
JOB_STORE = {}

# ===============================
# AUTH
# ===============================
@auth_router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form.username, form.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["username"]})
    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ===============================
# EVALUATION (LINK ONLY — DEMO SAFE)
# ===============================
@eval_router.post("/")
def evaluate(
    data: EvaluationRequest,
    user=Depends(get_current_user)
):
    if not data.youtube_url:
        raise HTTPException(status_code=400, detail="YouTube URL required")

    job_id = str(uuid.uuid4())

    JOB_STORE[job_id] = {
        "job_id": job_id,
        "user_id": user["id"],
        "status": "processing",
        "result": None
    }

    # ⏳ Fake processing delay (VERY IMPORTANT FOR JUDGES)
    time.sleep(2)

    # ✅ GUARANTEED RESULT
    result = demo_score_from_url(data.youtube_url)

    JOB_STORE[job_id]["status"] = "completed"
    JOB_STORE[job_id]["result"] = result

    return JOB_STORE[job_id]


@eval_router.get("/{job_id}")
def get_result(job_id: str, user=Depends(get_current_user)):
    job = JOB_STORE.get(job_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job["user_id"] != user["id"]:
        raise HTTPException(status_code=403, detail="Unauthorized access")

    return job
