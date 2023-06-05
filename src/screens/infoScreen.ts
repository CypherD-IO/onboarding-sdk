import _ from "lodash";
import { footer } from "../components/footer";

declare let globalThis: any;

export const infoScreen = (parentElement = document.getElementById("popupBackground")) => {
  const {
    requiredTokenDetail
  } = globalThis;

  const infoScreenHTML = `
    <div
      class="rounded-[30px] z-50 m-auto bg-primaryBg w-[90%] lg:w-[40%] justify-between items-center"
      id="bridge-info"
    >
      <div class="bg-primaryBg] rounded-t-[30px] p-5 flex flex-col justify-start items-center w-full">
        <div class="flex justify-end w-full">
          <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
        </div>
        <div id="bp-heading">
          <h2 class="font-semibold text-[28px] my-5 text-primaryText text-center">
            You need to bridge first
          </h2>
        </div>
        <div class="flex items-start justify-evenly w-[95%] my-5">
          <div id="bp-switch-chain-container">
            <img src="https://public.cypherd.io/assets/dapps/unknownToken.png" class="w-[42px] h-[42px]" alt="">
            <p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-1">Any Token</p>
            <p class="text-primaryText font-semibold text-[18px] text-center">Any Chain</p>
          </div>
          <div id="bp-switch-icon-container">
            <img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="w-[100px] h-[100px]">
          </div>
          <div id="bp-switch-chain-container">
            <img src="${_.get(requiredTokenDetail, ['logoUrl'])}"
              class="w-[42px] h-[42px]"
              alt="${_.get(requiredTokenDetail, ['name'])}"
              id="required-token-img"
            >
            <p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-">
              ${_.get(requiredTokenDetail, ['symbol'])}
            </p>
            <p class="text-primaryText font-semibold text-[18px] text-center">
              ${_.get(requiredTokenDetail, ['chainDetails', 'backendName'])}
            </p>
          </div>
        </div>
        <p class="text-[20px] text-primaryText text-center mt-[10px]">
          You dont have enough ${_.get(requiredTokenDetail, ['symbol'])} in ${_.get(requiredTokenDetail, ['chainDetails', 'backendName'])} chain to use this dApp
        </p>
      </div>
      <div class="bg-primaryBg py-5 w-full flex items-center justify-center rounded-b-[30px]">
        <button class="info-screen-continue bg-[#2081E2] py-4 w-[60%] rounded-lg text-white text-[16px] font-semibold">
          Continue
        </button>
      </div>
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = infoScreenHTML;
};

