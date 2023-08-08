import { bridgeInput, exchangeWidget } from ".";
import { footer } from "../components";

declare let globalThis: any;

export const bridgeSummary = (
  parentElement = document.getElementById("cyd-popup-background"),
  previousPage = globalThis.cypherWalletDetails.parentComponentId
    ? exchangeWidget
    : bridgeInput
) => {
  const {
    exchangingTokenDetail,
    requiredTokenDetail,
    bridgeInputDetails: { tokenValueEntered, usdValueEntered },
  } = globalThis;

  const bridgeSummaryHTML = `
      <div class="cyd-mt-[20px] cyd-mb-[50px]">
        <h2 class="cyd-text-[25px] cyd-text-primaryText cyd-font-bold">Summary</h2>
      </div>

      <div class="cyd-relative cyd-w-[85%] md:cyd-w-[65%]">
        <div class="cyd-flex cyd-flex-col cyd-items-center cyd-border-[1px] cyd-border-borderColor cyd-rounded-t-[10px]">
          <div class="cyd-bp-summary-row cyd-exchange-row cyd-py-[15px] cyd-px-[10px] cyd-bg-secondaryBg cyd-rounded-t-[10px]">
            <p class="cyd-w-[20%] cyd-text-[12px] md:cyd-text-[14px] cyd-text-primaryText cyd-font-semibold">You Send</p>
            <div class="cyd-flex cyd-flex-row cyd-items-center cyd-w-[40%]">
              <div class="cyd-relative cyd-w-[24px] cyd-h-[24px] cyd-sm:w-[32px] cyd-sm:h-[32px] lg:cyd-w-[38px] lg:cyd-h-[38px] cyd-overflow-visible">
                <img src="${exchangingTokenDetail.logoUrl}" alt="${
    exchangingTokenDetail.name
  } logo" class="cyd-object-cover cyd-rounded-full cyd-w-full cyd-h-full" id="cyd-from-chain-img">
                <div class="cyd-absolute cyd-bottom-[-3px] cyd-right-[-5px]">
                  <div class="cyd-rounded-full cyd-w-[12px] cyd-h-[12px] md:cyd-w-[16px] md:cyd-w-[16px] lg:cyd-w-[20px] lg:cyd-h-[20px] cyd-overflow-visible cyd-bg-white cyd-p-[1px]">
                    <img src="https://public.cypherd.io/icons/logos/${exchangingTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${exchangingTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="cyd-object-cover cyd-rounded-full cyd-w-full cyd-h-full" id="cyd-from-token-img">
                  </div>
                </div>
              </div>
              <div class="cyd-ml-[10px]">
                <p class="cyd-text-[12px] md:cyd-text-[14px] lg:cyd-text-[16px] cyd-text-primaryText cyd-font-bold cyd-mb-[4px]">${
                  exchangingTokenDetail.name
                }</h1>
                <p class="cyd-text-[8px] md:cyd-text-[10px] lg:cyd-text-[12px] cyd-text-primaryText">${
                  exchangingTokenDetail.chainDetails.backendName
                }</p>
              </div>
            </div>
            <div class="cyd-w-[40%]">
              <p class="cyd-text-[10px] md:cyd-text-[14px] cyd-text-primaryText">${parseFloat(
                tokenValueEntered
              ).toFixed(6)} ${exchangingTokenDetail.symbol}</p>
              <p class="cyd-text-[12px] md:cyd-text-[14px] cyd-text-primaryText">$${parseFloat(
                usdValueEntered
              ).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div class="cyd-absolute cyd-left-1/2 cyd-top-1/2 cyd-transform cyd--translate-x-1/2 cyd--translate-y-1/2">
          <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="cyd-w-[35px] cyd-h-[35px] cyd-rotate-90">
        </div>

        <div class="cyd-flex cyd-flex-col cyd-items-center cyd-border-[1px] cyd-border-borderColor cyd-rounded-b-[10px]">
          <div class="cyd-bp-summary-row cyd-exchange-row cyd-py-[15px] cyd-px-[10px] cyd-bg-secondaryBg cyd-rounded-b-[10px]">
            <p class="cyd-w-[20%] cyd-text-[12px] md:cyd-text-[14px] cyd-text-primaryText cyd-font-semibold">You Receive</p>
            <div class="cyd-flex cyd-flex-row cyd-items-center cyd-w-[40%]">
              <div class="cyd-relative cyd-w-[24px] cyd-h-[24px] md:cyd-w-[32px] md:cyd-h-[32px] lg:cyd-w-[38px] lg:cyd-h-[38px] cyd-overflow-visible">
                <img src="${requiredTokenDetail.logoUrl}" alt="${
    requiredTokenDetail.name
  } logo" class="cyd-object-cover cyd-rounded-full cyd-w-full cyd-h-full" id="cyd-to-chain-img">
                <div class="cyd-absolute cyd-bottom-[-3px] cyd-right-[-5px]">
                  <div class="cyd-rounded-full cyd-w-[12px] cyd-h-[12px] md:cyd-w-[16px] md:cyd-w-[16px] lg:cyd-w-[20px] lg:cyd-h-[20px] cyd-overflow-visible cyd-bg-white cyd-p-[1px]">
                    <img src="https://public.cypherd.io/icons/logos/${requiredTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${requiredTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="cyd-object-cover cyd-rounded-full cyd-w-full cyd-h-full" id="cyd-to-token-img">
                  </div>
                </div>
              </div>
              <div class="cyd-ml-[10px]">
                <p class="cyd-text-[12px] md:cyd-text-[14px] lg:cyd-text-[16px] cyd-text-primaryText cyd-font-bold cyd-mb-[4px]">${
                  requiredTokenDetail.name
                }</h1>
                <p class="cyd-text-[8px] md:cyd-text-[10px] lg:cyd-text-[12px] cyd-text-primaryText">${
                  requiredTokenDetail.chainDetails.backendName
                }</p>
              </div>
            </div>
            <div class="cyd-w-[40%]">
              <p id="cyd-token-received" class="cyd-text-[10px] md:cyd-text-[14px] cyd-text-primaryText"> ... ${
                requiredTokenDetail.symbol
              }</p>
              <p id="cyd-usd-received" class="cyd-text-[12px] md:cyd-text-[14px] cyd-text-primaryText">$ ... </p>
            </div>
          </div>
        </div>
      </div>
      <div class=" cyd-flex cyd-flex-row cyd-justify-center cyd-items-center cyd-w-[100%] cyd-mt-[50px]">
        <button disabled id="cyd-bridge-submit-button" class="cyd-bridge-submit-button cyd-blue-button cyd-disabled-button cyd-bg-[#2081E2] cyd-text-[16px] cyd-font-semibold cyd-border-none cyd-text-white cyd-py-4 cyd-w-[60%] cyd-rounded-[3px]">Exchange</button>
      </div>
      ${footer()}
      `;

  globalThis.previousPage = previousPage;
  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
        <div class="cyd-flex cyd-flex-col cyd-justify-evenly cyd-items-center cyd-w-full cyd-m-auto cyd-bg-primaryBg cyd-rounded-[30px] cyd-overflow-auto" id="cyd-bridge-summary-screen">
          <div class="cyd-flex cyd-justify-between cyd-w-full cyd-px-[20px] cyd-mt-[20px]">
            <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cyd-cursor-pointer"/>
          </div>
          ${bridgeSummaryHTML}
        </div>
      `
      : `
        <div class="cyd-flex cyd-flex-col cyd-justify-evenly cyd-items-center cyd-w-[90%] lg:cyd-w-[50%] cyd-m-auto cyd-bg-primaryBg cyd-rounded-[30px] cyd-overflow-auto" id="cyd-bridge-summary-screen">
          <div class="cyd-flex cyd-justify-between cyd-w-full cyd-px-[20px] cyd-mt-[20px]">
            <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cyd-cursor-pointer"/>
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
          </div>
          ${bridgeSummaryHTML}
        </div>
      `;
  }
};
