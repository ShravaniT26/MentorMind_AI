import cv2
from transformers import pipeline
from gtts import gTTS
import os

captioner = pipeline("image-to-text", model="nlpconnect/vit-gpt2-image-captioning")

def video_to_description(video_path):
    vid = cv2.VideoCapture(video_path)
    descriptions = []

    while True:
        ret, frame = vid.read()
        if not ret:
            break

        frame_path = "temp_frame.jpg"
        cv2.imwrite(frame_path, frame)

        caption = captioner(frame_path)[0]["generated_text"]
        descriptions.append(caption)

    full_text = ". ".join(descriptions)
    tts = gTTS(text=full_text, lang="en")
    audio_out = video_path.replace(".mp4", "_blind.mp3")
    tts.save(audio_out)

    return audio_out
