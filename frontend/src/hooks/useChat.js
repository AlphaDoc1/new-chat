import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/chat';
const STORAGE_KEY = 'chatbot-history';

/**
 * useChat Hook
 * =============
 * Manages chat messages, sends to FastAPI backend via axios,
 * saves/loads from localStorage, and handles errors gracefully.
 */
export function useChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  /**
   * Send a user message and get AI reply.
   * On failure, inject a styled error bubble instead of silently hanging.
   */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Build history array for Gemini context (exclude error messages)
    const history = [...messages, userMessage]
      .filter((m) => m.role !== 'error')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

    // Remove the last item since that's the current message
    const historyForApi = history.slice(0, -1);

    try {
      const response = await axios.post(API_URL, {
        message: text.trim(),
        history: historyForApi,
      }, {
        timeout: 30000, // 30 second timeout
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: 'model',
        content: response.data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // ── On failure, show styled error bubble instead of silently hanging ──
      let errorText = '⚠️ Unable to reach the server. Please make sure the backend is running at http://localhost:8000';

      if (error.response) {
        errorText = `⚠️ Server error (${error.response.status}): ${error.response.data?.detail || 'Something went wrong'}`;
      } else if (error.code === 'ECONNABORTED') {
        errorText = '⚠️ Request timed out. The server took too long to respond.';
      }

      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: errorText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  /**
   * Clear all chat history
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * Get the last AI response text (for TTS replay)
   */
  const getLastAIResponse = useCallback(() => {
    const aiMessages = messages.filter((m) => m.role === 'model');
    return aiMessages.length > 0 ? aiMessages[aiMessages.length - 1].content : null;
  }, [messages]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    getLastAIResponse,
  };
}
