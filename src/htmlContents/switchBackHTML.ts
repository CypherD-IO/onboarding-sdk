export const switchBackHTML = `'<div id="bridge-popup-css" class="rounded-[30px] px-[50px] py-[12px] w-[35%] justify-evenly bg-primaryBg">'+
'<div id="bp-heading" class="flex flex-col justify-center items-center">'+
  '<img src="https://public.cypherd.io/icons/logos/success.png" alt="successLogo" width="42" height="42">'+
  '<h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Congrats</h2>'+
'</div>'+
'<p class="text-center text-primaryText text-[18px] mt-[5px]">You have '+ (globalThis?.bridgeQuote?.transferAmount)?.toString() + ' ' + globalThis?.requiredTokenDetail?.chainDetails?.symbol + ' added in ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '. You can now use dapp. Switch chain back to ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '</p>'+
'<div id="bp-switch-container" class="mt-[5px]">'+
  '<div id="bp-switch-chain-container">'+
    '<img src="https://public.cypherd.io/icons/logos/' + globalThis?.exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase() + '.png" alt="' + globalThis?.exchangingTokenDetail?.chainDetails?.backendName + ' logo" width="42" height="42">'+
    '<p class="text-[14px] text-primaryText">' + globalThis?.exchangingTokenDetail?.symbol + '</p>'+
    '<p class="text-[16px] text-primaryText font-semibold">'+ globalThis?.exchangingTokenDetail?.chainDetails?.backendName +'</p>'+
  '</div>'+
  '<div id="bp-switch-icon-container">'+
    '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" width="120" height="120">'+
  '</div>'+
  '<div id="bp-switch-chain-container">'+
    '<img src="https://public.cypherd.io/icons/logos/' + globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase() + '.png" alt="' + globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase() + ' logo" width="42" height="42">'+
    '<p class="text-[14px] text-primaryText">' + globalThis?.requiredTokenDetail?.symbol + '</p>'+
    '<p class="text-[16px] text-primaryText font-semibold">'+ globalThis?.requiredTokenDetail?.chainDetails?.backendName +'</p>'+
  '</div>'+
'</div>'+
  '<div class="flex flex-row justify-center items-center w-[100%] mt-[10px] bg-primaryBg">'+
    '<button class="bg-[#2081E2] text-[16px] font-semibold border-none text-white h-[45px] w-[60%] rounded-[3px]" onclick="switchNetwork(' + "'" + globalThis.requiredTokenDetail.chainDetails.chain_id.toString(16) + "'" + ', ' + "'" +  globalThis.requiredTokenDetail.chainDetails.backendName + "'" + '); closePopup(); globalThis.callBack(true)">Switch</button>'+
  '</div>'+
'</div>'`;

