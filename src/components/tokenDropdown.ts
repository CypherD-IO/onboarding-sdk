import _ from "lodash";

declare let globalThis: any;

export const tokenDropdown = (options: any, id: string, disabled = false) => {
  const tokenDropdownHTML =
    `
    <div class="cyd-relative cyd-inline-block cyd-text-left cyd-w-full">
      <div class="cyd-flex">
        <div params='` +
    JSON.stringify({ dropdownId: id, disabled }) +
    `' class='cyd-dropdown-button cyd-text-[16px] cyd-text-primaryText cyd-justify-between cyd-rounded-[10px] md:cyd-rounded-[15px] cyd-bg-primaryBg cyd-relative cyd-flex cyd-items-center cyd-border cyd-border-primaryBg cyd-p-[10px] md:cyd-p-[14px] hover:cyd-border-borderColor cyd-w-full'>
          <div class="cyd-flex cyd-flex-row cyd-items-center cyd-justify-center cyd-w-90%">
            <img id="${id}-selected-img" src=${_.get(options, [
      0,
      "logoUrl",
    ])} class='cyd-h-5 cyd-w-5 md:cyd-h-6 md:cyd-w-6 cyd-mx-[5px] md:cyd-mx-[20px] cyd-rounded-full cyd-w-4/12' />
            <div id="${id}-selected" class='cyd-text-[14px] cyd-text-primaryText cyd-mt-[3px]'>${_.get(
      options,
      [0, "name"]
    )}</div>
          </div>
          <img src="https://public.cypherd.io/assets/dapps/backArrow.png" alt="down_arrow" class="cyd-h-[10px] cyd-w-[6px] md:cyd-h-[12px] md:cyd-w-[8px] cyd--rotate-90">
        </div>
      </div>
      <div id="${id}" class="cyd-absolute cyd-left-0 cyd-w-full cyd-text-[16px] cyd-px
      -[5px] cyd-pb-[10px] cyd-mt-1 cyd-bg-primaryBg cyd-text-primaryText cyd-rounded-[15px] cyd-shadow-lg cyd-z-10 cyd-max-h-[300px] cyd-overflow-y-auto cyd-border cyd-border-borderColor cyd-hidden">` +
    options
      .map(
        (option: string) =>
          `<div params='` +
          JSON.stringify({
            value: option,
            dropdownId: id,
            disabledOption: false,
          }) +
          `' class='cyd-dropdown-option cyd-flex cyd-justify-between cyd-items-center cyd-rounded-[15px] cyd-p-[2px] md:cyd-p-[5px] cyd-mt-[10px] hover:cyd-bg-soapstoneBg'>
                  <div class="cyd-flex cyd-flex-row cyd-items-center cyd-justify-center cyd-w-90%">
                    <img src=${_.get(option, [
                      "logoUrl",
                    ])} class='cyd-h-5 cyd-w-5 md:cyd-h-6 md:cyd-w-6 cyd-mx-[5px] md:cyd-mx-[20px] cyd-rounded-full cyd-w-4/12' />
                    <div class='cyd-text-[14px] md:cyd-text-[16px] cyd-text-primaryText cyd-w-8/12'>
                      ${_.get(option, ["name"])}
                    </div>
                  </div>
                  <div>
                    <div class='cyd-text-primaryText cyd-text-[12px] md:cyd-text-[14px]'>
                      $ ${(
                        _.get(option, ["actualBalance"]) *
                        _.get(option, ["price"])
                      ).toFixed(2)}
                    </div>
                    <div class='cyd-text-primaryText cyd-text-[10px] md:cyd-text-[12px]'>
                      ${Number(_.get(option, ["actualBalance"])).toFixed(5)}
                    </div>
                  </div>
                </div>`
      )
      .join(" ") +
    `</div>
      </div>
  `;

  return tokenDropdownHTML;
};
