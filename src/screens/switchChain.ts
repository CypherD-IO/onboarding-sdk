import _ from "lodash";
import { footer } from "../components";
import {
  addChainData,
  CHAIN_ID_HEX_TO_ENUM_MAPPING,
} from "../constants/server";
import { bridgeInput, exchangeWidget } from ".";

declare let globalThis: any;

// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-cursor-pointer"/>'+
export const switchChain = (
  parentElement = document.getElementById("cyd-popup-background"),
  previousPage = globalThis.cypherWalletDetails.parentComponentId
    ? exchangeWidget
    : bridgeInput
) => {
  const {
    exchangingTokenDetail: {
      chainDetails: { chain_id },
    },
    currentChainId,
  } = globalThis;
  const switchChainHTML = `
      <div class=" cyd-bg-primaryBg cyd-rounded-t-[30px] cyd-p-2 md:cyd-p-5 cyd-flex cyd-flex-col cyd-justify-start cyd-items-center cyd-w-full cyd-overflow-auto">
        <div class="cyd-flex cyd-justify-between cyd-w-full cyd-px-[20px] cyd-mt-[20px]">
          <img src="https://public.cypherd.io/icons/back_arrow.svg" class="cyd-back-button cyd-cursor-pointer"/>
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
        </div>
        <div>
          <h2 class="cyd-font-semibold cyd-text-[18px] md:cyd-text-[24px] lg:cyd-text-[28px] cyd-leading-normal cyd-my-3 md:cyd-my-5 lg:cyd-my-10 cyd-text-primaryText cyd-text-center">Switch to ${
            _.get(addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!)
              .chainName
          } for this exchange</h2>
        </div>
        <div class="cyd-flex cyd-items-center cyd-justify-evenly cyd-w-[75%] cyd-my-[15px] md:cyd-my-[30px]">
          <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(
              currentChainId
            )?.toLowerCase()}.png" class="cyd-w-[42px] cyd-h-[42px] cyd-rounded-full" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(
    currentChainId
  )?.toLowerCase()} logo">
            <p class="cyd-text-[#929292] cyd-font-normal cyd-text-[12px] md:cyd-text-[16px] cyd-text-center cyd-mt-2">${
              addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)!]
                .nativeCurrency.symbol
            }</p>
            <p class="cyd-text-primaryText cyd-font-semibold cyd-mt-[2px] md:cyd-mt-[5px] cyd-text-[14px] md:cyd-text-[18px] cyd-text-center">${
              addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(currentChainId)!]
                .chainName
            }</p>
          </div>
          <div>
            <img src="https://public.cypherd.io/icons/logos/switch_chain.png" alt="switch icon" class="cyd-w-[35px] cyd-h-[35px] md:cyd-w-[50px] md:cyd-h-[50px]">
          </div>
          <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
            <img src="https://public.cypherd.io/icons/logos/${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(
              chain_id
            )?.toLowerCase()}.png" class="cyd-w-[42px] cyd-h-[42px] cyd-rounded-full" alt="${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(
    chain_id
  )?.toLowerCase()} logo">
            <p class="cyd-text-[#929292] cyd-font-normal cyd-text-[12px] md:cyd-text-[16px] cyd-text-center cyd-mt-2">${
              addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!]
                .nativeCurrency.symbol
            }</p>
            <p class="cyd-text-primaryText cyd-font-semibold cyd-mt-[2px] md:cyd-mt-[5px] cyd-text-[14px] md:cyd-text-[18px] cyd-text-center">${
              addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!]
                .chainName
            }</p>
          </div>
        </div>
      </div>

      <div class="cyd-bg-primaryBg cyd-py-[2] md:cyd-py-5 lg:cyd-py-10 cyd-w-full cyd-flex cyd-items-center cyd-justify-center cyd-rounded-b-[30px]">
        <button params=${JSON.stringify({
          chainId: chain_id,
        })} class="cyd-switch-chain-button cyd-bg-[#2081E2] cyd-py-4 cyd-w-[60%] cyd-rounded-lg cyd-text-white cyd-text-[16px] cyd-font-semibold">Switch</button>
      </div>
      ${footer()}
    `;

  globalThis.previousPage = previousPage;
  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? `
      <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-full cyd-justify-between cyd-items-center" id="cyd-switch-chain-screen">
        ${switchChainHTML}
      </div>
    `
      : `
      <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-[90%] md:cyd-w-[70%] lg:cyd-w-[50%] cyd-justify-between cyd-items-center" id="cyd-switch-chain-screen">
        ${switchChainHTML}
      </div>
    `;
  }
};
