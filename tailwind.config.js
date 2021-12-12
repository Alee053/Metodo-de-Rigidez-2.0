module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "min-2": "min-content 1fr",
        "min-6": "max-content max-content max-content max-content max-content max-content",
        "custom-3": "1fr 1em 1.5fr",
      },
      gridTemplateRows: {
        "min-3": "min-content 1fr min-content",
        "min-2": "min-content 1fr",

      },
    },
  },
  variants: {
    extend: {opacity: ["disabled"], color: ["disabled"]},
  },
  plugins: [],
};