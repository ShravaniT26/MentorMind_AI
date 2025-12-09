from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
import os
import json
import subprocess
from pathlib import Path
import whisper
import re
import uuid

from src.backend.app.services.job_queue import enqueue_job


router = APIRouter(prefix="/score")

JOB_MAP = {}  # job_id → celery task id

@router.post("/")
async def upload_for_scoring(video_file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())

    # Read file bytes
    file_bytes = await video_file.read()

    # Upload to S3
    s3_url = upload_file_to_s3(file_bytes, ext=".mp4")

    # Start Celery scoring task
    task = process_scoring.delay(s3_url)
    JOB_MAP[job_id] = task.id

    return {"evaluation_id": job_id}

RESULTS_DIR = "results"
os.makedirs(RESULTS_DIR, exist_ok=True)

# Load Whisper once
whisper_model = whisper.load_model("small")   # change to "base" or "tiny" if GPU slow


# ---------------------------------------------------
# 🧠 Helper → extract audio from video
# ---------------------------------------------------
def extract_audio(video_path, output_audio):
    cmd = [
        "ffmpeg",
        "-i", video_path,
        "-vn",
        "-acodec", "mp3",
        output_audio,
        "-y"
    ]
    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


# ---------------------------------------------------
# 🎯 Helper → calculate engagement, clarity, etc.
# ---------------------------------------------------
def calculate_metrics(transcript: str):

    total_words = len(transcript.split())

    filler_words = re.findall(r"\b(um|uh|like|you know|so)\b", transcript, re.I)
    num_fillers = len(filler_words)

    questions = re.findall(r"\?", transcript)
    num_questions = len(questions)

    long_words = [w for w in transcript.split() if len(w) > 10]
    tech_depth = len(long_words) / max(total_words, 1)

    # 🧮 Compute scores (out of 10)
    clarity = max(3, 10 - (num_fillers * 0.3))
    engagement = min(10, 5 + num_questions * 0.5)
    pace = min(10, max(2, total_words / 120))  # 120 words/min = healthy teaching pace
    filler_score = max(2, 10 - num_fillers * 0.2)
    tech_score = min(10, tech_depth * 50)

    overall_score = round(
        (clarity + engagement + pace + filler_score + tech_score) / 5, 2
    )

    metrics = [
        {"name": "Clarity", "score": round(clarity, 2), "color": "yellow"},
        {"name": "Engagement", "score": round(engagement, 2), "color": "blue"},
        {"name": "Pace", "score": round(pace, 2), "color": "green"},
        {"name": "Filler Words", "score": round(filler_score, 2), "color": "red"},
        {"name": "Technical Depth", "score": round(tech_score, 2), "color": "purple"},
    ]

    return overall_score, metrics


# ---------------------------------------------------
# ⭐ MAIN SCORING ENDPOINT
# ---------------------------------------------------
@router.post("/")
async def score_video(video_file: UploadFile = File(...)):
    try:
        job_id = str(uuid.uuid4())
        video_path = f"uploads/{job_id}.mp4"
        audio_path = f"uploads/{job_id}.mp3"

        os.makedirs("uploads", exist_ok=True)

        # Save video
        with open(video_path, "wb") as f:
            f.write(await video_file.read())

        # Step 1 → Extract audio
        extract_audio(video_path, audio_path)

        # Step 2 → Transcribe using Whisper
        result = whisper_model.transcribe(audio_path)
        transcript = result["text"]

        # Step 3 → Score transcript
        overall_score, metrics = calculate_metrics(transcript)

        # Step 4 → Save results as JSON for frontend
        output_data = {
            "overallScore": overall_score,
            "metrics": metrics,
            "pointsEarned": int(overall_score * 25),
            "weeklyImprovement": "+12%",
            "badgesEarned": [
                {"name": "First Upload", "icon": "⭐", "description": "Completed your first evaluation"}
            ],
        }

        output_path = os.path.join(RESULTS_DIR, f"{job_id}.json")

        with open(output_path, "w") as f:
            json.dump(output_data, f, indent=4)

        return {"job_id": job_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
