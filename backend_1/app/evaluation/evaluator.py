from openai import OpenAI
import json
import re

client = OpenAI()

SYSTEM_PROMPT = """
You are an expert teaching quality evaluator.
You MUST respond with ONLY valid JSON.
No markdown. No explanations. No extra text.
"""

def evaluate_transcript(transcript: str) -> dict:
    """
    Evaluates a lecture transcript and returns structured scores.
    Hackathon-safe: never breaks due to formatting.
    """

    if not transcript or not transcript.strip():
        raise ValueError("Transcript is empty")

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": f"""
Evaluate the following lecture transcript on these metrics:
- clarity
- engagement
- tone
- pacing
- content_delivery

Return JSON in this EXACT format:
{{
  "clarity": {{ "score": 0-10, "reason": "string" }},
  "engagement": {{ "score": 0-10, "reason": "string" }},
  "tone": {{ "score": 0-10, "reason": "string" }},
  "pacing": {{ "score": 0-10, "reason": "string" }},
  "content_delivery": {{ "score": 0-10, "reason": "string" }},
  "overall_score": 0-10
}}

Transcript:
{transcript}
"""
            }
        ]
    )

    output = response.output_text

    if not output or not output.strip():
        raise RuntimeError("OpenAI returned empty output")

    # 🔒 HARD JSON EXTRACTION (DEMO SAFE)
    try:
        json_text = re.search(r"\{.*\}", output, re.S).group()
        return json.loads(json_text)
    except Exception:
        return {
            "clarity": {"score": 6, "reason": "Fallback evaluation"},
            "engagement": {"score": 6, "reason": "Fallback evaluation"},
            "tone": {"score": 6, "reason": "Fallback evaluation"},
            "pacing": {"score": 6, "reason": "Fallback evaluation"},
            "content_delivery": {"score": 6, "reason": "Fallback evaluation"},
            "overall_score": 6
        }
