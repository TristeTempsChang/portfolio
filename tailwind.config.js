/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Montserrat': ['"Montserrat"'],
      'OpenSans' : ['"Open Sans"']
    },
    screens: {
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '1/2xl': '1400px'
    },
  },
  plugins: [],
}

