import onnxruntime as ort
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models")

import onnxruntime as ort

def load_model(path):
    session = ort.InferenceSession(path)
    print("\n🔍 MODEL LOADED:", path)

    print("➡ Inputs:", [i.name for i in session.get_inputs()])
    print("➡ Outputs:", [o.name for o in session.get_outputs()])

    return session

