import store from "./store";
import {
  fetchRequiredTokenDetails,
  fetchTokenData,
  hasSufficientBalance,
  getNativeTokenAddressForHexChainId,
} from "./utils/portfolio";
import _ from "lodash";
import { noBalanceScript } from "./scriptContents";
import { noBalanceCSS } from "./cssContents";
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
import { noBalanceHTML2 } from "./htmlContents/noBalance2";

declare let globalThis: any;
const defaultAppId = "123";
const defaultTheme = 'dark';

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
  connector = undefined,
  provider = undefined,
  appId = defaultAppId,
  theme = defaultTheme,
  showInfoScreen = false,
}: DappDetails): Promise<void> => {
  if (document.getElementById('popupBackground') !== null) {
    return;
  }
  await delayMillis(1000);
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
    connector,
    provider,
    appId,
    isTestnet,
  };

  const tailwind = document.createElement("script");
  tailwind.src = "https://cdn.tailwindcss.com";
  tailwind.type = "application/javascript";
  document.getElementsByTagName("head")[0].appendChild(tailwind);

  const popupBackground = document.createElement("div");
  popupBackground.id = "popupBackground";
  const sdkContainer = document.createElement("div");
  sdkContainer.id = "sdkContainer";

  const sheet = document.createElement("style");

  if (!showInfoScreen){
    popupBackground.innerHTML = portfolioLoadingHTML;
    sdkContainer.classList.add('blurredBackdrop');
  }

  sdkContainer.appendChild(popupBackground);
  sheet.innerHTML = noBalanceCSS;
  globalThis.document.body.appendChild(sdkContainer);

  globalThis.document.body.appendChild(sheet);


  const range = document.createRange();
  range.setStart(globalThis.document.body, 0);
  globalThis.Colors = Colors;
  globalThis.theme = theme;
  globalThis.document.body.appendChild(
    range.createContextualFragment(noBalanceScript())
  );

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
    sdkContainer.classList.add('blurredBackdrop');
    noBalanceHTML2(popupBackground,
      _.get(tokenHoldings, ["tokenPortfolio", "totalHoldings"]), showInfoScreen
    );
  } else {
    sdkContainer.remove();
    console.log("Hurray!!, you have enough Balance. Continue using the dapp.");
    callBack(true);
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
globalThis.cypherWalletUrl = 'https://www.cypherwallet.io';
