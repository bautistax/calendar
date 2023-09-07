/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        Blanco: "#ffffff",
        Verde: "#33FF57",
        Azul: "#5733FF",
        Rosa: "#FF33D8",
        Celeste: "#33D8FF",
      },
    },
  },
  variants: {},
  plugins: [],
}
