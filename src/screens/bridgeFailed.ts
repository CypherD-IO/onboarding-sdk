import { footer } from "../components";

declare let globalThis: any;

export const bridgeFailed = (parentElement = document.getElementById("cyd-popup-background")) => {
  const bridgeFailedHTML = `<div class="maximize-onclick rounded-[30px] pt-[30px] w-[35%] justify-evenly bg-primaryBg">
      <div class="flex justify-end w-full mt-[5px] px-[20px]">
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer close-popup">
      </div>
      <div class="flex flex-col justify-center items-center px-[50px]">
        <img src="https://public.cypherd.io/icons/red_cross.png" alt="redCrossLogo" width="52" height="52">
        <h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Bridge Failed !</h2>
      </div>
      <p class="text-center text-[18px] text-primaryText mt-[5px]">Please Contact <a class="chat-support underline cursor-pointer" >Cypher Support.</a></p>
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = bridgeFailedHTML;
}
