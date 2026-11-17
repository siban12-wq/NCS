import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: 'var(--c-indigo-900)',
          700: 'var(--c-indigo-700)',
        },
        royal: '#2340C8',
        teal: 'var(--c-teal)',
        lavender: 'var(--c-lavender)',
        peach: 'var(--c-peach)',
        gold: 'var(--c-gold)',
        ink: 'var(--c-ink)',
        paper: 'var(--c-paper)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backdropBlur: {
        glass: '18px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        gentle: '700ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
