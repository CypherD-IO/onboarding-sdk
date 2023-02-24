import store from "./store";
import { fetchRequiredTokenDetails, fetchTokenData, hasSufficientBalance, getNativeTokenAddressForHexChainId } from "./utils/portfolio";
import _ from "lodash";
import { noBalanceScript } from './scriptContents';
import { noBalanceCSS } from "./cssContents";
import { bridgeLoadingHTML, bridgeSuccessHTML, noBalanceHTML } from "./htmlContents";
import {SUPPORTED_CHAINID_LIST_HEX} from "./constants/server";
// import styles from "./cssContents/style.module.css";

declare let globalThis : any;

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`

interface DappDetails{
  address: string;
  fromChainId: string;
  fromTokenContractAddress: string;
  fromTokenRequiredBalance?: number;
  callBack?: () => void;
}

export const Cypher = async ({address, fromChainId, fromTokenContractAddress, fromTokenRequiredBalance = 0, callBack = () => {}}: DappDetails): Promise<void> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')

  //chainId is a required field
  if(! SUPPORTED_CHAINID_LIST_HEX.includes(fromChainId)){
    console.log(fromChainId + "not supported");
  return;
  }

  //intialize fromTokenContractAddress for native token
  if(fromTokenContractAddress === undefined || fromTokenContractAddress === ''){
    fromTokenContractAddress = getNativeTokenAddressForHexChainId(fromChainId);
  }

  globalThis.userDetails = {address, fromChainId, fromTokenContractAddress, fromTokenRequiredBalance, callBack};

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
  ethers.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  ethers.type = 'application/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    sweetAlert2
  );

  const popupBackground = document.createElement('div');
  popupBackground.id = 'popupBackground';
  // popupBackground.className = styles.sedhu;
  // popupBackground.innerHTML = bridgeSuccessHTML;
  const fetchBalances = await fetchTokenData(address);
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

  const requiredTokenDetail = await fetchRequiredTokenDetails(fromChainId, fromTokenContractAddress);
  globalThis.requiredTokenDetail = { ...requiredTokenDetail};

  if (fromTokenRequiredBalance === 0 || !(await hasSufficientBalance(fromChainId, fromTokenContractAddress, fromTokenRequiredBalance))) {
    popupBackground.innerHTML = noBalanceHTML(_.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']));
    sheet.innerHTML = noBalanceCSS;
  } else {
    console.log('Hurray!!, you have enough Balance. Continue using the dapp.')
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
