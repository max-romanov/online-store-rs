const autoprefixer = require('autoprefixer');
const postcssPxToViewport = require('@ttou/postcss-px-to-viewport');
const postcssPresetEnv = require('postcss-preset-env');
const postcssSass = require('@csstools/postcss-sass');
const tailwindcss = require('tailwindcss')

module.exports = {
  syntax: require('postcss-scss'),
  plugins: [
    autoprefixer,
    tailwindcss
  ],
};
