export interface DappDetails{
  address: string;
  fromChainId: string;
  fromTokenContractAddress: string;
  fromTokenRequiredBalance?: number;
  callBack?: () => void;
}
