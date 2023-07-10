export const addTailwindScript = () => {
  const value = `
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primaryBg: 'var(--theme-primaryBg)',
            secondaryBg: 'var(--theme-secondaryBg)',
            primaryText: 'var(--theme-primaryText)',
            disabledText: "var(--theme-disabledText)",
            borderColor: 'var(--theme-borderColor)',
            stripedTableBg: 'var(--theme-stripedTableBg)',
            grayBg: 'var(--theme-grayBg)',
            infoBlue: 'var(--theme-infoBlue)',
            appBg: 'var(--theme-appBg)',
            soapstoneBg: 'var(--theme-soapStoneIcon)',
          }
        }
      }
    }
  </script>`
  return value;
}
