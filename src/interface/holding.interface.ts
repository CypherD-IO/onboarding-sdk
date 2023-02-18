import { Chain } from "./chain.interface";

export interface Holding {
  name: string;
  symbol: string;
  logoUrl: string;
  price: string;
  contractAddress: string;
  balance: string;
  contractDecimals: number;
  totalValue: number;
  actualBalance: number;
  isVerified: boolean;
  coinGeckoId: string;
  about: string;
  chainDetails?: Chain;
  price24h?: number;
}
