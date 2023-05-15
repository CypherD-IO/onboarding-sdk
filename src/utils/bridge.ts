import { post, checkNetwork, fetchCurrentNetwork, isSwap, requiredUsdValue, swapContractAddressCheck, switchNetwork, getGasPrice, send, closePopup } from ".";
import { addChainData, ARCH_HOST, ChainBackendNames, CHAIN_ID_HEX_TO_ENUM_MAPPING, contractABI, CONTRACT_DECIMAL_TO_ETHER_UNITS, EVM_CHAINS_NATIVE_TOKEN_MAP } from "../constants/server";
import { bridgeSummary, switchChain } from "../screens";

declare let globalThis: any;

export const bridgeSubmit = async () => {
  const chainId = globalThis.exchangingTokenDetail.chainDetails.chain_id;
  const chainName = globalThis.exchangingTokenDetail.chainDetails.backendName;
  const usdValueEntered = document.querySelector("#bp-amount-value")?.value;
  const tokenValueEntered = document.querySelector("#bp-token-value")?.textContent;
  const usdBalance = document.querySelector("#bp-balance-detail-usd-value");
  const numericUsdBalance = parseFloat(usdBalance!.textContent!.slice(1));
  const tokenBalance = document.querySelector("#bp-balance-detail-token-value")?.textContent;
  globalThis.bridgeInputDetails = { usdValueEntered, tokenValueEntered, numericUsdBalance, tokenBalance };
  if (numericUsdBalance >= parseFloat(usdValueEntered)) {
    globalThis.currentChainId = await fetchCurrentNetwork();
    if (await checkNetwork(chainId)) {
      await onGetQuote();
      bridgeSummary();
    } else {
      switchChain();
    }
  } else {
    globalThis.toastMixin.fire({
      title: 'Oops...',
      text: 'Value entered is greater than your balance',
      icon: 'error'
    });
  }
}

export const onGetQuote = async () => {
  if (isSwap()) {
    const payload = {
      fromTokenList: [
        {
          address: swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id),
          amount: globalThis.bridgeInputDetails.tokenValueEntered.toString(),
        },
      ],
      toToken: swapContractAddressCheck(globalThis.requiredTokenDetail.contractAddress, globalThis.requiredTokenDetail.chainDetails.chain_id),
      slippage: 0.4,
      walletAddress: globalThis.cypherWalletDetails.address,
    };
      const response = post(`${ARCH_HOST}/v1/swap/sdk/evm/chains/${globalThis.exchangingTokenDetail.chainDetails.chain_id}/quote`, JSON.stringify(payload)).then(async function(data)
      {
        globalThis.swapQuoteData = {...data};
        const bridgeSubmitButton: any = document.getElementById("bridge-submit-blue-button");
        document.getElementById("token-received")!.textContent = parseFloat(data.toToken.amount).toFixed(6) + ' ' + globalThis.requiredTokenDetail.symbol;
        document.getElementById("usd-received")!.textContent = '$ ' + parseFloat(data.value).toFixed(2);
        if (!data.isError) {
          if (EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) !== globalThis.exchangingTokenDetail?.contractAddress) {
            const allowanceResp: any = await checkAllowance({
              chain: globalThis.exchangingTokenDetail.chainDetails.backendName,
              contractAddress: swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id),
              routerAddress: data?.router,
              amount: globalThis.bridgeInputDetails.tokenValueEntered,
              contractDecimal: globalThis.exchangingTokenDetail.contractDecimals,
              isNative: EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress
            });
            if (!allowanceResp.isError) {
              if (
                allowanceResp.isAllowance &&
                allowanceResp.gasLimit &&
                allowanceResp.contractData &&
                allowanceResp.gasPrice
              ){
                globalThis.allowanceData = {
                  isAllowance: true,
                  gasLimit: allowanceResp.gasLimit,
                  contractData: allowanceResp.contractData,
                  gasPrice: allowanceResp.gasPrice,
                };
                bridgeSubmitButton!.disabled = false;
                bridgeSubmitButton!.classList.remove("disabled-button");
              } else {
                globalThis.allowanceData = {
                  isAllowance: false
                };
                bridgeSubmitButton!.disabled = false;
                bridgeSubmitButton!.classList.remove("disabled-button");
              }
            } else {
              globalThis.toastMixin.fire({
                title: 'Oops...',
                text: allowanceResp.error,
                icon: 'error'
              });
            }
          } else {
            globalThis.allowanceData = {
              isAllowance: false
            };
            bridgeSubmitButton!.disabled = false;
            bridgeSubmitButton!.classList.remove("disabled-button");
          }
        } else {
          if (data.error?.errors) {
            globalThis.toastMixin.fire({
              title: 'Oops...',
              text: String(data.error?.errors[0]?.message),
              icon: 'error'
            });
          } else {
            globalThis.toastMixin.fire({
              title: 'Oops...',
              text: data.error.message,
              icon: 'error'
            });
          }
        }});
  } else {
    const reqQuoteData = {
      fromAddress: globalThis.cypherWalletDetails.address,
      toAddress: globalThis.cypherWalletDetails.address,
      fromChain: globalThis.exchangingTokenDetail.chainDetails.backendName,
      toChain: globalThis.requiredTokenDetail.chainDetails.backendName,
      fromTokenAddress: globalThis.exchangingTokenDetail.contractAddress,
      fromTokenDecimal: globalThis.exchangingTokenDetail.contractDecimals,
      toTokenAddress: globalThis.requiredTokenDetail.contractAddress,
      toTokenDecimal: globalThis.requiredTokenDetail.contractDecimals,
      fromAmount: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
      fromTokenLabel: globalThis.exchangingTokenDetail.name,
      toTokenLabel: globalThis.requiredTokenDetail.name,
      fromTokenSymbol: globalThis.exchangingTokenDetail.symbol,
      toTokenSymbol: globalThis.requiredTokenDetail.symbol.toUpperCase(),
      fromTokenCoingeckoId: globalThis.exchangingTokenDetail.coinGeckoId,
      toTokenCoingeckoId: globalThis.requiredTokenDetail.coinGeckoId,
    };
    const result = post(`${ARCH_HOST}/v1/bridge/sdk/quote`, JSON.stringify(reqQuoteData)).then(function(data){
        if(data?.errors?.length > 0) {
          globalThis.toastMixin.fire({
            title: 'Oops...',
            text: data.errors[0].message,
            icon: 'error'
          });
        } else {
          const bridgeSubmitButton = document.getElementById("bridge-submit-blue-button");
          globalThis.bridgeQuote = data;
          document.getElementById("token-received")!.textContent = data.transferAmount.toFixed(6) + ' ' + globalThis.requiredTokenDetail.symbol;
          document.getElementById("usd-received")!.textContent = '$ ' + data.usdValue.toFixed(2);
          bridgeSubmitButton!.disabled = false;
          bridgeSubmitButton!.classList.remove("disabled-button");
        }
      });
  }
}

async function checkAllowance({
  chain,
  contractAddress,
  routerAddress,
  amount,
  contractDecimal,
  isNative
}: any) {
  await switchNetwork(globalThis.exchangingTokenDetail?.chainDetails?.chain_id);
  const rpcEndpoint = addChainData[CHAIN_ID_HEX_TO_ENUM_MAPPING.get(globalThis.exchangingTokenDetail.chainDetails.chain_id)!].rpcEndpoint;
  const web3 = new globalThis.Cypher.Web3(rpcEndpoint);
  let userAddress = globalThis.cypherWalletDetails.address;
  if (chain === ChainBackendNames.EVMOS) {
    userAddress = web3.utils.toChecksumAddress(userAddress);
  }
  const gasPrice = await getGasPrice(chain);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const response = await contract.methods.allowance(userAddress, routerAddress).call();
  const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals];
  const tokenAmount = web3.utils.toWei(amount, etherUnit).toString();
  if (Number(tokenAmount) > Number(response)) {
    if (Number(amount) < 1000) amount = '1000';
    const tokens = web3.utils.toWei((Number(amount) * 10).toString());
    const resp = contract.methods.approve(routerAddress, tokens).encodeABI();
    const gasLimit = await web3.eth.estimateGas({
      from: userAddress,
      to: contractAddress,
      value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(globalThis.exchangingTokenDetail?.contractDecimals), 'ether') : '0x0',
      data: resp,
    });
    return { isError: false, isAllowance: true, contractData: resp, gasLimit: gasLimit, gasPrice };
  }
  return { isError: false, isAllowance: false };
}

const onDepositFund = async (hash: string) => {
  return new Promise((resolve)=>{
  const depositPostBody = {
    address: globalThis.cypherWalletDetails.address,
    quoteUUID: globalThis.bridgeQuote.quoteUuid,
    txnHash: hash,
  };
    const resp = post(`${ARCH_HOST}/v1/bridge/sdk/quote/${globalThis.bridgeQuote.quoteUuid}/deposit`, JSON.stringify(depositPostBody)).then(function(data)
    {
      if (!data.isError) {
        resolve(data);
      } else {
        globalThis.toastMixin.fire({
          title: 'Please contact Cypher support',
          text: data.error.message,
          icon: 'error'
        });
        console.log({ titleText: data.error.message + ' Please contact Cypher support ', });
      }
    });
  })
};

export const bridge = async () => {
  const resp: any = await send({
    amountToSend: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
    contractAddress: globalThis.exchangingTokenDetail?.contractAddress,
    toAddress: globalThis.bridgeQuote?.step1TargetWallet,
    chain: globalThis.exchangingTokenDetail?.chainDetails?.backendName,
    contractDecimal: globalThis.exchangingTokenDetail?.contractDecimals,
  });

  return new Promise((resolve)=>{
    if (!resp.isError && resp.hash) {
      const bridgeResponse = onDepositFund(resp?.hash).then(function(response: any) {
          resolve(response);
        }
      );
    } else {
      globalThis.toastMixin.fire({
        title: 'Oops...',
        text: resp?.error?.message.toString(),
        icon: 'error'
      });
      console.log({ titleText: resp?.error?.message.toString() });
      setTimeout(()=>{closePopup()}, 5000);
    }
  });
}
