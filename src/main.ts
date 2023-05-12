import store from "./store";
import {
  fetchRequiredTokenDetails,
  fetchTokenData,
  hasSufficientBalance,
  getNativeTokenAddressForHexChainId,
  get,
  post,
  request,
  clickHandler,
  updateUsdValue,
  onFocusInput,
  onBlurInput
} from "./utils";
import _ from "lodash";
import { addTailwindScript } from "./scriptContents";
import { noBalanceCSS } from "./cssContents";
import { SUPPORTED_CHAINID_LIST_HEX } from "./constants/server";
import Swal from "sweetalert2";
import web3 from "web3";
import { ethers } from "ethers";
import { DappDetails } from "./interface";
import "./input.css";
import { Colors } from "./constants/colors";
import { portfolioBalance } from "./screens/portfolioBalance";
import { portfolioLoading } from "./screens/portfolioLoading";

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
    showInfoScreen
  };

  const tailwind = document.createElement("script");
  tailwind.src = "https://cdn.tailwindcss.com";
  tailwind.type = "application/javascript";
  document.getElementsByTagName("head")[0].appendChild(tailwind);

  const popupBackground = document.createElement("div");
  popupBackground.id = "popupBackground";
  popupBackground.addEventListener("click", (event) => {clickHandler(event)});
  popupBackground.addEventListener("input",updateUsdValue);
  popupBackground.addEventListener("onfocus", (e) => onFocusInput(e));
  popupBackground.addEventListener("onblur", (e) => onBlurInput(e));



  const sdkContainer = document.createElement("div");
  sdkContainer.id = "sdkContainer";

  const sheet = document.createElement("style");

  if (!showInfoScreen){
    portfolioLoading(popupBackground);
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
    range.createContextualFragment(addTailwindScript())
  );

  // fetch balance call
  await fetchTokenData(walletAddress.toLowerCase());
  const tokenHoldings = store.getState().portfolioStore;

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
    portfolioBalance(_.get(tokenHoldings, ["tokenPortfolio", "totalHoldings"]));
  } else {
    sdkContainer.remove();
    console.log("Hurray!!, you have enough Balance. Continue using the dapp.");
    callBack(true);
  }

  globalThis.toastMixin = globalThis.Cypher.Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.addEventListener('mouseenter', globalThis.Cypher.Swal.stopTimer)
      toast.addEventListener('mouseleave', globalThis.Cypher.Swal.resumeTimer)
    }
  });
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
