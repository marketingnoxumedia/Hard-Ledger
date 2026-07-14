"""Minimal Pexels API helper.

Resolves the Pexels API key from the ``PEXELS_API_KEY`` environment variable,
falling back to a plain parse of a local ``.env`` file when the variable is
not already set in the environment. No third-party dependencies required.
"""

import os


def _load_dotenv(path=".env"):
    """Parse a simple ``KEY=VALUE`` ``.env`` file into a dict.

    Blank lines and lines beginning with ``#`` are ignored, as is an optional
    leading ``export`` keyword. Surrounding single or double quotes are
    stripped from values. Missing files yield an empty dict.
    """
    values = {}
    if not os.path.exists(path):
        return values
    with open(path, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            if line.startswith("export "):
                line = line[len("export "):]
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key:
                values[key] = value
    return values


def get_key():
    """Return the Pexels API key.

    Prefers the ``PEXELS_API_KEY`` environment variable. If it is unset, the
    key is read from a local ``.env`` file. Raises ``RuntimeError`` when the
    key cannot be found in either location.
    """
    key = os.environ.get("PEXELS_API_KEY")
    if not key:
        key = _load_dotenv().get("PEXELS_API_KEY")
    if not key:
        raise RuntimeError(
            "PEXELS_API_KEY not set. Add it to your environment or a .env file."
        )
    return key


if __name__ == "__main__":
    # Confirm resolution without exposing the key.
    print("PEXELS_API_KEY resolved:", bool(get_key()))
