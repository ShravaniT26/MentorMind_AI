from transformers import pipeline
from gtts import gTTS

summarizer = pipeline("summarization")

def generate_easy_audio(text):
    summary = summarizer(text, max_length=120, min_length=40)[0]["summary_text"]
    tts = gTTS(summary)
    return tts
