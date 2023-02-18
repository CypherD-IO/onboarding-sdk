import axios from 'axios';
import _ from 'lodash';
import { ARCH_HOST } from '../constants/server';
import { getPortfolioModel } from '../core/portfolio';
import store, { PORTFOLIO_EMPTY, PORTFOLIO_NOT_EMPTY, setPortfolioStore } from '../store';

export const fetchTokenData = async (address: any) => {

  const cosmosPortfolioUrl = `${ARCH_HOST}/v1/portfolio/balances?ankr=true`;
  const params = {
    'address[]': [address]
  };

  const archCall = axios
      .get(cosmosPortfolioUrl, {
        params,
        timeout: 25000,
      });

  const promiseArray: Array<Promise<any>> = [archCall];
  let result, archBackend;
  try {
    result = await Promise.all(promiseArray);
    archBackend = result[0];
    console.log('result from the call : ', result[0])
  } catch (e) {
    console.log({
      type: 'error',
      text1: 'Network Timeout Error',
      text2: 'Try refreshing in a while!',
      position: 'bottom'
    });
  }

  const portfolio = await getPortfolioModel(archBackend?.data?.chain_portfolios);

  if (portfolio && portfolio?.totalUnverifiedBalance > 0) {
    store.dispatch(setPortfolioStore({ tokenPortfolio: portfolio, portfolioState: PORTFOLIO_NOT_EMPTY, }));
  } else {
    store.dispatch(setPortfolioStore({ tokenPortfolio: portfolio, portfolioState: PORTFOLIO_EMPTY, }));
  }
  return portfolio;
};

export const hasSufficientBalance = async (address: string, chainId: string, tokenContractAddress: string) => {
  const tokenHoldings = store.getState().portfolioStore;
  if (_.get(tokenHoldings, ['portfolioState'], '') === PORTFOLIO_NOT_EMPTY) {
    const totalHoldings = _.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings'])
  }
}
