declare let globalThis: any;

export const select = ({options}: any) => {
  const selectHTML =  `
  <div class="relative inline-block text-left w-full">
    <div class="flex">
      <div class='cyd-dropdown-button text-[16px] text-primaryText justify-between rounded-[15px] bg-primaryBg relative flex items-center p-[18px] hover:border hover:border-gray-300 w-full'>
        <div class="flex flex-row">
          <img src=${options[0]} class='h-8 w-8 ml-[10px] mr-[20px] rounded-full w-4/12' />
          <div id="cyd-dropdown-selected-option" class='text-primaryText w-8/12'>${options[0]}</div>
        </div>
        <img src="https://public.cypherd.io/assets/dapps/backArrow.png" alt="down_arrow" class="h-[14px] w-[10px] -rotate-90">
      </div>
    </div>
    <div id="cyd-dropdown-option-list" class="absolute left-0 w-full text-[16px] mt-1 bg-primaryBg text-primaryText rounded-[15px] shadow-lg z-10 max-h-[300px] overflow-y-auto hidden">` +
      options.map((option: string) => (
          `<div params='` + JSON.stringify({value: option}) + `' class='cyd-dropdown-option flex items-center p-[18px] hover:bg-blue-500 hover:text-white'>
            <img src=${option} class='h-8 w-8 ml-[10px] mr-[20px] rounded-full w-4/12' />
            <div class='text-primaryText w-8/12'>${option}</div>
          </div>`
        )
      ).join(" ") +
    `</div>
  </div>
  `;

  return selectHTML;
}



// <label>
//   ${label}
//   <select value=${value}>` +
//     options.map((option: any) => (
//       `<option value=${option.value}>${option.label}</option>`
//     )) +
//   `</select>
// </label>`;
