import _ from 'lodash';
import { ARCH_HOST,
  CHAIN_ID_HEX_TO_ENUM_MAPPING,
  EVM_CHAINS_NATIVE_TOKEN_MAP,
  CHAIN_ID_HEX_TO_CDN_IMAGE_CHAIN_NAME} from '../constants/server';
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

export const fetchRequiredTokenData = async(chainId: string, tokenContractAddress: string) => {
  const tokenDetailUrl = `${ARCH_HOST}/v1/portfolio/tokenDetail?`;
  const params = [
    {
      key: 'chain',
      value:CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)
    },
    {
      key: 'tokenAddress',
      value:tokenContractAddress
    }
];
  const response = await get(tokenDetailUrl, params);
  console.log(response);
  return response;
};

declare let globalThis : any;
export const fetchTokenData = async (address: any) => {

  const portfolioUrl = `${ARCH_HOST}/v1/portfolio/balances?`;
  let params:any = [{
    key: 'address[]',
    value: [address]
  }];

  if (globalThis.cypherWalletDetails?.isTestnet) {
    params = [
      {
      key: 'address[]',
      value: [address]
      },
      {
        key: 'chains[]',
        value: ['ETH_GOERLI'],
      },
      {
        key: 'chains[]',
        value: ['POLYGON_MUMBAI'],
      }
    ];
  }

  const response = await get(portfolioUrl, params);
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

      const tokenDetail = await fetchRequiredTokenData(chainId, tokenContractAddress);
      return {name: tokenDetail.name,
        logoUrl: tokenDetail.logo_url,
        contractDecimals: tokenDetail.contract_decimals,
        symbol: tokenDetail.symbol,
        coinGeckoId: tokenDetail.coin_gecko_id,
        contractAddress: tokenContractAddress,
        price: tokenDetail.price,
        chainDetails: {
          backendName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`,
          chainName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`,
          chain_id: `${chainId}`,
        }};
    }
  } else {
    const tokenDetail = await fetchRequiredTokenData(chainId, tokenContractAddress);
    return {
      name: tokenDetail.name,
        logoUrl: tokenDetail.logo_url,
        contractDecimals: tokenDetail.contract_decimals,
        symbol: tokenDetail.symbol,
        coinGeckoId: tokenDetail.coin_gecko_id,
        contractAddress: tokenContractAddress,
        price: tokenDetail.price,
        chainDetails: {
          backendName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`,
          chainName: `${CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chainId)}`,
          chain_id: `${chainId}`,
        }
    };
  }
}
