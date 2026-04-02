/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        instrument: ['Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        'blue-electric': '#3B5BFF',
        'blue-bright': '#5B7AFF',
        'teal-bright': '#00D9A3',
        'teal-electric': '#00F0B8',
        'bg-dark': '#0A0A0F',
        'bg-elevated': '#141420',
        'bg-card': '#1A1A26',
        'text-primary': '#F8F9FA',
        'text-secondary': '#B8BFCA',
        'text-tertiary': '#7A8190',
        'lavender': '#DDD3F0',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'glow-blue': '0 0 60px rgba(59, 91, 255, 0.25)',
        'glow-teal': '0 0 60px rgba(0, 217, 163, 0.25)',
        'glow-mixed': '0 0 80px rgba(59, 91, 255, 0.15), 0 0 120px rgba(0, 217, 163, 0.1)',
      },
    },
  },
  plugins: [],
}
