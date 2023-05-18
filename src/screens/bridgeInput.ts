import { footer } from "../components";
import { requiredUsdValue } from "../utils";
import { portfolioBalance } from "./portfolioBalance";

declare let globalThis: any;

export const bridgeInput = (parentElement = document.getElementById("popupBackground"), previousPage = portfolioBalance) => {
  const {
    requiredTokenDetail,
    exchangingTokenDetail: {
      symbol,
      logoUrl,
      name,
      actualBalance,
      price,
      chainDetails: {
        backendName
      }
    }
  } = globalThis;
  const bridgeInputHTML = `
    <div class="bg-primaryBg rounded-[30px] z-50 flex flex-col justify-between items-center m-auto w-[90%] lg:w-[30%]" id="bridge-popup-css">
      <div class="bg-primaryBg rounded-t-[30px] p-5 flex flex-col justify-center items-center w-full h-full">
        <div class="flex justify-between w-full mt-[5px]">
          <img src="https://public.cypherd.io/icons/back_arrow.svg" class="back-button cursor-pointer"/>
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
        </div>
        <h2 class="font-semibold text-[28px] text-primaryText my-5 lg:my-10">Enter Token Amount</h2>
        <h3 class="font-extrabold text-[22px] text-primaryText">USD</h3>
        <div class="flex justify-evenly w-full items-center">
          <div class="bp-max-button rounded-full flex items-center justify-center h-[40px] w-[40px] lg:h-[40px] lg:w-[40px] bg-white cursor-pointer">
            <p class="bp-max-button text-[12px] text-[#2081E1]">MAX</p>
          </div>
          <div id="bp-amount-input" class="w-[200px] lg:w-[250px]">
            <input type="text" class="text-center focus:outline-none font-extrabold text-[70px] text-primaryText bg-primaryBg" id="bp-amount-value" placeholder="0.00">
          </div>
          <div class="rounded-full flex items-center justify-center h-[48px] w-[48px] cursor-pointer" id="bp-switch-button">
          </div>
        </div>
        <div class="flex">
          <p class="mr-2 text-[18px] text-primaryText" id="bp-token-value">00</p>
          <p class="text-[18px] text-primaryText">${symbol}</p>
        </div>
        <div class="flex my-[3]">
          <p class="text-[14px] text-primaryText" id="bp-min-amount">Min amount: $${Math.max(10, requiredUsdValue(requiredTokenDetail, globalThis.exchangingTokenDetail)).toFixed(2)}</p>
        </div>
        <div class="bg-primaryBg border border-[#E4E4E4] p-2 flex rounded-2xl w-[90%] lg:w-[75%] mt-6">
          <img src="${logoUrl}" alt="${name} logo"
          class="h-[45px] w-[45px] lg:h-[55px] lg:w-[55px] rounded-lg">
          <div class="w-full ml-3" id="bp-balance-detail">
            <div id="bp-balance-detail-usd" class="flex justify-between h-[25px]">
              <p class="text-primaryText text-[18px] font-semibold">${backendName}</p>
              <p class="text-primaryText text-[18px] font-semibold" id="bp-balance-detail-usd-value">$${(actualBalance * price).toFixed(2)}</p>
            </div>
            <div id="bp-balance-detail-token" class="flex justify-between h-[25px]">
              <p class="text-[#929292] text-[16px] font-normal">${symbol}</p>
              <p class="text-[#929292] text-[16px] font-normal" id="bp-balance-detail-token-value">${parseFloat(actualBalance).toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>

      <div id="bp-submit-button-container" class="bg-primaryBg py-5 lg:py-10 w-full flex items-center justify-center rounded-b-[30px]">
        <button class="bridge-input-submit bg-[#2081E2] w-[60%] py-4 rounded-lg text-white text-[16px] font-semibold">
          Submit
        </button>
      </div>
      ${footer()}
    </div>
  `;

  globalThis.previousPage = previousPage;
  if(parentElement) parentElement.innerHTML = bridgeInputHTML;
  // addInputEventListner();
}
