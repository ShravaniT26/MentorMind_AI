import cv2
import numpy as np
import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from transformers import AutoModelForCausalLM
import statistics
import warnings
warnings.filterwarnings("ignore")

############################################
# 1. LOAD MODELS ONCE (FAST)
############################################

# Whisper for speech-to-text
asr = pipeline("automatic-speech-recognition", model="openai/whisper-small")

# Sentiment / engagement classifier
sentiment_model = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

# Classroom clarity / semantic coherence scorer
clarity_model = pipeline("text-classification", model="MoritzLaurer/mDeBERTa-v3-base-mnli-xnli")

# Lightweight Llama model for rubric scoring
tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
llm = AutoModelForCausalLM.from_pretrained("google/gemma-2b-it")


############################################
# 2. EXTRACT TRANSCRIPT USING WHISPER
############################################

def extract_transcript(video_path: str) -> str:
    try:
        result = asr(video_path)
        return result["text"]
    except:
        return ""


############################################
# 3. ENGAGEMENT SCORE (Based on sentiment)
############################################

def score_engagement(transcript: str) -> float:
    """
    Higher positivity = better engagement.
    """
    chunks = transcript.split(".")
    sentiments = []

    for ch in chunks[:20]:   # limit for speed
        if len(ch.strip()) > 5:
            s = sentiment_model(ch)[0]
            if s["label"] == "POSITIVE":
                sentiments.append(0.9)
            elif s["label"] == "NEUTRAL":
                sentiments.append(0.7)
            else:
                sentiments.append(0.4)

    return round(statistics.mean(sentiments), 2) if sentiments else 0.6


############################################
# 4. CLARITY SCORE (Semantic consistency)
############################################

def score_clarity(transcript: str) -> float:
    sentences = transcript.split(".")
    scores = []

    for s in sentences[:15]:
        if len(s.strip()) > 5:
            result = clarity_model(s)[0]["label"]
            if result == "ENTAILMENT":
                scores.append(0.9)
            elif result == "NEUTRAL":
                scores.append(0.7)
            else:
                scores.append(0.5)

    return round(statistics.mean(scores), 2) if scores else 0.7


############################################
# 5. TECHNICAL DEPTH (LLM rubric-based)
############################################

def score_technical_depth(transcript: str) -> float:
    prompt = f"""
    Rate the following lecture transcript for *technical depth* on a scale of 1-10.
    Respond with ONLY a number.

    Transcript:
    {transcript[:1500]}
    """

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = llm.generate(**inputs, max_new_tokens=10)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Extract number
    try:
        num = float("".join([c for c in response if c.isdigit() or c == "."]))
        return round(num / 10, 2)
    except:
        return 0.7


############################################
# 6. COMMUNICATION SCORE (Filler word detection)
############################################

def score_communication(transcript: str) -> float:
    filler_words = ["um", "uh", "like", "you know", "basically", "actually"]
    total_words = len(transcript.split())
    filler_count = sum(transcript.lower().count(w) for w in filler_words)

    if total_words == 0:
        return 0.7

    ratio = filler_count / total_words

    # Map ratio → score
    if ratio < 0.01:
        return 0.9
    if ratio < 0.03:
        return 0.8
    if ratio < 0.05:
        return 0.7
    return 0.6


############################################
# 7. INTERACTION SCORE (Question count)
############################################

def score_interaction(transcript: str) -> float:
    question_count = transcript.count("?")

    if question_count == 0:
        return 0.6
    elif question_count < 3:
        return 0.75
    else:
        return 0.9


############################################
# 8. COMBINED SCORING FUNCTION
############################################

def calculate_real_scores(video_path: str):
    transcript = extract_transcript(video_path)

    engagement = score_engagement(transcript)
    clarity = score_clarity(transcript)
    technical = score_technical_depth(transcript)
    communication = score_communication(transcript)
    interaction = score_interaction(transcript)

    overall = round((engagement + clarity + technical + communication + interaction) / 5, 2)

    return {
        "overall": overall,
        "engagement": engagement,
        "clarity": clarity,
        "technical_depth": technical,
        "communication": communication,
        "interaction": interaction,
        "transcript": transcript[:1500] + "..."
    }
