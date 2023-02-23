export const bridgeSummaryHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<div id="bp-heading">'+
    '<h2>Summary</h2>'+
  '</div>'+
  '<div id="bp-summary-container">'+
    '<div class="bp-summary-row exchange-row">'+
      '<p>Exchange from</p>'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.exchangingTokenDetail.chainDetails.backendName +'</p>'+
      '<img src="' + globalThis.exchangingTokenDetail.logoUrl + '" alt="' + globalThis.exchangingTokenDetail.name + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.exchangingTokenDetail.name +'</p>'+
    '</div>'+
    '<div class="bp-summary-row amount-row">'+
      '<p>Amount Sending</p>'+
      '<p>' + parseFloat(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(6) + ' ' + globalThis.exchangingTokenDetail.chainDetails.symbol + '</p>'+
      '<p>$' + parseFloat(globalThis.bridgeInputDetails.usdValueEntered).toFixed(2) +'</p>'+
    '</div>'+
    '<div class="bp-summary-row exchange-row">'+
      '<p>Exchange to</p>'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.requiredTokenDetail.chainDetails.backendName +'</p>'+
      '<img src="' + globalThis.requiredTokenDetail.logoUrl + '" alt="' + globalThis.requiredTokenDetail.name + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.requiredTokenDetail.name +'</p>'+
    '</div>'+
    '<div class="bp-summary-row amount-row">'+
      '<p>Amount Receiving</p>'+
      '<p id="token-received"> ...' + globalThis.requiredTokenDetail.chainDetails.symbol + '</p>'+
      '<p id="usd-received">$ ... </p>'+
    '</div>'+
  '</div>'+
  '<div>'+
    '<button id="blue-button" onclick="bridge()">Exchange</button>'+
  '</div>'+
'</div>'`;
