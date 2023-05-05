export interface DappDetails {
  address: string;
  targetChainIdHex: string;
  requiredTokenContractAddress?: string;
  requiredTokenBalance: number;
  isTestnet?: boolean;
  callBack?: (status: boolean) => void;
  appId?: string;
  theme?: string
  infoRequired: boolean
}
