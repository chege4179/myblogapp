module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '639px'},
        'md': {'max': '767px'},
        'lg': {'max': '1023px'},


        // => @media (min-width: 992px) { ... }
      },
    },

  },
  plugins: [],
}
