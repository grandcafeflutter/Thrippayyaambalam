/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f2',
          100: '#fbe3e3',
          200: '#f5c2c2',
          300: '#ec9494',
          400: '#de5c5c',
          500: '#c93a3a',
          600: '#a82626',
          700: '#7f1d1d',
          800: '#5e1616',
          900: '#3f0e0e',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5b400',
          600: '#d99a00',
          700: '#b07a00',
          800: '#8a5f00',
          900: '#5e4000',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          300: '#fdba74',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        neutral: {
          50: '#fdfaf4',
          100: '#f7f1e3',
          200: '#ece2cc',
          300: '#d9cbb0',
          400: '#b3a48a',
          500: '#8c7f69',
          600: '#6b614f',
          700: '#4d4638',
          800: '#332f26',
          900: '#1f1c17',
        },
      },
      fontFamily: {
        serif: ['Montserrat'],
        sans: ['Lato'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
