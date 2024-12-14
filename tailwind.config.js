/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sono: ["Sono", "sans-serif"],
      },
      colors: {
        brand: {
          100: "#F7F5FF",
          200: "#EDEBFE",
          300: "#D4C4FA",
          400: "#C1B2FC",
          500: "#A78BFA",
          600: "#8B5CF6",
          700: "#7C3AED",
          800: "#6D28D9",
          900: "#5B21B6",
        },
      },
    },
  },
  plugins: [],
};
