import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

/**
 * VoiceWarningBanner
 * ===================
 * Shows a dismissible warning when browser doesn't support SpeechRecognition.
 */
export default function VoiceWarningBanner({ isVisible, onDismiss }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))',
              borderBottom: '1px solid rgba(234,179,8,0.3)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiAlertTriangle
                style={{ color: '#eab308', flexShrink: 0 }}
                size={18}
              />
              <span
                style={{
                  color: '#eab308',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Voice features are not supported in your current browser. Please use Chrome or Edge for full functionality.
              </span>
            </div>
            <button
              onClick={onDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#eab308',
                cursor: 'pointer',
                padding: '4px',
                flexShrink: 0,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Dismiss warning"
            >
              <FiX size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
