import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        indigo: {
          900: '#12163A',
          700: '#1D2563',
        },
        royal: '#2340C8',
        teal: '#5ED3C8',
        lavender: '#B9A7F5',
        peach: '#FFC9A3',
        gold: '#FFE2A8',
        ink: '#0E1230',
        paper: '#F8F6FF',
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
