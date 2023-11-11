/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        "c-primary": "#25283D",
        "c-secondary": "#EFD9CE",
        "c-btn": "#07BEB8",
      },
    },
    fontFamily: {
      Comic: ["Comic Sans MS, Comic Sans, sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
};
