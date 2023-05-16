import { addChainData, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING } from "../constants/server";
import { bridgeSuccess } from "../screens";
import { getGasPrice, isNativeToken, maximizeWindow } from "../utils";

declare let globalThis: any;
declare let window: any;

export const swapTokens = async ({
  chain,
  chainId,
  routerAddress,
  contractData,
  isNative,
  amount,
}: any) => {
  try {
    const {exchangingTokenDetail: {
      chainDetails: {
        chain_id
      },
      contractDecimals
    }} = globalThis;
    const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].rpcUrls[0];
    const web3 = new globalThis.Cypher.Web3(rpcEndpoint);
    let userAddress = globalThis.cypherWalletDetails.address;
    if (chain === ChainBackendNames.EVMOS) {
      userAddress = web3.utils.toChecksumAddress(userAddress);
    }
    const gasPrice = await getGasPrice(chain);
    const gasLimit = await web3.eth.estimateGas({
      from: userAddress,
      to: routerAddress,
      value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(contractDecimals), 'ether') : '0x0',
      data: globalThis.allowanceData.isAllowance ? contractData : '',
    });
    const tx = {
      chainId: chainId,
      value: isNative ? web3.utils.toWei(Number(amount).toFixed(contractDecimals), 'ether') : '0x0',
      to: routerAddress,
      data: contractData,
      gas: web3.utils.toHex(2 * Number(gasLimit)),
      gasPrice: web3.utils.toWei(gasPrice.gasPrice.toFixed(9), 'gwei'),
    };
    const provider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const response = await signer.sendTransaction(tx);
    const receipt = await response.wait();
    return { hash: receipt?.hash, isError: false };
  } catch (e: any) {
    return { isError: true, error: e.toString() };
  }
}

export const swap = async () => {
  const {
    exchangingTokenDetail: {
      chainDetails: {
        backendName
      },
      contractAddress
    },
    swapQuoteData: {
      data: {
        chainId,
        data
      },
      router,
    },
    bridgeInputDetails: {
      tokenValueEntered
    }
  } = globalThis;
  const swapResp = await swapTokens({
    chain: backendName,
    chainId: chainId,
    routerAddress: router,
    contractData: data,
    isNative: isNativeToken(contractAddress),
    amount: tokenValueEntered.toString(),
  });
  if (!swapResp.isError) {
    maximizeWindow();
    bridgeSuccess();
  } else {
    globalThis.toastMixin.fire({
      title: 'Swap Failed',
      text: swapResp.error.toString(),
      icon: 'error'
    });
  }
};
