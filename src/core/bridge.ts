import { ARCH_HOST, EXPIRATION_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork } from "../utils/network";
import _ from "lodash";
import { checkExpiry } from "../utils/localStorage";
import { bridgeFailed, bridgeLoading, bridgeSuccess } from "../screens";


declare let globalThis: any;

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
      get(`${ARCH_HOST}/v1/activities/status/bridge/${bridgeUuid}`).then(
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
              const status = get(`${ARCH_HOST}/v1/activities/status/bridge/${globalThis.bridgeQuote.quoteUuid}`).then(
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
