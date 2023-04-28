// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const bridgeSwitchHTML = `'<div class="rounded-[30px] z-50 m-auto bg-primaryBg w-[80%] lg:w-[30%] justify-between items-center" id="bridge-popup-css">'+
  '<div class=" bg-primaryBg] rounded-t-[30px] p-5 flex flex-col justify-start items-center w-full">'+
    '<div class="flex justify-end w-full ">'+
      '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
    '</div>'+
    '<div id="bp-heading">'+
      '<h2 class="font-semibold text-[50px] lg:text-[28px] my-10 text-primaryText text-center">Switch to '+ fetchEthereumChainData("0x" + chainId.toString(16)).chainName +' for this exchange</h2>'+
    '</div>'+
    '<div class="flex items-start justify-evenly w-[95%] my-[50px]">'+
      '<div id="bp-switch-chain-container">'+
        '<img src="https://public.cypherd.io/icons/logos/' + fetchChainDetails(currentChainId).backendName.toLowerCase() + '.png" class="w-[100px] h-[100px] lg:w-[42px] lg:h-[42px]" alt="' + chainName + ' logo">'+
        '<p class="text-[#929292] font-normal text-[26px] lg:text-[16px] text-center mt-2 mb-1">' + fetchEthereumChainData(currentChainId).nativeCurrency.symbol + '</p>'+
        '<p class="text-primaryText font-semibold text-[28px] lg:text-[18px] text-center">' + fetchEthereumChainData(currentChainId).chainName +'</p>'+
      '</div>'+
      '<div id="bp-switch-icon-container">'+
        '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="w-[200px] h-[200px] lg:w-[100px] lg:h-[100px]">'+
      '</div>'+
      '<div id="bp-switch-chain-container">'+
        '<img src="https://public.cypherd.io/icons/logos/' + chainName.toLowerCase() + '.png" class="w-[100px] h-[100px] lg:w-[42px] lg:h-[42px]" alt="' + chainName + ' logo">'+
        '<p class="text-[#929292] font-normal text-[26px] lg:text-[16px] text-center mt-2 mb-">' + fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol + '</p>'+
        '<p class="text-primaryText font-semibold text-[28px] lg:text-[18px] text-center">'+ chainName +'</p>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div class="bg-primaryBg py-10 w-full flex items-center justify-center rounded-b-[30px]">'+
    '<button class="bg-[#2081E2] py-4 w-[60%] rounded-lg text-white text-[26px] lg:text-[16px] font-semibold" onclick="navigateAfterSwitch(' + "'0x" + chainId.toString(16) + "'" + ', ' + "'" +  chainName + "'" + ')">Switch</button>'+
  '</div>'+
  '<div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">'+
    '<a class="flex flex-row items-center text-[28px] lg:text-[14px] text-white" href=globalThis.cypherWalletUrl target="_blank">'+
      '<img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px] w-[24px] lg:w-[18px]" alt="Arbitrum logo" resizeMode="contain"> Cypher Wallet'+
    '</a>'+
    '<div class="h-[35px] w-[50%] flex flex-row justify-end">'+
      '<div class="h-[35px] w-[70px] flex flex-row">'+
        '<div class="toggle-switch">'+
            '<label>'+
                '<input onclick="switchTheme()" class="toggle-input" type="checkbox">'+
                '<span class="slider"></span>'+
            '</label>'+
        '</div>'+
      '</div>'+
      '<div class="relative w-[75px] lg:w-[55px] ml-[20px] flex items-center">'+
        '<img id="chat-support" class="cursor-pointer" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>'`;
