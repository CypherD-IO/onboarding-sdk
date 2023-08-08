import { footer } from "../components";

declare let globalThis: any;

export const portfolioLoading = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const portfolioLoadingHTML = `
      <div class="cyd-flex cyd-flex-1 cyd-flex-col cyd-justify-center cyd-self-center cyd-items-center cyd-px-[30px] cyd-w-[92%]">
          <h2 class="cyd-text-[20px] cyd-text-primaryText cyd-text-center cyd-font-semibold cyd-mt-[40px]">Loading your assets ...</h2>
          <img class="cyd-mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">
      </div>
      ${footer()}
    `;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
      <div id="cyd-portfolio-loading-screen"
        class="cyd-maximize-onclick cyd-flex cyd-flex-col cyd-rounded-[30px] cyd-bg-primaryBg cyd-pt-[25px] cyd-w-full"
      >
        ${portfolioLoadingHTML}
      </div>
      `
      : `
      <div id="cyd-portfolio-loading-screen"
        class="cyd-maximize-onclick cyd-flex cyd-flex-col cyd-rounded-[30px] cyd-bg-primaryBg cyd-pt-[25px] cyd-w-[90%] lg:cyd-w-[30%]"
      >
      <div class="cyd-flex cyd-flex-row cyd-justify-end cyd-items-center cyd-w-full cyd-px-[20px]">
        <div class="cyd-minimize-button cyd-flex cyd-flex-row cyd-justify-center cyd-items-center cyd-px-[5px] cyd-py-[5px] cyd-mr-[15px] cyd-cursor-pointer">
          <img src="https://public.cypherd.io/icons/minimize_icon.png" class="cyd-cursor-pointer cyd-w-[20px] cyd-h-[3px]">
        </div>
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
      </div>
        ${portfolioLoadingHTML}
      </div>
     `;
  }
};
