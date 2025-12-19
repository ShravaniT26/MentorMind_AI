
from app.evaluation.service import evaluate_full_transcript
from app.evaluation.transcript import fetch_transcript

from app.evaluation.evaluator import (
    
    evaluate_transcript
)

def evaluate_video_task(youtube_url: str, job_id: str, store: dict):
    try:
        store[job_id]["status"] = "fetching_transcript"

        transcript = fetch_transcript(youtube_url)

        store[job_id]["status"] = "evaluating"

        scores = evaluate_transcript(transcript)

        overall = round(sum(scores.values()) / len(scores), 2)

        store[job_id]["status"] = "completed"
        store[job_id]["result"] = {
            **scores,
            "overall_score": overall
        }

    except Exception as e:
        store[job_id]["status"] = "failed"
        store[job_id]["result"] = {"error": str(e)}
