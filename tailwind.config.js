/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      main: '#0A1316',
      second: '#d47124',
      third: '#121a1d',
      lightWhite: '#959590',
      lightBlack: '#4f4f4f',
    },
    extend: {
      fontFamily: {
        heading: "'Italiana', sans-serif",
        body: "'Lato', sans-serif"
      }
    },
  },
  plugins: [],
}