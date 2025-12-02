# backend/app/api/v1/routes_upload.py
from fastapi import APIRouter, File, UploadFile, HTTPException
from uuid import uuid4
import os
from app.services.job_queue import enqueue_accessibility_job
from app.db.sessions_store import create_session

router = APIRouter()

UPLOAD_DIR = "/mnt/data/uploads"   # dev local path
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-video")
async def upload_video(file: UploadFile = File(...), mentor_id: str | None = None):
    ext = os.path.splitext(file.filename)[1] or ""
    session_id = uuid4().hex
    filename = f"{session_id}{ext}"
    save_path = os.path.join(UPLOAD_DIR, filename)
    try:
        with open(save_path, "wb") as f:
            f.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {e}")

    # Create simple session record
    create_session(session_id, mentor_id, save_path)

    # enqueue the background job
    job_id = enqueue_accessibility_job.delay(save_path, session_id, mentor_id).id

    return {"session_id": session_id, "job_id": job_id, "status": "queued", "file_path": save_path}
