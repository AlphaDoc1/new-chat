import { motion } from 'framer-motion';
import { FiMic, FiMicOff } from 'react-icons/fi';

/**
 * VoiceButton
 * ============
 * Pulsing animated microphone button for STT input.
 * Uses Framer Motion for the pulse effect.
 */
export default function VoiceButton({ isListening, isSupported, onClick }) {
  if (!isSupported) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={isListening ? 'mic-pulse' : ''}
      style={{
        position: 'relative',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        background: isListening
          ? 'var(--accent)'
          : 'var(--bg-tertiary)',
        color: isListening
          ? '#fff'
          : 'var(--text-secondary)',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        outline: 'none',
      }}
      title={isListening ? 'Stop listening' : 'Start voice input'}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
    >
      {/* Background pulse ring when listening */}
      {isListening && (
        <motion.span
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'var(--accent)',
            zIndex: 0,
          }}
        />
      )}

      <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
        {isListening ? <FiMic size={20} /> : <FiMicOff size={20} />}
      </span>
    </motion.button>
  );
}
