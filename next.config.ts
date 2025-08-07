/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // ✅ For App Router projects
  ],
  experimental: {
    appDir: true, // ✅ Must be enabled
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
