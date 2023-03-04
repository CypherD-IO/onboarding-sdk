import _ from "lodash";

declare let globalThis: any;

function __capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const noBalanceHTML = (totalHoldings: any) => {


  const tokensAvailableList = totalHoldings.map((tokenDetail: any) => `
    <tr>
      <td>
        <div id="cyd-chain">
          <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName'], '').toLowerCase()} logo" width="20" height="20"/>
          <p class='text-[14px]'>${_.get(tokenDetail, ['chainDetails', 'backendName'], '')}</p>
        </div>
      </td>
      <td>
        <div id="cyd-token">
          <img id="td-token-icon" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" width="20" height="20">
          <p class='text-[14px]'>${_.get(tokenDetail, ['name'])}</p>
        </div>
      </td>
      <td>
        <p id="td-usd-value" class='text-[14px] font-semibold'>$ ${(_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])).toFixed(2)}</p>
      </td>
      <td>
        <p id="td-token-balance" class='text-[14px]'>${Number(_.get(tokenDetail, ['actualBalance'])).toFixed(5)}</p>
      </td>
      <td>
        <button class="blue-button text-[14px]" onclick='bridgePopup(${JSON.stringify(_.omit(tokenDetail, ['about']))})'>Exchange</button>
      </td>
    </tr>
  `).join(' ');

  const htmlValue = `
    <div id="popup">
      <div class="flex justify-end w-full mt-[20px] mr-[20px] ">
        <img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">
      </div>
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="52" height="52">
        <img src="${_.get(globalThis.requiredTokenDetail, ['logoUrl'])}" alt="Arbitrum logo" width="52" height="52">
      </div>
      <div id=cyd-tokenList-header class='my-[20px]'>
        <h2 class='text-[23px] font-semibold'>You need ${_.get(globalThis.requiredTokenDetail, ['symbol']).toUpperCase()} in ${__capitalize(_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase())} to use this dApp</h2>
        <p class='text-[16px] font-semibold'>You can exchange with below tokens in your wallet  </p>
      </div>
      <div id="tokens-available-flex-box">
        <table width="100%">
          ${tokensAvailableList}
        </table>
      </div>
      <div class='flex flex-row justify-center w-[100%] py-[25px] bg-[#3C4143] rounded-b-[30px] mt-[15px]'>
        <a class='flex flex-row items-center text-[14px] text-white' href="https://www.cypherwallet.io/" target="_blank">
          Powered by  <img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px]" alt="Arbitrum logo" width="18" height="18" resizeMode="contain"> Cypher
        </a>
      </div>
    </div>
  `;

  return htmlValue;
};
