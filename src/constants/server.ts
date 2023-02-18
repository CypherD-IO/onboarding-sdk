import { Chain } from "../interface";

export const ARCH_HOST = 'https://arch.cypherd.io';
// import AppImages from '../../public/assets/appImages';

// export interface Chain {
//   chainName: string
//   name: string
//   symbol: string
//   id: number
//   logo_url?: any
//   backendName: ChainBackendNames | 'ALL'
//   chain_id: string
//   native_token_address: string
//   secondaryAddress?: string
//   chainIdNumber: number
//   coinGeckoId?: string
// }

export enum ChainBackendNames {
  ETH = 'ETH',
  POLYGON = 'POLYGON',
  AVALANCHE = 'AVALANCHE',
  FANTOM = 'FANTOM',
  ARBITRUM = 'ARBITRUM',
  OPTIMISM = 'OPTIMISM',
  BSC = 'BSC',
  EVMOS = 'EVMOS',
  COSMOS = 'COSMOS',
  OSMOSIS = 'OSMOSIS',
  JUNO = 'JUNO',
  STARGAZE = 'STARGAZE'
}

export const CHAIN_ETH: Chain = {
  chainName: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  id: 0,
  // logo_url: AppImages.ETHEREUM,
  backendName: ChainBackendNames.ETH,
  chain_id: '0x1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 1
};

export const CHAIN_POLYGON: Chain = {
  chainName: 'ethereum',
  name: 'Polygon',
  symbol: 'MATIC',
  id: 1,
  // logo_url: AppImages.POLYGON,
  backendName: ChainBackendNames.POLYGON,
  chain_id: '0x89',
  native_token_address: '0x0000000000000000000000000000000000001010',
  chainIdNumber: 137
};

export const CHAIN_BSC: Chain = {
  chainName: 'ethereum',
  name: 'Binance Smart Chain',
  symbol: 'BNB',
  id: 2,
  // logo_url: AppImages.BINANCE,
  backendName: ChainBackendNames.BSC,
  chain_id: '0x38',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 56
};

export const CHAIN_AVALANCHE: Chain = {
  chainName: 'ethereum',
  name: 'Avalanche',
  symbol: 'AVAX',
  id: 3,
  // logo_url: AppImages.AVALANCHE,
  backendName: ChainBackendNames.AVALANCHE,
  chain_id: '0xa86a',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 43114
};

export const CHAIN_FTM: Chain = {
  chainName: 'ethereum',
  name: 'Fantom',
  symbol: 'FTM',
  id: 5,
  // logo_url: AppImages.FANTOM,
  backendName: ChainBackendNames.FANTOM,
  chain_id: '0xfa',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 250
};

export const CHAIN_EVMOS: Chain = {
  chainName: 'evmos',
  name: 'Evmos',
  symbol: 'EVMOS',
  id: 6,
  // logo_url: AppImages.EVMOS,
  backendName: ChainBackendNames.EVMOS,
  chain_id: '0x2329',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  secondaryAddress: '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b',
  chainIdNumber: 9001
};

export const CHAIN_ARBITRUM: Chain = {
  chainName: 'ethereum',
  name: 'Arbitrum One',
  symbol: 'ETH',
  id: 10,
  // logo_url: AppImages.ARBITRUM,
  backendName: ChainBackendNames.ARBITRUM,
  chain_id: '0xa4b1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 42161
};

export const CHAIN_COSMOS: Chain = {
  chainName: 'cosmos',
  name: 'Cosmos',
  symbol: 'COSMOS',
  id: 7,
  // logo_url: AppImages.COSMOS,
  backendName: ChainBackendNames.COSMOS,
  chain_id: '0x0',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 0,
  coinGeckoId: 'cosmos'
};

export const CHAIN_OSMOSIS: Chain = {
  chainName: 'osmosis',
  name: 'Osmosis',
  symbol: 'OSMO',
  id: 8,
  // logo_url: AppImages.OSMOSIS,
  backendName: ChainBackendNames.OSMOSIS,
  chain_id: '0x1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 0,
  coinGeckoId: 'osmosis'
};

export const CHAIN_JUNO: Chain = {
  chainName: 'juno',
  name: 'Juno',
  symbol: 'JUNO',
  id: 9,
  // logo_url: AppImages.JUNO,
  backendName: ChainBackendNames.JUNO,
  chain_id: 'juno-1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 0,
  coinGeckoId: 'juno-network'
};

export const CHAIN_OPTIMISM: Chain = {
  chainName: 'ethereum',
  name: 'Optimism',
  symbol: 'ETH',
  id: 11,
  // logo_url: AppImages.OPTIMISM,
  backendName: ChainBackendNames.OPTIMISM,
  chain_id: '0xa',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 10
};

export const CHAIN_STARGAZE: Chain = {
  chainName: 'stargaze',
  name: 'Stargaze',
  symbol: 'STARS',
  id: 12,
  // logo_url: AppImages.STARGAZE,
  backendName: ChainBackendNames.STARGAZE,
  chain_id: 'stargaze-1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 0,
  coinGeckoId: 'stargaze'
};
