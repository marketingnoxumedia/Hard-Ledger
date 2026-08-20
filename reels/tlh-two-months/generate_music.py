#!/usr/bin/env python3
"""Generate upbeat background music for the reel."""
import numpy as np
from scipy.io import wavfile
import sys

def generate_tone(frequency, duration, sample_rate=48000, volume=0.3):
    """Generate a sine wave tone."""
    t = np.linspace(0, duration, int(sample_rate * duration))
    # Add envelope for natural attack/decay
    envelope = np.exp(-t / (duration * 0.3))
    tone = np.sin(2 * np.pi * frequency * t) * envelope * volume
    return tone

def generate_music(total_duration, output_file, sample_rate=48000):
    """Generate upbeat background music with a simple melody."""
    # Upbeat melody using pentatonic scale (C-E-G-B-D)
    # Frequencies in Hz: C4=262, E4=330, G4=392, B4=494, D5=587
    notes = [
        (330, 0.3),  # E - bright start
        (392, 0.3),  # G
        (494, 0.3),  # B
        (330, 0.3),  # E
        (392, 0.3),  # G
        (262, 0.3),  # C
        (330, 0.3),  # E
        (494, 0.3),  # B
    ]

    # Repeat pattern to fill the duration
    audio = np.array([])
    pattern_duration = sum(note[1] for note in notes)
    repeats = int(total_duration / pattern_duration) + 1

    for _ in range(repeats):
        for freq, duration in notes:
            tone = generate_tone(freq, duration, sample_rate, volume=0.25)
            audio = np.concatenate([audio, tone])
            # Add small silence between notes
            silence = np.zeros(int(sample_rate * 0.05))
            audio = np.concatenate([audio, silence])

    # Trim to exact duration and normalize
    audio = audio[:int(sample_rate * total_duration)]

    # Normalize to prevent clipping
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio / max_val * 0.8

    # Write to file as 16-bit PCM
    audio_int = np.int16(audio * 32767)
    wavfile.write(output_file, sample_rate, audio_int)
    print(f"Generated {len(audio)/sample_rate:.2f}s of music to {output_file}")

if __name__ == "__main__":
    duration = float(sys.argv[1]) if len(sys.argv) > 1 else 38.2
    output = sys.argv[2] if len(sys.argv) > 2 else "bg_music.wav"
    generate_music(duration, output)
