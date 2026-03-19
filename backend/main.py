from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
from pydantic import BaseModel
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-prompt-recorder.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

class PromptCreate(BaseModel):
    content: str

class PromptUpdate(BaseModel):
    content: str


# CREATE
@app.post("/prompts")
def create_prompt(body: PromptCreate):
    response = supabase.table("prompts").insert({"content": body.content}).execute()
    return response.data[0]


# READ ALL
@app.get("/prompts")
def get_prompts():
    response = supabase.table("prompts") \
        .select("*") \
        .order("created_at", desc=True) \
        .execute()
    return {"prompts": response.data}


# READ ONE
@app.get("/prompts/{prompt_id}")
def get_prompt(prompt_id: str):
    response = supabase.table("prompts") \
        .select("*") \
        .eq("id", prompt_id) \
        .single() \
        .execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return response.data


# UPDATE
@app.put("/prompts/{prompt_id}")
def update_prompt(prompt_id: str, body: PromptUpdate):
    response = supabase.table("prompts") \
        .update({"content": body.content}) \
        .eq("id", prompt_id) \
        .execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return response.data[0]


# DELETE
@app.delete("/prompts/{prompt_id}")
def delete_prompt(prompt_id: str):
    response = supabase.table("prompts") \
        .delete() \
        .eq("id", prompt_id) \
        .execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return {"message": "Silindi"}


# COUNT
@app.get("/prompts/meta/count")
def get_prompt_count():
    response = supabase.table("prompts").select("id").execute()
    return {"count": len(response.data)}