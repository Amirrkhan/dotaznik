/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        "custom-darkest": "#343a40",
        "custom-dark": "#495057",
        "custom-medium": "#ced4da",
        "custom-light": "#f1f3f5",
        "custom-theme": "#1098ad",
        "custom-accent": "#ffa94d",
      },
    },
  },
  plugins: [],
};
