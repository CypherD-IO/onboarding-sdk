declare let globalThis: any;

export const bridgeFailedHTMLCopy = `<div id="bridge-popup-css" class="rounded-[30px] pt-[30px] w-[35%] justify-evenly bg-primaryBg">
<div class="flex justify-end w-full mt-[5px] px-[20px]">
  <img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">
</div>
<div id="bp-heading" class="flex flex-col justify-center items-center px-[50px]">
  <img src="https://public.cypherd.io/icons/red_cross.png" alt="redCrossLogo" width="52" height="52">
  <h2 class="text-[23px] text-primaryText font-semibold mt-[3px]">Bridge Failed !</h2>
</div>
<p class="text-center text-[18px] text-primaryText mt-[5px]">Please Contact <a class="underline cursor-pointer" onclick="openChat()">Cypher Support.</a></p>
  <div class="flex flex-row justify-between w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">
    <a class="flex flex-row items-center text-[14px] text-white" href=${globalThis.cypherWalletUrl} target="_blank">
      <img src="https://public.cypherd.io/icons/logos/cypher.png" class="ml-[10px] mr-[3px]" alt="Arbitrum logo" width="18" height="18" resizeMode="contain"> Cypher Wallet
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
      <div class="relative h-[55px] w-[55px] ml-[20px]">
        <div class="absolute">
          <img id="chat-support" class="cursor-pointer h-[55px] w-[55px] mt-[-10px]" src="https://public.cypherd.io/icons/chat.png" onclick="openChat()">
        </div>
      </div>
    </div>
  </div>
</div>`;

