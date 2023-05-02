export const bridgeLoadingHTML = `
'<div onclick="maximizeWindow()" id="bridgeLoadingContainer" class="flex flex-col rounded-[30px] bg-primaryBg pt-[25px] w-[90%] lg:w-[30%]">'+
      '<div class="flex flex-row justify-end items-center w-full px-[20px]">'+
        '<div onclick="minimizeWindow(event)" class="flex flex-row justify-center items-center px-[5px] py-[5px] mr-[15px] cursor-pointer">'+
          '<img src="https://public.cypherd.io/icons/minimize_icon.png" class="cursor-pointer w-[20px] h-[3px]">'+
        '</div>'+
        '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
      '</div>'+
      '<div class="flex flex-1 flex-col justify-center self-center items-center px-[30px] w-[72%]">'+
          '<h2 class="text-[24px] text-primaryText text-center font-semibold mt-[40px]">Transaction submitted</h2>'+
          '<p class="text-[20px] text-primaryText text-center mt-[10px]">Your transaction is being processed. This can take upto 5 mins</p>'+
          '<img class="mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">'+
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
          '<img id="chat-support" class="cursor-pointer" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">'+
      '</div>'+
    '</div>'+
  '</div>'+
    '</div>'`;

