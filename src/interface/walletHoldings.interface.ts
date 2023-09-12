import { ChainHoldings } from './chainHoldings.interface';
import { Holding } from './holding.interface';

export interface WalletHoldings {
  totalBalance: number;
  totalUnverifiedBalance: number;
  eth: ChainHoldings | undefined;
  polygon: ChainHoldings | undefined;
  bsc: ChainHoldings | undefined;
  avalanche: ChainHoldings | undefined;
  fantom: ChainHoldings | undefined;
  arbitrum: ChainHoldings | undefined;
  optimism: ChainHoldings | undefined;
  evmos: ChainHoldings | undefined;
  ethGoerli: ChainHoldings | undefined
  polygonMumbai: ChainHoldings | undefined;
  base: ChainHoldings | undefined
  zkevm: ChainHoldings | undefined
  zksyncEra: ChainHoldings | undefined
  totalHoldings: Holding[];
}
