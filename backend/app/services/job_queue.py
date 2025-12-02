# backend/app/services/job_queue.py
from celery import Celery
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery_app = Celery("mentor_tasks", broker=REDIS_URL, backend=REDIS_URL)

# import worker tasks (so task registration happens)
# (worker module will be in backend/workers)
# enqueue helper
def enqueue_accessibility_job(file_path, session_id=None, mentor_id=None):
    # returns AsyncResult (call .delay() on this function where used)
    return celery_app.send_task("accessibility.process_accessibility_modes_task", args=(file_path, session_id, mentor_id))
