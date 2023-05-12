import { estimateGasLimit, getGasPrice, switchNetwork } from ".";
import { addChainData, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING, CONTRACT_DECIMAL_TO_ETHER_UNITS, EVM_CHAINS_NATIVE_TOKEN_MAP } from "../constants/server";

declare let globalThis: any;
declare let window: any;

async function sendNativeCoin({
  fromAddress,
  toAddress,
  gasPrice,
  gasLimit,
  amountToSend,
  signer,
  isWalletConnect = false
}: any) {
  const tx = {
    from: fromAddress,
    to: toAddress,
    value: amountToSend,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
  };
  const response = await signer.sendTransaction(tx);
  const receipt = await response.wait();
  if (!isWalletConnect) {
    return receipt?.hash;
  } else{
    return receipt?.transactionHash;
  }
}

async function sendToken({
  contractAddress,
  toAddress,
  amount,
  gasLimit,
  signer,
  isWalletConnect = false
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
  let hash;
  if (!isWalletConnect) {
    const receipt = await response.wait();
    hash = receipt?.hash;
  } else {
    const receipt = await globalThis.cypherWalletDetails.provider?.waitForTransaction(response.hash);
    hash = receipt?.transactionHash;
  }
  return hash;
}

export const send = async ({
  chain,
  amountToSend,
  toAddress,
  contractAddress,
  contractDecimal,
}: any) => {
  try {
    console.log('rpcendpoint', globalThis.exchangingTokenDetail.chainDetails.chain_id, CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id), addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!]);
    const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!].rpcUrls[0];
    console.log('rpcendpoint', rpcEndpoint);
    const web3 = new globalThis.Cypher.Web3(rpcEndpoint);


    let userAddress = globalThis.cypherWalletDetails.address;
    const {connector, provider} = globalThis.cypherWalletDetails;
    const chainId = globalThis.exchangingTokenDetail?.chainDetails?.chain_id;
    console.log(chainId);

    if (chain === ChainBackendNames.EVMOS) {
      userAddress = web3.utils.toChecksumAddress(userAddress);
    }

    const gasPrice = await getGasPrice(chain);
    const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals];
    const parsedSendingAmount = web3.utils.toWei(amountToSend.toString(), etherUnit).toString();
    const isNativeToken = EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress;
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
    console.log(signer);
    const gasLimit = await estimateGasLimit({
      amountToSend: parsedSendingAmount,
      contractAddress,
      fromAddress: userAddress,
      toAddress,
      web3,
      isNative: EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress
    });

    if (isNativeToken) {
      const txnHash = await sendNativeCoin({
        fromAddress: userAddress,
        toAddress,
        gasPrice: web3.utils.toWei(gasPrice.gasPrice.toString(), 'gwei').toString(),
        gasLimit: gasLimit.toString(),
        amountToSend: parsedSendingAmount,
        signer,
        isWalletConnect
      });
      return { isError: false, hash: txnHash };
    } else {
      const txnHash = await sendToken({ contractAddress, toAddress, amount: parsedSendingAmount, gasLimit, signer, isWalletConnect });
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
