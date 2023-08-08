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
    <p class="cyd-text-center cyd-text-[18px] cyd-text-primaryText cyd-mt-[5px] cyd-px-10 lg:cyd-px-0">You have ${parseFloat(
      bridgeQuote ? bridgeQuote?.transferAmount : swapQuoteData?.toToken?.amount
    )?.toFixed(6)} ${requiredTokenDetail?.symbol} tokens added in ${
    requiredTokenDetail?.chainDetails?.backendName
  } chain. You can now continue using the dapp.</p>
    <div class=" cyd-flex cyd-flex-row cyd-justify-center cyd-px-[50px] cyd-items-center cyd-w-[100%] cyd-mt-[50px] cyd-bg-primaryBg">
      <button params=${JSON.stringify({
        triggerCallback: true,
      })} class="cyd-close-popup cyd-bg-[#2081E2] cyd-text-[16px] cyd-font-semibold cyd-border-none cyd-text-white cyd-py-4 cyd-w-[60%] cyd-rounded-[3px]">OK</button>
    </div>`;

  const switchBackHTML = `
    <p class="cyd-text-center cyd-text-primaryText cyd-text-[18px] cyd-mt-[10px] cyd-px-10 lg:cyd-px-10">You have added ${bridgeQuote?.transferAmount?.toFixed(
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
    <div id="cyd-bp-switch-container" class="cyd-mt-[25px] cyd-px-[20px] cyd-sm:px-[50px]">
      <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
        <img src="https://public.cypherd.io/icons/logos/${exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="cyd-w-[32px] cyd-h-[32] cyd-sm:w-[42px] cyd-sm:h-[42px] cyd-rounded-full" alt="${
    exchangingTokenDetail?.chainDetails?.backendName
  } logo">
        <p class="cyd-text-[10px] cyd-sm:text-[14px] cyd-text-primaryText">${
          exchangingTokenDetail?.symbol
        }</p>
        <p class="cyd-text-[14px] cyd-sm:text-[16px] cyd-text-primaryText cyd-font-semibold">${
          exchangingTokenDetail?.chainDetails?.backendName
        }</p>
      </div>
      <div>
        <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="cyd-w-[32px] cyd-h-[32px] cyd-sm:w-[50px] cyd-sm:h-[50px]">
      </div>
      <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
        <img src="https://public.cypherd.io/icons/logos/${requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="cyd-w-[32px] cyd-h-[32] cyd-sm:w-[42px] cyd-sm:h-[42px] cyd-rounded-full" alt="${requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()} logo">
        <p class="cyd-text-[10px] cyd-sm:text-[14px] cyd-text-primaryText">${
          requiredTokenDetail?.symbol
        }</p>
        <p class="cyd-text-[14px] cyd-sm:text-[16px] cyd-text-primaryText cyd-font-semibold">${
          requiredTokenDetail?.chainDetails?.backendName
        }</p>
      </div>
    </div>
    <div class="cyd-flex cyd-flex-row cyd-justify-center cyd-items-center cyd-w-[100%] cyd-mt-[25px] cyd-bg-primaryBg cyd-px-[50px]">
      <button class="cyd-switch-chain-button cyd-close-popup cyd-bg-[#2081E2] cyd-text-[16px] cyd-font-semibold cyd-border-none cyd-text-white cyd-py-4 cyd-w-[60%] cyd-rounded-[3px]" params=${JSON.stringify(
        {
          chainId: requiredTokenDetail.chainDetails.chain_id,
          triggerCallback: true,
        }
      )}>Switch</button>
    </div>`;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
    <div id="cyd-bridge-success-screen" class="cyd-maximize-onclick cyd-rounded-[30px] cyd-pt-[30px] cyd-w-full cyd-justify-evenly cyd-bg-primaryBg cyd-overflow-auto">
      <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-px-[50px]">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="cyd-w-[42px] cyd-h-[42px]" alt="successLogo">
        <h2 class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-mt-[5px]">Congrats</h2>
      </div>
      ${switchChain ? switchBackHTML : bridgeSuccessHTML}
      ${footer()}
    </div>`
      : `<div id="cyd-bridge-success-screen" class="cyd-maximize-onclick cyd-rounded-[30px] cyd-pt-[30px] cyd-w-[90%] lg:cyd-w-[35%] cyd-justify-evenly cyd-bg-primaryBg cyd-overflow-auto">
      <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-px-[50px]">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="cyd-w-[42px] cyd-h-[42px]" alt="successLogo">
        <h2 class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-mt-[5px]">Congrats</h2>
      </div>
      ${switchChain ? switchBackHTML : bridgeSuccessHTML}
      ${footer()}
    </div>`;
  }
};
