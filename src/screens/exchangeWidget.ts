import _ from "lodash";
import { chainDropdown, footer, tokenDropdown } from "../components";

declare let globalThis: any;

export const exchangeWidget = (
  parentElement = document.getElementById("cyd-popup-background")
) => {
  let bridgableChainList: any[] = [];
  globalThis.bridgeableTokensListChainWise =
    globalThis.bridgeableTokensList.reduce(function (obj: any, token: any) {
      bridgableChainList.push(token.chainDetails.backendName.toLowerCase());
      if (token.chainDetails.backendName in obj) {
        obj[token.chainDetails.backendName].push(_.omit(token, "about"));
      } else {
        obj[token.chainDetails.backendName] = [_.omit(token, "about")];
      }
      return obj;
    }, {});
  globalThis.cydChoosenFromChain = bridgableChainList[0];
  globalThis.exchangingTokenDetail = _.get(
    globalThis.bridgeableTokensListChainWise,
    [globalThis.cydChoosenFromChain.toUpperCase(), 0]
  );
  const bridgableChainSet = new Set(bridgableChainList);
  bridgableChainList = [...bridgableChainSet];

  const exchangeWidgetHTML = `
    <div class="cyd-bg-primaryBg cyd-rounded-[30px] cyd-overflow-auto" id="cyd-exchange-widget">
      <div class="cyd-m-[15px] md:cyd-m-[15px] md:cyd-mb-[20px] cyd-flex cyd-flex-col cyd-items-center cyd-justify-center cyd-font-nunito cyd-bg-primaryBg">
        <div class="cyd-py-3 cyd-bg-grayBg cyd-rounded-xl cyd-w-full cyd-flex cyd-flex-col cyd-items-center cyd-justify-center cyd-relative">
          <div class="cyd-w-[90%] cyd-sm:w-[70%] md:cyd-m-[10px]">
            <div class="cyd-text-center cyd-text-primaryText cyd-font-extrabold cyd-mb-2 cyd-text-[16px]"> FROM</div>
            <div id="cyd-from-chain-dropdown" class="cyd-mt-1 md:cyd-mt-2">
              ${chainDropdown(
                bridgableChainList,
                "cyd-from-chain-dropdown-option"
              )}
            </div>

            <div id="cyd-from-token-dropdown" class="cyd-mt-5">
              ${tokenDropdown(
                _.get(globalThis.bridgeableTokensListChainWise, [
                  globalThis.cydChoosenFromChain.toUpperCase(),
                ]),
                "cyd-from-token-dropdown-option"
              )}
            </div>
          </div>

          <div class="cyd-bg-[#DDDDDD] cyd-h-0.5 cyd-w-10/12 cyd-my-3">
          </div>

          <div class="cyd-w-[90%] cyd-sm:w-[70%]">
            <div class="cyd-text-center cyd-font-extrabold cyd-text-[16px] cyd-text-primaryText"> TO</div>

            <div class="cyd-mt-3" id="cyd-to-chain-dropdown">
              ${chainDropdown(
                [
                  globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase(),
                ],
                "cyd-to-chain-dropdown-option",
                true
              )}
            </div>

            <div class="cyd-mt-5" id="cyd-to-token-dropdown">
              ${tokenDropdown(
                [globalThis.requiredTokenDetail],
                "cyd-to-token-dropdown-option",
                true
              )}
            </div>

            <div id="cyd-choosen-token" class="cyd-font-extrabold cyd-text-primaryText cyd-text-[14px] cyd-text-center cyd-mt-3 cyd-mb-1">
              ${_.get(globalThis.bridgeableTokensListChainWise, [
                globalThis.cydChoosenFromChain.toUpperCase(),
                0,
                "name",
              ])}
            </div>
            <div
              class="cyd-flex cyd-justify-center cyd-items-center cyd-w-full">
              <div
                class="cyd--bp-max-button cyd-text-black cyd-flex cyd-items-center cyd-justify-center cyd-w-6 cyd-h-6 md:cyd-w-10 md:cyd-h-10 cyd-rounded-full cyd-bg-white cyd-text-[8px] md:cyd-text-[14px] cyd-font-semibold cyd-cursor-pointer cyd-cursor-pointer"
              >
                Max
              </div>
              <div class="cyd-flex cyd-justify-center cyd-w-[70%]">
                <input
                  id="cyd-bp-amount-value"
                  class="cyd-bg-grayBg cyd-w-full cyd-text-center cyd-text-[42px] cyd-font-bold cyd-h-[5rem] focus:cyd-outline-none cyd-text-primaryText cyd-placeholder:text-secondaryText"
                  placeholder="0.00"
                  type="number"
                />
              </div>
              <div class="cyd-text-[14px] cyd-text-primaryText cyd-font-semibold cyd-text-center">
                USD
              </div>
            </div>
            <div class="cyd-flex cyd-flex-row cyd-justify-center cyd-text-[14px] cyd-text-primaryText cyd-font-regular cyd-text-center">
              ≈ &nbsp;
              <p id="cyd-bp-token-value">00</p> &nbsp;
              <p id="cyd-bp-choosen-token-symbol">${_.get(
                globalThis.bridgeableTokensListChainWise,
                [globalThis.cydChoosenFromChain.toUpperCase(), 0, "symbol"]
              )}</p>
            </div>
            <div class="cyd-flex cyd-flex-row cyd-justify-center cyd-text-lg cyd-text-primaryText cyd-font-regular cyd-text-center cyd-my-4 md:cyd-mb-8">
              <div class="cyd-bg-primaryBg cyd-border cyd-border-borderColor cyd-p-2 cyd-flex cyd-items-center cyd-rounded-[10px] cyd-w-[90%] cyd-h-[60px]">
                <img id="cyd-choosen-token-logo" src="${_.get(
                  globalThis.bridgeableTokensListChainWise,
                  [globalThis.cydChoosenFromChain.toUpperCase(), 0, "logoUrl"]
                )}"
                  class="cyd-h-[25px] cyd-w-[25px] cyd-rounded-full">
                <div class="cyd-w-full cyd-ml-3 cyd-flex cyd-flex-col">
                  <div id="cyd-bp-balance-detail-usd" class="cyd-flex cyd-justify-between">
                    <p class="cyd-text-primaryText cyd-text-[10px] cyd-sm:text-[12px] cyd-font-semibold">YOUR BALANCE : </p>
                    <p class="cyd-text-primaryText cyd-text-[12px] cyd-font-semibold" id="cyd-choosen-token-usd-balance">$ ${(
                      _.get(globalThis.bridgeableTokensListChainWise, [
                        globalThis.cydChoosenFromChain.toUpperCase(),
                        0,
                        "actualBalance",
                      ]) *
                      _.get(globalThis.bridgeableTokensListChainWise, [
                        globalThis.cydChoosenFromChain.toUpperCase(),
                        0,
                        "price",
                      ])
                    ).toFixed(2)}</p>
                  </div>
                  <div id="cyd-bp-balance-detail-token" class="cyd-flex cyd-justify-between cyd-h-[25px]">
                    <p id="cyd-choosen-token-name" class="cyd-text-[#929292] cyd-text-[10px] cyd-sm:text-[12px] cyd-font-normal">${_.get(
                      globalThis.bridgeableTokensListChainWise,
                      [globalThis.cydChoosenFromChain.toUpperCase(), 0, "name"]
                    )}</p>
                    <p class="cyd-text-[#929292] cyd-text-[12px] cyd-font-normal" id="cyd-choosen-token-balance">${_.get(
                      globalThis.bridgeableTokensListChainWise,
                      [
                        globalThis.cydChoosenFromChain.toUpperCase(),
                        0,
                        "actualBalance",
                      ]
                    ).toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cyd-w-1/2 cyd-absolute cyd--bottom-6 md:cyd--bottom-6 cyd-cursor-pointer cyd-rounded-xl cyd-flex cyd-items-center cyd-justify-center hover:cyd-scale-105 cyd-transform:ease-in-out cyd-duration-200 cyd-bg-appBg">
            <button class="cyd-bridge-input-submit cyd-text-black cyd-w-full cyd-h-[20px] cyd-flex cyd-items-center cyd-justify-center cyd-p-5 ">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    ${footer()}
    </div>
  `;

  if (parentElement) parentElement.innerHTML = exchangeWidgetHTML;
};
