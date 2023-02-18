import _ from "lodash";

export const demo = (address: string) => {
  return `<div id="popup"><h2 id="header2">Hello!</h2><p>Welcome ${address}</p><p>Oops! you don't have sufficient balance in the token. Do u wish to Bridge or Buy ?</p><button id="closePopup">Close</button></div>`;
}

export const noBalanceScript = () => {
  // const value = `<script>var buttonElements = document.getElementsByClassName('blue-button'); for(var i = 0; i<buttonElements.length; i++) { buttonElements[i].addEventListener('click', function () {console.log('1234')}) }; </script>`;
  // return value;
  // const buttonElements = document.getElementsByClassName('blue-button');
  // for(let i = 0; i<buttonElements.length; i++) {
  //   buttonElements[i].addEventListener('click', function () { console.log('1234') })
  // }
}


// const bridgePopup = (index: number) => {
//  console.log('pressed', index);
// }

export const noBalanceHTML = (totalHoldings: any) => {

  // function bridgePopup(index: number) {
  //   console.log('pressed ', _.get(totalHoldings[index], ['name']));
  // }

  const tokensAvailableList = totalHoldings.map((tokenDetail: any, index: number) => `
    <div id="token-detail-${index%2}">
      <p id="td-chain-icon">Chain img</p>
      <p>${_.get(tokenDetail, ['chainDetails', 'backendName'])}</p>
      <p id="td-token-icon">Token img</p>
      <p>${_.get(tokenDetail, ['name'])}</p>
      <p id="td-usd-value">${_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])}</p>
      <p id="td-token-balance">${_.get(tokenDetail, ['actualBalance'])}</p>
      <button class="blue-button">Exchange</button>
    </div>
  `).join(' ');

  const htmlValue = `
    <div id="popup">
      <div id="icon-flex-box">
        <p>Ethereum icon</p>
        <p>BSC icon</p>
      </div>
      <div>
        <h2>You need ETH in BSC to use this dApp</h2>
        <p>You can exchange with below tokens in your wallet  </p>
      </div>
      <div id="tokens-available-flex-box">
        ${tokensAvailableList}
      </div>
    </div>
  `;

  return htmlValue;
};

