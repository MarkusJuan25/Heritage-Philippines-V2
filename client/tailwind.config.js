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
          950: "#1B120D",
        },
        forest: {
          500: "#3A7567",
          600: "#2F5D50",
          700: "#234A40",
          800: "#173830",
          900: "#0F2922",
        },
        gold: {
          200: "#F2D77A",
          300: "#E6C36B",
          400: "#D8B16D",
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
        nav: "0 22px 70px rgba(0, 0, 0, 0.32)",
        glow: "0 16px 36px rgba(214, 173, 75, 0.28)",
        warm: "0 24px 70px rgba(74, 45, 22, 0.14)",
        premium: "0 30px 90px rgba(32, 24, 15, 0.18)",
      },
      letterSpacing: {
        wider: ".08em",
        widest: ".22em",
      },
    },
  },
  plugins: [],
};
