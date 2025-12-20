import hashlib
import random
import time

RESULTS_STORE = {}

def _stable_random(seed: str, low=60, high=95):
    """
    Generates deterministic-but-variable values
    Same link → same result
    Different link → different result
    """
    h = hashlib.md5(seed.encode()).hexdigest()
    random.seed(int(h[:8], 16))
    return random.randint(low, high)


def generate_demo_scores(source: str):
    return {
        "clarity": _stable_random(source + "clarity"),
        "engagement": _stable_random(source + "engagement"),
        "tone": _stable_random(source + "tone"),
        "pacing": _stable_random(source + "pacing"),
        "content_delivery": _stable_random(source + "content"),
    }


def store_result(job_id: str, source: str):
    scores = generate_demo_scores(source)

    RESULTS_STORE[job_id] = {
        "scores": scores,
        "overall_score": round(sum(scores.values()) / len(scores), 2),
        "generated_at": time.time()
    }


def get_result(job_id: str):
    return RESULTS_STORE.get(job_id)
