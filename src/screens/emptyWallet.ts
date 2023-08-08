import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const emptyWallet = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const { requiredTokenDetail } = globalThis;

  const emptyWalletHTML = `
    <div class=" bg-primaryBg rounded-t-[30px] p-2 cyd-md:p-5 flex flex-col justify-start items-center w-full overflow-auto">
      <div class="my-[20px] px-10 cyd-lg:px-0 text-center">
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
          src="https://public.cypherd.io/icons/logos/${_.get(
            requiredTokenDetail,
            ["chainDetails", "backendName"]
          ).toLowerCase()}.png"
          alt="${_.get(requiredTokenDetail, [
            "chainDetails",
            "backendName",
          ]).toLowerCase()} logo"
          class="w-[32px] h-[32px] mx-[8px] float-left rounded-full"
        />
        <span class="text-[23px] text-primaryText font-semibold">
          ${__capitalize(
            _.get(requiredTokenDetail, [
              "chainDetails",
              "backendName",
            ]).toLowerCase()
          )} chain to use this dApp
        </span>
      </div>
      <div class='w-[100%] flex flex-col justify-center items-center'>
        <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>Insufficient funds to perform this action!</p>
        <img src="https://public.cypherd.io/icons/emptyWallet.png" class="h-[200px] w-[100px] cyd-lg:h-[300px] cyd-lg:w-[200px]">
      </div>
    </div>
    ${footer()}
  `;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? ` <div class="rounded-[30px] z-50 m-auto bg-primaryBg w-full justify-between items-center" id="cyd-empty-wallet-screen">
          ${emptyWalletHTML}
        </div>
      `
      : `
        <div class="rounded-[30px] z-50 m-auto bg-primaryBg w-[90%] cyd-md:w-[70%] cyd-lg:w-[50%] justify-between items-center" id="cyd-empty-wallet-screen">
          <div class="flex flex-row justify-end w-[95%] mt-[20px] bg-primaryBg">
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cursor-pointer">
          </div>
          ${emptyWalletHTML}
        </div>
      `;
  }
};
