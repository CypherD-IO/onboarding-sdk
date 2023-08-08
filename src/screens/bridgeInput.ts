import { footer } from "../components";
import { requiredUsdValue } from "../utils";
import { portfolioBalance } from "./portfolioBalance";

declare let globalThis: any;

export const bridgeInput = (
  parentElement = document.getElementById("cyd-popup-background"),
  previousPage = portfolioBalance
) => {
  const {
    requiredTokenDetail,
    exchangingTokenDetail: {
      symbol,
      logoUrl,
      name,
      actualBalance,
      price,
      chainDetails: { backendName },
    },
  } = globalThis;
  const bridgeInputHTML = `
    <div class="bg-primaryBg rounded-[30px] z-50 flex flex-col justify-between items-center m-auto w-[90%] cyd-md:w-[65%] cyd-lg:w-[55%] @xl/cyd:w-[40%] overflow-auto" id="cyd-bridge-input-screen">
      <div class="bg-primaryBg rounded-t-[30px] p-5 flex flex-col justify-center items-center w-full h-full">
        <div class="flex justify-between w-full mt-[5px]">
          <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cursor-pointer"/>
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
        </div>
        <h2 class="font-semibold text-[28px] text-primaryText my-5 cyd-lg:my-10">Enter Token Amount</h2>
        <h3 class="font-extrabold text-[22px] text-primaryText">USD</h3>
        <div class="flex justify-evenly w-full items-center">
          <div class="cyd-bp-max-button rounded-full flex items-center justify-center h-[40px] w-[40px] cyd-lg:h-[40px] cyd-lg:w-[40px] bg-white cursor-pointer">
            <p class="text-[12px] text-[#2081E1]">MAX</p>
          </div>
          <div id="cyd-bp-amount-input" class="w-[200px] cyd-lg:w-[250px]">
            <input type="text" class="text-center focus:outline-none font-extrabold text-[70px] text-primaryText bg-primaryBg" id="cyd-bp-amount-value" placeholder="0.00">
          </div>
          <div class="rounded-full flex items-center justify-center h-[48px] w-[48px] cursor-pointer">
          </div>
        </div>
        <div class="flex">
          <p class="mr-2 text-[18px] text-primaryText" id="cyd-bp-token-value">00</p>
          <p class="text-[18px] text-primaryText">${symbol}</p>
        </div>
        <div class="flex my-[3]">
          <p class="text-[14px] text-primaryText">Min amount: $${Math.max(
            10,
            requiredUsdValue(
              requiredTokenDetail,
              globalThis.exchangingTokenDetail
            )
          ).toFixed(2)}</p>
        </div>
        <div class="bg-primaryBg border border-borderColor p-2 flex rounded-2xl w-[90%] cyd-lg:w-[75%] mt-6">
          <img src="${logoUrl}" alt="${name} logo"
          class="h-[45px] w-[45px] cyd-lg:h-[55px] cyd-lg:w-[55px] rounded-full">
          <div class="w-full ml-3 flex flex-col h-[100%]">
            <div id="cyd-bp-balance-detail-usd" class="flex justify-between h-[25px]">
              <p class="text-primaryText text-[18px] font-semibold">${backendName}</p>
              <p class="text-primaryText text-[18px] font-semibold" id="cyd-bp-balance-detail-usd-value">$${(
                actualBalance * price
              ).toFixed(2)}</p>
            </div>
            <div id="cyd-bp-balance-detail-token" class="flex justify-between h-[25px]">
              <p class="text-[#929292] text-[16px] font-normal">${symbol}</p>
              <p class="text-[#929292] text-[16px] font-normal" id="cyd-bp-balance-detail-token-value">${parseFloat(
                actualBalance
              ).toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-primaryBg py-5 cyd-lg:py-10 w-full flex items-center justify-center rounded-b-[30px]">
        <button class="cyd-bridge-input-submit bg-[#2081E2] w-[60%] py-4 rounded-lg text-white text-[16px] font-semibold">
          Submit
        </button>
      </div>
      ${footer()}
    </div>
  `;

  globalThis.previousPage = previousPage;
  if (parentElement) parentElement.innerHTML = bridgeInputHTML;
  // addInputEventListner();
};
