/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nbsc-blue': '#1e40af',
        'nbsc-green': '#16a34a',
      }
    },
  },
  plugins: [],
}
