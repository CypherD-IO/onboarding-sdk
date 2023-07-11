import _ from "lodash";
import { CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL } from "../constants/server";

const getChainListItems = (orderedList: Array<string>, containingList: Array<string>) => {
  const newOrderedList = orderedList.map((item) => item.toUpperCase());
  return newOrderedList.concat(containingList.filter(item => !newOrderedList.includes(item)));
}

export const chainDropdown = (options: any[], id: string, disabled = false) => {
  const chainDropdownHTML = `
  <div class="relative inline-block text-left w-full">
                <div class="flex">
                  <div params='` + JSON.stringify({ dropdownId: id, disabled }) + `' class='cyd-dropdown-button text-[16px] text-primaryText justify-between rounded-[10px] md:rounded-[15px] bg-primaryBg relative flex items-center border border-primaryBg p-[10px] md:p-[14px] hover:border-borderColor w-full'>
                    <div class="flex flex-row justify-center items-center w-90%">
                      <img id="${id}-selected-img" src="https://public.cypherd.io/icons/logos/${options[0]}.png" class='h-5 w-5 md:h-6 md:w-6 mx-[5px] md:mx-[20px] rounded-full w-4/12' />
                      <div id="${id}-selected" class='text-[14px] text-primaryText mt-[3px]'>${_.get(CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL, [options[0].toUpperCase(), 'name'])}</div>
                    </div>
                    <img src="https://public.cypherd.io/assets/dapps/backArrow.png" alt="down_arrow" class="h-[10px] w-[6px] md:h-[12px] md:w-[8px] -rotate-90">
                  </div>
                </div>
                <div id="${id}" class="absolute left-0 w-full text-[16px] p-[5px] mt-1 bg-primaryBg rounded-[15px] shadow-lg z-10 max-h-[300px] overflow-y-auto border border-borderColor hidden">` +
    getChainListItems(options, _.keys(CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL)).map((option: string) => (options.includes(option.toLowerCase()) ?
      `<div params='` + JSON.stringify({ value: option, dropdownId: id, disabledOption: !options.includes(option.toLowerCase()) }) + `' class='cyd-dropdown-option flex justify-between items-center rounded-[15px] p-[2px] md:p-[5px] mt-[10px] hover:bg-soapstoneBg'>
                                                <div class="flex flex-row w-full">
                                                  <img src="https://public.cypherd.io/icons/logos/${option.toLocaleLowerCase()}.png" class='h-5 w-5 md:h-6 md:w-6 mx-[5px] md:mx-[20px] rounded-full w-4/12' />
                                                  <div class='text-[14px] md:text-[16px] text-primaryText w-8/12'>${_.get(CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL, [option, 'name'])}</div>
                                                </div>
                                              </div>`
      :
      `<div params='` + JSON.stringify({ value: option, dropdownId: id, disabledOption: !options.includes(option.toLowerCase()) }) + `' class='cyd-dropdown-option flex justify-between items-center rounded-[15px] p-[2px] md:p-[5px] mt-[10px] hover:bg-soapstoneBg'>
                                                <div class="flex flex-row w-full">
                                                  <div class='flex flex-row w-2/3'>
                                                    <img src="https://public.cypherd.io/icons/logos/${option.toLocaleLowerCase()}.png" class='h-5 w-5 md:w-6 md:h-6 mx-[5px] md:mx-[20px] rounded-full' />
                                                    <div class='text-[14px] md:text-[16px] text-disabledText'>${_.get(CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL, [option, 'name'])}</div>
                                                  </div>
                                                  <div class='text-[10px] md:text-[12px] text-disabledText w-1/3'>( not enough balance )</div>
                                                </div>
                                              </div>`
    )

    ).join(" ") +
    `</div>
    </div>
  `;

  return chainDropdownHTML;
}
