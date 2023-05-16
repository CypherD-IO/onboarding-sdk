import { Chain } from "../interface";

export const ARCH_HOST = 'https://arch.cypherd.io';
// import AppImages from '../../public/assets/appImages';

export enum ChainBackendNames {
  ETH = 'ETH',
  ETH_GOERLI = 'ETH_GOERLI',
  POLYGON_MUMBAI = 'POLYGON_MUMBAI',
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

export const CHAIN_ETH_GOERLI: Chain = {
  chainName: 'ethereum-goerli',
  name: 'Ethereum-Goerli',
  symbol: 'GTH',
  id: 0,
  backendName: ChainBackendNames.ETH_GOERLI,
  chain_id: '0x5',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 5
};

export const CHAIN_POLYGON_MUMBAI: Chain = {
  chainName: 'polygon-mumbai',
  name: 'Polygon Mumbai',
  symbol: 'MATIC',
  id: 0,
  backendName: ChainBackendNames.POLYGON_MUMBAI,
  chain_id: '0x13881',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 80001
};

export const CHAIN_ETH: Chain = {
  chainName: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  id: 0,
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
  backendName: ChainBackendNames.STARGAZE,
  chain_id: 'stargaze-1',
  native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  chainIdNumber: 0,
  coinGeckoId: 'stargaze'
};

export type NetworkInterface = {
  [key: string]: any;
};

export const addChainData: Record<string, NetworkInterface> = {
  POLYGON_MUMBAI: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: 'POLYGON MUMBAI',
    nativeCurrency: {
      name: 'MATIC TESTNET',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  ETH_GOERLI: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: 'Ethereum GOERLI',
    nativeCurrency: {
      name: 'Ether goerli',
      symbol: 'GTH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  ETH: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://api.mycryptoapi.com/eth', 'https://cloudflare-eth.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  POLYGON: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  BSC: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'wss://bsc-ws-node.nariox.org',
    ],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  AVALANCHE: {
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  FANTOM: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  ARBITRUM: {
    chainId: `0x${Number(42161).toString(16)}`,
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'Arbitrum One Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/arbitrum'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  OPTIMISM: {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'Optimism Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io/'],
  },
  EVMOS: {
    chainId: `0x${Number(9001).toString(16)}`,
    chainName: 'Evmos',
    nativeCurrency: {
      name: 'Evmos',
      symbol: 'EVMOS',
      decimals: 18,
    },
    rpcUrls: ['https://eth.bd.evmos.org:8545'],
    blockExplorerUrls: ['https://evm.evmos.org'],
  },
};

export const CONTRACT_DECIMAL_TO_ETHER_UNITS: any = {
  6: 'picoether',
  9: 'gwei',
  18: 'ether',
};

export const EVM_CHAINS_NATIVE_TOKEN_MAP = new Map([
  ['ETH', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['ETH_GOERLI', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['POLYGON_MUMBAI', '0x0000000000000000000000000000000000001010'],
  ['ARBITRUM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['OPTIMISM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['POLYGON', '0x0000000000000000000000000000000000001010'],
  ['AVALANCHE', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['BSC', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['FANTOM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  ['EVMOS', '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b'], // representation didnt work 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee so used ethereum address
]);

export const SUPPORTED_CHAINID_LIST_HEX = ['0x1', '0x89', '0x38', '0xa86a', '0xfa', '0x2329', '0xa4b1', '0xa', '0x13881', '0x5'];


export const CHAIN_ID_HEX_TO_ENUM_MAPPING = new Map([
  ['0x1', ChainBackendNames.ETH],
  ['0x5', ChainBackendNames.ETH_GOERLI],
  ['0x13881', ChainBackendNames.POLYGON_MUMBAI],
  ['0x89', ChainBackendNames.POLYGON],
  ['0x38', ChainBackendNames.BSC],
  ['0xa86a', ChainBackendNames.AVALANCHE],
  ['0xfa', ChainBackendNames.FANTOM],
  ['0x2329', ChainBackendNames.EVMOS],
  ['0xa4b1', ChainBackendNames.ARBITRUM],
  ['0xa', ChainBackendNames.OPTIMISM],
]);

export const BACKEND_NAME_TO_CHAIN_ID_HEX = new Map([
  [ChainBackendNames.ETH, '0x1'],
  [ChainBackendNames.ETH_GOERLI, '0x5'],
  [ChainBackendNames.POLYGON_MUMBAI, '0x13881'],
  [ChainBackendNames.POLYGON, '0x89'],
  [ChainBackendNames.BSC, '0x38'],
  [ChainBackendNames.AVALANCHE, '0xa86a'],
  [ChainBackendNames.FANTOM, '0xfa'],
  [ChainBackendNames.EVMOS, '0x2329'],
  [ChainBackendNames.ARBITRUM, '0xa4b1'],
  [ChainBackendNames.OPTIMISM, '0xa'],
]);

export const CHAIN_ID_HEX_TO_CDN_IMAGE_CHAIN_NAME = new Map([
  ['0x1', 'ethereum'],
  ['0x89', 'polygon'],
  ['0x5', 'ethereum'],
  ['0x13881', 'polygon'],
  ['0x38', 'binance'],
  ['0xa86a', 'avalanchec'],
  ['0xfa', 'fantom'],
  ['0x2329', 'evmos'],
  ['0xa4b1', 'arbitrum'],
  ['0xa', 'optimism'],
]);

export const CHAIN_ID_HEX_TO_NATIVE_TOKEN_NAME = new Map([
  ['0x5', 'GTH'],
  ['0x13881', 'MATIC-TESTNET'],
  ['0x1', 'ETH'],
  ['0x89', 'MATIC'],
  ['0x38', 'BnB'],
  ['0xa86a', 'AVAX'],
  ['0xfa', 'FTM'],
  ['0x2329', 'EVMOS'],
  ['0xa4b1', 'Arbitrum ETH'],
  ['0xa', 'Optimism ETH'],
]);

export const gasFeeReservation = {
  AVALANCHE: 0.001,
  BSC: 0.001,
  COSMOS: 0.1,
  EVMOS: 0.1,
  FANTOM: 0.1,
  JUNO: 0.1,
  OSMOSIS: 0.1,
  POLYGON: 0.1,
  ETH: 0.001,
  ARBITRUM: 0.001,
  OPTIMISM: 0.001,
  STARGAZE: 0.1,
};

export const contractABI = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'guy',
        type: 'address',
      },
      {
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const ONONGOING_BRIDGE_DATA = 'ongoing-bridge-data';
export const EXPIRATION_KEY = 'key_expiry';
export const EXPIRATION_DURATION = 24 * 60 * 60 * 1000;
// minimum bridge amount is $10
export const MINIMUM_BRIDGE_AMOUNT = 10;

export enum ACTIVITY_STATUS {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
