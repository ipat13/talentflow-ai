/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        // Cores claras - Background branco
        'talents-bg': '#ffffff',
        'talents-text': '#1e293b',
        'talents-black': '#0f172a',
        'talents-dark-gray': '#334155',
        'talents-shadow': '#e2e8f0',
        'talents-border-dark': '#e2e8f0',
        'talents-text-secondary': '#64748b',
        'talents-white': '#ffffff',
        'talents-off-white': '#f8fafc',
        'talents-light-gray': '#f1f5f9',
        
        // Cores do gradiente - Azul pastel
        'talents-blue': '#93c5fd',
        'talents-indigo': '#818cf8',
        'talents-purple': '#a78bfa',
        'talents-pink': '#f9a8d4',
        'talents-rose': '#f9a8d4',
        
        // Botões - Azul pastel
        'primary': '#60a5fa',
        'primary-hover': '#3b82f6',
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
        'gradient-talents': 'linear-gradient(90deg, #93c5fd 0%, #818cf8 25%, #a78bfa 50%, #f9a8d4 75%, #f9a8d4 100%)',
        'gradient-talents-button': 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgb(96 165 250 / 68%) 100%), #60a5fa',
      },
    },
  },
  plugins: [],
}