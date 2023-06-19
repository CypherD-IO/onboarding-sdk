import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const emptyWallet = (parentElement = document.getElementById("cyd-popup-background")) => {
  const {
    requiredTokenDetail
  } = globalThis;

  const emptyWalletHTML = `
  <div
    id="cyd-empty-wallet-screen"
    class="flex flex-col items-center justify-between max-h-[85%] rounded-[30px] bg-primaryBg w-11/12 lg:w-3/5"
  >
    <div class="flex flex-row justify-end w-[95%] mt-[20px] mx-[30px] bg-primaryBg">
      <img src="https://public.cypherd.io/icons/close_icon.svg" class="close-popup cursor-pointer">
    </div>
    <div class="my-[20px] px-10 lg:px-0 text-center">
      <span class="text-[23px] text-primaryText font-semibold float-left">You need</span>
      <img
        src="${_.get(requiredTokenDetail, ["logoUrl"])}"
        alt="${_.get(requiredTokenDetail, ["name"])} logo"
        class="w-[32px] h-[32px] mx-[8px] float-left rounded-full"
      />
      <span class="text-[23px] text-primaryText font-semibold float-left">
        ${_.get(requiredTokenDetail, ["symbol"]).toUpperCase()} in
      </span>
      <img
        src="https://public.cypherd.io/icons/logos/${_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase()}.png"
        alt="${_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase()} logo"
        class="w-[32px] h-[32px] mx-[8px] float-left rounded-full"
      />
      <span class="text-[23px] text-primaryText font-semibold">
        ${__capitalize(_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase())} chain to use this dApp
      </span>
    </div>
    <div class='w-[100%] flex flex-col justify-center items-center'>
      <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>Insufficient funds to perform this action!</p>
      <img src="https://public.cypherd.io/icons/emptyWallet.png" class="h-[200px] w-[100px] lg:h-[300px] lg:w-[200px]">
    </div>
    ${footer()}
  </div>`;

  if (parentElement) parentElement.innerHTML = emptyWalletHTML;
};
