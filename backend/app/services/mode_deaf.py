from faster_whisper import WhisperModel
import moviepy.editor as mp

model = WhisperModel("small", device="cpu")

def generate_subtitles(video_path):
    audio = mp.VideoFileClip(video_path).audio
    audio_path = video_path.replace(".mp4", "_audio.mp3")
    audio.write_audiofile(audio_path)

    segments, _ = model.transcribe(audio_path, beam_size=5)
    subtitles = []

    for seg in segments:
        subtitles.append({
            "start": seg.start,
            "end": seg.end,
            "text": seg.text
        })
    return subtitles
