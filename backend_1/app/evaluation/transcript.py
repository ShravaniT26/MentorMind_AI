import re
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound


def get_video_id(url: str) -> str:
    match = re.search(r"(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})", url)
    if not match:
        raise ValueError("Invalid YouTube URL")
    return match.group(1)


def fetch_transcript(youtube_url: str) -> str:
    video_id = get_video_id(youtube_url)

    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

        # Try Hindi auto captions first
        try:
            transcript = transcript_list.find_generated_transcript(['hi'])
        except:
            transcript = transcript_list.find_transcript(['en'])

        transcript_data = transcript.fetch(preserve_formatting=False)

        if not transcript_data:
            raise RuntimeError("Empty transcript")

        return " ".join(item["text"] for item in transcript_data)

    except (TranscriptsDisabled, NoTranscriptFound):
        raise RuntimeError("No captions available for this video")

    except Exception:
        # 🔥 THIS IS THE XML PARSE ERROR CASE
        raise RuntimeError(
            "YouTube blocked transcript XML for this video. "
            "Use audio → speech-to-text fallback."
        )
