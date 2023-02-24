export const bridgeSummaryHTML = `'<div class="flex flex-col justify-evenly items-center w-[30%] h-[45%] m-auto bg-[#fefefe] rounded-[30px]">'+
  '<div class="flex justify-between w-full px-[20px] ">'+
    '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
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
    '<button id="blue-button" class="bg-[#2081E2] border-none text-white h-[40px] w-[60%] rounded-[3px]" onclick="bridge()">Exchange</button>'+
  '</div>'+
'</div>'`;

// export const bridgeSummaryHTML = `<div id="bridge-popup-css">
//   <div id="bp-back-close-button-flex-box">
//     <button onclick="backToNoBalanceHTML()">Back Button</button>
//     <button onclick="closePopup()">Close Button</button>
//   </div>
//   <div id="bp-heading">
//     <h2>Summary</h2>
//   </div>
//   <div id="bp-summary-container">
//     <div class="bp-summary-row exchange-row">
//       <p>Exchange from</p>
//       <img src="https://public.cypherd.io/icons/logos/${globalThis?.exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase()}.png" width="22" height="22">
//       <p> ${globalThis?.exchangingTokenDetail?.chainDetails?.backendName} </p>
//       <img src="${globalThis?.exchangingTokenDetail?.logoUrl}" alt="${globalThis?.exchangingTokenDetail?.name} logo" width="22" height="22">
//       <p>${globalThis?.exchangingTokenDetail?.name}</p>
//     </div>
//     <div class="bp-summary-row amount-row">
//       <p>Amount Sending</p>
//       <p> ${parseFloat(globalThis?.bridgeInputDetails?.tokenValueEntered).toFixed(6)} ${globalThis?.exchangingTokenDetail?.chainDetails?.symbol}</p>
//       <p>${parseFloat(globalThis?.bridgeInputDetails?.usdValueEntered).toFixed(2)}</p>
//     </div>
//     <div class="bp-summary-row exchange-row">
//       <p>Exchange to</p>
//       <img src="https://public.cypherd.io/icons/logos/ ${globalThis?.requiredTokenDetail?.chainDetails?.backendName.toLowerCase()}.png" width="22" height="22">
//       <p>${globalThis?.requiredTokenDetail?.chainDetails?.backendName}</p>
//       <img src="${globalThis?.requiredTokenDetail?.logoUrl}" alt="${globalThis?.requiredTokenDetail?.name} logo" width="22" height="22">
//       <p>${globalThis?.requiredTokenDetail?.name}</p>
//     </div>
//     <div class="bp-summary-row amount-row">
//       <p>Amount Receiving</p>
//       <p id="token-received"> ... ${globalThis?.requiredTokenDetail?.chainDetails?.symbol}</p>
//       <p id="usd-received">$ ... </p>
//     </div>
//   </div>
//   <div>
//     <button id="blue-button" onclick="bridge()">Exchange</button>
//   </div>
// </div>`;
