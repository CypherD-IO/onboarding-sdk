export const themeSwitcherHTML = `<div class="h-[45px] flex flex-row justify-end ml-[-25px]">
  <div class="toggle-switch">
      <label>
          <input onclick="applyTheme(globalThis.theme === 'light' ? 'dark' : 'light')" class="toggle-input" type="checkbox">
          <span class="slider"></span>
      </label>
  </div>
</div>`
