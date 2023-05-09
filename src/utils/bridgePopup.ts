import { bridgeInputHTML } from "../htmlContents";
import { bridgeInputHTML2 } from "../htmlContents/bridgeInputHTML2";
import { get } from "./fetch";

declare let globalThis: any;

function isSwap () {
  return (globalThis.requiredTokenDetail.chainDetails.backendName === globalThis.exchangingTokenDetail?.chainDetails?.backendName);
}

function swapContractAddressCheck(contractAddress: string, chainId = '') {
  if (contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    return '0x0000000000000000000000000000000000000000';
  }
  if (contractAddress === '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000' && chainId === '0xa') {
    return '0x0000000000000000000000000000000000000000';
  }
  return contractAddress;
}

function isTokenSwapSupported (tokenArray: Array<any>, tokenToCheck: any) {

  const tokenPresent =  tokenArray.filter(function (token)
  {
    return token.address.toLowerCase() === tokenToCheck.toLowerCase();
  });
  return tokenPresent.length > 0;
}

const popupBackgroundParentElement = document.querySelector("#popupBackground");
function updateUsdValue (event: any) {
  if (event.target && event.target.matches("input[type='text']")) {
    const tokenValueElement = document.querySelector("#bp-token-value");
    const price = parseFloat(globalThis.exchangingTokenDetail.price);
    const newValue = (parseFloat(event.target.value) / price).toFixed(6);
    tokenValueElement.innerHTML = newValue.toString();
  }
}
popupBackgroundParentElement?.addEventListener("input",updateUsdValue);

function addInputEventListner () {
  const popupBackgroundParentElement = document.querySelector("#popupBackground");
  popupBackgroundParentElement?.addEventListener("input",updateUsdValue);
}

export const bridgePopup = async () => {
  if (isSwap()) {
    if (globalThis.swapSupportedChains?.includes(parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16))) {
      const swapSupportedChainList = get('${ARCH_HOST}/v1/swap/evm/chains/' + parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16) + '/tokens').then(
          function (data) {
            if (isTokenSwapSupported(data.tokens, swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id))) {
              document.getElementById("popupBackground").innerHTML = bridgeInputHTML2();
              addInputEventListner();
            } else {
              // toastMixin.fire({
              //   title: 'Sorry...',
              //   text: 'Swap is not currently supported for ' + globalThis.exchangingTokenDetail.name + ' token. Please choose other tokens.',
              //   icon: 'error'
              // });
              console.log("error");
            }
          });
    } else {
      // toastMixin.fire({
      //   title: 'Sorry...',
      //   text: 'Swap is not currently supported for ' + globalThis.exchangingTokenDetail.chainDetails.backendName + ' chain. Please choose any token from other chains.',
      //   icon: 'error'
      // });
      console.log("error");
    }
  } else {
    document.getElementById("popupBackground").innerHTML = bridgeInputHTML2();
    addInputEventListner();
  }
}
