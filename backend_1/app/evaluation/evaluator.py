import json
from openai import OpenAI
from app.evaluation.transcript import fetch_transcript

client = OpenAI()

SYSTEM_PROMPT = """
You are an expert teaching quality evaluator.
The transcript may be in Hindi or translated from Hindi.
Always respond ONLY in valid JSON.
"""

def evaluate_transcript(youtube_url: str) -> dict:
    transcript = fetch_transcript(youtube_url)

    if not transcript.strip():
        raise RuntimeError("Transcript is empty after fetch")

    response = client.responses.create(
        model="gpt-4.1-mini",
        response_format={"type": "json"},
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"""
Evaluate this lecture on:
- clarity
- engagement
- tone
- pacing
- content_delivery

Return EXACT JSON:
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
    if not output:
        raise RuntimeError("OpenAI returned empty output")

    return json.loads(output)
