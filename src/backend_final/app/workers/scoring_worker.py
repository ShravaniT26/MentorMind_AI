import sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
sys.path.append(ROOT)
import boto3
import requests
import tempfile
from src.backend.app.services.video_proccessor import extract_features
from src.backend.app.services.video_scoring import compute_scores, compute_overall
from src.backend.app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION
from celery import Celery
from src.backend.app.services.video_scoring import score_video
from src.backend.app.services.mode_blind import generate_blind_version
from src.backend.app.services.mode_deaf import generate_deaf_version
from src.backend.app.services.mode_easy import generate_easy_version
from src.backend.app.db.sessions_store import store_result

def download_s3_video(url):
    # Download S3 video URL to temp file
    response = requests.get(url)
    response.raise_for_status()

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    temp.write(response.content)
    temp.close()
    return temp.name


celery_app = Celery(
    "scoring_worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

@celery_app.task()
def process_scoring(s3_url: str):
    # Download from S3
    video_path = download_s3_video(s3_url)

    # Extract features
    features = extract_features(video_path)

    # Compute scores
    scores = compute_scores(features)
    overall = compute_overall(scores)

    return {
        "video_url": s3_url,
        "overall": overall,
        **scores,
        "feedback": {
            "clarity": "Improve explanation structure.",
            "engagement": "Increase energy and body language.",
            "pace": "Try slowing down slightly.",
            "filler_score": "Reduce filler words like 'um', 'so'.",
            "technical_depth": "Add more examples or deep insights."
        }
    }

@celery_app.task(name="process_accessibility_mode")
def process_accessibility_mode(video_path: str, mode: str):
    """ Run accessibility transformations """
    
    if mode == "blind":
        return generate_blind_version(video_path)
    elif mode == "deaf":
        return generate_deaf_version(video_path)
    elif mode == "easy":
        return generate_easy_version(video_path)
    elif mode == "all":
        return {
            "blind": generate_blind_version(video_path),
            "deaf": generate_deaf_version(video_path),
            "easy": generate_easy_version(video_path)
        }
    else:
        return {"error": "Invalid mode"}
