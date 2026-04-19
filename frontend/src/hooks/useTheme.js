import { useState, useEffect, useCallback } from 'react';
import themes from '../themes';

/**
 * useTheme Hook
 * ==============
 * Manages the active theme, applies CSS variables to :root,
 * and persists the choice to localStorage.
 */
export function useTheme() {
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('chatbot-theme');
    return saved && themes[saved] ? saved : 'deepspace';
  });

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    const theme = themes[activeTheme];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Persist to localStorage
    localStorage.setItem('chatbot-theme', activeTheme);
  }, [activeTheme]);

  const switchTheme = useCallback((themeId) => {
    if (themes[themeId]) {
      setActiveTheme(themeId);
    }
  }, []);

  return {
    activeTheme,
    theme: themes[activeTheme],
    switchTheme,
  };
}
