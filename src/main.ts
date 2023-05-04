import store from "./store";
import {
  fetchRequiredTokenDetails,
  fetchTokenData,
  hasSufficientBalance,
  getNativeTokenAddressForHexChainId,
} from "./utils/portfolio";
import _ from "lodash";
import { noBalanceHTML } from "./htmlContents";
import { SUPPORTED_CHAINID_LIST_HEX } from "./constants/server";
import Swal from "sweetalert2";
import web3 from "web3";
import { ethers } from "ethers";
import { DappDetails } from "./interface";
import "./input.css";
import { get, post, request } from "./utils/fetch";
import { Colors } from "./constants/colors";
import { portfolioLoadingHTML } from "./htmlContents/portfolioLoadingHTML";
import { isBridgeOngoing } from "./core/bridge";
import { appendContainerToBody, createContainer } from "./utils/container";

declare let globalThis: any;
const defaultAppId = "123";
const defaultTheme = 'dark'
globalThis.cypherWalletUrl = 'https://www.cypherwallet.io';

export const delayMillis = (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

const noop = (status: boolean) => {
  console.log("🚀 ~ User operation Completed:", status);
};

export const Cypher = async ({
  address,
  targetChainIdHex: fromChainId,
  requiredTokenContractAddress: fromTokenContractAddress,
  requiredTokenBalance,
  isTestnet,
  callBack = noop,
  appId = defaultAppId,
  theme = defaultTheme
}: DappDetails): Promise<void> => {
  if (document.getElementById('popupBackground') !== null) {
    return;
  }
  const walletAddress = address.toLowerCase();
  let requiredToken = fromTokenContractAddress?.toLowerCase();

  //chainId is a required field
  if (!SUPPORTED_CHAINID_LIST_HEX.includes(fromChainId)) {
    console.log(fromChainId + "not supported");
    return;
  }

  //Testnet validation
  if (isTestnet && !["0x5", "0x13881"].includes(fromChainId)) {
    console.log(fromChainId + "not supported for testnet operations");
    return;
  }

  //intialize fromTokenContractAddress for native token
  if (requiredToken === undefined || requiredToken === "") {
    requiredToken = getNativeTokenAddressForHexChainId(fromChainId);
  }

  globalThis.cypherWalletDetails = {
    address: walletAddress.toLowerCase(),
    fromChainId,
    fromTokenContractAddress: requiredToken,
    fromTokenRequiredBalance: requiredTokenBalance,
    callBack,
    appId,
    isTestnet,
  };

  const tailwind = document.createElement("script");
  tailwind.src = "https://cdn.tailwindcss.com";
  tailwind.type = "application/javascript";
  document.getElementsByTagName("head")[0].appendChild(tailwind);

  globalThis.Colors = Colors;
  globalThis.theme = defaultTheme;

  if (!await isBridgeOngoing()) {
    const {popupBackground, sdkContainer, sheet} = createContainer();
    popupBackground.innerHTML = portfolioLoadingHTML;
    appendContainerToBody(popupBackground, sdkContainer, sheet);

    // popupBackground.className = styles.sedhu;
    // popupBackground.innerHTML = bridgeSuccessHTML;
    const fetchBalances = await fetchTokenData(walletAddress.toLowerCase());
    const tokenHoldings = store.getState().portfolioStore;
    // const sheet = document.createElement("style");

    // close on click background of popup
    // popupBackground.addEventListener('click', function(event) {
    //   if (event.target == popupBackground) {
    //     console.log('pressed background');
    //     popupBackground.remove();
    //   }
    // });

    const requiredTokenDetail = await fetchRequiredTokenDetails(
      fromChainId,
      requiredToken
    );
    globalThis.requiredTokenDetail = { ...requiredTokenDetail };

    if (
      requiredTokenBalance === 0 ||
      !(await hasSufficientBalance(
        fromChainId,
        requiredToken,
        requiredTokenBalance
      ))
    ) {
      popupBackground.innerHTML = noBalanceHTML(
        _.get(tokenHoldings, ["tokenPortfolio", "totalHoldings"])
      );
    } else {
      console.log("Hurray!!, you have enough Balance. Continue using the dapp.");
      callBack(true);
    }
    return;
  }
  return;
};
globalThis.Web3 = web3;
Cypher.Swal = Swal;
Cypher.Web3 = web3;
Cypher.ethers = ethers;
Cypher.get = get;
Cypher.post = post;
Cypher.request = request;
Cypher.Colors = Colors.light;
Cypher.theme = 'dark';
// globalThis.cypherWalletUrl = 'https://www.cypherwallet.io';
