import { ARCH_HOST, ONONGOING_BRIDGE_DATA } from "../constants/server"
import { bridgeFailedHTMLCopy, bridgeLoadingHTMLCopy, bridgeSuccessHTMLCopy, switchBackHTMLCopy } from "../htmlContents";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork } from "../utils/network";
import _ from "lodash";
import { checkExpiry } from "../utils/localStorage";


declare let globalThis: any;

export const isBridgeOngoing = async () => {
  checkExpiry();
  let bridgeUuid;
  let bridgeData = window.localStorage.getItem(ONONGOING_BRIDGE_DATA);
  if (bridgeData) {
    bridgeData = JSON.parse(bridgeData);
    if (!(globalThis?.bridgeQuote || globalThis?.swapQuoteData) || !globalThis?.requiredTokenDetail || !globalThis.cypherWalletUrl) {
      bridgeUuid = _.get(bridgeData, ['bridgeQuoteData', 'quoteUuid']);
      globalThis.bridgeQuote = _.get(bridgeData, 'bridgeQuoteData');
      globalThis.swapQuoteData = _.get(bridgeData, 'swapQuoteData');
      globalThis.requiredTokenDetail = _.get(bridgeData, 'requiredTokenDetail');
      globalThis.cypherWalletUrl = _.get(bridgeData, 'cypherWalletUrl');
    }

    console.log('RETRIEVED : bridge quote', globalThis.bridgeQuote, 'swap quote', globalThis.swapQuoteData, 'required token detail', globalThis.requiredTokenDetail,'cypherURL',  globalThis.cypherWalletUrl);

    if (bridgeUuid) {
      get(ARCH_HOST + '/v1/activities/status/bridge/' + bridgeUuid).then(
        async function (data) {
          if (data?.activityStatus?.status === "COMPLETED") {
            window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
            if(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)) {
              const {popupBackground, sdkContainer, sheet} = createContainer();
              popupBackground.innerHTML = bridgeSuccessHTMLCopy;
              appendContainerToBody(popupBackground, sdkContainer, sheet);
            } else {
              const {popupBackground, sdkContainer, sheet} = createContainer();
              popupBackground.innerHTML = switchBackHTMLCopy;
              appendContainerToBody(popupBackground, sdkContainer, sheet);
            }
          } else if (data?.activityStatus?.status === "FAILED") {
            window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
            const {popupBackground, sdkContainer, sheet} = createContainer();
            popupBackground.innerHTML = bridgeFailedHTMLCopy;
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else {
            const {popupBackground, sdkContainer, sheet} = createContainer();
            console.log('here now');
            popupBackground.innerHTML = bridgeLoadingHTMLCopy;
            appendContainerToBody(popupBackground, sdkContainer, sheet);
            const interval = setInterval(() => {
              const status = get(`${ARCH_HOST}/v1/activities/status/bridge/` + globalThis.bridgeQuote.quoteUuid).then(
                async function (data) {
                  const popupBackground = document.getElementById("popupBackground");
                  if(popupBackground) {
                    if (data?.activityStatus?.status === "COMPLETED") {
                      window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                      if(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)) {
                        popupBackground.innerHTML = bridgeSuccessHTMLCopy;
                      } else {
                        popupBackground.innerHTML = switchBackHTMLCopy;
                      }
                      clearInterval(interval);
                    } else if (data?.activityStatus?.status === "FAILED") {
                      window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                      popupBackground.innerHTML = bridgeFailedHTMLCopy;
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
