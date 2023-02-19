declare let window: any;

export const fetchCurrentNetwork = async () => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    return currentChainId;
  } else {
    console.log('Not connected to any Network');
  }
}

export const checkNetwork = async (targetNetworkId: string) => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    // return true if network id is the same
    if (currentChainId == targetNetworkId) return true;
    // return false is network id is different
    return false;
  } else {
    console.log('Not connected to any network');
    return false;
  }
};

export const switchNetwork = async (targetNetworkId: string) => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: targetNetworkId }],
  });

  // refresh
  window.location.reload();
};
