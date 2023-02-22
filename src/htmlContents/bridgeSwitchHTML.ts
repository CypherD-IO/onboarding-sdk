export const bridgeSwitchHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<div id="bp-heading">'+
    '<h2>Switch to '+ fetchEthereumChainData("0x" + chainId.toString(16)).chainName +' for this exchange</h2>'+
  '</div>'+
  '<div id="bp-switch-container">'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + fetchChainDetails(currentChainId).backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
      '<p>' + fetchEthereumChainData(currentChainId).nativeCurrency.symbol + '</p>'+
      '<p>'+ fetchEthereumChainData(currentChainId).chainName +'</p>'+
    '</div>'+
    '<div id="bp-switch-icon-container">'+
      '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" width="100" height="100">'+
    '</div>'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + chainName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
      '<p>' + fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol + '</p>'+
      '<p>'+ chainName +'</p>'+
    '</div>'+
  '</div>'+
  '<button class="blue-button" onclick="navigateAfterSwitch(' + "'0x" + chainId.toString(16) + "'" + ', ' + "'" +  chainName + "'" + ')">Switch</button>'+
'</div>'`;
