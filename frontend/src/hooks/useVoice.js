import { useState, useCallback, useRef, useEffect } from 'react';
import { cleanTextForTTS } from '../utils/textCleaner';

/**
 * useVoice Hook
 * ==============
 * Provides:
 * - STT via SpeechRecognition (auto-sends after user stops speaking)
 * - TTS via SpeechSynthesis (reads AI reply aloud, markdown stripped)
 * - replayLastResponse() for replaying the most recent AI message
 * - Browser support detection
 */
export function useVoice({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const lastResponseRef = useRef('');
  const synthRef = useRef(window.speechSynthesis);

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && onTranscript) {
        onTranscript(transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, [onTranscript]);

  /**
   * Toggle microphone on/off
   */
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  }, [isListening]);

  /**
   * Speak text aloud using SpeechSynthesis
   * Strips all markdown formatting for natural speech
   */
  const speak = useCallback((text) => {
    if (!text || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const cleanedText = cleanTextForTTS(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to get a natural-sounding voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('natural')
    ) || voices.find(
      (v) => v.lang.startsWith('en') && !v.name.toLowerCase().includes('compact')
    ) || voices.find(
      (v) => v.lang.startsWith('en')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, []);

  /**
   * Speak the AI response and store it for replay
   */
  const speakResponse = useCallback((text) => {
    lastResponseRef.current = text;
    speak(text);
  }, [speak]);

  /**
   * Replay the last AI response
   */
  const replayLastResponse = useCallback(() => {
    if (lastResponseRef.current) {
      speak(lastResponseRef.current);
    }
  }, [speak]);

  /**
   * Stop any current speech
   */
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    isSupported,
    toggleListening,
    speakResponse,
    replayLastResponse,
    stopSpeaking,
  };
}
