from pydantic import BaseModel

class EvaluationRequest(BaseModel):
    youtube_url: str

