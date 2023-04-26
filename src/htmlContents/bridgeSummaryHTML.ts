export const bridgeSummaryHTML = `'<div class="flex flex-col justify-evenly items-center w-[35%] m-auto bg-primaryBg rounded-[30px]">'+
  '<div class="flex justify-end w-full px-[20px] mt-[20px]">'+
    '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
  '</div>'+
  '<div id="bp-heading" class="mt-[20px]">'+
    '<h2 class="text-[25px] text-primaryText font-bold">Summary</h2>'+
  '</div>'+
  '<div id="bp-summary-container" class="mt-[50px] w-[95%] border-[1px] border-borderColor rounded-[10px]">'+
    '<div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg rounded-t-[10px]">'+
      '<p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange from</p>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="https://public.cypherd.io/icons/logos/' + globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
        '<p class="text-[14px] text-primaryText ml-[7px]">'+ globalThis.exchangingTokenDetail.chainDetails.backendName +'</p>'+
      '</div>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="' + globalThis.exchangingTokenDetail.logoUrl + '" alt="' + globalThis.exchangingTokenDetail.name + ' logo" width="22" height="22">'+
        '<p class="text-[14px] text-primaryText ml-[7px]">'+ globalThis.exchangingTokenDetail.name +'</p>'+
      '</div>'+
    '</div>'+
    '<div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg">'+
      '<p class="w-[30%] text-[14px] text-primaryText">Amount Sending</p>'+
      '<p class="w-[30%] text-[14px] text-primaryText">' + parseFloat(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(6) + ' ' + globalThis.exchangingTokenDetail.symbol + '</p>'+
      '<p class="w-[30%] text-[14px] text-primaryText">$' + parseFloat(globalThis.bridgeInputDetails.usdValueEntered).toFixed(2) +'</p>'+
    '</div>'+
    '<div class="bp-summary-row exchange-row py-[15px] px-[10px] bg-secondaryBg">'+
      '<p class="w-[30%] text-[14px] text-primaryText font-semibold">Exchange to</p>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="https://public.cypherd.io/icons/logos/' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
        '<p class="text-[14px] text-primaryText ml-[7px]">'+ globalThis.requiredTokenDetail.chainDetails.backendName +'</p>'+
      '</div>'+
      '<div class="flex flex-row items-center w-[30%]">'+
        '<img src="' + globalThis.requiredTokenDetail.logoUrl + '" alt="' + globalThis.requiredTokenDetail.name + ' logo" width="22" height="22">'+
        '<p class="text-[14px] text-primaryText ml-[7px]">'+ globalThis.requiredTokenDetail.name +'</p>'+
      '</div>'+
    '</div>'+
    '<div class="bp-summary-row amount-row py-[15px] px-[10px] bg-primaryBg rounded-b-[10px]">'+
      '<p class="w-[30%] text-[14px] text-primaryText">Amount Receiving</p>'+
      '<p id="token-received" class="w-[30%] text-[14px] text-primaryText"> ...' + globalThis.requiredTokenDetail.symbol + '</p>'+
      '<p id="usd-received" class="w-[30%] text-[14px] text-primaryText">$ ... </p>'+
    '</div>'+
  '</div>'+
  '<div class=" flex flex-row justify-center items-center w-[100%] mt-[50px]">'+
    '<button id="bridge-submit-blue-button" disabled class="blue-button disabled-button bg-[#2081E2] text-[16px] font-semibold border-none text-white h-[45px] w-[60%] mb-[30px] rounded-[3px]" onclick="onBridgeClick()">Exchange</button>'+
  '</div>'+
  '<div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">'+
    '<a class="flex flex-row items-center text-[14px] text-white" href=globalThis.cypherWalletUrl target="_blank">'+
      '<img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px]" alt="Arbitrum logo" width="18" height="18" resizeMode="contain"> Cypher Wallet'+
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
      '<div class="relative h-[55px] w-[55px] ml-[20px]">'+
        '<div class="absolute">'+
          '<img id="chat-support" class="cursor-pointer h-[55px] w-[55px] mt-[-10px]" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>'`;


// '<img onclick="backToNoBalanceHTML()" src="https://public.cypherd.io/icons/back_arrow.svg" class="cursor-pointer"/>'+
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
