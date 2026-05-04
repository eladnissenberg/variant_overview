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
      },
      colors: {
        forest: '#061D15',
        emerald: '#0F9568',
        'emerald-deep': '#0E865E',
        cream: '#FAFAF2',
        muted: '#54645C',
      },
      boxShadow: {
        'card-inset': 'inset 0 0 0 3px #061D15',
      },
    },
  },
  plugins: [],
}
