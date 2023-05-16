import { addChainData, CHAIN_ID_HEX_TO_ENUM_MAPPING } from "../constants/server";

declare let window: any;
declare let globalThis: any;

export const fetchCurrentNetwork = async () => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    return currentChainId;
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: 'Not connected to any Network',
      icon: 'error'
    });
  }
}

export const checkNetwork = async (targetNetworkId: string) => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    // return true if network id is the same
    if (currentChainId === targetNetworkId) {
      return true;
    } else {
      return false;
    }
    // return false is network id is different
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: 'Not connected to any Network',
      icon: 'error'
    });
    return false;
  }
};

export const switchNetwork = async (targetNetworkId: string) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetNetworkId }],
    });
    return true;
  } catch (error) {
    console.log(error);
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{...addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(targetNetworkId)!]}],
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};
