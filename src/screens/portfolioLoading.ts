import { footer } from "../components";

declare let globalThis: any;

export const portfolioLoading = (parentElement = document.getElementById("cyd-popup-background")) => {
  const portfolioLoadingHTML = `
      <div class="flex flex-1 flex-col justify-center self-center items-center px-[30px] w-[92%]">
          <h2 class="text-[20px] text-primaryText text-center font-semibold mt-[40px]">Loading your assets ...</h2>
          <img class="mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">
      </div>
      ${footer()}
    `;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId ?
      `
      <div id="cyd-portfolio-loading-screen"
        class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-full"
      >
        ${portfolioLoadingHTML}
      </div>
      `
      : `
      <div id="cyd-portfolio-loading-screen"
        class="cyd-maximize-onclick flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-[90%] lg:w-[30%]"
      >
      <div class="flex flex-row justify-end items-center w-full px-[20px]">
        <div class="cyd-minimize-button flex flex-row justify-center items-center px-[5px] py-[5px] mr-[15px] cursor-pointer">
          <img src="https://public.cypherd.io/icons/minimize_icon.png" class="cursor-pointer w-[20px] h-[3px]">
        </div>
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
      </div>
        ${portfolioLoadingHTML}
      </div>
     `;
  }
}
