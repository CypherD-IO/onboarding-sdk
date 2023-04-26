import _ from "lodash";

declare let globalThis: any;

function __capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const noBalanceHTML = (totalHoldings: any) => {


  const tokensAvailableList = totalHoldings.map((tokenDetail: any) => `
    <tr class="odd:bg-stripedTableBg">
      <td>
        <div id="cyd-chain">
          <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()} logo" width="20" height="20"/>
          <p class='text-[14px] text-primaryText'>${_.get(tokenDetail, ['chainDetails', 'backendName'], '')}</p>
        </div>
      </td>
      <td>
        <div id="cyd-token">
          <img id="td-token-icon" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" width="20" height="20">
          <p class='text-[14px] text-primaryText'>${_.get(tokenDetail, ['name'])}</p>
        </div>
      </td>
      <td>
        <p id="td-usd-value" class='text-[14px] text-primaryText font-semibold'>$ ${(_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])).toFixed(2)}</p>
      </td>
      <td>
        <p id="td-token-balance" class='text-[14px] text-primaryText'>${Number(_.get(tokenDetail, ['actualBalance'])).toFixed(5)}</p>
      </td>
      <td>
        <button class="blue-button text-[14px] text-primaryText" onclick='bridgePopup(${JSON.stringify(_.omit(tokenDetail, ['about']))})'>Exchange</button>
      </td>
    </tr>
  `).join(' ');

  const tokenListContainer = tokensAvailableList.length ? `<div class="w-[100%] flex flex-col justify-center items-center">
  <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>You can exchange with below tokens in your wallet</p>
  <div id="tokens-available-flex-box">
    <table width="100%">
      ${tokensAvailableList}
    </table>
  </div>
</div>` : `<div class="w-[100%] flex flex-col justify-center items-center">
  <p class='text-[16px] text-primaryText font-semibold mb-[20px]'>Insufficient funds to perform this action!</p>
  <img src="https://public.cypherd.io/icons/emptyWallet.png" class="h-[300px] w-[200px]">
</div>
`

  const htmlValue = `
    <div id="popup" class="bg-primaryBg">
      <div class="flex flex-row justify-end w-[95%] mt-[20px] mx-[30px] bg-primaryBg">
        <img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">
      </div>
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="52" height="52">
        <img src="${_.get(globalThis.requiredTokenDetail, ['logoUrl'])}" alt="Arbitrum logo" width="52" height="52">
      </div>
      <div id=cyd-tokenList-header class='mt-[20px]'>
        <h2 class='text-[23px] text-primaryText font-semibold'>You need ${_.get(globalThis.requiredTokenDetail, ['symbol']).toUpperCase()} in ${__capitalize(_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase())} chain to use this dApp</h2>
      </div>
      ${tokenListContainer}
      <div class='flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]'>
        <a class='flex flex-row items-center text-[14px] text-white' href=globalThis.cypherWalletUrl target="_blank">
          Powered by  <img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px]" alt="Arbitrum logo" width="18" height="18" resizeMode="contain"> Cypher Wallet
        </a>
        <div class="h-[35px] w-[50%] flex flex-row justify-end">
          <div class="h-[35px] w-[70px] flex flex-row">
            <div class="toggle-switch">
                <label>
                    <input onclick="applyTheme(globalThis.theme === 'light' ? 'dark' : 'light')" class="toggle-input" type="checkbox">
                    <span class="slider"></span>
                </label>
            </div>
          </div>
          <div class="relative h-[45px] w-[45px] ml-[30px]">
            <div class="absolute">
              <img id="chat-support" class="cursor-pointer h-[45px] w-[45px] mt-[-6px]" src="https://public.cypherd.io/icons/chat.png">
            </div>
          </div>
        </div>
      </div>
    </div>`;

  return htmlValue;
};
