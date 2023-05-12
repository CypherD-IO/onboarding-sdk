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
            borderColor: 'var(--theme-borderColor)',
            stripedTableBg: 'var(--theme-stripedTableBg)'
          }
        }
      }
    }
  </script>`
  return value;
}
