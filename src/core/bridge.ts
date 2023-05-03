import { ARCH_HOST, ONGOING_BRIDGE_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server"
import { bridgeFailedHTML, bridgeFailedHTMLCopy, bridgeLoadingHTML, bridgeLoadingHTMLCopy, bridgeSuccessHTML, bridgeSuccessHTMLCopy, switchBackHTML, switchBackHTMLCopy } from "../htmlContents";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork } from "../utils/network";
import _ from "lodash";


declare let globalThis: any;

export const isBridgeOngoing = async () => {
  const bridgeUuid = window.localStorage.getItem(ONGOING_BRIDGE_KEY);
  let bridgeData = window.localStorage.getItem(ONONGOING_BRIDGE_DATA);
  console.log('local storage :: ', bridgeUuid, bridgeData);
  // 'bridgeQuoteData': globalThis?.bridgeQuote, 'swapQuoteData': globalThis?.swapQuoteData, 'requiredTokenDetail': globalThis?.requiredTokenDetail
  if (bridgeData) {
    bridgeData = JSON.parse(bridgeData);
    console.log('fetched from localstorage :', bridgeData);
    console.log('local storage log : ', _.get(bridgeData, 'bridgeQuoteData'));
    if (!(globalThis?.bridgeQuote || globalThis?.swapQuoteData) || !globalThis?.requiredTokenDetail) {
      globalThis.bridgeQuote = _.get(bridgeData, 'bridgeQuoteData');
      globalThis.swapQuoteData = _.get(bridgeData, 'swapQuoteData');
      globalThis.requiredTokenDetail = _.get(bridgeData, 'requiredTokenDetail');
    }
  }

  if (bridgeUuid) {
    get(ARCH_HOST + '/v1/activities/status/bridge/' + bridgeUuid).then(
      async function (data) {
        console.log('bidge status fetched :: ', data?.activityStatus?.status)
        if (data?.activityStatus?.status === "COMPLETED") {
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
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
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
          const {popupBackground, sdkContainer, sheet} = createContainer();
          popupBackground.innerHTML = bridgeFailedHTMLCopy;
          appendContainerToBody(popupBackground, sdkContainer, sheet);
        } else {
          const {popupBackground, sdkContainer, sheet} = createContainer();
          popupBackground.innerHTML = bridgeLoadingHTMLCopy;
          appendContainerToBody(popupBackground, sdkContainer, sheet);
        }
        return true;
      });
    return true;
  }
  return false;
}
