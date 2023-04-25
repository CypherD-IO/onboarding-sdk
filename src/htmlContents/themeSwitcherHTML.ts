export const themeSwitcherHTML = `<div class="h-[35px] w-[70px] flex flex-row">
  <div class="toggle-switch">
      <label>
          <input onclick="applyTheme(globalThis.theme === 'light' ? 'dark' : 'light')" class="toggle-input" type="checkbox">
          <span class="slider"></span>
      </label>
  </div>
</div>`
