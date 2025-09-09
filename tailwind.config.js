const { PiX } = require('react-icons/pi');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'button-shadow': '0px 0px 15px rgba(72, 113, 255, 0.8)',
      },
      gridTemplateColumns:{
        'newFilm': 'repeat(2, minmax(0, 178px))'
      },
      backgroundImage: {
        'footer-bg': "url('./assets/img/footer_background.png')",
      }
    },
    screens:{
      'MobileL': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'LaptopL': '1441px',
    }
  },
  plugins: [],
}

