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
        '<p>' + tokenDetail.chainDetails.symbol + '</p>'+
      '</div>'+
    '</div>'+
    '<div id="bp-switch-button">'+
      '<p>SWITCH</p>'+
    '</div>'+
  '</div>'+
  '<div id="bp-balance-flex-box">'+
    '<div id="bp-balance-logo">'+
      '<img src="' + tokenDetail.logoUrl + '" alt="' + tokenDetail.logoUrl + '" width="42" height="42">'+
    '</div>'+
    '<div id="bp-balance-detail">'+
      '<div id="bp-balance-detail-usd">'+
        '<p>' + tokenDetail.chainDetails.backendName + '</p>'+
        '<p id="bp-balance-detail-usd-value">$' + (tokenDetail.actualBalance * tokenDetail.price).toFixed(4) + '</p>'+
      '</div>'+
      '<div id="bp-balance-detail-token">'+
        '<p>' + tokenDetail.chainDetails.symbol + '</p>'+
        '<p id="bp-balance-detail-token-value">' + parseFloat(tokenDetail.actualBalance).toFixed(6) + '</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="bp-submit-button-container">'+
    '<button class="blue-button" onclick="bridgeSubmit(' + tokenDetail.chainDetails.chain_id + ', ' + "'" +  tokenDetail.chainDetails.backendName + "'" + ')">Submit</button>'+
  '</div>'+
'</div>'`;
