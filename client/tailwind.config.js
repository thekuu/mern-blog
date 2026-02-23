/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#b9e7e7",
        teal: {
          light: "#b9e7e7",
          DEFAULT: "#008080",
          dark: "#006666",
        }
      },
    },
  },
  plugins: [],
}
