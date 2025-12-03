from celery import Celery

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
