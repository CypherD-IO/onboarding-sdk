import { footer } from "../components";

declare let globalThis: any;

export const bridgeFailed = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const bridgeFailedHTML = `<div class="cyd-maximize-onclick cyd-rounded-[30px] cyd-pt-[30px] cyd-w-[35%] cyd-justify-evenly cyd-bg-primaryBg cyd-overflow-auto">
      <div class="cyd-flex cyd-justify-end cyd-w-full cyd-mt-[5px] cyd-px-[20px]">
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-cursor-pointer cyd-close-popup">
      </div>
      <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-px-[50px]">
        <img src="https://public.cypherd.io/icons/red_cross.png" alt="redCrossLogo" width="52" height="52">
        <h2 class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-mt-[3px]">Bridge Failed !</h2>
      </div>
      <p class="cyd-text-center cyd-text-[18px] cyd-text-primaryText cyd-mt-[5px]">Please Contact <a class="cyd-chat-support cyd-underline cyd-cursor-pointer" >Cypher Support.</a></p>
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = bridgeFailedHTML;
};
