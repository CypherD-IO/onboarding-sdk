import { footer } from "../components";

declare let globalThis: any;

export const bridgeLoading = (parentElement = document.getElementById("cyd-popup-background")) => {
  const bridgeLoadingHTML = `
      <div class="flex flex-1 flex-col justify-center self-center items-center px-[30px] w-[72%]">
          <h2 class="text-[24px] text-primaryText text-center font-semibold mt-[40px]">Transaction submitted</h2>
          <p class="text-[20px] text-primaryText text-center mt-[10px]">Your transaction is being processed. This can take upto 5 mins.</p>
          <p class="text-[20px] text-primaryText text-center mt-[10px]">Please do not go back or refresh</p>
          <img class="mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">
      </div>`;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId ?
      `
      <div id="cyd-bridge-loading-screen" class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-full">
        <div id="cyd-bridge-loading-screen" class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-full">
          ${bridgeLoadingHTML}
          ${footer()}
        </div>
      </div>
    ` :
      `
      <div id="cyd-bridge-loading-screen" class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-[90%] lg:w-[30%]">
        <div id="cyd-bridge-loading-screen" class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-full">
          <div class="flex flex-row justify-end items-center w-full px-[20px]">
            <div class="cyd-minimize-button flex flex-row justify-center items-center px-[5px] py-[5px] mr-[15px] cursor-pointer">
              <img src="https://public.cypherd.io/icons/minimize_icon.png" class="cursor-pointer w-[20px] h-[3px]">
            </div>
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
          </div>
          ${bridgeLoadingHTML}
          ${footer()}
        </div>
      </div>
    `
      ;
  }
}
