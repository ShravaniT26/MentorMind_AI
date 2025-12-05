from transformers import WhisperProcessor, WhisperForConditionalGeneration
from transformers import AutoTokenizer, AutoModel
import onnxruntime as ort

def load_all_models():
    print("🔄 Loading models…")

    models = {}

    # 1️⃣ Whisper for transcription + clarity + pace + filler word detection
    models["whisper_processor"] = WhisperProcessor.from_pretrained("openai/whisper-medium")
    models["whisper_model"] = WhisperForConditionalGeneration.from_pretrained("openai/whisper-medium")

    # 2️⃣ SBERT for technical depth scoring
    models["sbert_tokenizer"] = AutoTokenizer.from_pretrained("sentence-transformers/all-mpnet-base-v2")
    models["sbert_model"] = AutoModel.from_pretrained("sentence-transformers/all-mpnet-base-v2")

    # 3️⃣ Engagement CNN model (face engagement)
    models["engagement_model"] = ort.InferenceSession("models/engagement_cnn.onnx")

    print("✅ All models loaded.")
    return models
