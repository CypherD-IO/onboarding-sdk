import { get } from 'lodash';
import { CHAIN_ETH, CHAIN_POLYGON, CHAIN_BSC, CHAIN_AVALANCHE, CHAIN_FTM, CHAIN_ARBITRUM, CHAIN_OPTIMISM, CHAIN_EVMOS, CHAIN_COSMOS, CHAIN_JUNO, CHAIN_OSMOSIS, CHAIN_STARGAZE } from '../constants/server';
import { WalletHoldings, Holding, ChainHoldings } from '../interface';

export function sortDesc(a: any, b: any) {
  const first = parseFloat(get(a, 'totalValue', 0));
  const second = parseFloat(get(b, 'totalValue', 0));
  if (first < second) {
    return 1;
  } else if (first > second) {
    return -1;
  }
  return 0;
}

export const getPortfolioModel = (holdings: any) => {
  let totalUnverifiedBalance = 0;
  let totalBalance = 0;
  let ethHoldings;
  let maticHoldings;
  let bscHoldings;
  let avaxHoldings;
  let ftmHoldings;
  let arbitrumHoldings;
  let optimismHoldings;
  let evmosHoldings;
  let cosmosHoldings;
  let junoHoldings;
  let stargazeHoldings;
  let osmosisHoldings;

  const totalHoldings: Holding[] = [];
  for (let i = 0; i < holdings.length; i++) {
    const tokenHoldings: Holding[] = [];
    const currentHoldings = holdings[i]?.token_holdings || [];

    for (const holding of currentHoldings) {
      const tokenHolding: Holding = {
        name: holding.name,
        symbol: holding.symbol,
        logoUrl: holding.logo_url,
        price: holding.price,
        contractAddress: holding.contract_address,
        balance: holding.balance,
        contractDecimals: holding.contract_decimals,
        totalValue: holding.total_value,
        actualBalance: holding.actual_balance,
        isVerified: holding.is_verified,
        coinGeckoId: holding.coin_gecko_id,
        about: holding.about,
        price24h: holding.price24h,
      };
      switch (holdings[i]?.chain_id) {
        case CHAIN_ETH.backendName:
          tokenHolding.chainDetails = CHAIN_ETH;
          break;
        case CHAIN_POLYGON.backendName:
          tokenHolding.chainDetails = CHAIN_POLYGON;
          break;
        case CHAIN_BSC.backendName:
          tokenHolding.chainDetails = CHAIN_BSC;
          break;
        case CHAIN_AVALANCHE.backendName:
          tokenHolding.chainDetails = CHAIN_AVALANCHE;
          break;
        case CHAIN_FTM.backendName:
          tokenHolding.chainDetails = CHAIN_FTM;
          break;
        case CHAIN_ARBITRUM.backendName:
          tokenHolding.chainDetails = CHAIN_ARBITRUM;
          break;
        case CHAIN_OPTIMISM.backendName:
          tokenHolding.chainDetails = CHAIN_OPTIMISM;
          break;
        case CHAIN_EVMOS.backendName:
          tokenHolding.chainDetails = CHAIN_EVMOS;
          break;
        case CHAIN_COSMOS.backendName:
          tokenHolding.chainDetails = CHAIN_COSMOS;
          break;
        case CHAIN_OSMOSIS.backendName:
          tokenHolding.chainDetails = CHAIN_OSMOSIS;
          break;
        case CHAIN_JUNO.backendName:
          tokenHolding.chainDetails = CHAIN_JUNO;
          break;
        case CHAIN_STARGAZE.backendName:
          tokenHolding.chainDetails = CHAIN_STARGAZE;
          break;
      }
      tokenHoldings.push(tokenHolding);
      totalHoldings.push(tokenHolding);
    }

    const chainTotalBalance = holdings[i]?.total_value ? parseFloat(holdings[i]?.total_value) : 0;
    const chainUnVerifiedBalance = holdings[i]?.unverfied_total_value
      ? parseFloat(holdings[i]?.unverfied_total_value)
      : 0;
    const chainHoldings: ChainHoldings = {
      chainUnVerifiedBalance,
      chainTotalBalance,
      holdings: tokenHoldings,
      timestamp: new Date().toISOString(),
    };
    totalBalance += chainTotalBalance;
    totalUnverifiedBalance += chainUnVerifiedBalance;

    chainHoldings.holdings.sort(sortDesc);

    switch (holdings[i]?.chain_id) {
      case CHAIN_ETH.backendName:
        ethHoldings = chainHoldings;
        break;
      case CHAIN_POLYGON.backendName:
        maticHoldings = chainHoldings;
        break;
      case CHAIN_BSC.backendName:
        bscHoldings = chainHoldings;
        break;
      case CHAIN_AVALANCHE.backendName:
        avaxHoldings = chainHoldings;
        break;
      case CHAIN_FTM.backendName:
        ftmHoldings = chainHoldings;
        break;
      case CHAIN_ARBITRUM.backendName:
        arbitrumHoldings = chainHoldings;
        break;
      case CHAIN_OPTIMISM.backendName:
        optimismHoldings = chainHoldings;
        break;
      case CHAIN_EVMOS.backendName:
        evmosHoldings = chainHoldings;
        break;
      case CHAIN_COSMOS.backendName:
        cosmosHoldings = chainHoldings;
        break;
      case CHAIN_OSMOSIS.backendName:
        osmosisHoldings = chainHoldings;
        break;
      case CHAIN_JUNO.backendName:
        junoHoldings = chainHoldings;
        break;
      case CHAIN_STARGAZE.backendName:
        stargazeHoldings = chainHoldings;
        break;
    }
  }

  totalHoldings.sort(sortDesc);

  const portfolio: WalletHoldings = {
    totalBalance,
    totalUnverifiedBalance,
    eth: ethHoldings,
    polygon: maticHoldings,
    bsc: bscHoldings,
    avalanche: avaxHoldings,
    optimism: optimismHoldings,
    totalHoldings,
    fantom: ftmHoldings,
    arbitrum: arbitrumHoldings,
    evmos: evmosHoldings,
    cosmos: cosmosHoldings,
    osmosis: osmosisHoldings,
    juno: junoHoldings,
    stargaze: stargazeHoldings,
  };
  return portfolio;
};
