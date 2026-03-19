from pydantic import BaseModel


class PromptCreate(BaseModel):
    content: str


class PromptUpdate(BaseModel):
    content: str
