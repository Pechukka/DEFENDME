/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dm-primary': '#1aa990',
        'dm-dark':    '#0a5a62',
        'dm-light':   '#e8f8f5',
      },
    },
  },
  plugins: [],
}
