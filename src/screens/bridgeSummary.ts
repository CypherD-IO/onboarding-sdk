import { footer } from "../components";

declare let globalThis: any;

export const bridgeSummary = (parentElement = document.getElementById("popupBackground")) => {
  const bridgeSummaryHTML = `
  <div class="flex flex-col justify-evenly items-center w-[90%] lg:w-[35%] m-auto bg-primaryBg rounded-[30px]">
    <div class="flex justify-end w-full px-[20px] mt-[20px]">
      <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
    </div>

    <div id="bp-heading" class="mt-[20px]">
      <h2 class="text-[25px] text-primaryText font-bold">Summary</h2>
    </div>

    <div id="bp-summary-container" class="mt-[50px] w-[95%] border-[1px] border-borderColor rounded-[10px]">
      <div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg rounded-t-[10px]">
        <p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange from</p>
        <div class="flex flex-row items-center w-[30%]">
          <img src="https://public.cypherd.io/icons/logos/${globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase()} logo" width="22" height="22">
          <p class="text-[14px] text-primaryText ml-[7px]">${globalThis.exchangingTokenDetail.chainDetails.backendName}</p>
        </div>
        <div class="flex flex-row items-center w-[30%]">
          <img src="${globalThis.exchangingTokenDetail.logoUrl}" alt="${globalThis.exchangingTokenDetail.name} logo" width="22" height="22">
          <p class="text-[14px] text-primaryText ml-[7px]">${globalThis.exchangingTokenDetail.name}</p>
        </div>
      </div>
      <div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg">
        <p class="w-[30%] text-[14px] text-primaryText">Amount Sending</p>
        <p class="w-[30%] text-[14px] text-primaryText">${parseFloat(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(6)} ${globalThis.exchangingTokenDetail.symbol}</p>
        <p class="w-[30%] text-[14px] text-primaryText">$${parseFloat(globalThis.bridgeInputDetails.usdValueEntered).toFixed(2)}</p>
      </div>
      <div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg">
        <p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange to</p>
        <div class="flex flex-row items-center w-[30%]">
          <img src="https://public.cypherd.io/icons/logos/${globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase()} logo" width="22" height="22">
          <p class="text-[14px] text-primaryText ml-[7px]">${globalThis.requiredTokenDetail.chainDetails.backendName}</p>
        </div>
        <div class="flex flex-row items-center w-[30%]">
          <img src="${globalThis.requiredTokenDetail.logoUrl}" alt="${globalThis.requiredTokenDetail.name} logo" width="22" height="22">
          <p class="text-[14px] text-primaryText ml-[7px]">${globalThis.requiredTokenDetail.name}</p>
        </div>
      </div>
      <div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg rounded-b-[10px]">
        <p class="w-[30%] text-[14px] text-primaryText">Amount Receiving</p>
        <p id="token-received" class="w-[30%] text-[14px] text-primaryText"> ... ${globalThis.requiredTokenDetail.symbol}</p>
        <p id="usd-received" class="w-[30%] text-[14px] text-primaryText">$ ... </p>
      </div>
    </div>

    <div class=" flex flex-row justify-center items-center w-[100%] mt-[50px]">
      <button disabled id="bridge-submit-blue-button" class="bridge-submit-blue-button blue-button disabled-button bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]">Exchange</button>
    </div>
    ${footer()}
  </div>`

  if(parentElement) parentElement.innerHTML = bridgeSummaryHTML;
}
