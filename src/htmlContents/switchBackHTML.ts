export const switchBackHTML = `'<div id="bridge-popup-css">'+
  '<img src="https://public.cypherd.io/icons/logos/" alt="successLogo" width="42" height="42">'+
  '<div id="bp-heading">'+
    '<h2>Congrats</h2>'+
  '</div>'+
  '<p>You have '+ (globalThis.bridgeQuote.transferAmount).toString() + ' ' + globalThis.requiredTokenDetail.chainDetails.symbol + ' in ' + globalThis.requiredTokenDetail.chainDetails.backendName + '. You can now use dapp. Switch chain back to ' + globalThis.requiredTokenDetail.chainDetails.backendName + '</p>'+
  '<div id="bp-switch-container">'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + globalThis.exchangingTokenDetail.chainDetails.backendName + ' logo" width="42" height="42">'+
      '<p>' + globalThis.exchangingTokenDetail.symbol + '</p>'+
      '<p>'+ globalThis.exchangingTokenDetail.chainDetails.backendName +'</p>'+
    '</div>'+
    '<div id="bp-switch-icon-container">'+
      '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" width="100" height="100">'+
    '</div>'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + ' logo" width="42" height="42">'+
      '<p>' + globalThis.requiredTokenDetail.symbol + '</p>'+
      '<p>'+ globalThis.requiredTokenDetail.chainDetails.backendName +'</p>'+
    '</div>'+
  '</div>'+
  '<button class="blue-button" onclick="switchNetwork(' + "'" + globalThis.requiredTokenDetail.chainDetails.chain_id.toString(16) + "'" + ', ' + "'" +  globalThis.requiredTokenDetail.chainDetails.backendName + "'" + ')">Switch</button>'+
'</div>'`;
