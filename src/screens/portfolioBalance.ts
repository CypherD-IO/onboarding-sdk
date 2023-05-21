import _ from "lodash";
import { footer } from "../components/footer";
import { coinColors } from "../constants/server";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const portfolioBalance = ( bridgeableTokensList = globalThis.bridgeableTokensList, parentElement = document.getElementById("popupBackground")) => {
  const {
    requiredTokenDetail
  } = globalThis;

  const tokensAvailableList = bridgeableTokensList.map((tokenDetail: any) => (
      `
        <tr class='odd:bg-stripedTableBg h-[75px]'>
          <td class='pl-[10px] pr-[5px]'>
            <div class="relative w-[32px] h-[32px] lg:w-[42px] lg:h-[42px] overflow-visible">
              <img id='td-token-icon' onerror="this.src='https://public.cypherd.io/icons/logos/' +  '${coinColors[Math.floor(Math.random() * coinColors.length)]}.png'" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" class="object-cover w-full h-full" />
              <div class="absolute bottom-[-5px] right-[-5px]">
                <div class="w-[16px] h-[16px] lg:w-[22px] lg:h-[22px] overflow-visible">
                  <img id='td-chain-icon' src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()} logo" class="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="text-left">
              <p class="text-[14px] lg:text-[16px] text-primaryText font-bold">${_.get(tokenDetail, ['name'])}</h1>
              <p class="text-[10px] lg:text-[12px] text-primaryText">${_.get(tokenDetail, ['chainDetails', 'backendName'], '')}</p>
            </div>
          </td>
          <td>
            <p id='td-usd-value' class='text-[10px] lg:text-[14px] text-primaryText font-semibold'>$ ${(_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])).toFixed(2)}</p>
          </td>
          <td>
            <p id='td-token-balance' class='text-[10px] lg:text-[14px] text-primaryText'>${Number(_.get(tokenDetail, ['actualBalance'])).toFixed(5)}</p>
          </td>
          <td class='pr-2'>
            <button params='` + JSON.stringify({exchangingTokenDetail: tokenDetail}) + `'class='exchange-token-button blue-button text-[10px] lg:text-[14px] text-primaryText p-1.5 lg:p-3'>Exchange</button>
          </td>
        </tr>
      `
  )).join(' ');

  const tokenListContainer = `
    <div class='w-[100%] max-h-[60%] flex flex-col justify-center items-center'>
      <p class='text-[16px] text-primaryText font-semibold mb-[20px] px-10 lg:px-0 text-center'>
        You can exchange with below tokens in your wallet
      </p>
      <div id='tokens-available-flex-box' class='w-[90%] lg:w-[80%] mt-2 lg:mt-0'>
        <table class='w-[100%]'>
          ${tokensAvailableList}
        </table>
      </div>
    </div>
  `;

  const portfolioBalanceHTML = `
    <div
      id="popup"
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
          class="w-[32px] h-[32px] mx-[8px] float-left"
        />
        <span class="text-[23px] text-primaryText font-semibold float-left">
          ${_.get(requiredTokenDetail, ["symbol"]).toUpperCase()} in
        </span>
        <img
          src="https://public.cypherd.io/icons/logos/${_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase()}.png"
          alt="${_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase()} logo"
          class="w-[32px] h-[32px] mx-[8px] float-left"
        />
        <span class="text-[23px] text-primaryText font-semibold">
          ${__capitalize(_.get(requiredTokenDetail, ["chainDetails", "backendName"]).toLowerCase())} chain to use this dApp
        </span>
      </div>
      ${tokenListContainer}
      ${footer()}
    </div>`;

  if (parentElement) parentElement.innerHTML = portfolioBalanceHTML;
};
