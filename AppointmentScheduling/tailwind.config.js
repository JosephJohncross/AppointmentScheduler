/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: {
        enabled: true,
        content: [
            './Pages/**/*.cshtml',
            './Views/**/*.cshtml'
        ],
    },
  theme: {
    extend: {},
  },
  plugins: [],
}
