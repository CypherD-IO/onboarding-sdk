import { ChainBackendNames } from "../constants/server";

export interface Chain {
  chainName: string;
  name: string;
  symbol: string;
  id: number;
  logo_url?: any;
  backendName: ChainBackendNames | 'ALL';
  chain_id: string;
  native_token_address: string;
  secondaryAddress?: string;
  chainIdNumber: number;
  coinGeckoId?: string;
}
