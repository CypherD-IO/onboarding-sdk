export interface DappDetails{
  address: string;
  targetChainIdHex: string;
  requiredTokenContractAddress?: string;
  requiredTokenBalance: number;
  isTestnet?: boolean;
  callBack?: () => void;
}
