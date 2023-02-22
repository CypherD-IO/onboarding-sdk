// import axios from "axios";

declare let globalThis : any;

export async function onGetQuote () {
  const reqQuoteData = {
    fromAddress: globalThis.userDetails.address,
    toAddress: globalThis.userDetails.address,
    fromChain: globalThis.exchangingTokenDetail.chainDetails.backendName,
    toChain: globalThis.requiredTokenDetail.chainDetails.backendName,
    fromTokenAddress: globalThis.exchangingTokenDetail.contractAddress,
    fromTokenDecimal: globalThis.exchangingTokenDetail.contractDecimals,
    toTokenAddress: globalThis.requiredTokenDetail.contractAddress,
    toTokenDecimal: globalThis.requiredTokenDetail.contractDecimals,
    fromAmount: 14,
    fromTokenLabel: globalThis.exchangingTokenDetail.name,
    toTokenLabel: globalThis.requiredTokenDetail.name,
    fromTokenSymbol: globalThis.exchangingTokenDetail.chainDetails.symbol,
    toTokenSymbol: globalThis.requiredTokenDetail.chainDetails.symbol,
    fromTokenCoingeckoId: globalThis.exchangingTokenDetail.coinGeckoId,
    toTokenCoingeckoId: globalThis.requiredTokenDetail.coinGeckoId,
  };
  console.log('reqQuoteData', reqQuoteData);
  // const result = axios.post('/v1/bridge/quote', reqQuoteData).then;
  // console.log('result from POST', result);
  // if (!isError && data.status !== 'FAILED') {
  //   setQuoteData({ ...quoteData, ...data });
  //   setQuoteVisible(true);
  //   setLoading(false);
  // } else {
  //   if (data?.status === 'FAILED') {
  //     await errorModal({ titleText: data.message });
  //   } else {
  //     if (error?.errors) {
  //       await errorModal({ titleText: String(error?.errors[0]?.message) });
  //     } else {
  //       await errorModal({ titleText: error.message });
  //     }
  //   }
  //   setLoading(false);
  // }
}


export function demoFunction () {
  console.log('Successfully called demo function');
}
