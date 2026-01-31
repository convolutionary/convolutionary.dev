/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // bento backgrounds - zinc palette (shadcn style)
        bento: {
          bg: '#09090b',
          surface: '#18181b',
          'surface-alt': '#27272a',
        },
        // text hierarchy - zinc
        ink: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#71717a',
          subtle: '#52525b',
        },
        // accent - orange
        clay: {
          DEFAULT: '#f97316',
          soft: '#fb923c',
          bg: 'rgba(249, 115, 22, 0.1)',
        },
        // borders - zinc
        line: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        'bento': '0.75rem',
        'bento-lg': '1rem',
        'bento-xl': '1.5rem',
      },
      boxShadow: {
        'bento-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'bento-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'bento-lg': '0 12px 32px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.15)',
        'glow-lg': '0 0 40px rgba(249, 115, 22, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'border-beam': 'borderBeam 4s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'spotlight': 'spotlight 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        borderBeam: {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 1rem))' },
        },
        spotlight: {
          from: { opacity: '0', transform: 'translate(-50%, -50%) scale(0.5)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
      },
    },
  },
  plugins: [],
};
