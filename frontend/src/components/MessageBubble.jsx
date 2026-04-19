import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiVolume2, FiAlertTriangle } from 'react-icons/fi';
import { useState } from 'react';

/**
 * MessageBubble
 * ==============
 * Individual chat message with:
 * - Slide-up + fade entry animation
 * - User vs AI vs Error styling
 * - Copy button
 * - Replay TTS button on the last AI message
 */
export default function MessageBubble({ message, isLastAI, onReplay }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Render markdown-like content simply (bold, code, etc.)
  const renderContent = (text) => {
    // Simple rendering: split by lines, handle basic formatting
    return text.split('\n').map((line, i) => {
      // Bold
      let processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Inline code
      processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Italic
      processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');

      return (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: processed }}
          style={{ display: 'block', minHeight: line === '' ? '0.5em' : 'auto' }}
        />
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        padding: '4px 0',
      }}
    >
      <div
        style={{
          maxWidth: isError ? '90%' : '75%',
          minWidth: '60px',
        }}
      >
        {/* Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            padding: '14px 18px',
            borderRadius: isUser
              ? '18px 18px 4px 18px'
              : isError
                ? '12px'
                : '18px 18px 18px 4px',
            background: isError
              ? 'rgba(239, 68, 68, 0.1)'
              : isUser
                ? 'var(--bubble-user)'
                : 'var(--bubble-ai)',
            border: isError
              ? '1px solid rgba(239, 68, 68, 0.3)'
              : '1px solid var(--border)',
            color: isError
              ? '#fca5a5'
              : isUser
                ? '#fff'
                : 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            lineHeight: '1.65',
            position: 'relative',
            boxShadow: isUser
              ? '0 2px 12px rgba(0,0,0,0.15)'
              : '0 1px 8px rgba(0,0,0,0.08)',
            wordBreak: 'break-word',
          }}
        >
          {/* Error icon */}
          {isError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
                color: '#ef4444',
                fontWeight: 600,
                fontSize: '13px',
              }}
            >
              <FiAlertTriangle size={14} />
              Connection Error
            </div>
          )}

          {/* Message content */}
          <div className="message-content">
            {renderContent(message.content)}
          </div>
        </motion.div>

        {/* Footer: timestamp + action buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            gap: '8px',
            padding: '4px 4px 0',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              opacity: 0.7,
            }}
          >
            {formatTime(message.timestamp)}
          </span>

          {/* Copy button (not for errors) */}
          {!isError && (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: copied ? 'var(--success, #22c55e)' : 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.6,
                transition: 'opacity 0.2s',
              }}
              title="Copy message"
            >
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            </motion.button>
          )}

          {/* 🔊 Replay TTS button — only on the last AI message */}
          {isLastAI && !isError && onReplay && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => onReplay(message.content)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              title="Replay this response aloud"
            >
              <FiVolume2 size={14} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
