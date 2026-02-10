/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F9F7F2',
        teal: '#004B50',
        graphite: '#1A1A1B',
      },
    },
  },
  plugins: [],
}