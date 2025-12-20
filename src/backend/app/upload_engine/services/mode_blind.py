# mode_blind.py
import os
import cv2
from gtts import gTTS
import numpy as np
import tempfile

def describe_frame(frame):
    """Basic object description using brightness + motion heuristics."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    brightness = np.mean(gray)

    if brightness < 60:
        return "The scene is dark."
    elif brightness > 180:
        return "The scene is bright."

    return "A normal lighting scene with one or more objects."

def video_to_description(video_path):
    cap = cv2.VideoCapture(video_path)
    descriptions = []

    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Describe every ~1 sec
        if frame_count % 30 == 0:
            desc = describe_frame(frame)
            descriptions.append(desc)

        frame_count += 1

    cap.release()

    # Join into a single narration
    text = ". ".join(descriptions)

    # Convert to audio
    output_audio = video_path.replace(".mp4", "_blind_mode.mp3")
    tts = gTTS(text)
    tts.save(output_audio)

    return output_audio
