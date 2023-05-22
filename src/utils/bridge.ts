import { post, isSwap, swapContractAddressCheck, isNativeToken, checkAllowance, getSwapAllowanceApproval } from ".";

declare let globalThis: any;

export const onGetQuote = async () => {
  const {
    exchangingTokenDetail,
    bridgeInputDetails: {
      tokenValueEntered
    },
    requiredTokenDetail,
    cypherWalletDetails: {
      address
    },
    toastMixin
  } = globalThis;

  if (isSwap()) {
    const payload = {
      fromTokenList: [
        {
          address: swapContractAddressCheck(exchangingTokenDetail.contractAddress, exchangingTokenDetail.chainDetails.chain_id),
          amount: tokenValueEntered.toString(),
        },
      ],
      toToken: swapContractAddressCheck(requiredTokenDetail.contractAddress, requiredTokenDetail.chainDetails.chain_id),
      slippage: 0.4,
      walletAddress: address,
    };
      const response = post(`v1/swap/sdk/evm/chains/${exchangingTokenDetail.chainDetails.chain_id}/quote`, JSON.stringify(payload)).then(async function(data)
      {
        globalThis.swapQuoteData = {...data};
        const bridgeSubmitButton: any = document.getElementById("bridge-submit-blue-button");
        document.getElementById("token-received")!.textContent = parseFloat(data.toToken.amount).toFixed(6) + ' ' + requiredTokenDetail.symbol;
        document.getElementById("usd-received")!.textContent = '$ ' + parseFloat(data.value).toFixed(2);
        if (!data.isError) {
          if (!isNativeToken(exchangingTokenDetail?.contractAddress)) {
            const allowanceResp: any = await checkAllowance({
              chain: exchangingTokenDetail.chainDetails.backendName,
              contractAddress: swapContractAddressCheck(exchangingTokenDetail.contractAddress, exchangingTokenDetail.chainDetails.chain_id),
              routerAddress: data?.router,
              amount: tokenValueEntered,
              contractDecimal: exchangingTokenDetail.contractDecimals,
              isNative: isNativeToken(exchangingTokenDetail?.contractAddress)
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
                if(await getSwapAllowanceApproval()) {
                  bridgeSubmitButton!.disabled = false;
                  bridgeSubmitButton!.classList.remove("disabled-button");
                }
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
            toastMixin.fire({
              title: 'Oops...',
              text: String(data.error?.errors[0]?.message),
              icon: 'error'
            });
          } else {
            toastMixin.fire({
              title: 'Oops...',
              text: data.error.message,
              icon: 'error'
            });
          }
        }});
  } else {
    const reqQuoteData = {
      fromAddress: address,
      toAddress: address,
      fromChain: exchangingTokenDetail.chainDetails.backendName,
      toChain: requiredTokenDetail.chainDetails.backendName,
      fromTokenAddress: exchangingTokenDetail.contractAddress,
      fromTokenDecimal: exchangingTokenDetail.contractDecimals,
      toTokenAddress: requiredTokenDetail.contractAddress,
      toTokenDecimal: requiredTokenDetail.contractDecimals,
      fromAmount: parseFloat(tokenValueEntered),
      fromTokenLabel: exchangingTokenDetail.name,
      toTokenLabel: requiredTokenDetail.name,
      fromTokenSymbol: exchangingTokenDetail.symbol,
      toTokenSymbol: requiredTokenDetail.symbol.toUpperCase(),
      fromTokenCoingeckoId: exchangingTokenDetail.coinGeckoId,
      toTokenCoingeckoId: requiredTokenDetail.coinGeckoId,
    };
    const result = post(`v1/bridge/sdk/quote`, JSON.stringify(reqQuoteData)).then(function(data){
        if(data?.errors?.length > 0) {
          toastMixin.fire({
            title: 'Oops...',
            text: data.errors[0].message,
            icon: 'error'
          });
        } else {
          const bridgeSubmitButton = document.getElementById("bridge-submit-blue-button");
          globalThis.bridgeQuote = data;
          document.getElementById("token-received")!.textContent = data.transferAmount.toFixed(6) + ' ' + requiredTokenDetail.symbol;
          document.getElementById("usd-received")!.textContent = '$ ' + data.usdValue.toFixed(2);
          bridgeSubmitButton!.disabled = false;
          bridgeSubmitButton!.classList.remove("disabled-button");
        }
      });
  }
}

export const onDepositFund = async (hash: string) => {
  const {
    cypherWalletDetails: {
      address
    },
    bridgeQuote: {
      quoteUuid
    },
    toastMixin
  } = globalThis;
  return new Promise((resolve)=>{
  const depositPostBody = {
    address: address,
    quoteUUID: quoteUuid,
    txnHash: hash,
  };
    const resp = post(`v1/bridge/sdk/quote/${quoteUuid}/deposit`, JSON.stringify(depositPostBody)).then(function(data)
    {
      if (!data.isError) {
        resolve(data);
      } else {
        toastMixin.fire({
          title: 'Please contact Cypher support',
          text: data.error.message,
          icon: 'error'
        });
        console.log({ titleText: data.error.message + ' Please contact Cypher support ', });
      }
    });
  })
};
