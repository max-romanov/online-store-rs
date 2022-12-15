/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      width: {
        full: "100%"
      },
      height: {
        full: "100%"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
