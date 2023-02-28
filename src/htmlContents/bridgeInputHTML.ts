// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
export const bridgeInputHTML = `'<div class="rounded-[30px] z-50" id="bridge-popup-css">'+
  '<div class=" !bg-[#F5F5F5] rounded-t-[30px] p-5 flex flex-col justify-center items-center w-full h-full">'+
    '<div class="flex justify-end w-full mt-[5px] ">'+
      '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
    '</div>'+
    '<h2 class="font-semibold text-[28px] my-10 text-[#434343]">Enter Token Amount</h2>'+
    '<h3 class="font-extrabold text-[22px] text-[#434343]">USD</h3>'+
    '<div class="flex justify-evenly w-full items-center">'+
      '<div class="rounded-full flex items-center justify-center h-[48px] w-[48px] bg-white cursor-pointer" id="bp-max-button" onclick="onMax()">'+
        '<p class="text-[12px] text-[#2081E1]">MAX</p>'+
      '</div>'+
      '<div id="bp-amount-input">'+
        '<input type="text" class="text-center focus:outline-none font-extrabold text-[70px] text-[#434343] bg-[#F5F5F5]" id="bp-amount-value" placeholder="0.00">'+
      '</div>'+
      '<div class="rounded-full flex items-center justify-center h-[48px] w-[48px] cursor-pointer" id="bp-switch-button">'+
      '</div>'+
    '</div>'+
    '<div class="flex">'+
      '<p class="mr-2 text-[18px] text-black" id="bp-token-value">00</p>'+
      '<p class="text-[18px] text-black">' + tokenDetail.symbol + '</p>'+
    '</div>'+
    '<div class="flex my-[3]">'+
      '<p class="text-[14px] text-black">Min amount: $10</p>'+
    '</div>'+
    '<div class="bg-white border border-[#E4E4E4] p-2 flex rounded-2xl w-3/4 mt-6">'+
      '<img src="' + tokenDetail.logoUrl + '" alt="' + tokenDetail.logoUrl + '"  class="h-[55px] w-[55px] rounded-lg">'+
      '<div class="w-full ml-3" id="bp-balance-detail">'+
        '<div id="bp-balance-detail-usd" class="flex justify-between">'+
          '<p class="text-[#474747] text-[18px] font-semibold">' + tokenDetail.chainDetails.backendName + '</p>'+
          '<p class="text-[#474747] text-[18px] font-semibold" id="bp-balance-detail-usd-value">$' + (tokenDetail.actualBalance * tokenDetail.price).toFixed(2) + '</p>'+
        '</div>'+
        '<div id="bp-balance-detail-token" class="flex justify-between">'+
          '<p class="text-[#929292] text-[16px] font-normal">' + tokenDetail.symbol + '</p>'+
          '<p class="text-[#929292] text-[16px] font-normal" id="bp-balance-detail-token-value">' + parseFloat(tokenDetail.actualBalance).toFixed(6) + '</p>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div id="bp-submit-button-container" class="bg-white py-10 w-full flex items-center justify-center rounded-b-[30px]">'+
    '<button class="bg-[#2081E2] h-[45px] w-[60%] rounded-lg text-white text-[16px] font-semibold" onclick="bridgeSubmitConditionCheck(' + tokenDetail.chainDetails.chain_id + ', ' + "'" +  tokenDetail.chainDetails.backendName + "'" + ')">Submit</button>'+
  '</div>'+
'</div>'`;
