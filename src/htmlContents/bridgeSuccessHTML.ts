export const bridgeSuccessHTML = `
'<div id="bridge-popup-css" class="rounded-[30px] pt-[30px] w-[90%] lg:w-[35%] justify-evenly bg-primaryBg">'+
  '<div id="bp-heading" class="flex flex-col justify-center items-center px-[50px]">'+
    '<img src="https://public.cypherd.io/icons/logos/success.png" class="w-[42px] h-[42px]" alt="successLogo">'+
    '<h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Congrats</h2>'+
  '</div>'+
  '<p class="text-center text-[18px] text-primaryText mt-[5px] px-10 lg:px-0">You have '+ parseFloat(globalThis.bridgeQuote ? globalThis?.bridgeQuote?.transferAmount : globalThis.swapQuoteData?.toToken?.amount)?.toFixed(6) + ' ' + globalThis?.requiredTokenDetail?.symbol + ' added in ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '. You can now use dapp.</p>'+

  '<div class=" flex flex-row justify-center px-[50px] items-center w-[100%] mt-[50px] bg-primaryBg">'+
    '<button class="bg-[#2081E2] text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]" onclick="closePopup(); globalThis.callBack(true)">OK</button>'+
  '</div>'+
  '<div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">'+
    '<a class="flex flex-row items-center text-[14px] text-white" href=globalThis.cypherWalletUrl target="_blank">'+
      '<img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px] w-[18px]" alt="Arbitrum logo" resizeMode="contain"> Cypher Wallet'+
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
      '<div class="relative w-[55px] ml-[20px] flex items-center">'+
        '<img class="chat-support" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>'`;

