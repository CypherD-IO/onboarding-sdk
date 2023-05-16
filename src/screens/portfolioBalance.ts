import _ from "lodash";
import { footer } from "../components/footer";
import { __capitalize } from "../utils";

declare let globalThis: any;

export const portfolioBalance = (totalHoldings = _.get(globalThis.tokenHoldings, ["tokenPortfolio", "totalHoldings"]), parentElement = document.getElementById("popupBackground")) => {
  const showInfoScreen: boolean = globalThis.cypherWalletDetails.showInfoScreen;
  const bridgeableTokensList: any = {};
  // only verified tokens and tokens with balance >= $10 is shown
  totalHoldings?.map((tokenDetail: any) => {
    if (tokenDetail.actualBalance * tokenDetail.price >= 10 && tokenDetail.isVerified) {
      bridgeableTokensList[(tokenDetail.name).toLowerCase()] = tokenDetail
    }
  });
  const {
    requiredTokenDetail
  } = globalThis;

  globalThis.bridgeableTokensList = bridgeableTokensList;
  const tokensAvailableList = Object.values(bridgeableTokensList).map((tokenDetail: any) => `
    <tr class='odd:bg-stripedTableBg h-[75px]'>
      <td class='pl-2'>
        <div id='cyd-chain'>
          <img id='td-chain-icon' class='w-[20px] mr-1' src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()} logo" />
          <p class='text-[10px] lg:text-[14px] text-primaryText'>${_.get(tokenDetail, ['chainDetails', 'backendName'], '')}</p>
        </div>
      </td>
      <td>
        <div id='cyd-token'>
          <img id='td-token-icon' class='w-[20px] mr-1' src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo">
          <p id='td-token-name' class='text-[10px] lg:text-[14px] text-primaryText'>${_.get(tokenDetail, ['name'])}</p>
        </div>
      </td>
      <td>
        <p id='td-usd-value' class='text-[10px] lg:text-[14px] text-primaryText font-semibold'>$ ${(_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])).toFixed(2)}</p>
      </td>
      <td>
        <p id='td-token-balance' class='text-[10px] lg:text-[14px] text-primaryText'>${Number(_.get(tokenDetail, ['actualBalance'])).toFixed(5)}</p>
      </td>
      <td class='pr-2'>
        <button class='exchange-token-button blue-button text-[10px] lg:text-[14px] text-primaryText p-1.5 lg:p-3'>Exchange</button>
      </td>
    </tr>
  `).join(' ');

  // display the balces if tokens with sufficient balances are present, else show empty wallet screen
  const tokenListContainer = Object.keys(bridgeableTokensList).length ? `
  <div class='w-[100%] max-h-[60%] flex flex-col justify-center items-center'>
    <p class='text-[16px] text-primaryText font-semibold mb-[20px] px-10 lg:px-0 text-center'>
      You can exchange with below tokens in your wallet
    </p>
    <div id='tokens-available-flex-box' class='w-[90%] lg:w-[80%] mt-2 lg:mt-0'>
      <table class='w-[100%]'>
        ${tokensAvailableList}
      </table>
    </div>
  </div>` : `<div class='w-[100%] flex flex-col justify-center items-center'>
    <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>Insufficient funds to perform this action!</p>
    <img src="https://public.cypherd.io/icons/emptyWallet.png" class="h-[200px] w-[100px] lg:h-[300px] lg:w-[200px]">
  </div>
  `

  const portfolioBalanceHTML = `
    <div
      id="popup"
      class="flex flex-col items-center justify-between max-h-[85%] rounded-[30px] bg-primaryBg w-11/12 lg:w-3/5 ${!showInfoScreen || !Object.keys(bridgeableTokensList).length ? 'block' : 'hidden'}"
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
    </div>

    <div
      class="rounded-[30px] z-50 m-auto bg-primaryBg w-[90%] lg:w-[40%] justify-between items-center ${Object.keys(bridgeableTokensList).length && showInfoScreen ? 'block' : 'hidden'}"
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
            <img src="${_.get(requiredTokenDetail, ['logoUrl'])}" class="w-[42px] h-[42px]" alt="${_.get(requiredTokenDetail, ['name'])}">
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

  if (parentElement) parentElement.innerHTML = portfolioBalanceHTML;
};

