import os
import onnxruntime as ort
import os
from src.models.generate_dummy_models import ensure_dummy_models_exist

# Before loading any ONNX models:
ensure_dummy_models_exist()


BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # this points to src/models/

def load_model(name):
    model_path = os.path.join(BASE_DIR, name)
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"MODEL NOT FOUND: {model_path}")
    return ort.InferenceSession(model_path)


clarity_model = load_model("clarity_model.onnx")
engagement_model = load_model("engagement_model.onnx")
filler_model = load_model("filler_model.onnx")
pace_model = load_model("pace_model.onnx")
tech_depth_model = load_model("tech_depth_model.onnx")






BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models")





def load_model(path):
    session = ort.InferenceSession(path)
    print("\n🔍 MODEL LOADED:", path)

    print("➡ Inputs:", [i.name for i in session.get_inputs()])
    print("➡ Outputs:", [o.name for o in session.get_outputs()])

    return session

