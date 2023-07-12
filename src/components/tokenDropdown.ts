import _ from "lodash";

declare let globalThis: any;

export const tokenDropdown = (options: any, id: string, disabled = false) => {
  const tokenDropdownHTML = `
    <div class="relative inline-block text-left w-full">
      <div class="flex">
        <div params='` + JSON.stringify({ dropdownId: id, disabled }) + `' class='cyd-dropdown-button text-[16px] text-primaryText justify-between rounded-[10px] md:rounded-[15px] bg-primaryBg relative flex items-center border border-primaryBg p-[10px] md:p-[14px] hover:border-borderColor w-full'>
          <div class="flex flex-row items-center justify-center w-90%">
            <img id="${id}-selected-img" src=${_.get(options, [0, 'logoUrl'])} class='h-5 w-5 md:h-6 md:w-6 mx-[5px] md:mx-[20px] rounded-full w-4/12' />
            <div id="${id}-selected" class='text-[14px] text-primaryText mt-[3px]'>${_.get(options, [0, 'name'])}</div>
          </div>
          <img src="https://public.cypherd.io/assets/dapps/backArrow.png" alt="down_arrow" class="h-[10px] w-[6px] md:h-[12px] md:w-[8px] -rotate-90">
        </div>
      </div>
      <div id="${id}" class="absolute left-0 w-full text-[16px] px
      -[5px] pb-[10px] mt-1 bg-primaryBg text-primaryText rounded-[15px] shadow-lg z-10 max-h-[300px] overflow-y-auto border border-borderColor hidden">` +
    options.map((option: string) => (
      `<div params='` + JSON.stringify({ value: option, dropdownId: id, disabledOption: false }) + `' class='cyd-dropdown-option flex justify-between items-center rounded-[15px] p-[2px] md:p-[5px] mt-[10px] hover:bg-soapstoneBg'>
                  <div class="flex flex-row items-center justify-center w-90%">
                    <img src=${_.get(option, ['logoUrl'])} class='h-5 w-5 md:h-6 md:w-6 mx-[5px] md:mx-[20px] rounded-full w-4/12' />
                    <div class='text-[14px] md:text-[16px] text-primaryText w-8/12'>
                      ${_.get(option, ['name'])}
                    </div>
                  </div>
                  <div>
                    <div class='text-primaryText text-[12px] md:text-[14px]'>
                      $ ${(_.get(option, ['actualBalance']) * _.get(option, ['price'])).toFixed(2)}
                    </div>
                    <div class='text-primaryText text-[10px] md:text-[12px]'>
                      ${Number(_.get(option, ['actualBalance'])).toFixed(5)}
                    </div>
                  </div>
                </div>`
    )
    ).join(" ") +
    `</div>
      </div>
  `;

  return tokenDropdownHTML;
}
