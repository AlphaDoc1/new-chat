/**
 * 5 Premium Theme Definitions
 * ============================
 * Each theme has a completely unique identity:
 * - Color palette (CSS custom properties)
 * - Background class (defined in index.css)
 * - Font pairing (loaded via Google Fonts in index.html)
 * - Accent colors and glow effects
 */

const themes = {
  deepspace: {
    id: 'deepspace',
    name: 'Deep Space Dark',
    emoji: '🌌',
    bgClass: 'theme-bg-deepspace',
    preview: '#60A5FA',
    vars: {
      '--bg-primary': '#0f0f1a',
      '--bg-secondary': '#1a1a2e',
      '--bg-tertiary': '#16213e',
      '--text-primary': '#e2e8f0',
      '--text-secondary': '#94a3b8',
      '--accent': '#60a5fa',
      '--accent-hover': '#3b82f6',
      '--accent-glow': 'rgba(96, 165, 250, 0.3)',
      '--bubble-user': '#1e3a5f',
      '--bubble-ai': '#1a1a2e',
      '--input-bg': '#16213e',
      '--input-border': '#2d3a52',
      '--border': '#2d3a52',
      '--shadow': '0 4px 24px rgba(0, 0, 0, 0.4)',
      '--font-display': "'Exo 2', sans-serif",
      '--font-body': "'Inter', sans-serif",
    },
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    emoji: '🌆',
    bgClass: 'theme-bg-cyberpunk',
    preview: '#FF2D95',
    vars: {
      '--bg-primary': '#0a0a0a',
      '--bg-secondary': '#141414',
      '--bg-tertiary': '#1a1a1a',
      '--text-primary': '#f0e6ff',
      '--text-secondary': '#b8a9cc',
      '--accent': '#FF2D95',
      '--accent-hover': '#ff1a88',
      '--accent-glow': 'rgba(255, 45, 149, 0.35)',
      '--bubble-user': '#2d1040',
      '--bubble-ai': '#141414',
      '--input-bg': '#1a1a1a',
      '--input-border': '#3d1a5c',
      '--border': '#3d1a5c',
      '--shadow': '0 4px 24px rgba(255, 45, 149, 0.15)',
      '--font-display': "'Orbitron', sans-serif",
      '--font-body': "'Rajdhani', sans-serif",
    },
  },

  luxury: {
    id: 'luxury',
    name: 'Luxury Gold',
    emoji: '🏆',
    bgClass: 'theme-bg-luxury',
    preview: '#D4AF37',
    vars: {
      '--bg-primary': '#1a1a1a',
      '--bg-secondary': '#222222',
      '--bg-tertiary': '#2a2a2a',
      '--text-primary': '#f5f0e8',
      '--text-secondary': '#b8a88a',
      '--accent': '#D4AF37',
      '--accent-hover': '#c9a032',
      '--accent-glow': 'rgba(212, 175, 55, 0.25)',
      '--bubble-user': '#3d3520',
      '--bubble-ai': '#252522',
      '--input-bg': '#2a2a2a',
      '--input-border': '#4a4030',
      '--border': '#3d3520',
      '--shadow': '0 4px 24px rgba(212, 175, 55, 0.1)',
      '--font-display': "'Playfair Display', serif",
      '--font-body': "'Lato', sans-serif",
    },
  },

  aurora: {
    id: 'aurora',
    name: 'Aurora Borealis',
    emoji: '🌈',
    bgClass: 'theme-bg-aurora',
    preview: '#4ADE80',
    vars: {
      '--bg-primary': '#0a1628',
      '--bg-secondary': '#0f1f35',
      '--bg-tertiary': '#132a40',
      '--text-primary': '#e0f2e9',
      '--text-secondary': '#8cb8a0',
      '--accent': '#4ADE80',
      '--accent-hover': '#22c55e',
      '--accent-glow': 'rgba(74, 222, 128, 0.3)',
      '--bubble-user': '#1a3d2e',
      '--bubble-ai': '#0f1f35',
      '--input-bg': '#132a40',
      '--input-border': '#1e4a3a',
      '--border': '#1e4a3a',
      '--shadow': '0 4px 24px rgba(74, 222, 128, 0.1)',
      '--font-display': "'Quicksand', sans-serif",
      '--font-body': "'Nunito', sans-serif",
    },
  },

  ivory: {
    id: 'ivory',
    name: 'Minimal Ivory',
    emoji: '🤍',
    bgClass: 'theme-bg-ivory',
    preview: '#C2785C',
    vars: {
      '--bg-primary': '#faf8f5',
      '--bg-secondary': '#f0ece6',
      '--bg-tertiary': '#e8e2da',
      '--text-primary': '#2d2a26',
      '--text-secondary': '#6b635a',
      '--accent': '#C2785C',
      '--accent-hover': '#b06a50',
      '--accent-glow': 'rgba(194, 120, 92, 0.25)',
      '--bubble-user': '#C2785C',
      '--bubble-ai': '#f0ece6',
      '--input-bg': '#f0ece6',
      '--input-border': '#d5cdc3',
      '--border': '#d5cdc3',
      '--shadow': '0 4px 24px rgba(0, 0, 0, 0.06)',
      '--font-display': "'DM Sans', sans-serif",
      '--font-body': "'Work Sans', sans-serif",
    },
  },
};

export const themeOrder = ['deepspace', 'cyberpunk', 'luxury', 'aurora', 'ivory'];
export default themes;
