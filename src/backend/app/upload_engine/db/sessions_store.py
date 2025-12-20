# backend/app/db/sessions_store.py

import json
import os

# Always use /tmp for cloud deployment (Render, Vercel, Azure)
STORE_DIR = "/tmp"
STORE = os.path.join(STORE_DIR, "session_store.json")

# Ensure /tmp exists
os.makedirs(STORE_DIR, exist_ok=True)

# Create an empty store file if not exists
if not os.path.exists(STORE):
    with open(STORE, "w", encoding="utf-8") as f:
        json.dump({}, f)


def _read():
    with open(STORE, "r", encoding="utf-8") as f:
        return json.load(f)


def _write(data):
    with open(STORE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def create_session(session_id, mentor_id, file_path):
    data = _read()
    data[session_id] = {
        "mentor_id": mentor_id,
        "file_path": file_path,
        "status": "queued",
        "outputs": {}
    }
    _write(data)


def update_session(session_id, updates: dict):
    data = _read()
    if session_id not in data:
        raise KeyError(session_id)
    data[session_id].update(updates)
    _write(data)


def get_session(session_id):
    """Return session dict or None."""
    return _read().get(session_id)
