MentorMindAI – Smart Video Evaluation & Accessibility Engine

MentorMindAI is an AI-powered backend system that evaluates teaching quality from recorded videos and converts videos into multiple accessibility modes — Blind Mode, Deaf Mode, and Easy Mode.

The platform leverages ONNX machine-learning models, FastAPI, and asynchronous processing to deliver scalable, reproducible, and fair video evaluations.

🚀 Project Overview

MentorMindAI provides two core capabilities:

1️⃣ Video Scoring System (AI Evaluation)

Upload a mentor’s teaching video and receive objective evaluation scores for:

Clarity

Engagement

Pace

Filler Word Usage

Technical Depth

Weighted Overall Score

🧠 Models Used (ONNX)

clarity_model.onnx

engagement_cnn.onnx

pace_model.onnx

filler_model.onnx

tech_depth_model.onnx

Each model focuses on a specific teaching metric and contributes to a deterministic final score.

2️⃣ Accessibility Modes

Convert uploaded videos into inclusive formats for diverse learners:

🔊 Blind Mode

Generates audio narration of visual and spoken content

📝 Deaf Mode

Generates subtitles (.srt) using Whisper Speech-to-Text

📖 Easy Mode

Produces simplified narration

Uses text summarization + Text-to-Speech (TTS)

🧱 Project Architecture Overview
📦 MentorMindAI
 ┣ backend/
 │ ┣ app/
 │ │ ┣ api/v1/
 │ │ │ ┣ routes_upload.py      → Upload & conversion APIs
 │ │ ┣ services/
 │ │ │ ┣ video_scoring.py      → ONNX scoring engine
 │ │ │ ┣ mode_blind.py         → Blind mode processing
 │ │ │ ┣ mode_deaf.py          → Deaf mode (subtitles)
 │ │ │ ┣ mode_easy.py          → Easy mode narration
 │ │ │ ┣ video_processor.py    → Video & audio utilities
 │ │ ┣ main.py                 → FastAPI entry point
 ┣ models/
 │ ┣ clarity_model.onnx
 │ ┣ engagement_cnn.onnx
 │ ┣ pace_model.onnx
 │ ┣ filler_model.onnx
 │ ┣ tech_depth_model.onnx
 ┣ frontend/ (optional)
 ┣ README.md
 ┣ requirements.txt

🧠 System Architecture Flow
                        ┌──────────────────────────────┐
                        │          Frontend            │
                        │        (React + Vite)        │
                        │ ─ Video Upload               │
                        │ ─ Results Dashboard          │
                        │ ─ Accessibility Controls     │
                        └───────────────▲──────────────┘
                                        │
                                        │ REST API
                                        │
                        ┌───────────────┴──────────────┐
                        │           FastAPI API         │
                        │   /api/v1/upload              │
                        │   /api/v1/score               │
                        │   /api/v1/convert             │
                        └───────────────▲──────────────┘
                                        │
                          Upload Video  │   Queue Task
                                ┌───────┴────────┐
                                ▼                ▼
                   ┌─────────────────┐   ┌─────────────────┐
                   │     Storage     │   │      Redis       │
                   │ (Local / S3)    │   │  Task Queue      │
                   └───────▲─────────┘   └─────────▲───────┘
                           │                       │
                           │ Fetch video           │ Background Job
                           │                       │
                    ┌──────┴───────────────────────┴─────┐
                    │           Worker Engine              │
                    │ ─ Audio Extraction                  │
                    │ ─ Transcript (Whisper ASR)          │
                    │ ─ Frame & Feature Extraction        │
                    │ ─ ONNX Model Inference              │
                    │ ─ Deterministic Scoring              │
                    │ ─ Accessibility Mode Generation     │
                    └─────────▲──────────────────────────┘
                              │
                              │ Store results
                              │
                     ┌────────┴────────┐
                     │   Results Store │
                     │ (DB / JSON)     │
                     └────────▲────────┘
                              │
                    Frontend Fetches Final Results
                              │
                              ▼
                    ┌───────────────────┐
                    │ Results Dashboard │
                    │ Scores + Graphs   │
                    │ Accessibility     │
                    └───────────────────┘

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-repo/MentorMindAI
cd MentorMindAI

2️⃣ Create Virtual Environment
python -m venv venv

3️⃣ Activate Environment

Windows

venv\Scripts\activate


Mac / Linux

source venv/bin/activate

4️⃣ Install Dependencies
pip install -r requirements.txt

5️⃣ Install FFmpeg (Required)

Windows

choco install ffmpeg


Mac

brew install ffmpeg

6️⃣ Generate Dummy ONNX Models (Demo Mode)
python models/generate_dummy_models.py

▶️ How to Run Locally

Start the FastAPI server:

uvicorn backend.app.main:app --reload


Server URL:

http://localhost:8000


Swagger Docs:

http://localhost:8000/docs

🔥 API Endpoints
1️⃣ Upload Video & Get Scores

POST /upload/video

Response

{
  "file_id": "56c7e543-0b4e-49f6-9509-fb6cbe6bc9b6",
  "scores": {
    "clarity": 0.82,
    "engagement": 0.56,
    "pace": 0.74,
    "filler": 0.21,
    "tech": 0.88
  },
  "overall_score": 0.73
}

2️⃣ Convert Video into Accessibility Mode

POST /convert?mode=blind
POST /convert?mode=deaf
POST /convert?mode=easy

Response

{
  "status": "success",
  "output_path": "/mnt/data/uploads/video_deaf_mode.srt"
}

🧪 Example Input & Output
Input

MP4 Video

Mode: deaf

Output

Extracted Audio

Whisper ASR Transcript

Subtitle File (.srt)

1
00:00:01,000 --> 00:00:03,000
Hello students, today we will learn AI.

📦 List of Dependencies

fastapi

uvicorn[standard]

python-multipart

celery

redis

pydantic

requests

python-dotenv

numpy

onnxruntime

opencv-python

pydub

moviepy

speechrecognition

transformers

torch

pillow

✨ Contributions

Shravani Tanksale (AI Lead)
Built scoring models, ONNX inference pipeline, backend logic, accessibility modes, and end-to-end system integration.

Vidyankshini Vibhute (Frontend)
Developed UI, dashboards, visualizations, upload workflows, and frontend-backend integration.

Devika Mule (Cloud / DevOps)
Designed cloud architecture, storage integration, async processing pipeline, deployment strategy, and performance optimizations.