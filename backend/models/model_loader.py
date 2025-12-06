import os
import onnxruntime as ort

BASE_DIR = os.path.dirname(__file__)

def load_model(name: str):
    path = os.path.join(BASE_DIR, name)
    return ort.InferenceSession(path, providers=["CPUExecutionProvider"])
