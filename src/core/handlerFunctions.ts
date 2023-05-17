import { isNativeToken, maximizeWindow, minimizeWindow, onGetQuote, requiredUsdValue } from "../utils";
import { ACTIVITY_STATUS, EXPIRATION_KEY, gasFeeReservation, MINIMUM_BRIDGE_AMOUNT, ONONGOING_BRIDGE_DATA } from "../constants/server";
import { bridgeInput } from "../screens/bridgeInput";
import { get } from "../utils/fetch";
import { isSwap, isTokenSwapSupported, swapContractAddressCheck } from "../utils";
import { bridgeFailed, bridgeLoading, bridgeSuccess, bridgeSummary } from "../screens";
import _ from "lodash";
import { setLocalStorageExpiry } from "../utils/localStorage";
import { bridge, bridgeSubmit, checkNetwork, swap, switchNetwork } from ".";

declare let globalThis: any;

export const switchTheme = (theme='') => {
  if(!theme) {
    globalThis.theme = globalThis.theme === "light" ? "dark" : "light";
  }
  const root = document.documentElement;
  Object.keys(globalThis.Colors[globalThis.theme]).forEach((cssVar, index) => {
    root.style.setProperty(cssVar, globalThis.Colors[globalThis.theme][cssVar]);
  });
}

export const openChat = () => {
  const client = 'sdk:' + window.location.host;
  const url = globalThis.cypherWalletUrl
  window.open(url + '/?userId=' + globalThis.cypherWalletDetails.address + '&client=' + client, "_blank");
}

export const triggerBridgePopup = (exchangingTokenDetail: any) => {
  const {
    swapSupportedChains,
    toastMixin
  } = globalThis;

  globalThis.exchangingTokenDetail = exchangingTokenDetail;
  const {
    chainDetails: {
      chain_id,
      backendName
    },
    contractAddress,
    name
  } = globalThis.exchangingTokenDetail;

  if (isSwap()) {
    if (swapSupportedChains?.includes(parseInt(chain_id, 16))) {
      const swapSupportedChainList = get(`v1/swap/evm/chains/${parseInt(chain_id, 16)}/tokens`).then(
          function (data) {
            if (isTokenSwapSupported(data.tokens, swapContractAddressCheck(contractAddress, chain_id))) {
              bridgeInput();
            } else {
              toastMixin.fire({
                title: 'Sorry...',
                text: `Swap is not currently supported for ${name} token. Please choose other tokens.`,
                icon: 'error'
              });
            }
          });
    } else {
      toastMixin.fire({
        title: 'Sorry...',
        text: 'Swap is not currently supported for ' + backendName + ' chain. Please choose any token from other chains.',
        icon: 'error'
      });
    }
  } else {
    bridgeInput();
  }
}

export const closePopup = (triggerCallback = false) => {
  const sdkContainer = document.getElementById("sdkContainer");
  sdkContainer?.remove();
  if (triggerCallback) globalThis.cypherWalletDetails.callBack(true);
}

export const onMax = async () => {
  const {
    exchangingTokenDetail: {
      contractAddress,
      chainDetails: {
        backendName
      },
      actualBalance,
      price
    },
    toastMixin
  } = globalThis;

  const reserve = _.get(gasFeeReservation, backendName);
  if (isNativeToken(contractAddress)) {
    if (reserve && (actualBalance * price - reserve)) {
      const usdValueAfterReduction = (actualBalance * price - reserve);
      document.getElementById("bp-amount-value")!.value = usdValueAfterReduction.toFixed(2).toString();
      document.getElementById("bp-token-value")!.innerHTML = (usdValueAfterReduction / price).toFixed(6).toString();
    } else {
      console.log({ titleText: 'Insufficient funds for gas' });
      toastMixin.fire({
        title: 'Oops...',
        text: 'Insufficient funds for gas',
        icon: 'error'
      });
    }
  } else {
    document.getElementById("bp-amount-value")!.value = (actualBalance * price).toFixed(2).toString();
    document.getElementById("bp-token-value")!.innerHTML = (parseFloat(actualBalance) / price).toFixed(6).toString();
  }
}

export const onBridgeClick = async () => {
  const {
    bridgeQuote,
    swapQuoteData,
    requiredTokenDetail,
    exchangingTokenDetail,
    cypherWalletUrl,
    requiredTokenDetail: {
      chainDetails: {
        chain_id
      }
    }
  } = globalThis;

  bridgeLoading();
  if (isSwap()) {
    await swap();
  } else {
    const bridgeResult = bridge().then(async function(response: any) {
      if (response?.message === "success") {
        window.localStorage.setItem(ONONGOING_BRIDGE_DATA, JSON.stringify({bridgeQuoteData: bridgeQuote, swapQuoteData: swapQuoteData, requiredTokenDetail: requiredTokenDetail, exchangingTokenDetail: exchangingTokenDetail, cypherWalletUrl: cypherWalletUrl}));
        setLocalStorageExpiry();
        minimizeWindow();
        const interval = setInterval(() => {
          const status = get(`v1/activities/status/bridge/${bridgeQuote.quoteUuid}`).then(
            async function (data) {
              if (data?.activityStatus?.status === ACTIVITY_STATUS.COMPLETED) {
                window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                window.localStorage.removeItem(EXPIRATION_KEY);
                bridgeSuccess(!await checkNetwork(chain_id));
                clearInterval(interval);
              } else if (data?.activityStatus?.status === ACTIVITY_STATUS.FAILED) {
                window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                window.localStorage.removeItem(EXPIRATION_KEY);
                maximizeWindow();
                bridgeFailed();
              }
            }
          );
        }, 10000);
      }
    });
  }
}

export const bridgeSubmitConditionCheck = async () => {
  const usdValueEntered = document.querySelector("#bp-amount-value")?.value;
  const amountRequired = requiredUsdValue(globalThis.requiredTokenDetail, globalThis.exchangingTokenDetail);
  if (parseFloat(usdValueEntered) >= Math.max(MINIMUM_BRIDGE_AMOUNT, amountRequired)) {
    await bridgeSubmit ();
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: `Please Enter a value greater than the minimum amount ( $${Math.max(10, amountRequired).toFixed(2)} ).`,
      icon: 'error'
    });
  }
}

export const navigateAfterSwitch = async (chainId: string, doNavigateAfterSwitch = true) => {
  const {connector, provider} = globalThis.cypherWalletDetails;
  if(connector && provider){
    await connector.activate(parseInt(chainId));
  }
  else {
    await switchNetwork(chainId);
  }
  if (doNavigateAfterSwitch) {
    await onGetQuote();
    bridgeSummary();
  }
}
