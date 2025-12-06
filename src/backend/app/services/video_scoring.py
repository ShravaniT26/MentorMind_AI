import numpy as np
from app.models.model_loader import load_model

# Load ONNX models
clarity_model = load_model("clarity_model.onnx")
engagement_model = load_model("engagement_cnn.onnx")
pace_model = load_model("pace_model.onnx")
filler_model = load_model("filler_model.onnx")
tech_model = load_model("tech_depth_model.onnx")

def run_model(model, features):
    inputs = {"input": features.astype("float32")}
    output = model.run(["score"], inputs)[0]
    return float(output[0][0])

def compute_scores(features: np.ndarray):
    return {
        "clarity": run_model(clarity_model, features),
        "engagement": run_model(engagement_model, features),
        "pace": run_model(pace_model, features),
        "filler_score": run_model(filler_model, features),
        "technical_depth": run_model(tech_model, features)
    }

def compute_overall(scores):
    return (
        scores["clarity"] * 0.25 +
        scores["engagement"] * 0.25 +
        scores["pace"] * 0.20 +
        scores["filler_score"] * 0.15 +
        scores["technical_depth"] * 0.15
    )
