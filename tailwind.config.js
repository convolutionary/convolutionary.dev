/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // terminal background shades
        terminal: {
          black: '#0a0510',
          dark: '#0f0813',
          darker: '#1a0f1f',
          darkest: '#241428',
        },
        // terminal text colors
        'term-text': {
          primary: '#b794f6',
          secondary: '#9f7aea',
          muted: '#805ad5',
          dim: '#6b46c1',
          cursor: '#b794f6',
        },
        // accent colors for the fresh cyberpunk look
        'term-accent': {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          green: '#00ff88',
          amber: '#ffaa00',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'terminal-glow': '0 0 30px rgba(183, 148, 246, 0.15)',
        'cyan-glow': '0 0 20px rgba(0, 255, 255, 0.3)',
        'magenta-glow': '0 0 20px rgba(255, 0, 255, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(183, 148, 246, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(183, 148, 246, 0.4)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #b794f6 0%, #00ffff 50%, #ff00ff 100%)',
      },
    },
  },
  plugins: [],
};
