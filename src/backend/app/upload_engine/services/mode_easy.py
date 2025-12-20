# mode_easy.py
from gtts import gTTS

def generate_easy_audio(text):
    simplified = simplify_text(text)

    output_path = "easy_audio.mp3"
    tts = gTTS(simplified)
    tts.save(output_path)
    return output_path


def simplify_text(text):
    """
    Simple rule-based text simplification.
    """
    replacements = {
        "utilize": "use",
        "approximately": "about",
        "demonstrate": "show",
        "objective": "goal",
        "methodology": "method"
    }

    for k, v in replacements.items():
        text = text.replace(k, v)

    return text
