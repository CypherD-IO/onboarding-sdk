/** @type {import('tailwindcss').Config} */
import Colors from './src/constants/colors';
module.exports = {
  content: ["./src/**/*.{html,js,ts}",
    "./src/htmlContents/*.ts"],
  // theme: {
  //   colors : {
  //     primaryBg : Colors.primaryBg,
  //     secondaryBg: 'red'
  //   }
  // },
  theme: {
    extend: {
      colors: {
        primaryBg: 'var(--theme-primaryBg)',
        secondaryBg: 'var(--theme-secondaryBg)',
        primaryText: 'var(--theme-primaryText)',
        borderColor: 'var(--theme-borderColor)',
        stripedTableBg: 'var(--theme-stripedTableBg)'
      }
    }
  },
  plugins: [],
}

