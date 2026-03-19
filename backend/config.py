import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

ALLOWED_ORIGINS: list[str] = [
    "http://localhost:3000",
    "https://ai-prompt-recorder.vercel.app",
]
