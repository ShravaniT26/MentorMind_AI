from fastapi import APIRouter, HTTPException
import json
import os
from src.backend.app.db.sessions_store import get_session

router = APIRouter(prefix="/api/v1/results", tags=["Results"])

RESULTS_DIR = "results"

@router.get("/{evaluation_id}")
def get_evaluation_results(evaluation_id: str):

    file_path = os.path.join(RESULTS_DIR, f"{evaluation_id}.json")

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Evaluation not found or still being processed."
        )

    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        return data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
