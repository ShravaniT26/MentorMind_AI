from celery import Celery
from app.services.video_scoring import score_video
from app.services.mode_blind import generate_blind_version
from app.services.mode_deaf import generate_deaf_version
from app.services.mode_easy import generate_easy_version
from app.db.sessions_store import store_result

celery_app = Celery(
    "scoring_worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

@celery_app.task()
def process_scoring(video_path: str):
    features = extract_features(video_path)
    scores = compute_scores(features)
    overall = compute_overall(scores)

    return {
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
