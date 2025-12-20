from .mode_deaf import process_deaf_mode
from .mode_blind import video_to_description
from .mode_easy import generate_easy_audio
import os
from fastapi import UploadFile

UPLOAD_DIR = "/mnt/data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_upload_file(file: UploadFile) -> str:
    """Save uploaded file to disk and return filepath."""
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path

def process_video(video_path, mode):
    if mode == "deaf":
        return process_deaf_mode(video_path)

    if mode == "blind":
        return video_to_description(video_path)

    if mode == "easy":
        return generate_easy_audio("Content extracted placeholder")

    return None
