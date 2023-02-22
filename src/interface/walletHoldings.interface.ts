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
  cosmos: ChainHoldings | undefined
  osmosis: ChainHoldings | undefined
  juno: ChainHoldings | undefined
  stargaze: ChainHoldings | undefined
  totalHoldings: Holding[];
}
