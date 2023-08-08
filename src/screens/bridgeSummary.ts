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
      <div class="mt-[20px] mb-[50px]">
        <h2 class="text-[25px] text-primaryText font-bold">Summary</h2>
      </div>

      <div class='relative w-[85%] cyd-md:w-[65%]'>
        <div class="flex flex-col items-center border-[1px] border-borderColor rounded-t-[10px]">
          <div class="cyd-bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg rounded-t-[10px]">
            <p class="w-[20%] text-[12px] cyd-md:text-[14px] text-primaryText font-semibold">You Send</p>
            <div class="flex flex-row items-center w-[40%]">
              <div class="relative w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] cyd-lg:w-[38px] cyd-lg:h-[38px] overflow-visible">
                <img src="${exchangingTokenDetail.logoUrl}" alt="${
    exchangingTokenDetail.name
  } logo" class="object-cover rounded-full w-full h-full" id="cyd-from-chain-img">
                <div class="absolute bottom-[-3px] right-[-5px]">
                  <div class="rounded-full w-[12px] h-[12px] cyd-md:w-[16px] cyd-md:w-[16px] cyd-lg:w-[20px] cyd-lg:h-[20px] overflow-visible bg-white p-[1px]">
                    <img src="https://public.cypherd.io/icons/logos/${exchangingTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${exchangingTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="object-cover rounded-full w-full h-full" id="cyd-from-token-img">
                  </div>
                </div>
              </div>
              <div class="ml-[10px]">
                <p class="text-[12px] cyd-md:text-[14px] cyd-lg:text-[16px] text-primaryText font-bold mb-[4px]">${
                  exchangingTokenDetail.name
                }</h1>
                <p class="text-[8px] cyd-md:text-[10px] cyd-lg:text-[12px] text-primaryText">${
                  exchangingTokenDetail.chainDetails.backendName
                }</p>
              </div>
            </div>
            <div class="w-[40%]">
              <p class="text-[10px] cyd-md:text-[14px] text-primaryText">${parseFloat(
                tokenValueEntered
              ).toFixed(6)} ${exchangingTokenDetail.symbol}</p>
              <p class="text-[12px] cyd-md:text-[14px] text-primaryText">$${parseFloat(
                usdValueEntered
              ).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div class='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="w-[35px] h-[35px] rotate-90">
        </div>

        <div class="flex flex-col items-center border-[1px] border-borderColor rounded-b-[10px]">
          <div class="cyd-bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg rounded-b-[10px]">
            <p class="w-[20%] text-[12px] cyd-md:text-[14px] text-primaryText font-semibold">You Receive</p>
            <div class="flex flex-row items-center w-[40%]">
              <div class="relative w-[24px] h-[24px] cyd-md:w-[32px] cyd-md:h-[32px] cyd-lg:w-[38px] cyd-lg:h-[38px] overflow-visible">
                <img src="${requiredTokenDetail.logoUrl}" alt="${
    requiredTokenDetail.name
  } logo" class="object-cover rounded-full w-full h-full" id="cyd-to-chain-img">
                <div class="absolute bottom-[-3px] right-[-5px]">
                  <div class="rounded-full w-[12px] h-[12px] cyd-md:w-[16px] cyd-md:w-[16px] cyd-lg:w-[20px] cyd-lg:h-[20px] overflow-visible bg-white p-[1px]">
                    <img src="https://public.cypherd.io/icons/logos/${requiredTokenDetail.chainDetails.backendName.toLowerCase()}.png" alt="${requiredTokenDetail.chainDetails.backendName.toLowerCase()} logo" class="object-cover rounded-full w-full h-full" id="cyd-to-token-img">
                  </div>
                </div>
              </div>
              <div class="ml-[10px]">
                <p class="text-[12px] cyd-md:text-[14px] cyd-lg:text-[16px] text-primaryText font-bold mb-[4px]">${
                  requiredTokenDetail.name
                }</h1>
                <p class="text-[8px] cyd-md:text-[10px] cyd-lg:text-[12px] text-primaryText">${
                  requiredTokenDetail.chainDetails.backendName
                }</p>
              </div>
            </div>
            <div class="w-[40%]">
              <p id="cyd-token-received" class="text-[10px] cyd-md:text-[14px] text-primaryText"> ... ${
                requiredTokenDetail.symbol
              }</p>
              <p id="cyd-usd-received" class="text-[12px] cyd-md:text-[14px] text-primaryText">$ ... </p>
            </div>
          </div>
        </div>
      </div>
      <div class=" flex flex-row justify-center items-center w-[100%] mt-[50px]">
        <button disabled id="cyd-bridge-submit-button" class="cyd-bridge-submit-button cyd-blue-button cyd-disabled-button bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]">Exchange</button>
      </div>
      ${footer()}
      `;

  globalThis.previousPage = previousPage;
  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
        <div class="flex flex-col justify-evenly items-center w-full m-auto bg-primaryBg rounded-[30px] overflow-auto" id="cyd-bridge-summary-screen">
          <div class="flex justify-between w-full px-[20px] mt-[20px]">
            <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cursor-pointer"/>
          </div>
          ${bridgeSummaryHTML}
        </div>
      `
      : `
        <div class="flex flex-col justify-evenly items-center w-[90%] cyd-lg:w-[50%] m-auto bg-primaryBg rounded-[30px] overflow-auto" id="cyd-bridge-summary-screen">
          <div class="flex justify-between w-full px-[20px] mt-[20px]">
            <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cursor-pointer"/>
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
          </div>
          ${bridgeSummaryHTML}
        </div>
      `;
  }
};
