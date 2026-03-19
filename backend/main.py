from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Next.js'in FastAPI'ye istek atabilmesi için CORS ayarı
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

@app.get("/prompts")
def get_prompts():
    """Supabase'deki tüm promptları en yeniden eskiye listeler"""
    response = supabase.table("prompts") \
        .select("*") \
        .order("created_at", desc=True) \
        .execute()
    return {"prompts": response.data}

@app.get("/prompts/count")
def get_prompt_count():
    """Toplam prompt sayısını döner"""
    response = supabase.table("prompts").select("id").execute()
    return {"count": len(response.data)}