export const switchBackHTMLCopy = `<div id="bridge-popup-css" class="rounded-[30px] pt-[30px] w-[90%] lg:w-[35%] justify-evenly bg-primaryBg">
<div id="bp-heading" class="px-[50px] flex flex-col justify-center items-center">
  <img src="https://public.cypherd.io/icons/logos/success.png" class="w-[100px] h-[100px] lg:w-[42px] lg:h-[42px]" alt="successLogo">
  <h2 class="text-[46px] lg:text-[23px] text-primaryText font-semibold mt-[3px]">Congrats</h2>
</div>
<p class="text-center text-primaryText text-[28px] lg:text-[18px] mt-[5px] px-20 lg:px-0">You have '+ (globalThis?.bridgeQuote?.transferAmount)?.toString() + ' ' + globalThis?.requiredTokenDetail?.symbol + ' added in ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '. You can now use dapp. Switch chain back to ' + globalThis?.requiredTokenDetail?.chainDetails?.backendName + '</p>
<div id="bp-switch-container" class="mt-[5px] px-[50px]">
  <div id="bp-switch-chain-container">
    <img src="https://public.cypherd.io/icons/logos/' + globalThis?.exchangingTokenDetail?.chainDetails?.backendName?.toLowerCase() + '.png" class="w-[100px] h-[100px] lg:w-[42px] lg:h-[42px]" alt="' + globalThis?.exchangingTokenDetail?.chainDetails?.backendName + ' logo">
    <p class="text-[24px] lg:text-[14px] text-primaryText">' + globalThis?.exchangingTokenDetail?.symbol + '</p>
    <p class="text-[26px] lg:text-[16px] text-primaryText font-semibold">'+ globalThis?.exchangingTokenDetail?.chainDetails?.backendName +'</p>
  </div>
  <div id="bp-switch-icon-container">
    <img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" class="w-[200px] h-[200px] lg:w-[120px] lg:h-[120px]">
  </div>
  <div id="bp-switch-chain-container">
    <img src="https://public.cypherd.io/icons/logos/' + globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase() + '.png" class="w-[100px] h-[100px] lg:w-[42px] lg:h-[42px]" alt="' + globalThis?.requiredTokenDetail?.chainDetails?.backendName?.toLowerCase() + ' logo">
    <p class="text-[24px] lg:text-[14px] text-primaryText">' + globalThis?.requiredTokenDetail?.symbol + '</p>
    <p class="text-[26px] lg:text-[16px] text-primaryText font-semibold">'+ globalThis?.requiredTokenDetail?.chainDetails?.backendName +'</p>
  </div>
</div>
  <div class="flex flex-row justify-center items-center w-[100%] mt-[10px] bg-primaryBg px-[50px]">
    <button class="bg-[#2081E2] text-[26px] lg:text-[16px] font-semibold border-none text-white py-4 w-[60%] rounded-[3px]" onclick="switchNetwork(' + "'" + globalThis.requiredTokenDetail.chainDetails.chain_id.toString(16) + "'" + ', ' + "'" +  globalThis.requiredTokenDetail.chainDetails.backendName + "'" + '); closePopup(); globalThis.callBack(true)">Switch</button>
  </div>
  <div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">
    <a class="flex flex-row items-center text-[28px] lg:text-[14px] text-white" href=globalThis.cypherWalletUrl target="_blank">
      <img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px] w-[24px] lg:w-[18px]" alt="Arbitrum logo" resizeMode="contain"> Cypher Wallet
    </a>
    <div class="h-[35px] w-[50%] flex flex-row justify-end">
      <div class="h-[35px] w-[70px] flex flex-row">
        <div class="toggle-switch">
            <label>
                <input onclick="switchTheme()" class="toggle-input" type="checkbox">
                <span class="slider"></span>
            </label>
        </div>
      </div>
      <div class="relative w-[75px] lg:w-[55px] ml-[20px] flex items-center">
          <img id="chat-support" class="cursor-pointer" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">
      </div>
    </div>
  </div>
</div>`;

