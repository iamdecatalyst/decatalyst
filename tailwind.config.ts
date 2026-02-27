import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        display: ["'Inter'", 'system-ui', 'sans-serif'],
        serif: ["'Crimson Pro'", 'Georgia', 'serif'],
        mono: ["'JetBrains Mono'", "'Space Mono'", 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        neu: {
          base: '#0d0d0d',
          card: '#141414',
          input: '#0a0a0a',
          elevated: '#1a1a1a',
          border: '#1f1f1f',
        },
        klein: '#002FA7',
        copper: '#cd7f32',
        rose: '#e11d48',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px) rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
