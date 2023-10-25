import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const bridgeSuspended = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const bridgeSuspendedHTML = `
    <div class=" cyd-bg-primaryBg cyd-rounded-t-[30px] cyd-p-2 md:cyd-p-5 cyd-flex cyd-flex-col cyd-justify-center cyd-items-center cyd-h-[200px] cyd-w-full cyd-overflow-auto">
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-text-center cyd-mt-[20%]">
          Bridge suspended temporarily due to technical issues. We will be back shortly.
        </span>
    </div>
    ${footer()}
  `;

  if (parentElement) {
    parentElement.innerHTML = globalThis.cypherWalletDetails.parentComponentId
      ? ` <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-full cyd-justify-between cyd-items-center" id="cyd-empty-wallet-screen">
          ${bridgeSuspendedHTML}
        </div>
      `
      : `
        <div class="cyd-rounded-[30px] cyd-z-50 cyd-m-auto cyd-bg-primaryBg cyd-w-[90%] md:cyd-w-[70%] lg:cyd-w-[50%] cyd-justify-between cyd-items-center" id="cyd-empty-wallet-screen">
          <div class="cyd-flex cyd-flex-row cyd-justify-end cyd-w-[95%] cyd-mt-[20px] cyd-bg-primaryBg">
            <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
          </div>
          ${bridgeSuspendedHTML}
        </div>
      `;
  }
};
