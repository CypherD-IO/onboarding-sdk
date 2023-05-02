import { ARCH_HOST, ONGOING_BRIDGE_KEY } from "../constants/server"
import { bridgeSuccessHTML, switchBackHTML } from "../htmlContents";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork } from "../utils/network";

declare let globalThis: any;

export const isBridgeOngoing = () => {
  const bridgeUuid = window.localStorage.getItem(ONGOING_BRIDGE_KEY);
  if (bridgeUuid) {
    const status = get(ARCH_HOST + '/v1/activities/status/bridge/' + bridgeUuid).then(
      async function (data) {
        if (data?.activityStatus?.status === "COMPLETED") {
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
          if(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)) {
            const {popupBackground, sdkContainer, sheet} = createContainer();
            popupBackground.innerHTML = bridgeSuccessHTML;
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else {
            const {popupBackground, sdkContainer, sheet} = createContainer();
            popupBackground.innerHTML = switchBackHTML;
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          }
        } else if (data?.activityStatus?.status === "FAILED") {
          window.localStorage.removeItem(ONGOING_BRIDGE_KEY);
        }
      });
  }
  return false;
}
