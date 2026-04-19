# 🌌 Nexus AI — Premium Full-Stack Chatbot

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080.svg)

Nexus AI is a premium, full-stack chatbot powered by the **Google Gemini 3.1 Flash Preview** language model. It features a stunning React & Vite frontend with advanced 60fps animations, voice capabilities (STT/TTS), and a fully reactive theme engine offering 5 unique visual experiences. The backend is built on FastAPI, enabling blazing-fast asynchronous proxying and context management for the AI model.

---

## ✨ Key Features

- **🧠 Google Gemini Intelligence**: Utilizes the brand-new `google-genai` SDK and the `gemini-3-flash-preview` model for exceptionally fast, context-aware responses.
- **🎨 5 Premium Themes**: Instantly switch between 5 professionally designed visual themes:
  - 🌌 *Deep Space Dark* (Animated starfield, Space Grotesk)
  - 🌆 *Neon Cyberpunk* (Grid lines, hot magenta accents)
  - 🏆 *Luxury Gold* (Subtle leather, rich gold accents)
  - 🌈 *Aurora Borealis* (Animated aurora shift, teal gradients)
  - 🤍 *Minimal Ivory* (Clean, warm terracotta accents)
- **🎙️ Advanced Voice Assistant**: 
  - **Speech-to-Text**: Dictate to the AI seamlessly using Web Speech API. 
  - **Text-to-Speech**: The AI reads responses aloud in a natural, human-like voice. Markdown is dynamically stripped out so it speaks naturally without spelling out symbols!
- **⚡ Fluid Animations**: Smooth page transitions, auto-sizing text areas, pulsing microphone, and slide-in chat bubbles powered by Framer Motion.
- **💾 Local Persistence**: All chat history and theme preferences are automatically cached in `localStorage`. 

---

## 🏗️ Project Architecture

```
nexus-ai/
├── backend/                   # Python FastAPI Server
│   ├── main.py                # Server routes and Gemini client logic
│   ├── requirements.txt       # Python dependencies (FastAPI, uvicorn, google-genai, etc.)
│   └── .env                   # API Keys (Not committed to git)
├── frontend/                  # React + Vite Frontend
│   ├── index.html             # Font imports (Google Fonts)
│   ├── src/
│   │   ├── components/        # React UI elements (ChatWindow, Header, MessageBubble, ThemeSwitcher, etc)
│   │   ├── hooks/             # Custom logic (useChat, useTheme, useVoice)
│   │   ├── utils/             # Helper functions (markdown stripper for TTS)
│   │   ├── App.jsx            # Application Root
│   │   ├── main.jsx           # React DOM Mount
│   │   ├── index.css          # Core CSS variables, Tailwind configuration & Backgrounds
│   │   └── themes.js          # Design system dictionary
```

---

## 🚀 Getting Started

Follow these step-by-step instructions to get both the frontend and backend running locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [Python](https://www.python.org/downloads/) (3.10+)
- A Google Gemini API Key. [Get one here](https://aistudio.google.com/apikey) for free.

### 1. Setup the Backend (FastAPI)

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the necessary Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your environment file:
   - Create a file named `.env` inside the `backend` folder.
   - Add the following line to it, substituting your actual Google Gemini API key:
     ```env
     GEMINI_API_KEY=AIzaSy...Your_Key_Here...
     ```
4. Start the server (with hot-reloading):
   ```bash
   uvicorn main:app --reload
   ```
   > The server will start on `http://localhost:8000`

### 2. Setup the Frontend (Vite/React)

1. Open a **new, separate terminal** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the specific JavaScript node_modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > The frontend will typically start on `http://localhost:5173`. Click the target local link Vite gives you to view the app in your browser!

---

## 🛠️ Usage Tips
- **Switch Themes**: Click the circular color-dot in the top-right header to switch themes on the fly.
- **Microphone Input**: Click the Mic icon inside the input box to start dictating an audio prompt. Silence will auto-trigger the message to send.
- **TTS Playback**: After Gemini replies, click the small speaker `🔊` icon appended to their chat bubble to hear the response read aloud!
- **History Reset**: Click the Trash `🗑️` icon in the top right to permanently wipe your chat context/history and start a new conversation block.

---
*Built with ❤️ utilizing the latest Google Gemini APIs.*
