import time
import uuid

# In-memory job store (HACKATHON SAFE)
JOB_REGISTRY = {}

def create_job(source: str, source_type: str):
    """
    source_type: 'youtube' | 'upload'
    source: youtube_url OR file_path
    """
    job_id = str(uuid.uuid4())

    JOB_REGISTRY[job_id] = {
        "job_id": job_id,
        "source_type": source_type,
        "source": source,
        "status": "queued",
        "created_at": time.time(),
        "updated_at": time.time(),
        "result": None,
        "error": None
    }

    return job_id


def update_status(job_id: str, status: str):
    if job_id in JOB_REGISTRY:
        JOB_REGISTRY[job_id]["status"] = status
        JOB_REGISTRY[job_id]["updated_at"] = time.time()


def store_error(job_id: str, error: str):
    if job_id in JOB_REGISTRY:
        JOB_REGISTRY[job_id]["status"] = "failed"
        JOB_REGISTRY[job_id]["error"] = error
        JOB_REGISTRY[job_id]["updated_at"] = time.time()


def get_job(job_id: str):
    return JOB_REGISTRY.get(job_id)
