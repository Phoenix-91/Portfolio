/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712",
        secondary: "#9ca3af",
        tertiary: "#0f172a",
        "black-100": "#0f1629",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1920&auto=format&fit=crop')",
      },
    },
  },
  plugins: [],
} 