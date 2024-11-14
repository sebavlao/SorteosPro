/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.ejs"],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Inter", "sans-serif"],
    },
  },
  safelist: ["border-[#E30231]", "bg-slate-950"],
  plugins: [],
};
