import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import VoiceButton from './VoiceButton';

/**
 * ChatInput
 * ==========
 * Text area with send button, Enter to send, Shift+Enter for newline,
 * and integrated voice button.
 */
export default function ChatInput({
  onSend,
  isLoading,
  isListening,
  isVoiceSupported,
  onToggleVoice,
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInput = (e) => {
    setText(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 150) + 'px';
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        padding: '16px 24px 20px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Voice Button */}
        <VoiceButton
          isListening={isListening}
          isSupported={isVoiceSupported}
          onClick={onToggleVoice}
        />

        {/* Text Input */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            background: 'var(--input-bg)',
            borderRadius: '16px',
            border: '1px solid var(--input-border)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            overflow: 'hidden',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--input-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? '🎤 Listening...' : 'Type a message...'}
            rows={1}
            style={{
              flex: 1,
              padding: '14px 16px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: '1.5',
              resize: 'none',
              maxHeight: '150px',
            }}
          />
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: text.trim() && !isLoading ? 'pointer' : 'not-allowed',
            background: text.trim() && !isLoading
              ? 'linear-gradient(135deg, var(--accent), var(--accent-hover))'
              : 'var(--bg-tertiary)',
            color: text.trim() && !isLoading
              ? '#fff'
              : 'var(--text-secondary)',
            transition: 'all 0.3s ease',
            flexShrink: 0,
            boxShadow: text.trim() && !isLoading
              ? '0 4px 16px var(--accent-glow)'
              : 'none',
          }}
          title="Send message"
        >
          <FiSend size={18} />
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          opacity: 0.5,
          marginTop: '8px',
          fontFamily: 'var(--font-body)',
        }}
      >
        Press Enter to send · Shift+Enter for new line
      </p>
    </motion.div>
  );
}
