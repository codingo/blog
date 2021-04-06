const { colors, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans' : [ 'Rubik', ...fontFamily.sans]
    },
    colors: {
      "dark": colors.gray[900],
      "black": '#050315',
      "light": colors.gray[50],
      "secondary": colors.green[500],
      "highlight": colors.gray[900],
    },
    textColor: {
      "dark": colors.gray[800],
      "light": colors.gray[50],
      "secondary": colors.green[500],
      "highlight": colors.gray[900],
    },
    minWidth: {
      '420': '420px'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
