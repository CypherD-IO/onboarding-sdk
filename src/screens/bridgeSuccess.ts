import { footer } from "../components";

declare let globalThis: any;

export const bridgeSuccess = (
  switchChain = false,
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const {
    bridgeQuote,
    swapQuoteData,
    requiredTokenDetail,
    exchangingTokenDetail,
  } = globalThis;

  const bridgeSuccessHTML = `
    <p class="text-center text-[18px] text-primaryText mt-[5px] px-10 cyd-lg:px-0">You have ${parseFloat(
      bridgeQuote ? bridgeQuote?.transferAmount : swapQuoteData?.toToken?.amount
    )?.toFixed(6)} ${requiredTokenDetail?.symbol} tokens added in ${
    requiredTokenDetail?.chainDetails?.backendName
  } chain. You can now continue using the dapp.</p>
    <div class=" flex flex-row justify-center px-[50px] items-center w-[100%] mt-[50px] bg-primaryBg">
      <button params=${JSON.stringify({
        triggerCallback: true,
      })} class="cyd-close-popup bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]">OK</button>
    </div>`;

  const switchBackHTML = `
    <p class="text-center text-primaryText text-[18px] mt-[10px] px-10 cyd-lg:px-10">You have added ${bridgeQuote?.transferAmount?.toFixed(
      6
    )} ${requiredTokenDetail?.symbol} tokens in ${
    requiredTokenDetail?.chainDetails?.backendName
  } chain. Switch your network from ${
    exchangingTokenDetail?.chainDetails?.backendName
  } chain, to ${
    requiredTokenDetail?.chainDetails?.backendName
  } chain in order to use ${
    requiredTokenDetail?.chainDetails?.backendName
  } dApps!</p>
    <div id="cyd-bp-switch-container" class="mt-[25px] px-[20px] sm:px-[50px]">
      <div class="flex flex-col justify-center items-center w-[100px]">
        <img src="https://public.cypherd.io/icons/logos/${exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="w-[32px] h-[32] sm:w-[42px] sm:h-[42px] rounded-full" alt="${
    exchangingTokenDetail?.chainDetails?.backendName
  } logo">
        <p class="text-[10px] sm:text-[14px] text-primaryText">${
          exchangingTokenDetail?.symbol
        }</p>
        <p class="text-[14px] sm:text-[16px] text-primaryText font-semibold">${
          exchangingTokenDetail?.chainDetails?.backendName
        }</p>
      </div>
      <div>
        <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="w-[32px] h-[32px] sm:w-[50px] sm:h-[50px]">
      </div>
      <div class="flex flex-col justify-center items-center w-[100px]">
        <img src="https://public.cypherd.io/icons/logos/${requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="w-[32px] h-[32] sm:w-[42px] sm:h-[42px] rounded-full" alt="${requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()} logo">
        <p class="text-[10px] sm:text-[14px] text-primaryText">${
          requiredTokenDetail?.symbol
        }</p>
        <p class="text-[14px] sm:text-[16px] text-primaryText font-semibold">${
          requiredTokenDetail?.chainDetails?.backendName
        }</p>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center w-[100%] mt-[25px] bg-primaryBg px-[50px]">
      <button class="cyd-switch-chain-button cyd-close-popup bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]" params=${JSON.stringify(
        {
          chainId: requiredTokenDetail.chainDetails.chain_id,
          triggerCallback: true,
        }
      )}>Switch</button>
    </div>`;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
    <div id="cyd-bridge-success-screen" class="cyd-maximize-onclick rounded-[30px] pt-[30px] w-full justify-evenly bg-primaryBg overflow-auto">
      <div class="flex flex-col justify-center items-center px-[50px]">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="w-[42px] h-[42px]" alt="successLogo">
        <h2 class="text-[23px] text-primaryText font-semibold mt-[5px]">Congrats</h2>
      </div>
      ${switchChain ? switchBackHTML : bridgeSuccessHTML}
      ${footer()}
    </div>`
      : `<div id="cyd-bridge-success-screen" class="cyd-maximize-onclick rounded-[30px] pt-[30px] w-[90%] cyd-lg:w-[35%] justify-evenly bg-primaryBg overflow-auto">
      <div class="flex flex-col justify-center items-center px-[50px]">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="w-[42px] h-[42px]" alt="successLogo">
        <h2 class="text-[23px] text-primaryText font-semibold mt-[5px]">Congrats</h2>
      </div>
      ${switchChain ? switchBackHTML : bridgeSuccessHTML}
      ${footer()}
    </div>`;
  }
};
