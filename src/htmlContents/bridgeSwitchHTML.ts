// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const bridgeSwitchHTML =`'<div class="rounded-[30px] z-50 m-auto bg-primaryBg w-[30%] justify-between items-center" id="bridge-popup-css">'+
  '<div class=" bg-primaryBg] rounded-t-[30px] p-5 flex flex-col justify-start items-center w-full">'+
    '<div class="flex justify-end w-full ">'+
      '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
    '</div>'+
    '<div id="bp-heading">'+
      '<h2 class="font-semibold text-[28px] my-10 text-primaryText text-center">Switch to '+ fetchEthereumChainData("0x" + chainId.toString(16)).chainName +' for this exchange</h2>'+
    '</div>'+
    '<div class="flex items-start justify-evenly w-[95%] my-[50px]">'+
      '<div id="bp-switch-chain-container">'+
        '<img src="https://public.cypherd.io/icons/logos/' + fetchChainDetails(currentChainId).backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
        '<p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-1">' + fetchEthereumChainData(currentChainId).nativeCurrency.symbol + '</p>'+
        '<p class="text-primaryText font-semibold text-[18px] text-center">' + fetchEthereumChainData(currentChainId).chainName +'</p>'+
      '</div>'+
      '<div id="bp-switch-icon-container">'+
        '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" width="100" height="100">'+
      '</div>'+
      '<div id="bp-switch-chain-container">'+
        '<img src="https://public.cypherd.io/icons/logos/' + chainName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
        '<p class="text-[#929292] font-normal text-[16px] text-center mt-2 mb-">' + fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol + '</p>'+
        '<p class="text-primaryText font-semibold text-[18px] text-center">'+ chainName +'</p>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div class="bg-primaryBg py-10 w-full flex items-center justify-center rounded-b-[30px]">'+
    '<button class="bg-[#2081E2] h-[45px] w-[60%] rounded-lg text-white text-[16px] font-semibold" onclick="navigateAfterSwitch(' + "'0x" + chainId.toString(16) + "'" + ', ' + "'" +  chainName + "'" + ')">Switch</button>'+
  '</div>'+
  '<div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">'+
    '<a class="flex flex-row items-center text-[14px] text-white" href=globalThis.cypherWalletUrl target="_blank">'+
      '<img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px]" alt="Arbitrum logo" width="18" height="18" resizeMode="contain"> Cypher Wallet'+
    '</a>'+
    '<div class="h-[35px] w-[50%] flex flex-row justify-end">'+
      '<div class="h-[35px] w-[70px] flex flex-row">'+
        '<div class="toggle-switch">'+
            '<label>'+
                '<input onclick="applyTheme(globalThis.theme === "light" ? "dark" : "light")" class="toggle-input" type="checkbox">'+
                '<span class="slider"></span>'+
            '</label>'+
        '</div>'+
      '</div>'+
      '<div class="relative h-[45px] w-[45px] ml-[30px]">'+
        '<div class="absolute">'+
          '<img id="chat-support" class="cursor-pointer h-[45px] w-[45px] mt-[-6px]" src="https://public.cypherd.io/icons/chat.png">'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>'`;
