/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#fff',
        black: '#0A0B0C',
        lightBlack: '#1a1c1e',
        gray: '#bdc5d2',
      },
    },
  },
  plugins: [],
}
