module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "min-2": "min-content 1fr",
        "min-2-2": "1fr min-content",
        "min-3": "min-content min-content 1fr",
        "min-3-3": "min-content min-content min-content",
        "min-6": "max-content max-content max-content max-content max-content max-content",
        "min-7": "max-content max-content max-content max-content max-content max-content max-content",
        "min-10": "max-content max-content max-content max-content max-content max-content max-content max-content max-content max-content",
        "max-12": "repeat(12,max-content)",
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