import sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
if ROOT not in sys.path:
    sys.path.append(ROOT)

from celery import Celery
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
AWS_BUCKET = os.getenv("AWS_BUCKET_NAME")

def make_celery():
    celery = Celery(
        "accessibility_worker",
        backend="redis://localhost:6379/0",
        broker="redis://localhost:6379/0"
    )
    celery.conf.task_routes = {
        "process_video_task": {"queue": "accessibility"}
    }
    return celery

celery_app = make_celery()
