import { getOptionImage, getOptionName, isNativeToken, maximizeWindow, minimizeWindow, onGetQuote, requiredUsdValue } from "../utils";
import { ACTIVITY_STATUS, EXPIRATION_KEY, gasFeeReservation, MINIMUM_BRIDGE_AMOUNT, ONONGOING_BRIDGE_DATA } from "../constants/server";
import { bridgeInput } from "../screens/bridgeInput";
import { get } from "../utils/fetch";
import { isSwap, isTokenSwapSupported, swapContractAddressCheck } from "../utils";
import { bridgeFailed, bridgeLoading, bridgeSuccess, bridgeSummary } from "../screens";
import _ from "lodash";
import { setLocalStorageExpiry } from "../utils/localStorage";
import { bridge, bridgeSubmit, checkNetwork, swap, switchNetwork } from ".";
import { tokenDropdown } from "../components";

declare let globalThis: any;

export const switchTheme = (theme = '') => {
  if (!theme) {
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
  const sdkContainer = document.getElementById("cyd-sdkContainer");
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
      document.getElementById("cyd-bp-amount-value")!.value = usdValueAfterReduction.toFixed(2);
      document.getElementById("cyd-bp-token-value")!.textContent = (usdValueAfterReduction / price).toFixed(4);
    } else {
      console.log({ titleText: 'Insufficient funds for gas' });
      toastMixin.fire({
        title: 'Oops...',
        text: 'Insufficient funds for gas',
        icon: 'error'
      });
    }
  } else {
    document.getElementById("cyd-bp-amount-value")!.value = (actualBalance * price).toFixed(2);
    document.getElementById("cyd-bp-token-value")!.textContent = (parseFloat(actualBalance) / price).toFixed(4);
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
    const bridgeResult = bridge().then(async function (response: any) {
      if (globalThis.cypherWalletDetails.production ? response?.message === 'success' : response?.message) {
        window.localStorage.setItem(ONONGOING_BRIDGE_DATA, JSON.stringify({ bridgeQuoteData: bridgeQuote, swapQuoteData: swapQuoteData, requiredTokenDetail: requiredTokenDetail, exchangingTokenDetail: exchangingTokenDetail, cypherWalletUrl: cypherWalletUrl }));
        setLocalStorageExpiry();
        minimizeWindow();
        const interval = setInterval(() => {
          const status = get(`v1/activities/status/bridge/${bridgeQuote.quoteUuid}`).then(
            async function (data) {
              if (data?.activityStatus?.status === ACTIVITY_STATUS.COMPLETED) {
                window.localStorage.removeItem(ONONGOING_BRIDGE_DATA);
                window.localStorage.removeItem(EXPIRATION_KEY);
                maximizeWindow();
                bridgeSuccess(!(await checkNetwork(chain_id)));
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
  const usdValueEntered = document.querySelector("#cyd-bp-amount-value")?.value;
  const amountRequired = requiredUsdValue(globalThis.requiredTokenDetail, globalThis.exchangingTokenDetail);
  if (parseFloat(usdValueEntered) >= Math.max(MINIMUM_BRIDGE_AMOUNT, amountRequired)) {
    await bridgeSubmit();
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: `Please Enter a value greater than the minimum amount ( $${Math.max(10, amountRequired).toFixed(2)} ).`,
      icon: 'error'
    });
  }
}

export const navigateAfterSwitch = async (chainId: string, doNavigateAfterSwitch = true) => {
  const { connector, provider } = globalThis.cypherWalletDetails;
  if (connector && provider) {
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

export const onClickDropdownOption = (params: any) => {
  document.getElementById(params.dropdownId + "-selected")!.innerText = getOptionName(params.dropdownId, params.value);
  document.getElementById(params.dropdownId + "-selected-img")!.src = getOptionImage(params.dropdownId, params.value);
  if (params.dropdownId === "cyd-from-chain-dropdown-option") {
    globalThis.cydChoosenFromChain = params.value;
    globalThis.exchangingTokenDetail = _.get(globalThis.bridgeableTokensListChainWise, [params.value, 0]);
    document.getElementById("cyd-from-token-dropdown")!.innerHTML = tokenDropdown(_.get(globalThis.bridgeableTokensListChainWise, [params.value]), "cyd-from-token-dropdown-option");
    document.getElementById('cyd-choosen-token-usd-balance')!.innerHTML = '$' + (_.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'actualBalance']) * _.get(globalThis.bridgeableTokensListChainWise, [params.value.toUpperCase(), 0, 'price'])).toFixed(2);
    document.getElementById('cyd-choosen-token-balance')!.innerHTML = (_.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'actualBalance'])).toFixed(4);
    document.getElementById('cyd-choosen-token-name')!.innerHTML = _.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'name']);
    document.getElementById('cyd-choosen-token-logo')!.src = _.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'logoUrl']);
    document.getElementById('cyd-choosen-token')!.innerHTML = _.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'name']);
    document.getElementById('cyd-bp-choosen-token-symbol')!.innerHTML = _.get(globalThis.bridgeableTokensListChainWise, [params.value, 0, 'symbol']);
  } else if (params.dropdownId === "cyd-from-token-dropdown-option") {
    globalThis.exchangingTokenDetail = params.value;
    document.getElementById('cyd-choosen-token-usd-balance')!.innerHTML = '$' + (_.get(params.value, ['actualBalance']) * _.get(params.value, ['price'])).toFixed(2);
    document.getElementById('cyd-choosen-token-balance')!.innerHTML = (_.get(params.value, ['actualBalance'])).toFixed(4);
    document.getElementById('cyd-choosen-token-name')!.innerHTML = _.get(params.value, ['name']);
    document.getElementById('cyd-choosen-token-logo')!.src = _.get(params.value, ['logoUrl']);
    document.getElementById('cyd-choosen-token')!.innerHTML = _.get(params.value, ['name']);
    document.getElementById('cyd-bp-choosen-token-symbol')!.innerHTML = _.get(params.value, ['symbol']);
  } else if (params.dropdownId === "cyd-to-chain-dropdown-option") {
    globalThis.cydChoosenToChain = params.value;
  } else if (params.dropdownId === "cyd-to-token-dropdown-option") {
    globalThis.requiredTokenDetail = params.value;
  }
  document.getElementById(params.dropdownId)?.classList.toggle("hidden");
}
