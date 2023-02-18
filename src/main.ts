import store from "./store";
import { fetchTokenData } from "./utils/portfolio";
import _ from "lodash";

export const delayMillis = (delayMs: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`

export const Cypher = async (address: string): Promise<void> => {
  console.log(greet('World'))
  await delayMillis(1000)
  console.log('done')
  const popup = document.createElement('div');
  popup.id = 'popup';

  const logBalances = await fetchTokenData(address);
  console.log('balances logged', logBalances);

  const tokenHoldings = store.getState().portfolioStore;
  console.log('token holdings from store : ', tokenHoldings);

  let ethBalance = 0;
  if (_.get(tokenHoldings, ['tokenPortfolio'])) {
    ethBalance = _.get(tokenHoldings, ['tokenPortfolio', 'eth', 'chainTotalBalance'], 0);
  }
  popup.innerHTML = `<h2>Hello!</h2><p>Welcome ${address}</p><p>Your balance in ETHEREUM CHAIN is = ${ethBalance}</p><button id="closePopup">Close</button>`;
  globalThis.document.body.appendChild(popup);
  let closePopupButton = globalThis.document.getElementById('closePopup');
  closePopupButton!.addEventListener('click', function() {
    popup.remove();
  });
  return;
}
