#!/usr/bin/env python3
"""
Serveur TTS local — remplace ElevenLabs gratuitement.
Utilise Microsoft Edge TTS (edge-tts) : voix naturelles pt-PT et en-US.

Installation : pip install edge-tts
Lancement    : python tts_server.py
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import asyncio
import edge_tts

VOICES = {
    "pt-PT":  "pt-PT-RaquelNeural",      # Raquel — portugais européen féminin
    "pt-BR":  "pt-BR-FranciscaNeural",
    "pt":     "pt-PT-RaquelNeural",
    "en-US":  "en-US-JennyNeural",      # Jenny — anglais américain naturel
    "en-GB":  "en-GB-SoniaNeural",
    "en":     "en-US-JennyNeural",
    "fr-FR":  "fr-FR-DeniseNeural",
    "fr":     "fr-FR-DeniseNeural",
}

PORT = 8765


async def _generate(text: str, voice: str) -> bytes:
    communicate = edge_tts.Communicate(text, voice)
    audio = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio += chunk["data"]
    return audio


class TTSHandler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != "/tts":
            self.send_response(404)
            self.end_headers()
            return

        params = parse_qs(parsed.query)
        text = params.get("text", [""])[0].strip()
        lang = params.get("lang", ["en-US"])[0]

        if not text:
            self.send_response(400)
            self.end_headers()
            return

        # Résolution de la voix : lang exact → préfixe → défaut
        voice = VOICES.get(lang) or VOICES.get(lang.split("-")[0]) or "en-US-JennyNeural"

        try:
            audio = asyncio.run(_generate(text, voice))
            self.send_response(200)
            self.send_header("Content-Type", "audio/mpeg")
            self._cors()
            self.send_header("Content-Length", str(len(audio)))
            self.end_headers()
            self.wfile.write(audio)
        except Exception as e:
            print(f"[TTS] Erreur : {e}")
            self.send_response(500)
            self._cors()
            self.end_headers()

    def log_message(self, fmt, *args):
        pass  # silencieux


if __name__ == "__main__":
    print(f"🎙️  Serveur TTS démarré → http://localhost:{PORT}")
    print(f"    pt-PT : pt-PT-RaquelNeural")
    print(f"    en-US : en-US-JennyNeural")
    print(f"    Ctrl+C pour arrêter\n")
    HTTPServer(("0.0.0.0", PORT), TTSHandler).serve_forever()
