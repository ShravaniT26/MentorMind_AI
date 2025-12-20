import random
import hashlib

def demo_score_from_url(url: str) -> dict:
    seed = int(hashlib.md5(url.encode()).hexdigest(), 16) % 100
    random.seed(seed)

    def score():
        return random.randint(6, 9)

    data = {
        "clarity": {"score": score(), "reason": "AI-based clarity analysis"},
        "engagement": {"score": score(), "reason": "AI-based engagement analysis"},
        "tone": {"score": score(), "reason": "AI-based tone analysis"},
        "pacing": {"score": score(), "reason": "AI-based pacing analysis"},
        "content_delivery": {"score": score(), "reason": "AI-based delivery analysis"},
    }

    data["overall_score"] = round(
        sum(v["score"] for v in data.values()) / len(data), 2
    )
    data["mode"] = "demo"

    return data
