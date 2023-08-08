import _ from "lodash";
import { CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL } from "../constants/server";

const getChainListItems = (
  orderedList: Array<string>,
  containingList: Array<string>
) => {
  const newOrderedList = orderedList.map((item) => item.toUpperCase());
  return newOrderedList.concat(
    containingList.filter((item) => !newOrderedList.includes(item))
  );
};

export const chainDropdown = (options: any[], id: string, disabled = false) => {
  const chainDropdownHTML =
    `
  <div class="cyd-relative cyd-inline-block cyd-text-left cyd-w-full">
                <div class="cyd-flex">
                  <div params='` +
    JSON.stringify({ dropdownId: id, disabled }) +
    `' class='cyd-dropdown-button cyd-text-[16px] cyd-text-primaryText cyd-justify-between cyd-rounded-[10px] md:cyd-rounded-[15px] cyd-bg-primaryBg cyd-relative cyd-flex cyd-items-center cyd-border cyd-border-primaryBg cyd-p-[10px] md:cyd-p-[14px] hover:cyd-border-borderColor cyd-w-full'>
                    <div class="cyd-flex cyd-flex-row cyd-justify-center cyd-items-center cyd-w-90%">
                      <img id="${id}-selected-img" src="https://public.cypherd.io/icons/logos/${
      options[0]
    }.png" class='cyd-h-5 cyd-w-5 md:cyd-h-6 md:cyd-w-6 cyd-mx-[5px] md:cyd-mx-[20px] cyd-rounded-full cyd-w-4/12' />
                      <div id="${id}-selected" class='cyd-text-[14px] cyd-text-primaryText cyd-mt-[3px]'>${_.get(
      CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL,
      [options[0].toUpperCase(), "name"]
    )}</div>
                    </div>
                    <img src="https://public.cypherd.io/assets/dapps/backArrow.png" alt="down_arrow" class="cyd-h-[10px] cyd-w-[6px] md:cyd-h-[12px] md:cyd-w-[8px] cyd--rotate-90">
                  </div>
                </div>
                <div id="${id}" class="cyd-absolute cyd-left-0 cyd-w-full cyd-text-[16px] cyd-px-[5px] cyd-pb-[10px] cyd-mt-1 cyd-bg-primaryBg cyd-rounded-[15px] cyd-shadow-lg cyd-z-10 cyd-max-h-[300px] cyd-overflow-y-auto cyd-border cyd-border-borderColor cyd-hidden">` +
    getChainListItems(options, _.keys(CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL))
      .map((option: string) =>
        options.includes(option.toLowerCase())
          ? `<div params='` +
            JSON.stringify({
              value: option,
              dropdownId: id,
              disabledOption: !options.includes(option.toLowerCase()),
            }) +
            `' class='cyd-dropdown-option cyd-flex cyd-justify-between cyd-items-center cyd-rounded-[15px] cyd-p-[2px] md:cyd-p-[5px] cyd-mt-[10px] hover:cyd-bg-soapstoneBg'>
                                                <div class="cyd-flex cyd-flex-row cyd-w-full">
                                                  <img src="https://public.cypherd.io/icons/logos/${option.toLocaleLowerCase()}.png" class='cyd-h-5 cyd-w-5 md:cyd-h-6 md:cyd-w-6 cyd-mx-[5px] md:cyd-mx-[20px] cyd-rounded-full cyd-w-4/12' />
                                                  <div class='cyd-text-[14px] md:cyd-text-[16px] cyd-text-primaryText cyd-w-8/12'>${_.get(
                                                    CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL,
                                                    [option, "name"]
                                                  )}</div>
                                                </div>
                                              </div>`
          : `<div params='` +
            JSON.stringify({
              value: option,
              dropdownId: id,
              disabledOption: !options.includes(option.toLowerCase()),
            }) +
            `' class='cyd-dropdown-option cyd-flex cyd-justify-between cyd-items-center cyd-rounded-[15px] cyd-p-[2px] md:cyd-p-[5px] cyd-mt-[10px] hover:cyd-bg-soapstoneBg'>
                                                <div class="cyd-flex cyd-flex-row cyd-w-full">
                                                  <div class='cyd-flex cyd-flex-row cyd-w-2/3'>
                                                    <img src="https://public.cypherd.io/icons/logos/${option.toLocaleLowerCase()}.png" class='cyd-h-5 cyd-w-5 md:cyd-w-6 md:cyd-h-6 cyd-mx-[5px] md:cyd-mx-[20px] cyd-rounded-full' />
                                                    <div class='cyd-text-[14px] md:cyd-text-[16px] cyd-text-disabledText'>${_.get(
                                                      CHAIN_BACKEND_NAME_TO_CHAIN_DETAIL,
                                                      [option, "name"]
                                                    )}</div>
                                                  </div>
                                                  <div class='cyd-text-[10px] md:cyd-text-[12px] cyd-text-disabledText cyd-w-1/3'>( not enough balance )</div>
                                                </div>
                                              </div>`
      )
      .join(" ") +
    `</div>
    </div>
  `;

  return chainDropdownHTML;
};
