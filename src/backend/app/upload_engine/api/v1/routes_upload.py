# backend/app/api/v1/routes_upload.py
from fastapi import APIRouter, File, UploadFile, HTTPException
from uuid import uuid4
import os
import shutil

from src.backend.app.upload_engine.services.job_queue import enqueue_accessibility_job
from src.backend.app.upload_engine.db.sessions_store import create_session
from src.backend.app.upload_engine.services.video_scoring import compute_scores,compute_overall
from src.backend.app.upload_engine.services.video_scoring import extract_features
from src.backend.app.upload_engine.services.mode_blind import video_to_description
from src.backend.app.upload_engine.services.mode_deaf import process_deaf_mode
from src.backend.app.upload_engine.services.mode_easy import generate_easy_audio
from src.backend.app.upload_engine.services.video_proccessor import save_upload_file
from src.backend.app.upload_engine.utils.file_utils import save_upload_file


router = APIRouter()

UPLOAD_DIR = "/mnt/data/uploads"   # dev local path
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/convert")
async def convert_accessibility_mode(file: UploadFile, mode: str):
    file_path = save_upload_file(file)

    if mode == "blind":
        output_path = video_to_description(file_path)

    elif mode == "deaf":
        output_path = process_deaf_mode(file_path)

    elif mode == "easy":
        output_path = generate_easy_audio(file_path)

    else:
        raise HTTPException(status_code=400, detail="Invalid mode")

    return {"output_video": output_path}


@router.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):
    # 1. Save uploaded file
    file_id = str(uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}.mp4"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 2. Run the scoring system
    features = extract_features(file_path)
    score_result = compute_scores(features)
    overall_score = compute_overall(score_result)


    # 3. Return the results to frontend
    return {
        "file_id": file_id,
        "scores": score_result,
        "overall_score": overall_score
    }

    # Create simple session record
    create_session(session_id, mentor_id, save_path)

    # enqueue the background job
    job_id = enqueue_accessibility_job.delay(save_path, session_id, mentor_id).id

    return {"session_id": session_id, "job_id": job_id, "status": "queued", "file_path": save_path}
