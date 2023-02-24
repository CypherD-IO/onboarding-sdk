import _ from 'lodash';
import { ARCH_HOST,
  CHAIN_ID_HEX_TO_ENUM_MAPPING,
  EVM_CHAINS_NATIVE_TOKEN_MAP,
  CHAIN_ID_HEX_TO_CDN_IMAGE_CHAIN_NAME } from '../constants/server';
import { getPortfolioModel } from '../core/portfolio';
import store, { PORTFOLIO_EMPTY, PORTFOLIO_NOT_EMPTY, setPortfolioStore } from '../store';
import { get } from './fetch';

/*
  Function to generate token image CDN URL for a given chainId and tokenContract Address
*/
export function getImageForToken(chainId: string, tokenContract: string){
  //Logic to convert hexadecimal
  const xyzChainNameForLogos = (CHAIN_ID_HEX_TO_CDN_IMAGE_CHAIN_NAME.get(chainId) == undefined)
  ? 'ethereum': CHAIN_ID_HEX_TO_CDN_IMAGE_CHAIN_NAME.get(chainId);
  //If Native Token Contract
  if(Array.from(EVM_CHAINS_NATIVE_TOKEN_MAP.values()).includes(tokenContract.toLowerCase())){
    return `https://public.cypherd.io/assets/blockchains/${xyzChainNameForLogos}/info/logo.png`;
  }
  return `https://public.cypherd.io/assets/blockchains/${xyzChainNameForLogos}/assets/${tokenContract}/logo.png`;
}

export function getNativeTokenAddressForHexChainId(chainId: string) {
  const enumName = CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId);
  if (enumName == undefined)
    return '';
  const nativeContractAddress = EVM_CHAINS_NATIVE_TOKEN_MAP.get(enumName);
  if(nativeContractAddress == undefined)
    return '';
  return nativeContractAddress;
}

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
      //Incomplete Implementation with only the image and the tokenContractAdress of the token
      return {logoUrl: `${getImageForToken(chainId, tokenContractAddress)}`, contractAddress: `${tokenContractAddress}`,
      chainDetails: {backendName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`}};
    }
  } else {
    //Incomplete Implementation with only the image and the tokenContractAdress of the token
    return {logoUrl: `${getImageForToken(chainId, tokenContractAddress)}`, contractAddress: `${tokenContractAddress}`,
      chainDetails: {backendName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`}};
  }
}
