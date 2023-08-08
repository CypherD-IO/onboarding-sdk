import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const emptyWallet = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const { requiredTokenDetail } = globalThis;

  const emptyWalletHTML = `
    <div class=" cyd-bg-primaryBg cyd-rounded-t-[30px] cyd-p-2 md:cyd-p-5 cyd-flex cyd-flex-col cyd-justify-start cyd-items-center cyd-w-full cyd-overflow-auto">
      <div class="cyd-my-[20px] cyd-px-10 lg:cyd-px-0 cyd-text-center">
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-float-left">You need</span>
        <img
          src="${_.get(requiredTokenDetail, ["logoUrl"])}"
          alt="${_.get(requiredTokenDetail, ["name"])} logo"
          class="cyd-w-[32px] cyd-h-[32px] cyd-mx-[8px] cyd-float-left cyd-rounded-full"
        />
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-float-left">
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
          class="cyd-w-[32px] cyd-h-[32px] cyd-mx-[8px] cyd-float-left cyd-rounded-full"
        />
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold">
          ${__capitalize(
            _.get(requiredTokenDetail, [
              "chainDetails",
              "backendName",
            ]).toLowerCase()
          )} chain to use this dApp
        </span>
      </div>
      <div class="cyd-w-[100%] cyd-flex cyd-flex-col cyd-justify-center cyd-items-center">
        <p class="cyd-text-[16px] cyd-text-primaryText cyd-font-semibold cyd-mb-[20px]">Insufficient funds to perform this action!</p>
        <img src="https://public.cypherd.io/icons/emptyWallet.png" class="cyd-h-[200px] cyd-w-[100px] lg:cyd-h-[300px] lg:cyd-w-[200px]">
      </div>
    </div>
    ${footer()}
  `;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? ` <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-full cyd-justify-between cyd-items-center" id="cyd-empty-wallet-screen">
          ${emptyWalletHTML}
        </div>
      `
      : `
        <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-[90%] md:cyd-w-[70%] lg:cyd-w-[50%] cyd-justify-between cyd-items-center" id="cyd-empty-wallet-screen">
          <div class="cyd-flex cyd-flex-row cyd-justify-end cyd-w-[95%] cyd-mt-[20px] cyd-bg-primaryBg">
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
          </div>
          ${emptyWalletHTML}
        </div>
      `;
  }
};
