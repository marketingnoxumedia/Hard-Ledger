#!/usr/bin/env python3
"""Generate background music using ElevenLabs Music API."""
import os
import requests
import json

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not API_KEY:
    print("Error: ELEVENLABS_API_KEY not set")
    exit(1)

# ElevenLabs Music API endpoint
url = "https://api.elevenlabs.io/v1/music/generate"

headers = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

# Prompt for upbeat, warm background music for a developmental milestone celebration
payload = {
    "prompt": "Upbeat, warm, joyful background music celebrating a baby's developmental milestone. Melodic, playful, modern with piano and gentle strings. Encouraging and happy tone. Perfect for Instagram reels about infant development.",
    "duration": 38
}

print("🎵 Generating background music from ElevenLabs...")
print(f"   Duration: {payload['duration']}s")
print(f"   Prompt: {payload['prompt'][:70]}...")

try:
    response = requests.post(url, json=payload, headers=headers, timeout=120)
    response.raise_for_status()
    
    # Save the audio file
    output_file = "out/elevenlabs_music.mp3"
    with open(output_file, "wb") as f:
        f.write(response.content)
    
    file_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
    print(f"✓ Music generated successfully!")
    print(f"  File: {output_file}")
    print(f"  Size: {file_size:.1f}MB")
    
except requests.exceptions.RequestException as e:
    print(f"✗ Error: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(f"  Response: {e.response.text[:200]}")
    exit(1)
