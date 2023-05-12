import { footer } from "../components";

declare let globalThis: any;

export const bridgeSuccess = (switchChain = false, parentElement = document.getElementById("popupBackground")) => {
  const bridgeSuccessHTML = `
    <div id="bridge-popup-css" class="rounded-[30px] pt-[30px] w-[90%] lg:w-[35%] justify-evenly bg-primaryBg">
      <div id="bp-heading" class="flex flex-col justify-center items-center px-[50px]">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="w-[42px] h-[42px]" alt="successLogo">
        <h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Congrats</h2>
      </div>
      <p class="text-center text-[18px] text-primaryText mt-[5px] px-10 lg:px-0">You have ${parseFloat(globalThis.bridgeQuote ? globalThis?.bridgeQuote?.transferAmount : globalThis.swapQuoteData?.toToken?.amount)?.toFixed(6)} ${globalThis?.requiredTokenDetail?.symbol} added in ${globalThis?.requiredTokenDetail?.chainDetails?.backendName}. You can now continue using the dapp.</p>
      <div class=" flex flex-row justify-center px-[50px] items-center w-[100%] mt-[50px] bg-primaryBg">
        <button params=${JSON.stringify({triggerCallback: true})} class="close-popup bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]">OK</button>
      </div>
      ${footer()}
    </div>`;

  const switchBackHTML = `
    <div id="bridge-popup-css" class="rounded-[30px] pt-[30px] w-[90%] lg:w-[35%] justify-evenly bg-primaryBg">
      <div id="bp-heading" class="px-[50px] flex flex-col justify-center items-center">
        <img src="https://public.cypherd.io/icons/logos/success.png" class="w-[42px] h-[42px]" alt="successLogo">
        <h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Congrats</h2>
      </div>
      <p class="text-center text-primaryText text-[18px] mt-[5px] px-20 lg:px-0">You have ${(globalThis?.bridgeQuote?.transferAmount)?.toString()} ${globalThis?.requiredTokenDetail?.symbol} added in ${globalThis?.requiredTokenDetail?.chainDetails?.backendName}. You can now use dapp. Switch chain back to ${globalThis?.requiredTokenDetail?.chainDetails?.backendName}</p>
      <div id="bp-switch-container" class="mt-[5px] px-[50px]">
        <div id="bp-switch-chain-container">
          <img src="https://public.cypherd.io/icons/logos/${globalThis?.exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="w-[42px] h-[42px]" alt="${globalThis?.exchangingTokenDetail?.chainDetails?.backendName} logo">
          <p class="text-[14px] text-primaryText">${globalThis?.exchangingTokenDetail?.symbol}</p>
          <p class="text-[16px] text-primaryText font-semibold">${globalThis?.exchangingTokenDetail?.chainDetails?.backendName}</p>
        </div>
        <div id="bp-switch-icon-container">
          <img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="w-[120px] h-[120px]">
        </div>
        <div id="bp-switch-chain-container">
          <img src="https://public.cypherd.io/icons/logos/${globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" class="w-[42px] h-[42px]" alt="${globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase()} logo">
          <p class="text-[14px] text-primaryText">${globalThis?.requiredTokenDetail?.symbol}</p>
          <p class="text-[16px] text-primaryText font-semibold">${globalThis?.requiredTokenDetail?.chainDetails?.backendName}</p>
        </div>
      </div>
      <div class="flex flex-row justify-center items-center w-[100%] mt-[10px] bg-primaryBg px-[50px]">
        <button class="switch-chain-button close-popup bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]" params=${JSON.stringify({chainId: globalThis.requiredTokenDetail.chainDetails.chain_id, triggerCallback: true})}>Switch</button>
      </div>
      ${footer()}
    </div>`;

  if (parentElement) {
    parentElement.innerHTML = switchChain ? switchBackHTML : bridgeSuccessHTML;
  }
}
