from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
from typing import Optional
import json

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str

# Initialize API clients
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
OLLAMA_URL = "http://localhost:11434"

async def call_openai(message: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": message}]
            }
        )
        return response.json()["choices"][0]["message"]["content"]

async def call_anthropic(message: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": "claude-2",
                "max_tokens": 1024,
                "messages": [{"role": "user", "content": message}]
            }
        )
        return response.json()["content"][0]["text"]

async def call_ollama(message: str, model_name: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": model_name,
                "prompt": message
            }
        )
        return response.json()["response"]

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        if request.model == "gpt-3.5-turbo":
            response = await call_openai(request.message)
        elif request.model == "claude":
            response = await call_anthropic(request.message)
        elif request.model in ["llama2", "mistral"]:
            response = await call_ollama(request.message, request.model)
        else:
            raise HTTPException(status_code=400, detail="Unsupported model")
        
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
