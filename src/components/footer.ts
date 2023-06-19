declare let globalThis: any;

export const footer = () => {
  const footerHTML =  `
    <div class="flex flex-row justify-between items-center w-[100%] py-[25px] px-[20px] bg-[#3C4143] rounded-b-[30px] mt-[25px]">
        <a id="cyd-site-redirect" class="flex flex-row items-center flex-wrap text-[14px] text-white" href=${globalThis.cypherWalletUrl} target="_blank">
          <div class="mr-[5px]">Powered by</div>
          <div class="flex flex-row items-center">
          <img src="https://public.cypherd.io/icons/logos/cypher.png" class="w-[18px] mr-[5px]" alt="Cypher logo" resizeMode="contain">
          Cypher Wallet
          </div>
        </a>
      <div class="h-[35px] w-[50%] flex flex-row justify-end">
        <div class="h-[35px] w-[70px] flex flex-row">
          <div class="cyd-toggle-switch">
              <label class="cyd-label">
                  <input class="cyd-toggle-input" type="checkbox">
                  <span class="cyd-slider"></span>
              </label>
          </div>
        </div>
        <div class="relative w-[55px] ml-[20px] flex items-center">
          <img class="cyd-chat-support cursor-pointer" src="https://public.cypherd.io/icons/chat.png">
        </div>
      </div>
    </div>
  `;

  return footerHTML;
}
