/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },

        colors: {
            light: {
                100: "rgb(255,255,255, 1)",
                200: "rgb(240,240,240, 1)",
            },
            text: {
                100: "rgb(30,29,34, 1)",
                200: "rgb(30,29,34, 0.2)",
            },
            brick: {
                DEFAULT: "rgba(126,55,47,0.4)",
                100: "rgb(126,55,47, 0.2)",
                200: "rgba(126,55,47,0.4)",
                300: "rgb(126,55,47, 1)", // Couleur primaire
                400: "rgb(126,64,55, 1)", // Couleur primaire (sidebar)
            },
            marine: {
                DEFAULT: "rgba(201,203,213,0.36)",
                100: "rgb(119,125,149,1)", // Couleur d'accent (sidebar)
                200: "rgba(201,203,213, 0.36)", // Couleur d'accent
                300: "rgb(47,44,54, 1)", // Couleur secondaire
            },
        },
    },
  },
  plugins: [],
});

