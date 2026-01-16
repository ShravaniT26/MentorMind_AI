MentorMindAI
Smart Video Evaluation and Accessibility Engine

MentorMindAI is an AI-powered backend platform that evaluates teaching quality from recorded videos and converts educational content into accessible learning formats.
The system uses ONNX-based machine learning models, FastAPI, and asynchronous processing to deliver scalable, reproducible, and fair video evaluations.

Problem Statement

Teaching quality evaluation is often subjective, inconsistent, and inaccessible for learners with disabilities.
Educators lack objective feedback mechanisms, and students with visual, hearing, or learning challenges struggle to access standard video content.

Proposed Solution

MentorMindAI provides:

Objective, AI-driven teaching quality assessment

Deterministic and reproducible evaluation scores

Automated accessibility conversion for inclusive learning

Key Features
Video Scoring System

Uploaded teaching videos are evaluated across multiple dimensions:

Clarity

Engagement

Pace

Filler Word Usage

Technical Depth

Weighted Overall Score

Each metric is independently inferred using ONNX models to ensure fairness and consistency.

Accessibility Modes

MentorMindAI converts videos into the following formats:

Blind Mode
Generates audio narration describing visual and spoken content.

Deaf Mode
Automatically generates subtitles using Whisper speech-to-text and exports .srt files.

Easy Mode
Produces simplified narration using text summarization and text-to-speech for improved comprehension.

Machine Learning Models

The system uses dedicated ONNX models for each evaluation metric:

clarity_model.onnx

engagement_cnn.onnx

pace_model.onnx

filler_model.onnx

tech_depth_model.onnx

Each model contributes to a deterministic final score.

System Architecture Overview
Frontend (React + Vite)
        |
        v
FastAPI REST API
        |
        v
Async Task Queue (Redis + Celery)
        |
        v
Worker Engine
 - Audio Extraction
 - Whisper Transcription
 - Feature and Frame Extraction
 - ONNX Model Inference
 - Accessibility Mode Generation
        |
        v
Results Storage (Database / JSON)
        |
        v
Results Dashboard and Accessibility Output

Project Structure
MentorMindAI/
├── backend/
│   └── app/
│       ├── api/v1/
│       │   └── routes_upload.py
│       ├── services/
│       │   ├── video_scoring.py
│       │   ├── mode_blind.py
│       │   ├── mode_deaf.py
│       │   ├── mode_easy.py
│       │   └── video_processor.py
│       └── main.py
├── models/
│   ├── clarity_model.onnx
│   ├── engagement_cnn.onnx
│   ├── pace_model.onnx
│   ├── filler_model.onnx
│   └── tech_depth_model.onnx
├── frontend/ (optional)
├── requirements.txt
└── README.md

Technology Stack

Backend

FastAPI

Celery

Redis

ONNX Runtime

FFmpeg

AI and ML

Whisper ASR

Transformers

PyTorch

OpenCV

Frontend (Optional)

React

Vite
