/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF7F1",
          100: "#F5EFE3",
          200: "#EBE0CB",
          300: "#DDCBAA",
        },
        coffee: {
          500: "#8A5A38",
          600: "#6F4525",
          700: "#5C3A21",
          800: "#44291A",
          900: "#2B1810",
        },
        forest: {
          500: "#3A7567",
          600: "#2F5D50",
          700: "#234A40",
          800: "#173830",
          900: "#0F2922",
        },
        gold: {
          300: "#E6C36B",
          400: "#D9AC4A",
          500: "#BE8E2B",
          600: "#9C7321",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 41, 34, 0.25)",
        ring: "0 0 0 1px rgba(190, 142, 43, 0.35)",
      },
      letterSpacing: {
        wider: ".08em",
        widest: ".22em",
      },
    },
  },
  plugins: [],
};
