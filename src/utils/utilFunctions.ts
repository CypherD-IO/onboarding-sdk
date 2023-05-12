declare let globalThis: any;

export const __capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isSwap = () => {
  return (globalThis.requiredTokenDetail.chainDetails.backendName === globalThis.exchangingTokenDetail?.chainDetails?.backendName);
}

export const swapContractAddressCheck = (contractAddress: string, chainId = '') => {
  if (contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    return '0x0000000000000000000000000000000000000000';
  }
  if (contractAddress === '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000' && chainId === '0xa') {
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

export const requiredUsdValue = (requiredTokenDetail: any, exchangingTokenDetail: any) => {
  const amountRequired = (globalThis.cypherWalletDetails.fromTokenRequiredBalance * requiredTokenDetail.price) - (exchangingTokenDetail.actualBalance * exchangingTokenDetail.price);
  return amountRequired;
}

export const updateUsdValue = (event: any) => {
  if (event.target && event.target.matches("input[type='text']")) {
    const tokenValueElement = document.querySelector("#bp-token-value");
    const price = parseFloat(globalThis.exchangingTokenDetail.price);
    const newValue = (parseFloat(event.target.value) / price).toFixed(6);
    if (tokenValueElement) tokenValueElement.innerHTML = newValue.toString();
  }
}

export const minimizeWindow = () => {
  event?.stopPropagation();
  const sdkContainer: any = document.getElementById("sdkContainer");
  const bridgeLoadingContainer = document.getElementById("bridge-loading-container");
  console.log('bridge container : ', bridgeLoadingContainer);
  if (sdkContainer && bridgeLoadingContainer) {
    sdkContainer.style.backgroundColor = "transparent";
    sdkContainer.style.backdropFilter = "none";
    sdkContainer.style.zoom = 0.4;
    sdkContainer.style.height = "30%";
    sdkContainer.style.width = "40%";
    sdkContainer.style.top = "70%";
    sdkContainer.style.left = "60%";
    bridgeLoadingContainer.classList.remove("lg:w-[30%]");
    bridgeLoadingContainer.classList.add("lg:w-[70%]");
  }
}

export const maximizeWindow = () => {
  const sdkContainer: any = document.getElementById("sdkContainer");
  const bridgeLoadingContainer = document.getElementById("bridge-loading-container");
  if(sdkContainer && bridgeLoadingContainer && sdkContainer.style.zoom === "0.4"){
    sdkContainer.style.backgroundColor = "rgba(0,0,0,0.4)";
    sdkContainer.style.backdropFilter = "blur(5px)";
    sdkContainer.style.zoom = 1;
    sdkContainer.style.height = "100%";
    sdkContainer.style.width = "100%";
    sdkContainer.style.top = 0;
    sdkContainer.style.left = 0;
    bridgeLoadingContainer.classList.remove("lg:w-[70%]");
    bridgeLoadingContainer.classList.add("lg:w-[30%]");
  }
}

export const onFocusInput = (e: any) => {
  e.target.placeholder="";
}

export const onBlurInput = (e: any) => {
  e.target.placeholder="0.00";
}
