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
        lightGray: '#8b95a1',
        blue: '#3182F6',
        navy: '#1d2543',
        blueGray: '#6C81A4',
        darkNavy: '#1F2937',
        lightNavy: '#374151',
      },
      screens: {
        mobile: '320px',
        tablet: '640px',
        desktop: '1024px',
      },
    },
  },
  plugins: [],
}
