declare let globalThis: any;

export const footer = () => {
  const footerHTML = `
    <div class="cyd-flex cyd-flex-row cyd-justify-between cyd-items-center cyd-w-[100%] cyd-py-[7px] md:cyd-py-[14px] lg:cyd-py-[25px] cyd-px-[20px] cyd-bg-[#3C4143] cyd-rounded-b-[30px] cyd-mt-[35px]">
        <a id="cyd-site-redirect" class="cyd-flex cyd-flex-row cyd-items-center cyd-flex-wrap cyd-text-[12px] md:cyd-text-[14px] cyd-text-white" href=${globalThis.cypherWalletUrl} target="_blank">
          <div class="cyd-mr-[5px]">Powered by</div>
          <div class="cyd-flex cyd-flex-row cyd-items-center">
          <img src="https://public.cypherd.io/icons/logos/cypher.png" class="cyd-w-[14px] md:cyd-w-[18px] cyd-mx-[3px] md:cyd-mr-[5px]" alt="Cypher logo" resizeMode="contain">
          Cypher Wallet
          </div>
        </a>
      <div class="cyd-h-[35px] cyd-w-[50%] cyd-flex cyd-flex-row cyd-justify-end">
        <div class="cyd-h-[35px] cyd-w-[70px] cyd-flex cyd-flex-row">
          <div class="cyd-toggle-switch">
              <label class="cyd-label">
                  <input class="cyd-toggle-input" type="checkbox">
                  <span class="cyd-slider"></span>
              </label>
          </div>
        </div>
        <div class="cyd-relative cyd-w-[55px] cyd-ml-[20px] cyd-flex cyd-items-center">
          <img class="cyd-chat-support cyd-cursor-pointer" src="https://public.cypherd.io/icons/chat.png">
        </div>
      </div>
    </div>
  `;

  return footerHTML;
};
