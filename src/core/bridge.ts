import { ACTIVITY_STATUS, EXPIRATION_KEY, ONGOING_BRIDGE_DATA } from "../constants/server";
import { appendContainerToBody, createContainer } from "../utils/container";
import { get } from "../utils/fetch";
import { checkNetwork, fetchCurrentNetwork } from "./network";
import _ from "lodash";
import { checkExpiry } from "../utils/localStorage";
import { bridgeFailed, bridgeLoading, bridgeSuccess, bridgeSummary, switchChain } from "../screens";
import { maximizeWindow, minimizeWindow, onDepositFund, onGetQuote } from "../utils";
import { closePopup, send } from ".";


declare let globalThis: any;

export const bridgeSubmit = async () => {
  const chainId = globalThis.exchangingTokenDetail.chainDetails.chain_id;
  const usdValueEntered = document.querySelector("#cyd-bp-amount-value")?.value;
  const tokenValueEntered = document.querySelector("#cyd-bp-token-value")?.textContent;
  const numericUsdBalance = parseFloat((globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price).toFixed(2));
  const tokenBalance = parseFloat(globalThis.exchangingTokenDetail.actualBalance).toFixed(6);
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
  const {
    bridgeInputDetails: {
      tokenValueEntered
    },
    bridgeQuote: {
      step1TargetWallet
    },
    exchangingTokenDetail: {
      contractAddress,
      chainDetails: {
        backendName,
      },
      contractDecimals
    }
  } = globalThis;

  const resp: any = await send({
    amountToSend: parseFloat(tokenValueEntered),
    contractAddress: contractAddress,
    toAddress: step1TargetWallet,
    chain: backendName,
    contractDecimal: contractDecimals,
    isBridge: true,
  });

  return new Promise((resolve) => {
    if (!resp.isError && resp.hash) {
      const bridgeResponse = onDepositFund(resp?.hash).then(function (response: any) {
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
      setTimeout(() => { closePopup() }, 5000);
    }
  });
}

export const isBridgeOngoing = async () => {
  checkExpiry();
  let bridgeUuid;
  let bridgeData = window.localStorage.getItem(ONGOING_BRIDGE_DATA);
  if (bridgeData) {
    bridgeData = await JSON.parse(bridgeData);
    bridgeUuid = _.get(bridgeData, ['bridgeQuoteData', 'quoteUuid']);
    globalThis.bridgeQuote = _.get(bridgeData, 'bridgeQuoteData');
    globalThis.swapQuoteData = _.get(bridgeData, 'swapQuoteData');
    globalThis.requiredTokenDetail = _.get(bridgeData, 'requiredTokenDetail');
    globalThis.exchangingTokenDetail = _.get(bridgeData, 'exchangingTokenDetail');
    globalThis.cypherWalletUrl = _.get(bridgeData, 'cypherWalletUrl');
    globalThis.cypherWalletDetails = _.get(bridgeData, 'cypherWalletDetails');
    if (bridgeUuid) {
      get(`v1/activities/status/bridge/${bridgeUuid}`).then(
        async function (data) {
          if (data?.activityStatus?.status === ACTIVITY_STATUS.COMPLETED) {
            window.localStorage.removeItem(ONGOING_BRIDGE_DATA);
            window.localStorage.removeItem(EXPIRATION_KEY);
            const { popupBackground, sdkContainer, sheet } = createContainer();
            bridgeSuccess(!(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)), popupBackground);
            sdkContainer.classList.add('cyd-blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else if (data?.activityStatus?.status === ACTIVITY_STATUS.FAILED) {
            window.localStorage.removeItem(ONGOING_BRIDGE_DATA);
            window.localStorage.removeItem(EXPIRATION_KEY);
            const { popupBackground, sdkContainer, sheet } = createContainer();
            bridgeFailed(popupBackground);
            sdkContainer.classList.add('cyd-blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
          } else {
            const { popupBackground, sdkContainer, sheet } = createContainer();
            bridgeLoading(popupBackground);
            sdkContainer.classList.add('cyd-blurredBackdrop');
            appendContainerToBody(popupBackground, sdkContainer, sheet);
            minimizeWindow();
            const interval = setInterval(() => {
              const status = get(`v1/activities/status/bridge/${globalThis.bridgeQuote.quoteUuid}`).then(
                async function (data) {
                  const popupBackground = document.getElementById("cyd-popup-background");
                  if (popupBackground) {
                    if (data?.activityStatus?.status === ACTIVITY_STATUS.COMPLETED) {
                      window.localStorage.removeItem(ONGOING_BRIDGE_DATA);
                      window.localStorage.removeItem(EXPIRATION_KEY);
                      maximizeWindow();
                      bridgeSuccess(!(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)));
                      clearInterval(interval);
                    } else if (data?.activityStatus?.status === ACTIVITY_STATUS.FAILED) {
                      window.localStorage.removeItem(ONGOING_BRIDGE_DATA);
                      window.localStorage.removeItem(EXPIRATION_KEY);
                      maximizeWindow();
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
