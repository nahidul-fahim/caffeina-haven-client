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
      second: '#c8935f',
      third: '#121a1d',
      lightWhite: '#959590',
      lightBlack: '#424242',
    },
    extend: {
      fontFamily: {
        heading: "'Cormorant Garamond', serif",
        body: "'Jost', sans-serif"
      }
    },
  },
  plugins: [],
}