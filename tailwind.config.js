// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",   // 👈 importante que apunte a todos los .js y .jsx
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 40px rgba(33,225,140,.35)", // <--- aquí
      },
      colors: {
        portal: {
          50: "#f0fff4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#22c55e", // 👈 verde portal brillante
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
      },
    },
  },
  plugins: [],
};
