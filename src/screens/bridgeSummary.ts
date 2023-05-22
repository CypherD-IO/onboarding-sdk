import { bridgeInput } from ".";
import { footer } from "../components";

declare let globalThis: any;

export const bridgeSummary = (parentElement = document.getElementById("popupBackground"), previousPage = bridgeInput) => {
  const {
    exchangingTokenDetail,
    requiredTokenDetail,
    bridgeInputDetails: {
      tokenValueEntered,
      usdValueEntered
    }
  } = globalThis;

  const bridgeSummaryHTML = `
  <div class="flex flex-col justify-evenly items-center w-[90%] lg:w-[35%] m-auto bg-primaryBg rounded-[30px]">
    <div class="flex justify-between w-full px-[20px] mt-[20px]">
      <img src="https://public.cypherd.io/icons/back_arrow.svg" class="back-button cursor-pointer"/>
      <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
    </div>

    <div id="bp-heading" class="mt-[20px]">
      <h2 class="text-[25px] text-primaryText font-bold">Summary</h2>
    </div>

    <div id="bp-summary-container" class="mt-[50px] w-[95%] border-[1px] border-borderColor rounded-[10px]">
      <div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg rounded-t-[10px]">
        <p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange from</p>
        <div class="flex flex-row items-center w-[30%]">
          <img src="https://public.cypherd.io/icons/logos/${exchangingTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${exchangingTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="w-[22px] h-[22px] rounded-full">
          <p class="text-[14px] text-primaryText ml-[7px]">${exchangingTokenDetail.chainDetails.backendName}</p>
        </div>
        <div class="flex flex-row items-center w-[30%]">
          <img src="${exchangingTokenDetail.logoUrl}" alt="${exchangingTokenDetail.name} logo" class="w-[22px] h-[22px] rounded-full">
          <p class="text-[14px] text-primaryText ml-[7px]">${exchangingTokenDetail.name}</p>
        </div>
      </div>
      <div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg">
        <p class="w-[30%] text-[14px] text-primaryText">Amount Sending</p>
        <p class="w-[30%] text-[14px] text-primaryText">${parseFloat(tokenValueEntered).toFixed(6)} ${exchangingTokenDetail.symbol}</p>
        <p class="w-[30%] text-[14px] text-primaryText">$${parseFloat(usdValueEntered).toFixed(2)}</p>
      </div>
      <div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg">
        <p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange to</p>
        <div class="flex flex-row items-center w-[30%]">
          <img src="https://public.cypherd.io/icons/logos/${requiredTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${requiredTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="w-[22px] h-[22px] rounded-full">
          <p class="text-[14px] text-primaryText ml-[7px]">${requiredTokenDetail.chainDetails.backendName}</p>
        </div>
        <div class="flex flex-row items-center w-[30%]">
          <img src="${requiredTokenDetail.logoUrl}" alt="${requiredTokenDetail.name} logo" class="w-[22px] h-[22px] rounded-full">
          <p class="text-[14px] text-primaryText ml-[7px]">${requiredTokenDetail.name}</p>
        </div>
      </div>
      <div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg rounded-b-[10px]">
        <p class="w-[30%] text-[14px] text-primaryText">Amount Receiving</p>
        <p id="token-received" class="w-[30%] text-[14px] text-primaryText"> ... ${requiredTokenDetail.symbol}</p>
        <p id="usd-received" class="w-[30%] text-[14px] text-primaryText">$ ... </p>
      </div>
    </div>

    <div class=" flex flex-row justify-center items-center w-[100%] mt-[50px]">
      <button disabled id="bridge-submit-blue-button" class="bridge-submit-blue-button blue-button disabled-button bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]">Exchange</button>
    </div>
    ${footer()}
  </div>`

  globalThis.previousPage = previousPage;
  if(parentElement) parentElement.innerHTML = bridgeSummaryHTML;
}
