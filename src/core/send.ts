import { estimateGasLimit, getGasPrice, isNativeToken, timeoutPromise } from "../utils";
import { addChainData, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING, CONTRACT_DECIMAL_TO_ETHER_UNITS, FALLBACK_TIMEOUT } from "../constants/server";
import { switchNetwork } from ".";

declare let globalThis: any;
declare let window: any;

async function sendNativeCoin({
  fromAddress,
  toAddress,
  gasPrice,
  gasLimit,
  amountToSend,
  signer,
  isWalletConnect = false,
  isBridge
}: any) {
  const tx = {
    from: fromAddress,
    to: toAddress,
    value: amountToSend,
  };
  const response = await signer.sendTransaction(tx);
  let hash: string | undefined;
  if(!isBridge){
      try {
        const receipt = await Promise.race([response.wait(), timeoutPromise(FALLBACK_TIMEOUT)]);
        if (!isWalletConnect) {
          hash = receipt?.hash;
        } else{
          hash = receipt?.transactionHash;
        }
      } catch (error) {
        hash = response.hash;
      }
      return hash;
    }
    else{
      return response.hash;
    }
  }


async function sendToken({
  contractAddress,
  toAddress,
  amount,
  gasLimit,
  signer,
  isWalletConnect = false,
  isBridge
}: any) {
  const contractAbiFragment = [
    {
      name: 'transfer',
      type: 'function',
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          type: 'uint256',
          name: '_tokens',
        },
      ],
      constant: false,
      outputs: [],
      payable: false,
      gas: gasLimit,
    },
  ];
  const contract = new globalThis.Cypher.ethers.Contract(contractAddress, contractAbiFragment, signer);
  const response = await contract.transfer(toAddress, amount);
  let hash: string | undefined;
  if(!isBridge){
    try {
      if (!isWalletConnect) {
        const receipt = await Promise.race([response.wait(), timeoutPromise(FALLBACK_TIMEOUT)]);
        hash = receipt?.hash;
      } else {
        const receipt = await Promise.race([
          globalThis.cypherWalletDetails.provider?.waitForTransaction(response.hash),
          timeoutPromise(FALLBACK_TIMEOUT),
        ]);
        hash = receipt?.transactionHash;
      }
    } catch (error) {
      hash = response.hash;
    }
    return hash;
  }
  else{
  hash = response.hash;
  return hash;
  }
}

export const send = async ({
  chain,
  amountToSend,
  toAddress,
  contractAddress,
  contractDecimal,
  isBridge=false,
}: any) => {
  try {
    const {
      cypherWalletDetails,
      exchangingTokenDetail: {
        chainDetails: {
          chain_id
        },
        contractAddress,
        contractDecimals
      }
    } = globalThis;

    const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].rpcUrls[0];
    const web3 = new globalThis.Cypher.Web3(rpcEndpoint);
    let userAddress = cypherWalletDetails.address;
    const {connector, provider} = cypherWalletDetails;
    const chainId = chain_id;

    if (chain === ChainBackendNames.EVMOS) {
      userAddress = web3.utils.toChecksumAddress(userAddress);
    }

    const gasPrice = await getGasPrice(chain);
    const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[contractDecimals];
    const parsedSendingAmount = web3.utils.toWei(Number(amountToSend).toFixed(contractDecimals), etherUnit).toString();
    let signer;
    let isWalletConnect = false;
    if(connector && provider){
      if (provider.provider.signer.connection.chainId !== parseInt(chainId)) {
        await connector.activate(parseInt(chainId));
      }
      isWalletConnect = true;
      signer = await provider.getSigner();
    }else{
      await switchNetwork(chainId);
      const etherProvider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
      signer = await etherProvider.getSigner();
    }
    const gasLimit = '';

    if (isNativeToken(contractAddress)) {
      const txnHash = await sendNativeCoin({
        fromAddress: userAddress,
        toAddress,
        gasPrice: web3.utils.toWei(gasPrice.gasPrice.toFixed(9), 'gwei').toString(),
        gasLimit: gasLimit.toString(),
        amountToSend: parsedSendingAmount,
        signer,
        isWalletConnect,
        isBridge
      });
      return { isError: false, hash: txnHash };
    } else {
      const txnHash = await sendToken({ contractAddress, toAddress, amount: parsedSendingAmount, gasLimit, signer, isWalletConnect, isBridge });
      return { isError: false, hash: txnHash };
    }
  } catch (error) {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: error,
      icon: 'error'
    });
    console.log('error', error);
    return { isError: true, error: error };
  }
}
