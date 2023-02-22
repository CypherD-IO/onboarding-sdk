import _ from 'lodash';
import { ARCH_HOST } from '../constants/server';
import { getPortfolioModel } from '../core/portfolio';
import store, { PORTFOLIO_EMPTY, PORTFOLIO_NOT_EMPTY, setPortfolioStore } from '../store';
import { get } from './fetch';

export const fetchTokenData = async (address: any) => {

  const cosmosPortfolioUrl = `${ARCH_HOST}/v1/portfolio/balances?`;
  const params = {
    'address[]': [address]
  };
  const response = await get(cosmosPortfolioUrl, params);
  const portfolio = await getPortfolioModel(response.chain_portfolios);
  console.log('portfolio', portfolio);

  if (portfolio && portfolio?.totalUnverifiedBalance > 0) {
    store.dispatch(setPortfolioStore({ tokenPortfolio: portfolio, portfolioState: PORTFOLIO_NOT_EMPTY, }));
  } else {
    store.dispatch(setPortfolioStore({ tokenPortfolio: portfolio, portfolioState: PORTFOLIO_EMPTY, }));
  }
  return portfolio;
};

export const hasSufficientBalance = async (chainId: string, tokenContractAddress: string, balanceRequired: number) => {
  const tokenHoldings = store.getState().portfolioStore;
  if (_.get(tokenHoldings, ['portfolioState'], '') === PORTFOLIO_NOT_EMPTY) {
    const totalHoldings = _.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']);

    const tokenRequired = totalHoldings.find((token: any) => _.get(token, ['contractAddress']).toLowerCase() === tokenContractAddress.toLowerCase() && _.get(token, ['chainDetails', 'chain_id']) === chainId);
    console.log('the token requested : ', tokenRequired);
    if (tokenRequired !== undefined && _.get(tokenRequired, 'actualBalance') >= balanceRequired) {
      return true;
    }
    return false;
  }
  return false;
}

export const fetchRequiredTokenDetails = async (chainId: string, tokenContractAddress: string,) => {
  const tokenHoldings = store.getState().portfolioStore;
  if (_.get(tokenHoldings, ['portfolioState'], '') === PORTFOLIO_NOT_EMPTY) {
    const totalHoldings = _.get(tokenHoldings, ['tokenPortfolio', 'totalHoldings']);

    const tokenRequired = totalHoldings.find((token: any) => _.get(token, ['contractAddress']).toLowerCase() === tokenContractAddress.toLowerCase() && _.get(token, ['chainDetails', 'chain_id']) === chainId);
    console.log('the token requested : ', tokenRequired);
    if (tokenRequired !== undefined) {
      return tokenRequired;
    } else {
      // call coinGecko to get token details
      return undefined;
    }
  } else {
    // call coinGecko to get token details
    return undefined;
  }
}
