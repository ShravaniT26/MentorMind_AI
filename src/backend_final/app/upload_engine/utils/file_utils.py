
import uuid
from src.backend.app.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, AWS_BUCKET
import os
import shutil

UPLOAD_DIR = "/mnt/data/uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_upload_file(upload_file):
    file_path = os.path.join(UPLOAD_DIR, upload_file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return file_path


