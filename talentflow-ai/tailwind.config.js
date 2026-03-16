/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Cores exatas do site exemplo TalentsFlow.ai
        'talents-bg': '#F7FFF7',
        'talents-text': '#2C3E50',
        'talents-black': '#09090b',
        'talents-dark-gray': '#18181b',
        'talents-shadow': '#121212',
        'talents-border-dark': '#27272a',
        'talents-text-secondary': '#52525b',
        'talents-white': '#ffffff',
        'talents-off-white': '#fafafa',
        'talents-light-gray': '#f4f4f5',
        
        // Cores do gradiente
        'talents-blue': '#3b82f6',
        'talents-indigo': '#6366f1',
        'talents-purple': '#8b5cf6',
        'talents-pink': '#d946ef',
        'talents-rose': '#f472b6',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-up': 'slide-in-up 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)'
          },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-talents': 'linear-gradient(90deg, #3b82f6 0%, #6366f1 25%, #8b5cf6 50%, #d946ef 75%, #f472b6 100%)',
        'gradient-talents-button': 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgb(0 0 0 / 68%) 100%), #09090b',
      },
    },
  },
  plugins: [],
}