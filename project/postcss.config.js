const autoprefixer = require('autoprefixer')
const postcssSass = require('@csstools/postcss-sass')
const tailwindcss = require('tailwindcss')

module.exports = {
  syntax: require('postcss-scss'),
  plugins: [autoprefixer, postcssSass, tailwindcss],
}
