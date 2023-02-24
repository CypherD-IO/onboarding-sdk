import _ from "lodash";

declare let globalThis: any;

export const noBalanceHTML = (totalHoldings: any) => {

  // function bridgePopup(index: number) {
  //   console.log('pressed ', _.get(totalHoldings[index], ['name']));
  // }

  // <div id="token-detail-${index%2}">
      // <div id="cyd-chain">
      //   <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="20" height="20"/>
      //   <p>${_.get(tokenDetail, ['chainDetails', 'backendName'])}</p>
      // </div>
      // <div id="cyd-token">
      //   <img id="td-token-icon" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" width="20" height="20">
      //   <p>${_.get(tokenDetail, ['name'])}</p>
      // </div>
  //     <p>|</p>
  //     <p id="td-usd-value">${_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])}</p>
  //     <p id="td-token-balance">${_.get(tokenDetail, ['actualBalance'])}</p>
  //     <p>|</p>
  //     <button class="blue-button" onclick='bridgePopup(${JSON.stringify(tokenDetail)})'>Exchange</button>
  //   </div>

  const tokensAvailableList = totalHoldings.map((tokenDetail: any, index: number) => `
    <tr>
      <td>
        <div id="cyd-chain">
          <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="20" height="20"/>
          <p class='text-[14px]'>${_.get(tokenDetail, ['chainDetails', 'backendName'])}</p>
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
        <button class="blue-button text-[14px]" onclick='bridgePopup(${JSON.stringify(tokenDetail)})'>Exchange</button>
      </td>
    </tr>
  `).join(' ');

  // <button class="blue-button" onclick="bridgePopup('${_.get(tokenDetail, ['name'])}', '${_.get(tokenDetail, ['contractAddress'])}', '${_.get(tokenDetail, ['actualBalance'])}', '${_.get(tokenDetail, ['price'])}', '${_.get(tokenDetail, ['symbol'])}', '${_.get(tokenDetail, ['logoUrl'])}', '${_.get(tokenDetail, ['chainDetails', 'backendName'])}', '${_.get(tokenDetail, ['chainDetails', 'chain_id'])}')">Exchange</button>
  // <button class="blue-button" onclick='(function () {globalThis.exchangingTokenDetail = ${JSON.stringify(tokenDetail)}; bridgePopup("${_.get(tokenDetail, ['name'])}", "${_.get(tokenDetail, ['contractAddress'])}", "${_.get(tokenDetail, ['actualBalance'])}", "${_.get(tokenDetail, ['price'])}", "${_.get(tokenDetail, ['symbol'])}", "${_.get(tokenDetail, ['logoUrl'])}", "${_.get(tokenDetail, ['chainDetails', 'backendName'])}", "${_.get(tokenDetail, ['chainDetails', 'chain_id'])}")})()'>Exchange</button>

  const htmlValue = `
    <div id="popup">
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="52" height="52">
        <img src="${_.get(globalThis.requiredTokenDetail, ['logoUrl'])}" alt="Arbitrum logo" width="52" height="52">
      </div>
      <div id=cyd-tokenList-header class='py-[20]'>
        <h2 class='text-[23px] font-semibold'>You need ${_.get(globalThis.requiredTokenDetail, ['name'])} in ${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName'])} to use this dApp</h2>
        <p class='text-[16px] font-semibold'>You can exchange with below tokens in your wallet  </p>
      </div>
      <div id="tokens-available-flex-box">
        <table width="100%">
          ${tokensAvailableList}
        </table>
      </div>
      <div class='flex flex-row justify-center w-[100%] py-[15px] bg-[#3C4143] rounded-b-[30px] mt-[15px]'>
        <button onclick="ConnectMetaMask()" class='text-[14px] py-[12px] px-[15px] rounded-[10px] border-[1px] bg-white rounded-[30px]'>Connect Wallet</button>
      </div>
    </div>
  `;

  return htmlValue;
};
