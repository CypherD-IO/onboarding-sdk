import { getGasPrice, isNativeToken } from ".";
import { addChainData, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING, contractABI, CONTRACT_DECIMAL_TO_ETHER_UNITS } from "../constants/server";
import { switchNetwork } from "../core";

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
    const {
      exchangingTokenDetail: {
        chainDetails: {
          chain_id
        },
        contractDecimals
      },
      bridgeInputDetails: {
        tokenValueEntered
      },
      Cypher: {
        ethers: {
          BrowserProvider
        },
        Web3
      },
      cypherWalletDetails: {
        address
      }
    } = globalThis;
    const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].rpcUrls[0];
    const web3 = new Web3(rpcEndpoint);
    let userAddress = address;

    if (chain === ChainBackendNames.EVMOS) {
      userAddress = web3.utils.toChecksumAddress(userAddress);
    }
    const tx = {
      from: userAddress,
      to: contractAddress,
      gasPrice: web3.utils.toWei(gasPrice.toFixed(9), 'gwei').toString(),
      gas: gasLimit,
      value: isNative ? web3.utils.toWei(Number(tokenValueEntered).toFixed(contractDecimals), 'ether') : '0x0',
      data: contractData,
    };

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const response = await signer.sendTransaction(tx);

    const receipt = await response.wait();
    return { hash: receipt?.hash, isError: false };

  } catch (error: any) {
    return { isError: true, error: error.toString() };
  }
}

export const getSwapAllowanceApproval = async () => {
  const {
    exchangingTokenDetail: {
      chainDetails: {
        backendName,
        chain_id
      },
      contractAddress
    },
    allowanceData: {
      contractData,
      gasPrice: {
        gasPrice
      }
    },
    swapQuoteData: {
      data: {
        gas
      }
    },
    toastMixin
  } = globalThis;

  const approvalResp = await getAllowanceApproval({
    chain: backendName,
    contractData: contractData,
    gasLimit: gas,
    gasPrice: gasPrice,
    contractAddress: swapContractAddressCheck(contractAddress, chain_id),
    isNative: isNativeToken(contractAddress)
  });
  if (!approvalResp.isError) {
    globalThis.allowanceData = { ...globalThis.allowanceData, isAllowance: false };
    return true;
  } else {
    toastMixin.fire({
      title: 'Oops...',
      text: approvalResp.error.toString(),
      icon: 'error'
    });
    return false;
  }
};

export const checkAllowance = async ({
  chain,
  contractAddress,
  routerAddress,
  amount,
  contractDecimal,
  isNative
}: any) => {
  const {
    exchangingTokenDetail: {
      chainDetails: {
        chain_id
      },
      contractDecimals
    },
    cypherWalletDetails: {
      address
    },
    bridgeInputDetails: {
      tokenValueEntered
    },
    Cypher: {
      Web3
    }
  } = globalThis;
  await switchNetwork(chain_id);
  const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(chain_id)!].rpcUrls[0];
  const web3 = new Web3(rpcEndpoint);
  let userAddress = address;
  if (chain === ChainBackendNames.EVMOS) {
    userAddress = web3.utils.toChecksumAddress(userAddress);
  }
  const gasPrice = await getGasPrice(chain);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const response = await contract.methods.allowance(userAddress, routerAddress).call();
  const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[contractDecimals];
  const tokenAmount = web3.utils.toWei(Number(amount).toFixed(contractDecimals), etherUnit).toString();
  if (Number(tokenAmount) > Number(response)) {
    if (Number(amount) < 1000) amount = '1000';
    const tokens = web3.utils.toWei((Number(amount) * 10).toFixed(contractDecimals));
    const resp = contract.methods.approve(routerAddress, tokens).encodeABI();
    const gasLimit = await web3.eth.estimateGas({
      from: userAddress,
      to: contractAddress,
      value: isNative ? web3.utils.toWei(Number(tokenValueEntered).toFixed(contractDecimals), 'ether') : '0x0',
      data: resp,
    });
    return { isError: false, isAllowance: true, contractData: resp, gasLimit: gasLimit, gasPrice };
  }
  return { isError: false, isAllowance: false };
}
