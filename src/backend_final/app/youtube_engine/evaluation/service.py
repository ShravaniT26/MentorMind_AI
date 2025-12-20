from app.evaluation.chunker import chunk_text
from app.evaluation.evaluator import evaluate_transcript

def evaluate_full_transcript(transcript: str) -> dict:
    chunks = chunk_text(transcript)

    totals = {
        "clarity": 0,
        "engagement": 0,
        "pace": 0,
        "filler": 0,
        "technical": 0
    }

    for chunk in chunks:
        scores = evaluate_transcript(chunk)
        for k in totals:
            totals[k] += scores[k]

    n = len(chunks)
    averages = {k: round(v / n, 2) for k, v in totals.items()}

    # weighted overall score
    overall = round(
        averages["clarity"] * 0.25 +
        averages["engagement"] * 0.25 +
        averages["pace"] * 0.15 +
        averages["filler"] * 0.15 +
        averages["technical"] * 0.20,
        2
    )

    return {
        "scores": averages,
        "overall_score": overall,
        "chunks_evaluated": n
    }
