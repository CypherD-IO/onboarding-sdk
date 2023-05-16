import { EXPIRATION_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork, fetchCurrentNetwork } from "./network";
import _ from "lodash";
import { checkExpiry } from "../utils/localStorage";
import { bridgeFailed, bridgeLoading, bridgeSuccess, bridgeSummary, switchChain } from "../screens";
import { onDepositFund, onGetQuote } from "../utils";
import { closePopup, send } from ".";


declare let globalThis: any;

export const bridgeSubmit = async () => {
  const chainId = globalThis.exchangingTokenDetail.chainDetails.chain_id;
  const chainName = globalThis.exchangingTokenDetail.chainDetails.backendName;
  const usdValueEntered = document.querySelector("#bp-amount-value")?.value;
  const tokenValueEntered = document.querySelector("#bp-token-value")?.textContent;
  const usdBalance = document.querySelector("#bp-balance-detail-usd-value");
  const numericUsdBalance = parseFloat(usdBalance!.textContent!.slice(1));
  const tokenBalance = document.querySelector("#bp-balance-detail-token-value")?.textContent;
  globalThis.bridgeInputDetails = { usdValueEntered, tokenValueEntered, numericUsdBalance, tokenBalance };
  if (numericUsdBalance >= parseFloat(usdValueEntered)) {
    globalThis.currentChainId = await fetchCurrentNetwork();
    if (await checkNetwork(chainId)) {
      await onGetQuote();
      bridgeSummary();
    } else {
      switchChain();
    }
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: 'Value entered is greater than your balance',
      icon: 'error'
    });
  }
}

export const bridge = async () => {
  const resp: any = await send({
    amountToSend: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
    contractAddress: globalThis.exchangingTokenDetail?.contractAddress,
    toAddress: globalThis.bridgeQuote?.step1TargetWallet,
    chain: globalThis.exchangingTokenDetail?.chainDetails?.backendName,
    contractDecimal: globalThis.exchangingTokenDetail?.contractDecimals,
  });

  return new Promise((resolve)=>{
    if (!resp.isError && resp.hash) {
      const bridgeResponse = onDepositFund(resp?.hash).then(function(response: any) {
          resolve(response);
        }
      );
    } else {
      globalThis.toastMixin.fire({
        title: 'Oops...',
        text: resp?.error?.message.toString(),
        icon: 'error'
      });
      console.log({ titleText: resp?.error?.message.toString() });
      setTimeout(()=>{closePopup()}, 5000);
    }
  });
}

export const isBridgeOngoing = async () => {
  checkExpiry();
  let bridgeUuid;
  let bridgeData = window.localStorage.getItem(ONONGOING_BRIDGE_DATA);
  if (bridgeData) {
    bridgeData = await JSON.parse(bridgeData);
    bridgeUuid = _.get(bridgeData, ['bridgeQuoteData', 'quoteUuid']);
    globalThis.bridgeQuote = _.get(bridgeData, 'bridgeQuoteData');
    globalThis.swapQuoteData = _.get(bridgeData, 'swapQuoteData');
    globalThis.requiredTokenDetail = _.get(bridgeData, 'requiredTokenDetail');
    globalThis.exchangingTokenDetail = _.get(bridgeData, 'exchangingTokenDetail');
    globalThis.cypherWalletUrl = _.get(bridgeData, 'cypherWalletUrl');
    if (bridgeUuid) {
      get(`v1/activities/status/bridge/${bridgeUuid}`).then(
        async function (data) {
          if (data?.activityStatus?.status === "COMPLETED") {
            window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
            window.localStorage.removeItem(EXPIRATION_KEY);
            const {popupBackground, sdkContainer, sheet} = createContainer();
            bridgeSuccess(!await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id), popupBackground);
            sdkContainer.classList.add('blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else if (data?.activityStatus?.status === "FAILED") {
            window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
            window.localStorage.removeItem(EXPIRATION_KEY);
            const {popupBackground, sdkContainer, sheet} = createContainer();
            bridgeFailed(popupBackground);
            sdkContainer.classList.add('blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else {
            const {popupBackground, sdkContainer, sheet} = createContainer();
            bridgeLoading(popupBackground);
            sdkContainer.classList.add('blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
            const interval = setInterval(() => {
              const status = get(`v1/activities/status/bridge/${globalThis.bridgeQuote.quoteUuid}`).then(
                async function (data) {
                  const popupBackground = document.getElementById("popupBackground");
                  if(popupBackground) {
                    if (data?.activityStatus?.status === "COMPLETED") {
                      window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                      window.localStorage.removeItem(EXPIRATION_KEY);
                      bridgeSuccess(!await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id));
                      clearInterval(interval);
                    } else if (data?.activityStatus?.status === "FAILED") {
                      window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                      window.localStorage.removeItem(EXPIRATION_KEY);
                      bridgeFailed();
                    }
                  }
                });
            }, 10000);
          }
          return true;
        });
      return true;
    }
  }
  return false;
}
