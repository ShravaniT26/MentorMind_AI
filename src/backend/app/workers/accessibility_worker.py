# backend/workers/accessibility_worker.py
from src.backend.app.upload_engine.services.job_queue import celery_app
from src.backend.app.upload_engine.db.sessions_store import update_session
import time, os, json

@celery_app.task(name="accessibility.process_accessibility_modes_task")
def process_accessibility_modes_task(file_path: str, session_id: str = None, mentor_id: str = None):
    """
    Week1 stub: simple processing demonstration.
    Replace with real ASR/AI steps later.
    """
    try:
        update_session(session_id, {"status": "processing"})
    except Exception:
        pass

    # Simulate steps and create placeholder outputs
    workdir = f"/mnt/data/outputs/{session_id}"
    os.makedirs(workdir, exist_ok=True)

    # Step 1: note file received
    meta = {"input_file": file_path}
    with open(os.path.join(workdir, "meta.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)

    # Simulated stages
    for step in ["extract_audio", "asr", "create_captions", "generate_notes"]:
        # simulate time-consuming job
        time.sleep(2)
        # update session with progress message
        try:
            update_session(session_id, {"status": f"running:{step}"})
        except Exception:
            pass

    # Create placeholder outputs
    with open(os.path.join(workdir, "transcript.txt"), "w", encoding="utf-8") as f:
        f.write("This is a placeholder transcript. Replace with ASR output later.\n")
    with open(os.path.join(workdir, "captions_en.srt"), "w", encoding="utf-8") as f:
        f.write("1\n00:00:00,000 --> 00:00:10,000\n[Caption placeholder]\n")
    with open(os.path.join(workdir, "notes.md"), "w", encoding="utf-8") as f:
        f.write("# Notes\n\n- Placeholder notes generated in Week1 pipeline\n")

    # Final update
    try:
        update_session(session_id, {"status": "completed", "outputs": {
            "transcript": os.path.join(workdir, "transcript.txt"),
            "captions": os.path.join(workdir, "captions_en.srt"),
            "notes": os.path.join(workdir, "notes.md")
        }})
    except Exception:
        pass

    return {"session_id": session_id, "status": "completed"}
