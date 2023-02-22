export const bridgeInputHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<h2>Enter Token Amount</h2>'+
  '<div id="bp-amount-input-flex-box">'+
    '<div id="bp-max-button">'+
      '<p>MAX</p>'+
    '</div>'+
    '<div id="bp-amount-input">'+
      '<p>USD</p>'+
      '<input type="text" id="bp-amount-value" placeholder="0.00">'+
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
        '<p id="bp-balance-detail-usd-value">$' + (actualBalance * price).toFixed(4) + '</p>'+
      '</div>'+
      '<div id="bp-balance-detail-token">'+
        '<p>' + tokenSymbol + '</p>'+
        '<p id="bp-balance-detail-token-value">' + parseFloat(actualBalance).toFixed(6) + '</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="bp-submit-button-container">'+
    '<button class="blue-button" onclick="bridgeSubmit(' + chainId + ', ' + "'" +  chainName + "'" + ')">Submit</button>'+
  '</div>'+
'</div>'`;
