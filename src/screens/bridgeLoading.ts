import { footer } from "../components";

export const bridgeLoading = (parentElement = document.getElementById("popupBackground")) => {
  const bridgeLoadingHTML = `
    <div id="bridge-loading-container" class="bridge-loading-container flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-[90%] lg:w-[30%]">
      <div class="flex flex-row justify-end items-center w-full px-[20px]">
        <div class="minimize-button flex flex-row justify-center items-center px-[5px] py-[5px] mr-[15px] cursor-pointer">
          <img src="https://public.cypherd.io/icons/minimize_icon.png" class="cursor-pointer w-[20px] h-[3px]">
        </div>
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
      </div>
      <div class="flex flex-1 flex-col justify-center self-center items-center px-[30px] w-[72%]">
          <h2 class="text-[24px] text-primaryText text-center font-semibold mt-[40px]">Transaction submitted</h2>
          <p class="text-[20px] text-primaryText text-center mt-[10px]">Your transaction is being processed. This can take upto 5 mins.</p>
          <p class="text-[20px] text-red text-center mt-[10px]">Please Don't Refresh the page or Close the popup</p>
          <img class="mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">
      </div>
      ${footer()}
    </div>`;

    if (parentElement) parentElement.innerHTML = bridgeLoadingHTML;
}
