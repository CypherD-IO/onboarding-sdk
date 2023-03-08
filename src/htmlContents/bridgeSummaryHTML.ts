export const bridgeSummaryHTML = `'<div class="flex flex-col justify-evenly items-center w-[33%] h-[45%] m-auto bg-[#fefefe] rounded-[30px]">'+
  '<div class="flex justify-end w-full px-[20px] ">'+
    '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
  '</div>'+
  '<div id="bp-heading">'+
    '<h2 class="text-[25px] font-bold">Summary</h2>'+
  '</div>'+
  '<div id="bp-summary-container">'+
    '<div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-[#f5f5f5]">'+
      '<p class="w-[30%] text-[14px] font-semibold">Exchange from</p>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="https://public.cypherd.io/icons/logos/' + globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
        '<p class="text-[14px] ml-[7px]">'+ globalThis.exchangingTokenDetail.chainDetails.backendName +'</p>'+
      '</div>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="' + globalThis.exchangingTokenDetail.logoUrl + '" alt="' + globalThis.exchangingTokenDetail.name + ' logo" width="22" height="22">'+
        '<p class="text-[14px] ml-[7px]">'+ globalThis.exchangingTokenDetail.name +'</p>'+
      '</div>'+
    '</div>'+
    '<div class="bp-summary-row amount-row py-[15px] px-[10px] bg-[#fafafa]">'+
      '<p class="w-[30%] text-[14px]">Amount Sending</p>'+
      '<p class="w-[30%] text-[14px]">' + parseFloat(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(6) + ' ' + globalThis.exchangingTokenDetail.symbol + '</p>'+
      '<p class="w-[30%] text-[14px]">$' + parseFloat(globalThis.bridgeInputDetails.usdValueEntered).toFixed(2) +'</p>'+
    '</div>'+
    '<div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-[#f5f5f5]">'+
      '<p class="w-[30%] text-[14px] font-semibold">Exchange to</p>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="https://public.cypherd.io/icons/logos/' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
        '<p class="text-[14px] ml-[7px]">'+ globalThis.requiredTokenDetail.chainDetails.backendName +'</p>'+
      '</div>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="' + globalThis.requiredTokenDetail.logoUrl + '" alt="' + globalThis.requiredTokenDetail.name + ' logo" width="22" height="22">'+
        '<p class="text-[14px] ml-[7px]">'+ globalThis.requiredTokenDetail.name +'</p>'+
      '</div>'+
    '</div>'+
    '<div class="bp-summary-row amount-row py-[15px] px-[10px] bg-[#fafafa]">'+
      '<p class="w-[30%] text-[14px]">Amount Receiving</p>'+
      '<p id="token-received" class="w-[30%] text-[14px]"> ...' + globalThis.requiredTokenDetail.symbol + '</p>'+
      '<p id="usd-received" class="w-[30%] text-[14px]">$ ... </p>'+
    '</div>'+
  '</div>'+
  '<div class=" flex flex-row justify-center items-center w-[100%]">'+
    '<button id="bridge-submit-blue-button" disabled class="blue-button disabled-button bg-[#2081E2] text-[16px] font-semibold border-none text-white h-[45px] w-[60%] rounded-[3px]" onclick="onBridgeClick()">Exchange</button>'+
  '</div>'+
'</div>'`;


