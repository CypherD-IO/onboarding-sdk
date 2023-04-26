// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const bridgeInputHTML = `'<div class="bg-primaryBg rounded-[30px] z-50 flex flex-col justify-between items-center m-auto w-[30%]" id="bridge-popup-css">'+
  '<div class=" bg-primaryBg rounded-t-[30px] p-5 flex flex-col justify-center items-center w-full h-full">'+
    '<div class="flex justify-end w-full mt-[5px] ">'+
      '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
    '</div>'+
    '<h2 class="font-semibold text-[28px] text-primaryText my-10">Enter Token Amount</h2>'+
    '<h3 class="font-extrabold text-[22px] text-primaryText">USD</h3>'+
    '<div class="flex justify-evenly w-full items-center">'+
      '<div class="rounded-full flex items-center justify-center h-[48px] w-[48px] bg-white cursor-pointer" id="bp-max-button" onclick="onMax()">'+
        '<p class="text-[12px] text-[#2081E1]">MAX</p>'+
      '</div>'+
      '<div id="bp-amount-input">'+
        '<input type="text" class="text-center focus:outline-none font-extrabold text-[70px] text-primaryText bg-primaryBg" id="bp-amount-value" placeholder="0.00" onfocus="onFocusInput(event)" onblur="onBlurInput(event)">'+
      '</div>'+
      '<div class="rounded-full flex items-center justify-center h-[48px] w-[48px] cursor-pointer" id="bp-switch-button">'+
      '</div>'+
    '</div>'+
    '<div class="flex">'+
      '<p class="mr-2 text-[18px] text-primaryText" id="bp-token-value">00</p>'+
      '<p class="text-[18px] text-primaryText">' + tokenDetail.symbol + '</p>'+
    '</div>'+
    '<div class="flex my-[3]">'+
      '<p class="text-[14px] text-primaryText" id="bp-min-amount">Min amount: $' + Math.max(10, requiredUsdValue(globalThis.requiredTokenDetail, globalThis.exchangingTokenDetail)).toFixed(2) + '</p>'+
    '</div>'+
    '<div class="bg-primaryBg border border-[#E4E4E4] p-2 flex rounded-2xl w-3/4 mt-6">'+
      '<img src="' + tokenDetail.logoUrl + '" alt="' + tokenDetail.logoUrl + '"  class="h-[55px] w-[55px] rounded-lg">'+
      '<div class="w-full ml-3" id="bp-balance-detail">'+
        '<div id="bp-balance-detail-usd" class="flex justify-between">'+
          '<p class="text-primaryText text-[18px] font-semibold">' + tokenDetail.chainDetails.backendName + '</p>'+
          '<p class="text-primaryText text-[18px] font-semibold" id="bp-balance-detail-usd-value">$' + (tokenDetail.actualBalance * tokenDetail.price).toFixed(2) + '</p>'+
        '</div>'+
        '<div id="bp-balance-detail-token" class="flex justify-between">'+
          '<p class="text-[#929292] text-[16px] font-normal">' + tokenDetail.symbol + '</p>'+
          '<p class="text-[#929292] text-[16px] font-normal" id="bp-balance-detail-token-value">' + parseFloat(tokenDetail.actualBalance).toFixed(6) + '</p>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div id="bp-submit-button-container" class="bg-primaryBg py-10 w-full flex items-center justify-center rounded-b-[30px]">'+
    '<button class="bg-[#2081E2] h-[45px] w-[60%] rounded-lg text-white text-[16px] font-semibold" onclick="bridgeSubmitConditionCheck(' + tokenDetail.chainDetails.chain_id + ', ' + "'" +  tokenDetail.chainDetails.backendName + "'" + ')">Submit</button>'+
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
