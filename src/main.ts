import store from "./store";
import { fetchRequiredTokenDetails, fetchTokenData, hasSufficientBalance, getNativeTokenAddressForHexChainId } from "./utils/portfolio";
import _ from "lodash";
import { noBalanceScript } from './scriptContents';
import { noBalanceCSS } from "./cssContents";
import { noBalanceHTML } from "./htmlContents";
import {SUPPORTED_CHAINID_LIST_HEX} from "./constants/server";
import { DappDetails } from "./interface";
// import styles from "./cssContents/style.module.css";

declare let globalThis : any;

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

const noop =  (status: boolean) => {
console.log("🚀 ~ User operation Completed:", status)
};

export const Cypher = async ({address, targetChainIdHex: fromChainId, requiredTokenContractAddress: fromTokenContractAddress, requiredTokenBalance, isTestnet, callBack = noop }: DappDetails): Promise<void> => {
  await delayMillis(1000);
  const walletAddress = address.toLowerCase();
  let requiredToken = fromTokenContractAddress?.toLowerCase();

  //chainId is a required field
  if(! SUPPORTED_CHAINID_LIST_HEX.includes(fromChainId)){
    console.log(fromChainId + "not supported");
  return;
  }

  //intialize fromTokenContractAddress for native token
  if(requiredToken === undefined || requiredToken === ''){
    requiredToken = getNativeTokenAddressForHexChainId(fromChainId);
  }

  globalThis.cypherWalletDetails = {
    address: walletAddress.toLowerCase(),
    fromChainId, fromTokenContractAddress:
      requiredToken,
    fromTokenRequiredBalance: requiredTokenBalance,
    callBack,
    isTestnet,
  };

  const web3 = document.createElement('script');
  web3.src = 'https://cdn.jsdelivr.net/npm/web3@1.8.2/dist/web3.min.js';
  web3.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    web3
  );

  const ethers = document.createElement('script');
  ethers.src = 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.0.7/ethers.umd.min.js';
  ethers.type = 'application/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    ethers
  );

  const tailwind = document.createElement('script');
  tailwind.src = 'https://cdn.tailwindcss.com';
  tailwind.type = 'application/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    tailwind
  );

  const sweetAlert2 = document.createElement('script');
  sweetAlert2.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.2/dist/sweetalert2.all.min.js';
  sweetAlert2.type = 'application/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    sweetAlert2
  );

  const popupBackground = document.createElement('div');
  popupBackground.id = 'popupBackground';
  // popupBackground.className = styles.sedhu;
  // popupBackground.innerHTML = bridgeSuccessHTML;
  const fetchBalances = await fetchTokenData(walletAddress.toLowerCase());
  console.log('balances logged', fetchBalances);
  const tokenHoldings = store.getState().portfolioStore;
  console.log('token holdings from store : ', tokenHoldings);
  const sheet = document.createElement('style');

  // close on click background of popup
  // popupBackground.addEventListener('click', function(event) {
  //   if (event.target == popupBackground) {
  //     console.log('pressed background');
  //     popupBackground.remove();
  //   }
  // });

  const requiredTokenDetail = await fetchRequiredTokenDetails(fromChainId, requiredToken);
  globalThis.requiredTokenDetail = { ...requiredTokenDetail};

  if (requiredTokenBalance === 0 || !(await hasSufficientBalance(fromChainId, requiredToken, requiredTokenBalance))) {
    popupBackground.innerHTML = noBalanceHTML(_.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']));
    sheet.innerHTML = noBalanceCSS;
  } else {

    console.log('Hurray!!, you have enough Balance. Continue using the dapp.')
    callBack(true);
  }

  globalThis.document.body.appendChild(popupBackground);
  globalThis.document.body.appendChild(sheet);

  const range = document.createRange()
  range.setStart(globalThis.document.body, 0)
  globalThis.document.body.appendChild(
    range.createContextualFragment(noBalanceScript())
  );
  return;
}
