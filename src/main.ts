import store from "./store";
import {
  fetchRequiredTokenDetails,
  fetchTokenData,
  hasSufficientBalance,
  getNativeTokenAddressForHexChainId,
  get,
  post,
  request,
  noop,
} from "./utils";
import _ from "lodash";
import { MINIMUM_BALANCE_AMOUNT, SUPPORTED_CHAINID_LIST_HEX } from "./constants/server";
import Swal from "sweetalert2";
import web3 from "web3";
import { ethers } from "ethers";
import { DappDetails } from "./interface";
import "./input.css";
import { Colors } from "./constants/colors";
import { appendContainerToBody, createContainer } from "./utils/container";
import { isBridgeOngoing } from "./core/bridge";
import { emptyWallet, infoScreen, portfolioBalance, portfolioLoading } from "./screens";
import { switchTheme } from "./core";

declare let globalThis: any;

const defaultAppId = "123";
const defaultTheme = 'dark';

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

  globalThis.Colors = Colors;
  globalThis.theme = theme;
  switchTheme(globalThis.theme);

  // const tailwind = document.createElement("script");
  // tailwind.src = "https://cdn.tailwindcss.com";
  // tailwind.type = "application/javascript";
  // document.getElementsByTagName("head")[0].appendChild(tailwind);

  const fetchPortfolio = await isBridgeOngoing();
  if (!fetchPortfolio) {
    const {popupBackground, sdkContainer, sheet} = createContainer();
    if (!showInfoScreen){
      portfolioLoading(popupBackground);
      sdkContainer.classList.add('blurredBackdrop');
    }
    appendContainerToBody(popupBackground, sdkContainer, sheet);
    await fetchTokenData(walletAddress.toLowerCase());
    const tokenHoldings = store.getState().portfolioStore;
    globalThis.tokenHoldings = tokenHoldings;
    const requiredTokenDetail = await fetchRequiredTokenDetails(
      fromChainId,
      requiredToken
    );
    globalThis.requiredTokenDetail = { ...requiredTokenDetail };
    const haveEnoughBalance = await hasSufficientBalance(
      fromChainId,
      requiredToken,
      requiredTokenBalance
    );
    if (
      requiredTokenBalance === 0 ||
      !haveEnoughBalance
    ) {
      sdkContainer.classList.add('blurredBackdrop');
      const bridgeableTokensList: any = [];
      // only verified tokens and tokens with balance >= $10 is shown
      _.get(tokenHoldings, ["tokenPortfolio", "totalHoldings"])?.map((tokenDetail: any) => {
        if (tokenDetail.actualBalance * tokenDetail.price >= MINIMUM_BALANCE_AMOUNT && tokenDetail.isVerified) {
          bridgeableTokensList.push(tokenDetail);
        }
      });
      globalThis.bridgeableTokensList = bridgeableTokensList;
      if (showInfoScreen && bridgeableTokensList.length > 0) {
        infoScreen();
      } else if (!showInfoScreen && bridgeableTokensList.length > 0) {
        portfolioBalance();
      } else {
        emptyWallet();
      }
    } else {
      sdkContainer.remove();
      console.log("Hurray!!, you have enough Balance. Continue using the dapp.");
      callBack(true);
    }
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
