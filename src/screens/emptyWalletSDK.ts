import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const emptyWalletSDK = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const { requiredTokenDetail } = globalThis;

  const emptyWalletHTML = `
    <div class=" cyd-bg-primaryBg cyd-rounded-t-[30px] cyd-p-2 md:cyd-p-5 cyd-flex cyd-flex-col cyd-justify-start cyd-items-center cyd-w-full cyd-overflow-auto">
      <div class="cyd-my-[20px] cyd-px-20 cyd-text-center">
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-float-left">You require tokens worth $10 or more in any chain to facilitate bridging to
        ${_.get(requiredTokenDetail, ["symbol"]).toUpperCase()} token in
        ${__capitalize(
    _.get(requiredTokenDetail, [
      "chainDetails",
      "backendName",
    ]).toLowerCase()
  )} chain.
        </span>
      </div>
      <div class="cyd-w-[100%] cyd-flex cyd-flex-col cyd-justify-center cyd-items-center">
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
