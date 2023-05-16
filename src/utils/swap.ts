import { isNativeToken } from ".";
import { addChainData, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING } from "../constants/server";

declare let globalThis: any;
declare let window: any;

export const isSwap = () => {
  return (globalThis.requiredTokenDetail.chainDetails.backendName === globalThis.exchangingTokenDetail?.chainDetails?.backendName);
}

export const swapContractAddressCheck = (contractAddress: string, chainId = '') => {
  if ((contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') ||
    (contractAddress === '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000' && chainId === '0xa') ||
    (contractAddress === '0x0000000000000000000000000000000000001010' && chainId === '0x89')) {
    return '0x0000000000000000000000000000000000000000';
  }
  return contractAddress;
}

export const isTokenSwapSupported = (tokenArray: Array<any>, tokenToCheck: any) => {
  const tokenPresent =  tokenArray.filter(function (token)
  {
    return token.address.toLowerCase() === tokenToCheck.toLowerCase();
  });
  return tokenPresent.length > 0;
}

async function getAllowanceApproval({
  chain,
  contractAddress,
  contractData,
  gasLimit,
  gasPrice,
  isNative
}: any) {
  try {
    const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!].rpcUrls[0];

    const web3 = new globalThis.Cypher.Web3(rpcEndpoint);

    let userAddress = globalThis.cypherWalletDetails.address;

    if (chain === ChainBackendNames.EVMOS) {
      userAddress = web3.utils.toChecksumAddress(userAddress);
    }
    const tx = {
      from: userAddress,
      to: contractAddress,
      gasPrice: web3.utils.toWei(gasPrice.toFixed(9), 'gwei').toString(),
      gas: gasLimit,
      value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(globalThis.exchangingTokenDetail?.contractDecimals), 'ether') : '0x0',
      data: contractData,
    };

    const provider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const response = await signer.sendTransaction(tx);

    const receipt = await response.wait();
    return { hash: receipt?.hash, isError: false };

  } catch (error: any) {
    return { isError: true, error: error.toString() };
  }
}

export const getSwapAllowanceApproval = async () => {
  const approvalResp = await getAllowanceApproval({
    chain: globalThis.exchangingTokenDetail.chainDetails.backendName,
    contractData: globalThis.allowanceData.contractData,
    gasLimit: globalThis.swapQuoteData.data.gas,
    gasPrice: globalThis.allowanceData.gasPrice.gasPrice,
    contractAddress: swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id),
    isNative: isNativeToken(globalThis.exchangingTokenDetail?.contractAddress)
  });
  if (!approvalResp.isError) {
    globalThis.allowanceData = { ...globalThis.allowanceData, isAllowance: false };
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: approvalResp.error.toString(),
      icon: 'error'
    });
  }
};
