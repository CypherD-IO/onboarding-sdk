import _ from "lodash";
import { footer } from "../components/footer";

declare let globalThis: any;

export const infoScreen = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const { requiredTokenDetail } = globalThis;

  const infoScreenHTML = `
    <div
      class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-[90%] lg:cyd-w-[40%] cyd-justify-between cyd-items-center cyd-overflow-auto"
      id="cyd-bridge-info-screen"
    >
      <div class="cyd-bg-primaryBg] cyd-rounded-t-[30px] cyd-p-5 cyd-flex cyd-flex-col cyd-justify-start cyd-items-center cyd-w-full">
        <div class="cyd-flex cyd-justify-end cyd-w-full">
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
        </div>
        <div>
          <h2 class="cyd-font-semibold cyd-text-[28px] cyd-my-5 cyd-text-primaryText cyd-text-center">
            You need to bridge first
          </h2>
        </div>
        <div class="cyd-flex cyd-items-start cyd-justify-evenly cyd-w-[95%] cyd-my-5">
          <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
            <img src="https://public.cypherd.io/assets/dapps/unknownToken.png" class="cyd-w-[42px] cyd-h-[42px]" alt="">
            <p class="cyd-text-[#929292] cyd-font-normal cyd-text-[16px] cyd-text-center cyd-mt-2 cyd-mb-1">Any Token</p>
            <p class="cyd-text-primaryText cyd-font-semibold cyd-text-[18px] cyd-text-center">Any Chain</p>
          </div>
          <div>
            <img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="cyd-w-[100px] cyd-h-[100px]">
          </div>
          <div class="cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-w-[100px]">
            <img src="${_.get(requiredTokenDetail, ["logoUrl"])}"
              class="cyd-w-[42px] cyd-h-[42px]"
              alt="${_.get(requiredTokenDetail, ["name"])}"
              id="cyd-required-token-img"
            >
            <p class="cyd-text-[#929292] cyd-font-normal cyd-text-[16px] cyd-text-center cyd-mt-2 cyd-mb-">
              ${_.get(requiredTokenDetail, ["symbol"])}
            </p>
            <p class="cyd-text-primaryText cyd-font-semibold cyd-text-[18px] cyd-text-center">
              ${_.get(requiredTokenDetail, ["chainDetails", "backendName"])}
            </p>
          </div>
        </div>
        <p class="cyd-text-[20px] cyd-text-primaryText cyd-text-center cyd-mt-[10px]">
          You dont have enough ${_.get(requiredTokenDetail, [
            "symbol",
          ])} in ${_.get(requiredTokenDetail, [
    "chainDetails",
    "backendName",
  ])} chain to use this dApp
        </p>
      </div>
      <div class="cyd-bg-primaryBg cyd-py-5 cyd-w-full cyd-flex cyd-items-center cyd-justify-center cyd-rounded-b-[30px]">
        <button class="cyd-info-screen-continue cyd-bg-[#2081E2] cyd-py-4 cyd-w-[60%] cyd-rounded-lg cyd-text-white cyd-text-[16px] cyd-font-semibold">
          Continue
        </button>
      </div>
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = infoScreenHTML;
};
