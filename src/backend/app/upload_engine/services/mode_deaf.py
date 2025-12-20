# mode_deaf.py
import os
from moviepy import VideoFileClip
import whisper

model = whisper.load_model("small")

def process_deaf_mode(video_path):
    clip = VideoFileClip(video_path)
    audio_path = video_path.replace(".mp4", "_audio.wav")
    clip.audio.write_audiofile(audio_path, verbose=False, logger=None)

    result = model.transcribe(audio_path)

    srt_path = video_path.replace(".mp4", "_subtitles.srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(result["segments"], 1):
            start = seg["start"]
            end = seg["end"]
            text = seg["text"].strip()

            f.write(f"{i}\n")
            f.write(f"{format_time(start)} --> {format_time(end)}\n")
            f.write(f"{text}\n\n")

    return srt_path


def format_time(secs):
    hrs = int(secs // 3600)
    mins = int((secs % 3600) // 60)
    sec = int(secs % 60)
    ms = int((secs - int(secs)) * 1000)
    return f"{hrs:02}:{mins:02}:{sec:02},{ms:03}"
