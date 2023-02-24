export const bridgeSuccessHTML = `'<div id="bridge-popup-css">'+
  '<img src="https://public.cypherd.io/icons/logos/" alt="successLogo" width="42" height="42">'+
  '<div id="bp-heading">'+
    '<h2>Congrats</h2>'+
  '</div>'+
  '<p>You have '+ (globalThis.bridgeQuote.transferAmount).toString() + ' ' + globalThis.requiredTokenDetail.chainDetails.symbol + ' in ' + globalThis.requiredTokenDetail.chainDetails.backendName + '. You can now use the dapp. </p>'+
'</div>'`;
