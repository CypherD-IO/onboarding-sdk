/** @type {import('tailwindcss').Config} */
import Colors from "./src/constants/colors";
module.exports = {
  content: ["./src/**/*.{html,js,ts}", "./src/htmlContents/*.ts"],
  // theme: {
  //   colors : {
  //     primaryBg : Colors.primaryBg,
  //     secondaryBg: 'red'
  //   }
  // },
  theme: {
    extend: {
      colors: {
        primaryBg: "var(--theme-primaryBg)",
        secondaryBg: "var(--theme-secondaryBg)",
        primaryText: "var(--theme-primaryText)",
        disabledText: "var(--theme-disabledText)",
        borderColor: "var(--theme-borderColor)",
        stripedTableBg: "var(--theme-stripedTableBg)",
        grayBg: "var(--theme-grayBg)",
        infoBlue: "var(--theme-infoBlue)",
        appBg: "var(--theme-appBg)",
        soapstoneBg: "var(--theme-soapStoneIcon)",
      },
      screens: {
        sm: "var(--cyd-sm)", // Small screens
        md: "var(--cyd-md)", // Medium screens
        lg: "var(--cyd-lg)", // Large screens
        xl: "var(--cyd-xl)", // Extra-large screens
      },
    },
    // screens: {
    //   sm: "640px", // Small screens
    //   md: "768px", // Medium screens
    //   lg: "1024px", // Large screens
    //   xl: "1280px", // Extra-large screens
    // },
  },
  plugins: [],
};
