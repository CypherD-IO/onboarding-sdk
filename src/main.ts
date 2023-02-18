import store from "./store";
import { fetchTokenData, hasSufficientBalance } from "./utils/portfolio";
import _ from "lodash";
import { noBalanceHTML } from "./htmlContents/demo";
import { noBalanceCSS } from "./cssContents/demo";
// import Swal from 'sweetalert2'

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`

export const Cypher = async (address: string, fromChainId: string, fromTokenContractAddress: string, fromTokenRequiredBalance: number): Promise<void> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')

  const popupBackground = document.createElement('div');
  popupBackground.id = 'popupBackground';

  const logBalances = await fetchTokenData(address);
  console.log('balances logged', logBalances);

  const tokenHoldings = store.getState().portfolioStore;
  console.log('token holdings from store : ', tokenHoldings);

  // let ethBalance = 0;
  // if (_.get(tokenHoldings, ['tokenPortfolio'])) {
  //   ethBalance = _.get(tokenHoldings, ['tokenPortfolio', 'eth', 'chainTotalBalance'], 0);
  // }

  const sheet = document.createElement('style');
  const script = document.createElement('script');

  popupBackground.addEventListener('click', function(event) {
    // Check if the clicked element is the background element
    if (event.target == popupBackground) {
      console.log('pressed background');
      popupBackground.remove();
    }
  });

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

    popupBackground.innerHTML = noBalanceHTML(_.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']));
    sheet.innerHTML = noBalanceCSS;
    script.type = 'text/javascript';
    script.onload = function () { console.log('final try') };
  }

  globalThis.document.body.appendChild(popupBackground);
  globalThis.document.head.appendChild(sheet);
  globalThis.document.body.appendChild(script);

  // const closePopupButton = globalThis.document.getElementById('closePopup');

  // closePopupButton!.addEventListener('click', function() {
  //   popupBackground.remove();
  // });
  return;
}
