import _ from "lodash";
import { chainDropdown, footer, tokenDropdown } from "../components";

declare let globalThis: any;

export const exchangeWidget = (parentElement = document.getElementById("cyd-popup-background")) => {

  let bridgableChainList: any[] = [];
  globalThis.bridgeableTokensListChainWise = globalThis.bridgeableTokensList.reduce(function (obj: any, token: any) {
    bridgableChainList.push((token.chainDetails.backendName).toLowerCase());
    if (token.chainDetails.backendName in obj) {
      obj[token.chainDetails.backendName].push(_.omit(token, 'about'));
    } else {
      obj[token.chainDetails.backendName] = [_.omit(token, 'about')];
    }
    return obj;
  }, {});
  globalThis.cydChoosenFromChain = bridgableChainList[0];
  globalThis.exchangingTokenDetail = _.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0]);
  const bridgableChainSet = new Set(bridgableChainList);
  bridgableChainList = [...bridgableChainSet];

  const exchangeWidgetHTML = `
    <div class="bg-primaryBg rounded-[30px]" id="cyd-exchange-widget">
      <div class='m-[15px] md:m-[35px] md:mb-[50px] flex flex-col items-center justify-center font-nunito bg-primaryBg'>
        <div class='py-3 bg-grayBg rounded-xl w-full flex flex-col items-center justify-center relative'>
          <div class='w-[90%] sm:w-[70%] md:m-[10px]'>
            <div class='text-center text-primaryText font-extrabold mb-2 text-[16px] md:text-[18px]'> FROM</div>
            <div id="cyd-from-chain-dropdown" class='mt-1 md:mt-2'>
              ${chainDropdown(bridgableChainList, 'cyd-from-chain-dropdown-option')}
            </div>

            <div id="cyd-from-token-dropdown" class='mt-5'>
              ${tokenDropdown(_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase()]), 'cyd-from-token-dropdown-option')}
            </div>
          </div>

          <div class='bg-[#DDDDDD] h-0.5 w-10/12 my-3'>
          </div>

          <div class='w-[90%] sm:w-[70%]'>
            <div class='text-center font-extrabold text-[16px] md:text-[18px] text-primaryText'> TO</div>

            <div class='mt-3' id="cyd-to-chain-dropdown">
              ${chainDropdown([globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase()], "cyd-to-chain-dropdown-option", true)}
            </div>

            <div class='mt-5' id="cyd-to-token-dropdown">
              ${tokenDropdown([globalThis.requiredTokenDetail], "cyd-to-token-dropdown-option", true)}
            </div>

            <div id='cyd-choosen-token' class='font-extrabold text-primaryText text-[14px] md:text-[18px] text-center mt-3 mb-1'>
              ${_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'name'])}
            </div>
            <div
              class='flex justify-center items-center w-full'>
              <div
                class='cyd-bp-max-button text-black flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full bg-white text-[8px] md:text-[14px] font-semibold cursor-pointer cursor-pointer'
              >
                Max
              </div>
              <div class='flex justify-center w-[70%] md:w-[55%]'>
                <input
                  id="cyd-bp-amount-value"
                  class='bg-grayBg w-full text-center text-[42px] md:text-[58px] font-bold h-[5rem] focus:outline-none text-primaryText placeholder:text-secondaryText'
                  placeholder='0.00'
                  type='number'
                />
              </div>
              <div class="text-[14px] md:text-[24px] text-primaryText font-semibold text-center">
                USD
              </div>
            </div>
            <div class='flex flex-row justify-center text-[14px] md:text-[18px] text-primaryText font-regular text-center'>
              ≈ &nbsp;
              <p id="cyd-bp-token-value">00</p> &nbsp;
              <p id="cyd-bp-choosen-token-symbol">${_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'symbol'])}</p>
            </div>
            <div class='flex flex-row justify-center text-lg text-primaryText font-regular text-center my-4 md:mb-8'>
              <div class="bg-primaryBg border border-borderColor p-2 flex items-center rounded-[10px] w-full h-[50px] sm:h-[60px] md:h-[70px] md:w-[70%]">
                <img id="cyd-choosen-token-logo" src="${_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'logoUrl'])}"
                  class="h-[25px] w-[25px] md:h-[35px] md:w-[35px] rounded-full">
                <div class="w-full ml-3 flex flex-col">
                  <div id="cyd-bp-balance-detail-usd" class="flex justify-between">
                    <p class="text-primaryText text-[10px] sm:text-[12px] md:text-[14px] font-semibold">YOUR BALANCE : </p>
                    <p class="text-primaryText text-[12px] md:text-[18px] font-semibold" id="cyd-choosen-token-usd-balance">$ ${(_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'actualBalance']) * _.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'price'])).toFixed(2)}</p>
                  </div>
                  <div id="cyd-bp-balance-detail-token" class="flex justify-between h-[25px]">
                    <p id='cyd-choosen-token-name' class="text-[#929292] text-[10px] sm:text-[12px] md:text-[14px] font-normal">${_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'name'])}</p>
                    <p class="text-[#929292] text-[12px] md:text-[16px] font-normal" id="cyd-choosen-token-balance">${(_.get(globalThis.bridgeableTokensListChainWise, [(globalThis.cydChoosenFromChain).toUpperCase(), 0, 'actualBalance'])).toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='w-1/2 absolute -bottom-6 md:-bottom-8 cursor-pointer rounded-xl flex items-center justify-center hover:scale-105 transform:ease-in-out duration-200 bg-appBg'>
            <button class="cyd-bridge-input-submit text-black w-full h-[20px] md:h-full flex items-center justify-center p-5 ">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    ${footer()}
    </div>
  `;

  if (parentElement) parentElement.innerHTML = exchangeWidgetHTML;
}
