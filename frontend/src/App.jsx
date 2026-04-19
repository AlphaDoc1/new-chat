import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import VoiceWarningBanner from './components/VoiceWarningBanner';
import { useTheme } from './hooks/useTheme';
import { useChat } from './hooks/useChat';
import { useVoice } from './hooks/useVoice';

/**
 * App — Root Component
 * =====================
 * Wires together theme, chat, and voice hooks.
 * Manages the full layout with theme background transitions.
 */
export default function App() {
  const { activeTheme, theme, switchTheme } = useTheme();
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [showVoiceWarning, setShowVoiceWarning] = useState(true);

  // Voice: auto-send transcript on silence
  const handleTranscript = useCallback(
    (text) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  const {
    isListening,
    isSpeaking,
    isSupported: isVoiceSupported,
    toggleListening,
    speakResponse,
    replayLastResponse,
    stopSpeaking,
  } = useVoice({ onTranscript: handleTranscript });

  // Auto-speak AI replies
  const handleReplay = useCallback(
    (text) => {
      speakResponse(text);
    },
    [speakResponse]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTheme}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.8 }}
        transition={{ duration: 0.5 }}
        className={theme?.bgClass || 'theme-bg-deepspace'}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'background 0.6s ease',
        }}
      >
        {/* Voice Warning Banner */}
        {!isVoiceSupported && showVoiceWarning && (
          <VoiceWarningBanner
            isVisible={true}
            onDismiss={() => setShowVoiceWarning(false)}
          />
        )}

        {/* Header */}
        <Header
          activeTheme={activeTheme}
          onSwitchTheme={switchTheme}
          onClearChat={clearChat}
        />

        {/* Chat Window */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onReplay={handleReplay}
        />

        {/* Chat Input */}
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
          isListening={isListening}
          isVoiceSupported={isVoiceSupported}
          onToggleVoice={toggleListening}
        />
      </motion.div>
    </AnimatePresence>
  );
}
