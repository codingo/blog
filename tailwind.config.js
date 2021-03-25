const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans' : [ 'Rubik', ...defaultTheme.fontFamily.sans]
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
