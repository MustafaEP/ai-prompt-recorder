from fastapi import APIRouter, HTTPException
from database import supabase
from schemas import PromptCreate, PromptUpdate

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.post("")
def create_prompt(body: PromptCreate):
    response = supabase.table("prompts").insert({"content": body.content}).execute()
    return response.data[0]


@router.get("")
def get_prompts():
    response = (
        supabase.table("prompts")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )
    return {"prompts": response.data}


@router.get("/meta/count")
def get_prompt_count():
    response = supabase.table("prompts").select("id").execute()
    return {"count": len(response.data)}


@router.get("/{prompt_id}")
def get_prompt(prompt_id: str):
    response = (
        supabase.table("prompts")
        .select("*")
        .eq("id", prompt_id)
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return response.data


@router.put("/{prompt_id}")
def update_prompt(prompt_id: str, body: PromptUpdate):
    response = (
        supabase.table("prompts")
        .update({"content": body.content})
        .eq("id", prompt_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return response.data[0]


@router.delete("/{prompt_id}")
def delete_prompt(prompt_id: str):
    response = (
        supabase.table("prompts")
        .delete()
        .eq("id", prompt_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Prompt bulunamadı")
    return {"message": "Silindi"}
