import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

def chunk_text(text: str, max_tokens=900):
    words = text.split()
    chunks = []
    current = []

    for word in words:
        current.append(word)
        if len(enc.encode(" ".join(current))) >= max_tokens:
            chunks.append(" ".join(current))
            current = []

    if current:
        chunks.append(" ".join(current))

    return chunks
