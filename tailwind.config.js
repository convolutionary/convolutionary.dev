/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // bento backgrounds - warm paper tones
        bento: {
          bg: '#FAFAF9',
          surface: '#FFFFFF',
          'surface-alt': '#F5F5F4',
        },
        // text hierarchy - stone palette
        ink: {
          primary: '#1C1917',
          secondary: '#44403C',
          muted: '#78716C',
          subtle: '#A8A29E',
        },
        // accent - warm terracotta/clay
        clay: {
          DEFAULT: '#C2410C',
          soft: '#FB923C',
          bg: '#FFF7ED',
        },
        // borders & lines
        line: {
          DEFAULT: '#E7E5E4',
          hover: '#D6D3D1',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        'bento': '1rem',
        'bento-lg': '1.5rem',
        'bento-xl': '2rem',
      },
      boxShadow: {
        'bento-sm': '0 1px 2px rgba(28, 25, 23, 0.04)',
        'bento-md': '0 4px 12px rgba(28, 25, 23, 0.06)',
        'bento-lg': '0 12px 32px rgba(28, 25, 23, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
