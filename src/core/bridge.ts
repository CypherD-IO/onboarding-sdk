import { ARCH_HOST, ONGOING_BRIDGE_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server"
import { bridgeFailedHTMLCopy, bridgeLoadingHTMLCopy, bridgeSuccessHTMLCopy, switchBackHTMLCopy } from "../htmlContents";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork } from "../utils/network";
import _ from "lodash";
import { checkExpiry } from "../utils/localStorage";


declare let globalThis: any;

export const isBridgeOngoing = async () => {
  checkExpiry();
  const bridgeUuid = window.localStorage.getItem(ONGOING_BRIDGE_KEY);
  let bridgeData = window.localStorage.getItem(ONONGOING_BRIDGE_DATA);
  if (bridgeData) {
    bridgeData = JSON.parse(bridgeData);
    if (!(globalThis?.bridgeQuote || globalThis?.swapQuoteData) || !globalThis?.requiredTokenDetail) {
      globalThis.bridgeQuote = _.get(bridgeData, 'bridgeQuoteData');
      globalThis.swapQuoteData = _.get(bridgeData, 'swapQuoteData');
      globalThis.requiredTokenDetail = _.get(bridgeData, 'requiredTokenDetail');
    }
  }

  if (bridgeUuid) {
    get(ARCH_HOST + '/v1/activities/status/bridge/' + bridgeUuid).then(
      async function (data) {
        if (data?.activityStatus?.status === "COMPLETED") {
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
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
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
          window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
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
