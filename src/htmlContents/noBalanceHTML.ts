import _ from "lodash";

declare let globalThis: any;

export const noBalanceHTML = (totalHoldings: any) => {

  // function bridgePopup(index: number) {
  //   console.log('pressed ', _.get(totalHoldings[index], ['name']));
  // }

  const tokensAvailableList = totalHoldings.map((tokenDetail: any, index: number) => `
    <div id="token-detail-${index%2}">
      <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="20" height="20"/>
      <p>${_.get(tokenDetail, ['chainDetails', 'backendName'])}</p>
      <img id="td-token-icon" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" width="20" height="20">
      <p>${_.get(tokenDetail, ['name'])}</p>
      <p id="td-usd-value">${_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])}</p>
      <p id="td-token-balance">${_.get(tokenDetail, ['actualBalance'])}</p>
      <button class="blue-button" onclick='bridgePopup(${JSON.stringify(tokenDetail)})'>Exchange</button>
    </div>
  `).join(' ');

  // <button class="blue-button" onclick="bridgePopup('${_.get(tokenDetail, ['name'])}', '${_.get(tokenDetail, ['contractAddress'])}', '${_.get(tokenDetail, ['actualBalance'])}', '${_.get(tokenDetail, ['price'])}', '${_.get(tokenDetail, ['symbol'])}', '${_.get(tokenDetail, ['logoUrl'])}', '${_.get(tokenDetail, ['chainDetails', 'backendName'])}', '${_.get(tokenDetail, ['chainDetails', 'chain_id'])}')">Exchange</button>
  // <button class="blue-button" onclick='(function () {globalThis.exchangingTokenDetail = ${JSON.stringify(tokenDetail)}; bridgePopup("${_.get(tokenDetail, ['name'])}", "${_.get(tokenDetail, ['contractAddress'])}", "${_.get(tokenDetail, ['actualBalance'])}", "${_.get(tokenDetail, ['price'])}", "${_.get(tokenDetail, ['symbol'])}", "${_.get(tokenDetail, ['logoUrl'])}", "${_.get(tokenDetail, ['chainDetails', 'backendName'])}", "${_.get(tokenDetail, ['chainDetails', 'chain_id'])}")})()'>Exchange</button>

  const htmlValue = `
    <div id="popup">
      <button onclick="ConnectMetaMask()">Connect Wallet</button>
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="42" height="42">
        <img src="${_.get(globalThis.requiredTokenDetail, ['logoUrl'])}" alt="Token Logo" width="42" height="42">
      </div>
      <div>
        <h2>You need ${_.get(globalThis.requiredTokenDetail, ['name'])} in ${_.get(globalThis.requiredTokenDetail, ['chainDetails', 'backendName'])} to use this dApp</h2>
        <p>You can exchange with below tokens in your wallet  </p>
      </div>
      <div id="tokens-available-flex-box">
        ${tokensAvailableList}
      </div>
    </div>
  `;

  return htmlValue;
};
