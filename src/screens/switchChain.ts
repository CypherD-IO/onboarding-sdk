import _ from "lodash";
import { footer } from "../components";
import { addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING } from "../constants/server";
import { bridgeInput, exchangeWidget } from ".";

declare let globalThis: any;

// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const switchChain = (parentElement = document.getElementById("cyd-popup-background"), previousPage = globalThis.cypherWalletDetails.parentComponentId ? exchangeWidget : bridgeInput) => {
  const {
    exchangingTokenDetail: {
      chainDetails: {
        chain_id
      },
    },
    currentChainId
  } = globalThis;
  const switchChainHTML = `
      <div class=" bg-primaryBg rounded-t-[30px] p-2 md:p-5 flex flex-col justify-start items-center w-full">
        <div class="flex justify-between w-full px-[20px] mt-[20px]">
          <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cursor-pointer"/>
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
        </div>
        <div>
          <h2 class="font-semibold text-[18px] md:text-[24px] lg:text-[28px] leading-normal my-3 md:my-5 lg:my-10 text-primaryText text-center">Switch to ${_.get(addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!).chainName} for this exchange</h2>
        </div>
        <div class="flex items-center justify-evenly w-[75%] my-[15px] md:my-[30px]">
          <div class="flex flex-col justify-center items-center w-[100px]">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)?.toLowerCase()}.png" class="w-[42px] h-[42px] rounded-full" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)?.toLowerCase()} logo">
            <p class="text-[#929292] font-normal text-[12px] md:text-[16px] text-center mt-2">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)!].nativeCurrency.symbol}</p>
            <p class="text-primaryText font-semibold mt-[2px] md:mt-[5px] text-[14px] md:text-[18px] text-center">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)!].chainName}</p>
          </div>
          <div>
            <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
          </div>
          <div class="flex flex-col justify-center items-center w-[100px]">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)?.toLowerCase()}.png" class="w-[42px] h-[42px] rounded-full" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)?.toLowerCase()} logo">
            <p class="text-[#929292] font-normal text-[12px] md:text-[16px] text-center mt-2">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].nativeCurrency.symbol}</p>
            <p class="text-primaryText font-semibold mt-[2px] md:mt-[5px] text-[14px] md:text-[18px] text-center">${addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].chainName}</p>
          </div>
        </div>
      </div>

      <div class="bg-primaryBg py-[2] md:py-5 lg:py-10 w-full flex items-center justify-center rounded-b-[30px]">
        <button params=${JSON.stringify({ chainId: chain_id })} class="cyd-switch-chain-button bg-[#2081E2] py-4 w-[60%] rounded-lg text-white text-[16px] font-semibold">Switch</button>
      </div>
      ${footer()}
    `;

  globalThis.previousPage = previousPage;
  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId ? `
      <div class="rounded-[30px] z-50 m-auto bg-primaryBg w-full justify-between items-center" id="cyd-switch-chain-screen">
        ${switchChainHTML}
      </div>
    `
      : `
      <div class="rounded-[30px] z-50 m-auto bg-primaryBg w-[90%] md:w-[70%] lg:w-[50%] justify-between items-center" id="cyd-switch-chain-screen">
        ${switchChainHTML}
      </div>
    `;
  }
}
