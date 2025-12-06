# backend/app/api/v1/routes_upload.py
from fastapi import APIRouter, File, UploadFile, HTTPException
from uuid import uuid4
import os
from app.services.job_queue import enqueue_accessibility_job
from app.db.sessions_store import create_session
from app.services.video_scoring import calculate_real_scores

router = APIRouter()

UPLOAD_DIR = "/mnt/data/uploads"   # dev local path
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):
    # 1. Save uploaded file
    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}.mp4"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 2. Run the scoring system
    scores = calculate_real_scores(file_path)

    # 3. Return the results to frontend
    return {
        "evaluation_id": file_id,
        "scores": scores
    }

    # Create simple session record
    create_session(session_id, mentor_id, save_path)

    # enqueue the background job
    job_id = enqueue_accessibility_job.delay(save_path, session_id, mentor_id).id

    return {"session_id": session_id, "job_id": job_id, "status": "queued", "file_path": save_path}
