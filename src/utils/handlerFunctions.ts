import { bridge, bridgeSubmit, checkNetwork, isNativeToken, maximizeWindow, minimizeWindow, onGetQuote, requiredUsdValue, swap, switchNetwork } from ".";
import { ARCH_HOST, EXPIRATION_KEY, gasFeeReservation, MINIMUM_BRIDGE_AMOUNT, ONONGOING_BRIDGE_DATA } from "../constants/server";
import { bridgeInput } from "../screens/bridgeInput";
import { get } from "./fetch";
import { isSwap, isTokenSwapSupported, swapContractAddressCheck } from ".";
import { bridgeFailed, bridgeLoading, bridgeSuccess, bridgeSummary } from "../screens";
import _ from "lodash";
import { setLocalStorageExpiry } from "./localStorage";

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

export const continueToPortfolio = () => {
  const bridgeInfo = document.getElementById('bridge-info');
  const popup = document.getElementById('popup');
  bridgeInfo!.style.display = 'none';
  popup!.style.display = 'flex';
}

export const triggerBridgePopup = () => {
  globalThis.exchangingTokenDetail = _.get(globalThis.bridgeableTokensList, (event.target.parentNode.parentNode).querySelector("#td-token-name").innerHTML.toLowerCase());
  if (isSwap()) {
    if (globalThis.swapSupportedChains?.includes(parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16))) {
      const swapSupportedChainList = get(`${ARCH_HOST}/v1/swap/evm/chains/${parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16)}/tokens`).then(
          function (data) {
            if (isTokenSwapSupported(data.tokens, swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id))) {
              bridgeInput();
            } else {
              globalThis.toastMixin.fire({
                title: 'Sorry...',
                text: `Swap is not currently supported for ${globalThis.exchangingTokenDetail.name} token. Please choose other tokens.`,
                icon: 'error'
              });
            }
          });
    } else {
      globalThis.toastMixin.fire({
        title: 'Sorry...',
        text: 'Swap is not currently supported for ' + globalThis.exchangingTokenDetail.chainDetails.backendName + ' chain. Please choose any token from other chains.',
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
  const reserve = _.get(gasFeeReservation, globalThis.exchangingTokenDetail.chainDetails.backendName);
  if (isNativeToken(globalThis.exchangingTokenDetail?.contractAddress)) {
    if (reserve && (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price - reserve)) {
      const usdValueAfterReduction = (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price - reserve);
      document.getElementById("bp-amount-value")!.value = usdValueAfterReduction.toFixed(2).toString();
      document.getElementById("bp-token-value")!.textContent = (usdValueAfterReduction / globalThis.exchangingTokenDetail.price).toFixed(6).toString();
    } else {
      console.log({ titleText: 'Insufficient funds for gas' });
      globalThis.toastMixin.fire({
        title: 'Oops...',
        text: 'Insufficient funds for gas',
        icon: 'error'
      });
    }
  } else {
    document.getElementById("bp-amount-value")!.value = (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price).toFixed(2).toString();
    document.getElementById("bp-token-value")!.textContent = (parseFloat(globalThis.exchangingTokenDetail.actualBalance) / globalThis.exchangingTokenDetail.price).toFixed(6).toString();
  }
}

export const onBridgeClick = async () => {
  bridgeLoading();
  if (isSwap()) {
    await swap();
  } else {
    const bridgeResult = bridge().then(async function(response: any) {
      if (response?.message === "success") {
        window.localStorage.setItem(ONONGOING_BRIDGE_DATA, JSON.stringify({bridgeQuoteData: globalThis?.bridgeQuote, swapQuoteData: globalThis?.swapQuoteData, requiredTokenDetail: globalThis?.requiredTokenDetail, exchangingTokenDetail: globalThis?.exchangingTokenDetail, cypherWalletUrl: globalThis?.cypherWalletUrl}));
        setLocalStorageExpiry();
        minimizeWindow();
        const interval = setInterval(() => {
          const status = get(`${ARCH_HOST}/v1/activities/status/bridge/${globalThis.bridgeQuote.quoteUuid}`).then(
            async function (data) {
              if (data?.activityStatus?.status === "COMPLETED") {
                window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                window.localStorage.removeItem(EXPIRATION_KEY);
                bridgeSuccess(!await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id));
                clearInterval(interval);
              } else if (data?.activityStatus?.status === "FAILED") {
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

export const navigateAfterSwitch = async (chainId: string) => {
  const {connector, provider} = globalThis.cypherWalletDetails;
  if(connector && provider){
    await connector.activate(parseInt(chainId));
  }
  else {
    await switchNetwork(chainId);
  }
  await onGetQuote();
  bridgeSummary();
}
