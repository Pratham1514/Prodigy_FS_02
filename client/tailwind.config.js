/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "2xl": "2px 0px 10px rgb(0 0 0/0.3)",
        xl: "0px 0px 8px rgb(0 0 0/0.3)",
      },
      fontFamily: {
        sans: "Montserrat",
      },
    },
  },
  plugins: [],
};
