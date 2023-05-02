import _ from "lodash";

declare let globalThis: any;

function __capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const noBalanceHTML = (totalHoldings: any) => {


  const tokensAvailableList = totalHoldings.map((tokenDetail: any) => `
    <tr class="odd:bg-stripedTableBg h-[90px] lg:h-[75px]">
      <td>
        <div id="cyd-chain">
          <img id="td-chain-icon" class="w-[30px] lg:w-[20px]" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()} logo" />
          <p class='text-[26px] lg:text-[14px] text-primaryText'>${_.get(tokenDetail, ['chainDetails', 'backendName'], '')}</p>
        </div>
      </td>
      <td>
        <div id="cyd-token">
          <img id="td-token-icon" class="w-[30px] lg:w-[20px]" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo">
          <p class='text-[26px] lg:text-[14px] text-primaryText'>${_.get(tokenDetail, ['name'])}</p>
        </div>
      </td>
      <td>
        <p id="td-usd-value" class='text-[26px] lg:text-[14px] text-primaryText font-semibold'>$ ${(_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])).toFixed(2)}</p>
      </td>
      <td>
        <p id="td-token-balance" class='text-[26px] lg:text-[14px] text-primaryText'>${Number(_.get(tokenDetail, ['actualBalance'])).toFixed(5)}</p>
      </td>
      <td>
        <button class="blue-button text-[26px] lg:text-[14px] text-primaryText p-3" onclick='bridgePopup(${JSON.stringify(_.omit(tokenDetail, ['about']))})'>Exchange</button>
      </td>
    </tr>
  `).join(' ');

  const tokenListContainer = tokensAvailableList.length ? `<div class="w-[100%] max-h-[60%] flex flex-col justify-center items-center">
  <p class='text-[28px] lg:text-[16px] text-primaryText font-semibold mb-[20px]'>You can exchange with below tokens in your wallet</p>
    <div id="tokens-available-flex-box" class="w-[90%] lg:w-[80%] mt-2 lg:mt-0">
      <table class="w-[100%]">
        ${tokensAvailableList}
      </table>
    </div>
  </div>` : `<div class="w-[100%] flex flex-col justify-center items-center">
    <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>Insufficient funds to perform this action!</p>
    <img src="https://public.cypherd.io/icons/emptyWallet.png" class="h-[300px] w-[200px]">
  </div>
  `

  const htmlValue = `
    <div id="popup" class="bg-primaryBg w-11/12 lg:w-3/5">
      <div class="flex flex-row justify-end w-[95%] mt-[20px] mx-[30px] bg-primaryBg">
        <img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">
      </div>
      <div id=cyd-tokenList-header class='my-[20px] px-10 lg:px-0'>
        <h2 class='flex flex-row text-[46px] lg:text-[23px] text-primaryText font-semibold'>You need
          <img
            src="https://public.cypherd.io/icons/logos/${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png"
            alt="${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo"
            class="w-[55px] lg:w-[32px] ml-[8px] mr-[8px]"
          />
          ${_.get(globalThis.requiredTokenDetail, ['symbol']).toUpperCase()} in
          <img
            src="${_.get(globalThis.requiredTokenDetail, ['logoUrl'])}"
            alt="Arbitrum logo"
            class="w-[55px] lg:w-[32px] ml-[8px] mr-[8px]"
          />
          ${__capitalize(_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase())} chain to use this dApp
        </h2>
      </div>
      ${tokenListContainer}
      <div class='flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]'>
        <a class='flex flex-row items-center text-[24px] lg:text-[14px] text-white' href=${globalThis.cypherWalletUrl} target="_blank">
          Powered by  <img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[8px] w-[24px] lg:w-[18px]" alt="Cypher logo" resizeMode="contain"> Cypher Wallet
        </a>
        <div class="h-[35px] w-[50%] flex flex-row justify-end">
          <div class="h-[35px] w-[70px] flex flex-row">
            <div class="toggle-switch">
                <label>
                    <input onclick="switchTheme()" class="toggle-input" type="checkbox">
                    <span class="slider"></span>
                </label>
            </div>
          </div>
          <div class="relative w-[75px] lg:w-[55px] ml-[20px] flex items-center">
            <img id="chat-support" class="cursor-pointer" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">
          </div>
        </div>
      </div>
    </div>`;

  return htmlValue;
};
