import _ from "lodash";

export const demo = (address: string) => {
  return `<div id="popup"><h2 id="header2">Hello!</h2><p>Welcome ${address}</p><p>Oops! you don't have sufficient balance in the token. Do u wish to Bridge or Buy ?</p><button id="closePopup">Close</button></div>`;
}

export const noBalanceScript = () => {
  // const value = `<script defer>var buttonElements = document.getElementsByClassName('blue-button'); for(var i = 0; i<buttonElements.length; i++) { buttonElements[i].addEventListener('click', function () {console.log('1234')}) }; </script>`;
  const value = `
    <script defer>
      function bridgePopup (tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId) {
        console.log("Pressed", tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId);
        document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};
      }
    </script>`;
  // const value = `<script defer>function bridgePopup (tokenDetail) {console.log("Pressed", JSON.parse(decodeURIComponent(tokenDetail)).name);"}</script>`;

  return value;
  // const buttonElements = document.getElementsByClassName('blue-button');
  // for(let i = 0; i<buttonElements.length; i++) {
  //   buttonElements[i].addEventListener('click', function () { console.log('1234') })
  // }
}


// const bridgePopup = (index: number) => {
//  console.log('pressed', index);
// }

export const noBalanceHTML = (totalHoldings: any, requiredTokenDetails: any) => {

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
      <button class="blue-button" onclick="bridgePopup('${_.get(tokenDetail, ['name'])}', '${_.get(tokenDetail, ['contractAddress'])}', '${_.get(tokenDetail, ['actualBalance'])}', '${_.get(tokenDetail, ['price'])}', '${_.get(tokenDetail, ['symbol'])}', '${_.get(tokenDetail, ['logoUrl'])}', '${_.get(tokenDetail, ['chainDetails', 'backendName'])}', '${_.get(tokenDetail, ['chainDetails', 'chain_id'])}')">Exchange</button>
    </div>
  `).join(' ');

  const htmlValue = `
    <div id="popup">
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(requiredTokenDetails, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(requiredTokenDetails, ['chainDetails', 'backendName']).toLowerCase()} logo" width="42" height="42">
        <img src="${_.get(requiredTokenDetails, ['logoUrl'])}" alt="Arbitrum logo" width="42" height="42">
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

// tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId

// export const bridgeInputHTML = `'<div id="bp-back-close-button-flex-box"><p>' + tokenSymbol + '</p></div>'`;

// export const bridgeInputHTML = `'<div id="bridgePopupCSS">' +
//  '<h2>Enter Token Amount</h2>' +
//  '</div>'`;

// export const bridgeInputHTML = ` '<div id="bridgePopupCSS"> <div id="bp-back-close-button-flex-box"> <p>Back Button</p>  <p>Close Button</p> </div>  <h2>Enter Token Amount</h2>  <div id="bp-amount-input-flex-box"> <div id="bp-max-button"> <p>MAX</p> </div> <div id="bp-amount-input"> <p>USD</p> <h1 id="bp-amount-value">0.00</h1> <div id="bp-token-value-flex-box"> <p id="bp-token-value">00</p> <p>tokenSymbol</p> </div> </div> <div id="bp-switch-button"> <p>SWITCH</p> </div> </div> <div id="bp-balance-flex-box"> <div id="bp-balance-logo"> <p>img</p> </div> <div id="bp-balance-detail"> <div id="bp-balance-detail-usd"> <p>chainName</p> <p>$ actualBalance * price </p> </div> <div id="bp-balance-detail-token"> <p>tokenSymbol</p> <p>actualBalance</p> </div> </div> </div> <div id="bp-submit-button-container"> <button class="blue-button">Submit</button> </div> </div>'`;

export const bridgeInputHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<p>Back Button</p>'+
    '<p>Close Button</p>'+
  '</div>'+
  '<h2>Enter Token Amount</h2>'+
  '<div id="bp-amount-input-flex-box">'+
    '<div id="bp-max-button">'+
      '<p>MAX</p>'+
    '</div>'+
    '<div id="bp-amount-input">'+
      '<p>USD</p>'+
      '<h1 id="bp-amount-value">0.00</h1>'+
      '<div id="bp-token-value-flex-box">'+
        '<p id="bp-token-value">00</p>'+
        '<p>' + tokenSymbol + '</p>'+
      '</div>'+
    '</div>'+
    '<div id="bp-switch-button">'+
      '<p>SWITCH</p>'+
    '</div>'+
  '</div>'+
  '<div id="bp-balance-flex-box">'+
    '<div id="bp-balance-logo">'+
      '<img src="' + tokenLogoUrl + '" alt="' + tokenLogoUrl + '" width="42" height="42">'+
    '</div>'+
    '<div id="bp-balance-detail">'+
      '<div id="bp-balance-detail-usd">'+
        '<p>' + chainName + '</p>'+
        '<p>$' + (actualBalance * price).toFixed(4) + '</p>'+
      '</div>'+
      '<div id="bp-balance-detail-token">'+
        '<p>' + tokenSymbol + '</p>'+
        '<p>' + parseFloat(actualBalance).toFixed(6) + '</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="bp-submit-button-container">'+
    '<button class="blue-button">Submit</button>'+
  '</div>'+
'</div>'`;
