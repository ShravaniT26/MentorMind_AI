from .mode_deaf import generate_subtitles
from .mode_blind import video_to_description
from .mode_easy import generate_easy_audio

def process_video(video_path, mode):
    if mode == "deaf":
        return generate_subtitles(video_path)

    if mode == "blind":
        return video_to_description(video_path)

    if mode == "easy":
        return generate_easy_audio("Content extracted placeholder")

    return None
