export const bridgeSuccessHTML = `'<div id="bridge-popup-css" class="rounded-[30px] px-[50px] py-[12px] justify-evenly">'+
'<div id="bp-heading" class="flex flex-col justify-center items-center">'+
  '<img src="https://public.cypherd.io/icons/logos/success.png" alt="successLogo" width="42" height="42">'+
  '<h2 class="text-[23px] font-semibold mt-[3px]">Congrats</h2>'+
'</div>'+
'<p class="text-center text-[18px] mt-[5px]">You have '+ (globalThis?.bridgeQuote?.transferAmount)?.toString() + ' ' + globalThis?.requiredTokenDetail?.chainDetails?.symbol + ' in ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '. You can now use dapp.</p>'+

  '<div class=" flex flex-row justify-center items-center w-[100%] mt-[50px]">'+
    '<button class="bg-[#2081E2] text-[16px] font-semibold border-none text-white h-[45px] w-[60%] rounded-[3px]" onclick="closePopup()">OK</button>'+
  '</div>'+
'</div>'`;

