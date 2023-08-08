import _ from "lodash";
import { footer } from "../components/footer";
import { coinColors } from "../constants/server";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const portfolioBalance = (
  bridgeableTokensList = globalThis.bridgeableTokensList,
  parentElement = document.getElementById("cyd-popup-background")
) => {
  const { requiredTokenDetail } = globalThis;

  const tokensAvailableList = bridgeableTokensList
    .map(
      (tokenDetail: any) =>
        `
        <tr class="cyd-odd:bg-stripedTableBg cyd-h-[75px] cyd-portfolio-token-detail">
          <td class="cyd-pl-[10px] cyd-pr-[5px]">
            <div class="cyd-relative cyd-w-[32px] cyd-h-[32px] lg:cyd-w-[38px] lg:cyd-h-[38px] cyd-overflow-visible">
              <img id="cyd-td-token-icon" onerror="this.src="https://public.cypherd.io/icons/logos/" +  "${
                coinColors[Math.floor(Math.random() * coinColors.length)]
              }.png"" src="${_.get(tokenDetail, ["logoUrl"])}" alt="${_.get(
          tokenDetail,
          ["name"]
        )} logo" class="cyd-object-cover cyd-w-full cyd-h-full cyd-rounded-full" />
              <div class="cyd-absolute cyd-bottom-[-3px] cyd-right-[-5px]">
                <div class="cyd-w-[16px] cyd-h-[16px] lg:cyd-w-[20px] lg:cyd-h-[20px] cyd-overflow-visible cyd-bg-white cyd-p-[1px] cyd-rounded-full">
                  <img id="cyd-td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(
                    tokenDetail,
                    ["chainDetails", "backendName"],
                    ""
                  ).toLowerCase()}.png" alt="${_.get(
          tokenDetail,
          ["chainDetails", "backendName"],
          ""
        ).toLowerCase()} logo" class="cyd-object-cover cyd-w-full cyd-h-full cyd-rounded-full" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="cyd-text-left">
              <p class="cyd-text-[14px] lg:cyd-text-[16px] cyd-text-primaryText cyd-font-bold cyd-mb-[4px]">${_.get(
                tokenDetail,
                ["name"]
              )}</h1>
              <p class="cyd-text-[10px] lg:cyd-text-[12px] cyd-text-primaryText">${_.get(
                tokenDetail,
                ["chainDetails", "backendName"],
                ""
              )}</p>
            </div>
          </td>
          <td>
            <p class="cyd-text-[10px] lg:cyd-text-[14px] cyd-text-primaryText cyd-font-semibold">$ ${(
              _.get(tokenDetail, ["actualBalance"]) *
              _.get(tokenDetail, ["price"])
            ).toFixed(2)}</p>
          </td>
          <td>
            <p class="cyd-text-[10px] lg:cyd-text-[14px] cyd-text-primaryText">${Number(
              _.get(tokenDetail, ["actualBalance"])
            ).toFixed(5)}</p>
          </td>
          <td class="cyd-pr-2">
            <button params='` +
        JSON.stringify({
          exchangingTokenDetail: _.omit(tokenDetail, ["about"]),
        }) +
        `'class="cyd-exchange-token-button cyd-blue-button cyd-text-[10px] lg:cyd-text-[14px] cyd-text-primaryText cyd-p-1.5 lg:cyd-p-3">Exchange</button>
          </td>
        </tr>
      `
    )
    .join(" ");

  const tokenListContainer = `
    <div class="cyd-w-[100%] cyd-max-h-[60%] cyd-flex cyd-flex-col cyd-justify-center cyd-items-center">
      <p class="cyd-text-[16px] cyd-text-primaryText cyd-font-semibold cyd-mb-[20px] cyd-px-10 lg:cyd-px-0 cyd-text-center">
        You can exchange with below tokens in your wallet
      </p>
      <div class="cyd-tokens-available-flex-box cyd-w-[90%] lg:cyd-w-[80%] cyd-mt-2 lg:cyd-mt-0">
        <table class="cyd-w-[100%]" id="cyd-portfolio-balance-table">
          ${tokensAvailableList}
        </table>
      </div>
    </div>
  `;

  const portfolioBalanceHTML = `
    <div
      id="cyd-portfolio-balance-screen"
      class="cyd-flex cyd-flex-col cyd-items-center cyd-maximize-onclick cyd-justify-between cyd-max-h-[85%] cyd-rounded-[30px] cyd-bg-primaryBg cyd-w-11/12 lg:cyd-w-3/5 cyd-overflow-auto"
    >
      <div class="cyd-flex cyd-flex-row cyd-justify-end cyd-w-[95%] cyd-mt-[20px] cyd-mx-[30px] cyd-bg-primaryBg">
        <img src="https://public.cypherd.io/icons/close_icon.svg" class="cyd-close-popup cyd-cursor-pointer">
      </div>
      <div class="cyd-my-[20px] cyd-px-10 lg:cyd-px-0 cyd-text-center ">
        <span class="cyd-text-[23px] cyd-text-primaryText cyd-font-semibold cyd-float-left">You need</span>
        <img
          src="${_.get(requiredTokenDetail, ["logoUrl"])}"
          alt="${_.get(requiredTokenDetail, ["name"])} logo"
          id="cyd-required-token-img"
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
          id="cyd-required-chain-img"
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
      ${tokenListContainer}
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = portfolioBalanceHTML;
};
