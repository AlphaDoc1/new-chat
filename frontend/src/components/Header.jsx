import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

/**
 * Header
 * =======
 * App header with branding, theme switcher, and clear chat button.
 */
export default function Header({ activeTheme, onSwitchTheme, onClearChat }) {
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 50,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Left: Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Animated logo mark */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            boxShadow: `0 0 20px var(--accent-glow)`,
          }}
        >
          ✦
        </motion.div>

        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Nexus AI
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              margin: 0,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Powered by Gemini
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Clear Chat */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearChat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.3s ease',
          }}
          title="Clear chat history"
        >
          <FiTrash2 size={14} />
        </motion.button>

        {/* Theme Switcher */}
        <ThemeSwitcher
          activeTheme={activeTheme}
          onSwitch={(id) => {
            onSwitchTheme(id);
            setThemeOpen(false);
          }}
          isOpen={themeOpen}
          onToggle={() => setThemeOpen(!themeOpen)}
        />
      </div>
    </motion.header>
  );
}
