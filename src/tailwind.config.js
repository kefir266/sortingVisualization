// tailwind.config.js
const { amber } = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amber,
      },
    },
  },
  plugins: [],
};
