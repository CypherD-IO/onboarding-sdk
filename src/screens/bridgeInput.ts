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
    <div class="cyd-bg-primaryBg cyd-rounded-[30px] cyd-z-50 cyd-flex cyd-flex-col cyd-justify-between cyd-items-center cyd-m-auto cyd-w-[90%] md:cyd-w-[65%] lg:cyd-w-[55%] xl:cyd-w-[40%] cyd-overflow-auto" id="cyd-bridge-input-screen">
      <div class="cyd-bg-primaryBg cyd-rounded-t-[30px] cyd-p-5 cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-full cyd-h-full">
        <div class="cyd-flex cyd-justify-between cyd-w-full cyd-mt-[5px]">
          <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cyd-cursor-pointer"/>
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
        </div>
        <h2 class="cyd-font-semibold cyd-text-[28px] cyd-text-primaryText cyd-my-5 lg:cyd-my-10">Enter Token Amount</h2>
        <h3 class="cyd-font-extrabold cyd-text-[22px] cyd-text-primaryText">USD</h3>
        <div class="cyd-flex cyd-justify-evenly cyd-w-full cyd-items-center">
          <div class="cyd-bp-max-button cyd-rounded-full cyd-flex cyd-items-center cyd-justify-center cyd-h-[40px] cyd-w-[40px] lg:cyd-h-[40px] lg:cyd-w-[40px] cyd-bg-white cyd-cursor-pointer">
            <p class="cyd-text-[12px] cyd-text-[#2081E1]">MAX</p>
          </div>
          <div id="cyd-bp-amount-input" class="cyd-w-[200px] lg:cyd-w-[250px]">
            <input type="text" class="cyd-text-center focus:cyd-outline-none cyd-font-extrabold cyd-text-[70px] cyd-text-primaryText cyd-bg-primaryBg" id="cyd-bp-amount-value" placeholder="0.00">
          </div>
          <div class="cyd-rounded-full cyd-flex cyd-items-center cyd-justify-center cyd-h-[48px] cyd-w-[48px] cyd-cursor-pointer">
          </div>
        </div>
        <div class="cyd-flex">
          <p class="cyd-mr-2 cyd-text-[18px] cyd-text-primaryText" id="cyd-bp-token-value">00</p>
          <p class="cyd-text-[18px] cyd-text-primaryText">${symbol}</p>
        </div>
        <div class="cyd-flex cyd-my-[3]">
          <p class="cyd-text-[14px] cyd-text-primaryText">Min amount: $${Math.max(
            10,
            requiredUsdValue(
              requiredTokenDetail,
              globalThis.exchangingTokenDetail
            )
          ).toFixed(2)}</p>
        </div>
        <div class="cyd-bg-primaryBg cyd-border cyd-border-borderColor cyd-p-2 cyd-flex cyd-rounded-2xl cyd-w-[90%] lg:cyd-w-[75%] cyd-mt-6">
          <img src="${logoUrl}" alt="${name} logo"
          class="cyd-h-[45px] cyd-w-[45px] lg:cyd-h-[55px] lg:cyd-w-[55px] cyd-rounded-full">
          <div class="cyd-w-full cyd-ml-3 cyd-flex cyd-flex-col cyd-h-[100%]">
            <div id="cyd-bp-balance-detail-usd" class="cyd-flex cyd-justify-between cyd-h-[25px]">
              <p class="cyd-text-primaryText cyd-text-[18px] cyd-font-semibold">${backendName}</p>
              <p class="cyd-text-primaryText cyd-text-[18px] cyd-font-semibold" id="cyd-bp-balance-detail-usd-value">$${(
                actualBalance * price
              ).toFixed(2)}</p>
            </div>
            <div id="cyd-bp-balance-detail-token" class="cyd-flex cyd-justify-between cyd-h-[25px]">
              <p class="cyd-text-[#929292] cyd-text-[16px] cyd-font-normal">${symbol}</p>
              <p class="cyd-text-[#929292] cyd-text-[16px] cyd-font-normal" id="cyd-bp-balance-detail-token-value">${parseFloat(
                actualBalance
              ).toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cyd-bg-primaryBg cyd-py-5 lg:cyd-py-10 cyd-w-full cyd-flex cyd-items-center cyd-justify-center cyd-rounded-b-[30px]">
        <button class="cyd-bridge-input-submit cyd-bg-[#2081E2] cyd-w-[60%] cyd-py-4 cyd-rounded-lg cyd-text-white cyd-text-[16px] cyd-font-semibold">
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
