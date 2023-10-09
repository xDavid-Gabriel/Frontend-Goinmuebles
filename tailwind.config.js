/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        diagonal: "linear-gradient(to bottom right, white 50%, red 50%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        display: "var(--font-inter)",
        body: "var(--font-nunito-sans)",
        josefin: "var(--font-josefin-sans)",
      },
      colors: {
        "peach-pink": "#E8DA4B",
        tomato: "#E7422E",
        "tomato-100": "#B93525",
        "blue-green": "#013890",
        gray62: "#686868",
        "forest-green": "#457299",
        "blue-magenta": "#7857A8",
        teal: "#009D8C",
        "blue-magenta-100": "#A08BC3",
        "light-sky-blue": "#DCF3FB",
      },
      screens: {
        xs: "400px",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
