/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Fallback for safety
        display: ['Syne', 'sans-serif'], 
        mono: ['Space Mono', 'monospace'], 
      },
      colors: {
        nexus: {
          dark: "#050505",
          panel: "#121212",
          border: "#2A2A2A",
          accent: "#CCFF00",
          muted: "#888888",
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #2A2A2A 1px, transparent 1px), linear-gradient(to bottom, #2A2A2A 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
