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
      '1/2xl': '1400px',
      '2xl': '1500px'
    },
    container: {
      padding: {
        md: '2rem',
        lg: '4rem',
        xl: '6rem',
        '1/2xl': '8rem',
        '2xl': '10rem'
      },
    },
  },
  plugins: [],
}

