import { Holding } from './holding.interface';

export interface ChainHoldings {
  chainTotalBalance: number;
  chainUnVerifiedBalance: number;
  holdings: Holding[];
  timestamp: string;
}
