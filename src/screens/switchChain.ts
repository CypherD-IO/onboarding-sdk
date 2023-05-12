import _ from "lodash";
import { footer } from "../components";
import { addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING } from "../constants/server";

declare let globalThis: any;

// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const switchChain = (parentElement = document.getElementById("popupBackground")) => {
  const switchChainHTML = `
    <div class="rounded-[30px] z-50 m-auto bg-primaryBg w-[90%] lg:w-[30%] justify-between items-center" id="bridge-popup-css">
      <div class=" bg-primaryBg] rounded-t-[30px] p-5 flex flex-col justify-start items-center w-full">
        <div class="flex justify-end w-full ">
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
        </div>
        <div id="bp-heading">
          <h2 class="font-semibold text-[28px] my-5 lg:my-10 text-primaryText text-center">Switch to ${_.get(addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!).chainName} for this exchange</h2>
        </div>
        <div class="flex items-start justify-evenly w-[95%] my-[50px]">
          <div id="bp-switch-chain-container">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.currentChainId)?.toLowerCase()}.png" class="w-[42px] h-[42px]" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.currentChainId)?.toLowerCase()} logo">
            <p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-1">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.currentChainId)!].nativeCurrency.symbol}</p>
            <p class="text-primaryText font-semibold text-[18px] text-center">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.currentChainId)!].chainName}</p>
          </div>
          <div id="bp-switch-icon-container">
            <img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="w-[100px] h-[100px]">
          </div>
          <div id="bp-switch-chain-container">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)?.toLowerCase()}.png" class="w-[42px] h-[42px]" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)?.toLowerCase()} logo">
            <p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!].nativeCurrency.symbol}</p>
            <p class="text-primaryText font-semibold text-[18px] text-center">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!].chainName}</p>
          </div>
        </div>
      </div>

      <div class="bg-primaryBg py-5 lg:py-10 w-full flex items-center justify-center rounded-b-[30px]">
        <button params=${JSON.stringify({chainId: globalThis.exchangingTokenDetail.chainDetails.chain_id})} class="switch-chain-button bg-[#2081E2] py-4 w-[60%] rounded-lg text-white text-[16px] font-semibold">Switch</button>
      </div>
      ${footer()}
    </div>`;

    if (parentElement) parentElement.innerHTML = switchChainHTML;
}
