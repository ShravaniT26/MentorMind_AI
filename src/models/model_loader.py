import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1️⃣ Model configuration (ONLY metadata, no function calls)
MODEL_CONFIG = {
    "clarity": ("clarity_model.onnx", 0, 10),
    "engagement": ("engagement_cnn.onnx", 0, 10),
    "pace": ("pace_model.onnx", 0, 10),
    "tech_depth": ("tech_depth_model.onnx", 0, 10),
    "filler": ("filler_model.onnx", 0, 10),
}


# 2️⃣ Dummy model generator (used if file missing)
def create_range_model(input_size: int, min_val: float, max_val: float):
    def model(_):
        return float((min_val + max_val) / 2)
    return model


# 3️⃣ Load model by NAME (not path)
def load_model(model_name: str):
    if model_name not in MODEL_CONFIG:
        raise ValueError(f"Unknown model name: {model_name}")

    file_name, min_val, max_val = MODEL_CONFIG[model_name]
    model_path = os.path.join(BASE_DIR, file_name)

    # If real ONNX model exists → later load with onnxruntime
    if os.path.exists(model_path):
        return create_range_model(1, min_val, max_val)

    # Fallback dummy model
    return create_range_model(1, min_val, max_val)


# 4️⃣ (OPTIONAL) Preload & cache models
LOADED_MODELS = {
    name: load_model(name)
    for name in MODEL_CONFIG
}
