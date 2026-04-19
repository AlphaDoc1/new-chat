"""
FastAPI Backend for AI Chatbot — Gemini 1.5 Flash
===================================================
Endpoints:
  POST /chat  — accepts { message, history } and returns Gemini's reply.

Setup:
  1. Place your Gemini API key in backend/.env as:
       GEMINI_API_KEY=your_key_here
     OR replace the fallback string below.
  2. pip install -r requirements.txt
  3. uvicorn main:app --reload
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from google import genai

# ──────────────────────────────────────────────
# 1. Load API key from .env (fallback to placeholder)
# ──────────────────────────────────────────────
load_dotenv()

# ⬇️  PUT YOUR GEMINI API KEY HERE (or set it in .env)  ⬇️
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")

if GEMINI_API_KEY == "YOUR_GEMINI_API_KEY_HERE":
    print("\n⚠️  WARNING: No Gemini API key found!")
    print("   Set GEMINI_API_KEY in backend/.env or replace the placeholder in main.py\n")

# We pass the key directly to the client below.

# ──────────────────────────────────────────────
# 2. FastAPI app + CORS
# ──────────────────────────────────────────────
app = FastAPI(title="AI Chatbot Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Allow all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# 3. Request / Response schemas
# ──────────────────────────────────────────────
class HistoryItem(BaseModel):
    role: str       # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryItem]] = []

class ChatResponse(BaseModel):
    reply: str

# ──────────────────────────────────────────────
# 4. Gemini Client Setup
# ──────────────────────────────────────────────
client = genai.Client(api_key=GEMINI_API_KEY)

# ──────────────────────────────────────────────
# 5. /chat endpoint
# ──────────────────────────────────────────────
@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    Accepts a user message and conversation history,
    converts history to Gemini SDK format, and returns the AI reply.
    """
    try:
        # ── Convert frontend history + new message to Gemini SDK format ──
        contents = []
        for h in req.history:
            contents.append({
                "role": h.role,
                "parts": [{"text": h.content}]
            })
            
        # Append the new user message
        contents.append({
            "role": "user",
            "parts": [{"text": req.message}]
        })

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=contents
        )

        return ChatResponse(reply=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ──────────────────────────────────────────────
# 6. Health check
# ──────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "ok", "message": "AI Chatbot backend is running"}
