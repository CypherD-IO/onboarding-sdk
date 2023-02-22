import store from "./store";
import { fetchRequiredTokenDetails, fetchTokenData, hasSufficientBalance } from "./utils/portfolio";
import _ from "lodash";
import { noBalanceHTML, noBalanceScript } from "./htmlContents/demo";
import { noBalanceCSS } from "./cssContents/demo";
import styles from "./cssContents/style.module.css";

declare let globalThis : any;

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`

export const Cypher = async (address: string, fromChainId: string, fromTokenContractAddress: string, fromTokenRequiredBalance: number): Promise<void> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')

  globalThis.userDetails = {address, fromChainId, fromTokenContractAddress, fromTokenRequiredBalance};

  const web3 = document.createElement('script');
  web3.src = 'https://cdn.jsdelivr.net/npm/web3@1.8.2/dist/web3.min.js';
  web3.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(
    web3
  );

  const popupBackground = document.createElement('div');
  popupBackground.id = 'popupBackground';
  // popupBackground.className = styles.sedhu;
  const logBalances = await fetchTokenData(address);
  console.log('balances logged', logBalances);

  const tokenHoldings = store.getState().portfolioStore;
  console.log('token holdings from store : ', tokenHoldings);

  // let ethBalance = 0;
  // if (_.get(tokenHoldings, ['tokenPortfolio'])) {
  //   ethBalance = _.get(tokenHoldings, ['tokenPortfolio', 'eth', 'chainTotalBalance'], 0);
  // }

  const sheet = document.createElement('style');
  // const script = document.createElement('script');

  popupBackground.addEventListener('click', function(event) {
    if (event.target == popupBackground) {
      console.log('pressed background');
      popupBackground.remove();
    }
  });

  const requiredTokenDetail = await fetchRequiredTokenDetails(fromChainId, fromTokenContractAddress);
  globalThis.requiredTokenDetail = { ...requiredTokenDetail};

  if (await hasSufficientBalance(fromChainId, fromTokenContractAddress, fromTokenRequiredBalance)) {
    // Swal.fire({
    //   title: 'Hurray !!',
    //   text: 'You have sufficient Balance',
    //   icon: 'success',
    //   confirmButtonText: 'Close'
    // })

    popupBackground.innerHTML = `<h2>Hello!</h2><p>Welcome ${address}</p><p>Your have sufficient Balance</p><button id="closePopup">Close</button>`;
  } else {
    // Swal.fire({
    //   html: `<h2 id="header2">Hello!</h2><p>Welcome ${address}</p><p>Oops! you don't have sufficient balance in the token. Do u wish to Bridge or Buy ?</p><button id="closePopup">Close</button>`,
    //   customClass: {
    //     htmlContainer: 'custom-css'
    //   }
    // })

    popupBackground.innerHTML = noBalanceHTML(_.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']), requiredTokenDetail);
    sheet.innerHTML = noBalanceCSS;
  }

  globalThis.document.body.appendChild(popupBackground);
  globalThis.document.body.appendChild(sheet);
  // globalThis.document.body.appendChild(script);
  const range = document.createRange()
  range.setStart(globalThis.document.body, 0)
  // globalThis.document.body.appendChild(
  //   range.createContextualFragment('<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>')
  // )

    // range.createContextualFragment('<script src="https://cdn.jsdelivr.net/npm/web3@1.8.2/dist/web3.min.js"></script>')

  globalThis.document.body.appendChild(
    range.createContextualFragment(noBalanceScript())
  );


  // const closePopupButton = globalThis.document.getElementById('closePopup');

  // closePopupButton!.addEventListener('click', function() {
  //   popupBackground.remove();
  // });
  return;
}
