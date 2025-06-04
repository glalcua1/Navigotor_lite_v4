/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Prevent conflicts with Material UI
  corePlugins: {
    preflight: false,
  },
  // Important to prevent conflicts with Material UI
  important: false,
}

