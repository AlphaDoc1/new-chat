import { motion, AnimatePresence } from 'framer-motion';
import themes, { themeOrder } from '../themes';

/**
 * ThemeSwitcher
 * ==============
 * Palette picker with colored preview dots and smooth transitions.
 */
export default function ThemeSwitcher({ activeTheme, onSwitch, isOpen, onToggle }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: '13px',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: themes[activeTheme]?.preview || '#60A5FA',
            boxShadow: `0 0 8px ${themes[activeTheme]?.preview || '#60A5FA'}40`,
          }}
        />
        <span style={{ display: 'none', '@media(min-width:640px)': { display: 'inline' } }}>
          {themes[activeTheme]?.emoji}
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '8px',
              minWidth: '220px',
              boxShadow: 'var(--shadow)',
              zIndex: 100,
              backdropFilter: 'blur(16px)',
            }}
          >
            {themeOrder.map((id) => {
              const theme = themes[id];
              const isActive = id === activeTheme;

              return (
                <motion.button
                  key={id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSwitch(id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 14px',
                    background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    border: isActive ? `1px solid ${theme.preview}40` : '1px solid transparent',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'var(--font-body)',
                    transition: 'background 0.2s ease',
                    textAlign: 'left',
                  }}
                >
                  {/* Preview dot */}
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: theme.preview,
                      boxShadow: isActive ? `0 0 12px ${theme.preview}60` : 'none',
                      flexShrink: 0,
                      transition: 'box-shadow 0.3s ease',
                    }}
                  />

                  {/* Name */}
                  <span style={{ flex: 1 }}>
                    {theme.emoji} {theme.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeThemeDot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: theme.preview,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
