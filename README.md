#  MentorMind AI  
### AI-Powered Lecture Evaluation & Accessibility Generator

MentorMind AI is a smart evaluation system that analyzes uploaded lecture videos and generates:

✔ **Real-time teaching performance scores**  
✔ **Clarity, Engagement, Pace, Technical Depth & Filler Word metrics**  
✔ **AI-generated accessibility versions** (Blind, Deaf, Easy Mode)  
✔ **Interactive feedback dashboard** (frontend)  
✔ **Gamified badges & analytics**  

This project enables mentors, teachers, and trainers to receive automated insights and accessibility-enhanced lecture versions.

---

#  Features

###  **1. Upload Lecture Videos**
Users upload MP4 videos through the React frontend.

###  **2. AI Scoring Pipeline**
The backend uses ONNX models + Celery workers to compute:

- **Clarity Score**  
- **Engagement Score**  
- **Pace Score**  
- **Filler Word Score**  
- **Technical Depth Score**  
- Combined **Overall Score (0–10)**

###  **3. Accessibility Modes**
Automatically generate alternative versions:

- **Blind Mode → Audio-described video**
- **Deaf Mode → Auto subtitles (.srt)**
- **Easy Mode → Simplified transcript text**

###  **4. Beautiful Results Dashboard**
Frontend includes:

- Metric cards  
- Scores per parameter  
- Weekly improvement  
- Earned badges  
- Suggested videos  
- Accessibility toggles  

###  **5. Worker Queue System**
Celery + Redis handles:

- Background scoring  
- Video processing  
- Accessibility mode generation  

###  **6. AWS S3 Integration**
Uploaded videos, processed videos, audio versions, and reports stored securely.

---

#  System Architecture

                        ┌──────────────────────────────┐
                        │          Frontend            │
                        │        (React + Vite)        │
                        │ ─ File Upload (Video)        │
                        │ ─ Show Results Dashboard     │
                        │ ─ Accessibility UI           │
                        └───────────────▲──────────────┘
                                        │
                                        │  HTTP (REST)
                                        │
                        ┌───────────────┴──────────────┐
                        │           FastAPI API         │
                        │        /api/v1/score          │
                        │        /api/v1/results/{id}   │
                        │        /api/v1/upload         │
                        └───────────────▲──────────────┘
                                        │
                   Upload Video ┌───────┴────────┐ Queue Job
                                │                │
                                ▼                ▼
                   ┌─────────────────┐   ┌─────────────────┐
                   │     AWS S3      │   │      Redis       │
                   │   Storage Bucket│   │  Task Queue      │
                   └───────▲─────────┘   └─────────▲───────┘
                           │                       │
                           │ Fetch video           │ Celery Task
                           │                       │
                    ┌──────┴───────────────────────┴─────┐
                    │             Celery Worker            │
                    │ ─ Audio Extraction (librosa)         │
                    │ ─ Transcript (ASR)                   │
                    │ ─ Frame Sampling                     │
                    │ ─ ONNX Model Inference:              │
                    │       • clarity_model.onnx           │
                    │       • engagement_cnn.onnx          │
                    │       • pace_estimator.onnx          │
                    │       • filler_detector.onnx         │
                    │       • tech_score_model.onnx        │
                    │ ─ Scoring Engine                     │
                    │ ─ Save Final JSON Output             │
                    └─────────▲────────────────────────────┘
                              │
                              │ Writes result
                              │
                     ┌────────┴────────┐
                     │   Results Store │
                     │  (DB / JSON)    │
                     └────────▲────────┘
                              │
                    Frontend Fetches Final Results
                              │
                              ▼
                    ┌───────────────────┐
                    │ Results Dashboard │
                    │ Graphs + Badges   │
                    │ Accessibility Modes│
                    └───────────────────┘



---

#  Tech Stack

### **Frontend**
- React + TypeScript  
- TailwindCSS  
- Framer Motion  
- Lucide Icons  

### **Backend**
- FastAPI  
- Celery  
- Redis  
- ONNX Runtime  
- Boto3 (AWS S3)

### **Infrastructure**
- AWS S3 (Storage)  
- Docker  

---

#  Folder Structure



---

#  API Documentation

##  **POST /api/v1/score**
Uploads a video & triggers AI scoring.

### **Request**
- Multipart Form Data
  - `video_file`: `.mp4` file

### **Response**
```json
{
  "evaluation_id": "abc123",
  "status": "processing"
}

📌 GET /api/v1/results/{evaluation_id}

Fetch processed scoring results.

Sample Response
{
  "clarity": 0.82,
  "engagement": 0.74,
  "pace": 0.65,
  "filler": 0.40,
  "technical_depth": 0.71,
  "overall": 7.8,
  "feedback": {
    "clarity": "Good explanation, try adding examples.",
    "engagement": "Add questions to involve audience."
  }
}

📌 POST /api/v1/upload

Generate accessibility content.

Parameters:

video_file

mode = blind | deaf | easy

Response:
{
  "job_id": "xyz99",
  "message": "Processing started"
}

---

🧰 Setup Instructions (Local Development)
1️⃣ Clone the repo
git clone https://github.com/your-name/MentorMindAI.git
cd MentorMindAI

🖥️ Backend Setup (FastAPI)
2️⃣ Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Start Redis (for Celery)

Mac/Linux:

redis-server


Windows:

Install Redis via Docker

docker run -p 6379:6379 redis

5️⃣ Start FastAPI
uvicorn app.main:app --reload

🧵 Worker Setup (Celery)

Open new terminal:

cd backend
source venv/bin/activate
celery -A app.workers.celery_app.celery worker --loglevel=info


Now Celery runs async scoring tasks.

🌐 Frontend Setup (React)
cd frontend
npm install
npm run dev






