import _ from "lodash";
import { ARCH_HOST, ChainBackendNames } from "../constants/server";
import { demoFunction, onGetQuote } from "../utils/bridge";

export const demo = (address: string) => {
  return `<div id="popup"><h2 id="header2">Hello!</h2><p>Welcome ${address}</p><p>Oops! you don't have sufficient balance in the token. Do u wish to Bridge or Buy ?</p><button id="closePopup">Close</button></div>`;
}

export const noBalanceScript = () => {
  // const value = `<script defer>var buttonElements = document.getElementsByClassName('blue-button'); for(var i = 0; i<buttonElements.length; i++) { buttonElements[i].addEventListener('click', function () {console.log('1234')}) }; </script>`;
  const value = `
    <script defer>


      console.log(Web3.utils.toChecksumAddress('0x71d357ef7e29f07473f9edfb2140f14605c9f309'));

      function showBridgePopup (tokenDetail) {
        console.log('pressed token details is', JSON.parse(tokenDetail));
      }

      function bridgePopup (tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId) {
        console.log("Pressed", tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId);
        document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};
      }

      const parentElement = document.querySelector("#popupBackground");
      parentElement.addEventListener("input", event => {
        if (event.target && event.target.matches("input[type='text']")) {
          const tokenValueElement = document.querySelector("#bp-token-value");
          const price = parseFloat(globalThis.exchangingTokenDetail.price);
          console.log('val', price);
          const newValue = (parseFloat(event.target.value) / price).toFixed(6);
          tokenValueElement.innerHTML = newValue.toString();
        }
      });

      function backToNoBalanceHTML () {
        document.getElementById("popupBackground").innerHTML = ${noBalanceHTML};
      }

      function closePopup () {
        const popupBackground = document.getElementById("popupBackground");
        popupBackground.remove();
      }

      async function fetchCurrentNetwork () {
        if (window.ethereum) {
          const currentChainId = await window.ethereum.request({
            method: 'eth_chainId',
          });
          return currentChainId;
        } else {
          console.log('Not connected to any Network');
        }
      }

      async function checkNetwork (targetNetworkId) {
        console.log("the chain id received is : ", targetNetworkId);
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

      function fetchChainDetails (chainId) {
        switch(chainId) {
          case "0x1": {
            return {
              chainName: 'ethereum',
              name: 'Ethereum',
              symbol: 'ETH',
              id: 0,
              backendName: 'ETH',
              chain_id: '0x1',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              chainIdNumber: 1,
              rpcEndpoint: 'https://rpc.ankr.com/eth',
            };
            break;
          }
          case "0x89": {
            return {
              chainName: 'ethereum',
              name: 'Polygon',
              symbol: 'MATIC',
              id: 1,
              backendName: 'POLYGON',
              chain_id: '0x89',
              native_token_address: '0x0000000000000000000000000000000000001010',
              rpcEndpoint: 'https://rpc.ankr.com/polygon',
              chainIdNumber: 137
            }
            break;
          }
          case "0x38": {
            return {
              chainName: 'ethereum',
              name: 'Binance Smart Chain',
              symbol: 'BNB',
              id: 2,
              backendName: 'BSC',
              chain_id: '0x38',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              rpcEndpoint: 'https://rpc.ankr.com/bsc',
              chainIdNumber: 56
            }
            break;
          }
          case "0xa86a": {
            return {
              chainName: 'ethereum',
              name: 'Avalanche',
              symbol: 'AVAX',
              id: 3,
              backendName: 'AVALANCHE',
              chain_id: '0xa86a',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              rpcEndpoint: 'https://rpc.ankr.com/avalanche',
              chainIdNumber: 43114
            }
            break;
          }
          case "0xfa": {
            return  {
              chainName: 'ethereum',
              name: 'Fantom',
              symbol: 'FTM',
              id: 5,
              backendName: 'FANTOM',
              chain_id: '0xfa',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              rpcEndpoint: 'https://rpc.ankr.com/fantom',
              chainIdNumber: 250
            }
            break;
          }
          case "0xa4b1": {
            return {
              chainName: 'ethereum',
              name: 'Arbitrum One',
              symbol: 'ETH',
              id: 10,
              backendName: 'ARBITRUM',
              chain_id: '0xa4b1',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              rpcEndpoint: 'https://arb1.arbitrum.io/rpc',
              chainIdNumber: 42161
            }
            break;
          }
          case "0xa": {
            return {
              chainName: 'ethereum',
              name: 'Optimism',
              symbol: 'ETH',
              id: 11,
              backendName: 'OPTIMISM',
              chain_id: '0xa',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              rpcEndpoint: 'https://opt-mainnet.g.alchemy.com/v2/_xYARKGN55iQpuX94lySfkcZ7GTW-a4C',
              chainIdNumber: 10
            }
            break;
          }
          case "0x2329": {
            return {
              chainName: 'evmos',
              name: 'Evmos',
              symbol: 'EVMOS',
              id: 6,
              backendName: 'EVMOS',
              chain_id: '0x2329',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              secondaryAddress: '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b',
              rpcEndpoint: 'https://evmos-json-rpc.stakely.io',
              chainIdNumber: 9001
            }
          }
          default: {return{}};
        };
      };

      function fetchEthereumChainData (chainId) {
        console.log('chainId inside switch', chainId);
        switch(chainId) {
          case "0x1": {return {
            chainId: '0x${Number(1).toString(16)}',
            chainName: 'Ethereum Mainnet',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://api.mycryptoapi.com/eth', 'https://cloudflare-eth.com'],
            blockExplorerUrls: ['https://etherscan.io'],
            }
            break;
          }
          case "0x89": {return {
            chainId: '0x${Number(137).toString(16)}',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
            }
            break;
          }
          case "0x38": {return {
            chainId: "0x${Number(56).toString(16)}",
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'Binance Chain Native Token',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: [
              'https://bsc-dataseed1.binance.org',
              'https://bsc-dataseed2.binance.org',
              'https://bsc-dataseed3.binance.org',
              'https://bsc-dataseed4.binance.org',
              'https://bsc-dataseed1.defibit.io',
              'https://bsc-dataseed2.defibit.io',
              'https://bsc-dataseed3.defibit.io',
              'https://bsc-dataseed4.defibit.io',
              'https://bsc-dataseed1.ninicoin.io',
              'https://bsc-dataseed2.ninicoin.io',
              'https://bsc-dataseed3.ninicoin.io',
              'https://bsc-dataseed4.ninicoin.io',
              'wss://bsc-ws-node.nariox.org',
            ],
            blockExplorerUrls: ['https://bscscan.com'],
            }
            break;
          }
          case "0xa86a": {return {
            chainId: "0x${Number(43114).toString(16)}",
            chainName: 'Avalanche Mainnet',
            nativeCurrency: {
              name: 'Avalanche',
              symbol: 'AVAX',
              decimals: 18,
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io'],
            }
            break;
          }
          case "0xfa": {return  {
            chainId: "0x${Number(250).toString(16)}",
            chainName: 'Fantom Opera',
            nativeCurrency: {
              name: 'Fantom',
              symbol: 'FTM',
              decimals: 18,
            },
            rpcUrls: ['https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac'],
            blockExplorerUrls: ['https://ftmscan.com'],
            }
            break;
          }
          case "0xa4b1": {return {
            chainId: "0x${Number(42161).toString(16)}",
            chainName: 'Arbitrum One',
            nativeCurrency: {
              name: 'Arbitrum One Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.ankr.com/arbitrum'],
            blockExplorerUrls: ['https://arbiscan.io/'],
            }
            break;
          }
          case "0xa": {return {
            chainId: "0x${Number(10).toString(16)}",
            chainName: 'Optimism',
            nativeCurrency: {
              name: 'Optimism Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.optimism.io'],
            blockExplorerUrls: ['https://optimistic.etherscan.io/'],
            }
            break;
          }
          case "0x2329": {return {
            chainId: "0x${Number(9001).toString(16)}",
            chainName: 'Evmos',
            nativeCurrency: {
              name: 'Evmos',
              symbol: 'EVMOS',
              decimals: 18,
            },
            rpcUrls: ['https://eth.bd.evmos.org:8545'],
            blockExplorerUrls: ['https://evm.evmos.org'],
            }
            break;
          }
          default: {return{}};
        };
      };

      async function switchNetwork (targetNetworkId, chainName) {
        if (chainName === "ETH") {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: targetNetworkId }],
            });
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
        } else {
          try {
            console.log("the chainId : ", targetNetworkId);
            console.log("the fetched data : ", {...fetchEthereumChainData(targetNetworkId)});
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{...fetchEthereumChainData(targetNetworkId)}],
            });
            return true;
          } catch (error) {
            return false;
          }
        }

        // refresh
        window.location.reload();
      };

      async function bridgeSubmit (chainId, chainName) {
        console.log("bridge submit pressed", chainId);
        const usdValueEntered = document.querySelector("#bp-amount-value").value;
        const tokenValueEntered = document.querySelector("#bp-token-value").textContent;
        const usdBalance = document.querySelector("#bp-balance-detail-usd-value");
        const numericUsdBalance = parseFloat(usdBalance.textContent.slice(1));
        const tokenBalance = document.querySelector("#bp-balance-detail-token-value").textContent;
        globalThis.bridgeInputDetails = { usdValueEntered, tokenValueEntered, numericUsdBalance, tokenBalance };
        console.log(parseFloat(numericUsdBalance), parseFloat(usdValueEntered));
        if (parseFloat(numericUsdBalance) >= parseFloat(usdValueEntered)) {
          console.log("Bridge Eligible", "0x" + chainId.toString(16));
          console.log("The current Network is : ", await checkNetwork("0x" + chainId.toString(16)));
          if (await checkNetwork("0x" + chainId.toString(16))) {
            const currentChainId = await fetchCurrentNetwork();
            console.log('global vallue ', globalThis.requiredTokenDetail);
            await onGetQuote();
            document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
          } else {
            console.log('chainId', chainId);
            console.log('symbol', chainId, fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol);
            const currentChainId = await fetchCurrentNetwork();
            console.log('current chain id', currentChainId);
            document.getElementById("popupBackground").innerHTML = ${bridgeSwitchHTML};
          }
        } else {
          console.log('Bridge Not Possible');
        }
      }

      async function navigateAfterSwitch (chainId, chainName) {
        console.log('insde switch call', chainId, chainName);
        console.log('insde switch call', await switchNetwork(chainId, chainName));
        if (await switchNetwork(chainId, chainName)) {
          await onGetQuote();
          document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
        }
      }

      async function onGetQuote () {
        console.log('on get quore: ');
          const reqQuoteData = {
            fromAddress: globalThis.userDetails.address,
            toAddress: globalThis.userDetails.address,
            fromChain: globalThis.exchangingTokenDetail.chainDetails.backendName,
            toChain: globalThis.requiredTokenDetail.chainDetails.backendName,
            fromTokenAddress: globalThis.exchangingTokenDetail.contractAddress,
            fromTokenDecimal: globalThis.exchangingTokenDetail.contractDecimals,
            toTokenAddress: globalThis.requiredTokenDetail.contractAddress,
            toTokenDecimal: globalThis.requiredTokenDetail.contractDecimals,
            fromAmount: parseFloat(14),
            fromTokenLabel: globalThis.exchangingTokenDetail.name,
            toTokenLabel: globalThis.requiredTokenDetail.name,
            fromTokenSymbol: globalThis.exchangingTokenDetail.chainDetails.symbol,
            toTokenSymbol: globalThis.requiredTokenDetail.chainDetails.symbol,
            fromTokenCoingeckoId: globalThis.exchangingTokenDetail.coinGeckoId,
            toTokenCoingeckoId: globalThis.requiredTokenDetail.coinGeckoId,
          };
          console.log('reqQuoteData', reqQuoteData);
          const result = fetch('${ARCH_HOST}/v1/bridge/quote', {
            method: 'POST',
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(reqQuoteData)
          }).then(function(response){
            return response.json()})
            .then(function(data)
            {
              console.log('the data from bridge : ', data);
              document.getElementById("token-received").textContent = data.transferAmount.toFixed(6) + ' ' + globalThis.requiredTokenDetail.chainDetails.symbol;
              document.getElementById("usd-received").textContent = '$ ' + data.usdValue.toFixed(2);
            });
          console.log('result from POST', result);
      }

      async function demoCall (val=0) {
        console.log('called ....');
        if(val){
          await (${onGetQuote})();
        }
      }

      </script>`;

    //   async function send({
    //     chain,
    //     amountToSend,
    //     toAddress,
    //     contractAddress,
    //     contractDecimal,
    //   }: SendInEvmInterface): Promise<{ isError: boolean; hash?: string; error?: any }> {
    //     try {
    //       const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id);

    //       const web3 = new Web3(rpcEndpoint);

    //       let userAddress = globalThis.userDetails.address;

    //       if (userAddress) {
    //         if (chain === ${ChainBackendNames.EVMOS}) {
    //           userAddress = web3.utils.toChecksumAddress(userAddress);
    //         }
    //         const gasPrice = await getGasPrice(chain);

    //         const etherUnit = get(CONTRACT_DECIMAL_TO_ETHER_UNITS, contractDecimal);
    //         const parsedSendingAmount = web3.utils.toWei(amountToSend, etherUnit).toString();

    //         const isNativeToken = EVM_CHAINS_NATIVE_TOKEN_MAP.get(chain) === contractAddress;
    //         await switchNetwork(chain);
    //         const gasLimit = await estimateGasLimit({
    //           amountToSend: parsedSendingAmount,
    //           contractAddress,
    //           fromAddress: userAddress,
    //           toAddress,
    //           web3,
    //         });
    //         if (isNativeToken) {
    //           const txnHash = await sendNativeCoin({
    //             fromAddress: userAddress,
    //             toAddress,
    //             gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei').toString(),
    //             gasLimit: gasLimit.toString(),
    //             amountToSend: parsedSendingAmount,
    //           });
    //           return { isError: false, hash: txnHash };
    //         } else {
    //           const txnHash = await sendToken({ contractAddress, toAddress, amount: parsedSendingAmount, gasLimit });
    //           return { isError: false, hash: txnHash };
    //         }
    //       } else {
    //         navigate('/');
    //       }
    //     } catch (error) {
    //       return { isError: true, error: error };
    //     }
    //     return { isError: true };
    //   }



    //   async function bridge () {
    //     const resp = await send({
    //       amountToSend: cryptoAmount,
    //       contractAddress: fromToken.value.contractAddress,
    //       toAddress: quoteData.step1TargetWallet,
    //       chain: fromChain.value.backendName,
    //       contractDecimal: fromToken.value.contractDecimals,
    //     });
    //     if (!resp.isError && resp.hash) {
    //       resolve(resp);
    //       await onDepositFund(resp?.hash);
    //     } else {
    //       setLoading(false);
    //       reject(true);
    //       setQuoteVisible(false);
    //       await errorModal({ titleText: resp?.error?.message.toString() });
    //     }
    //   }
    // </script>`;

  // const value = `<script defer>function bridgePopup (tokenDetail) {console.log("Pressed", JSON.parse(decodeURIComponent(tokenDetail)).name);"}</script>`;

  // await switchNetwork("0x" + chainId.toString(16), chainName);

  return value;
  // const buttonElements = document.getElementsByClassName('blue-button');
  // for(let i = 0; i<buttonElements.length; i++) {
  //   buttonElements[i].addEventListener('click', function () { console.log('1234') })
  // }
}


// const bridgePopup = (index: number) => {
//  console.log('pressed', index);
// }

export const noBalanceHTML = (totalHoldings: any, requiredTokenDetail: any) => {

  // function bridgePopup(index: number) {
  //   console.log('pressed ', _.get(totalHoldings[index], ['name']));
  // }

  const tokensAvailableList = totalHoldings.map((tokenDetail: any, index: number) => `
    <div id="token-detail-${index%2}">
      <img id="td-chain-icon" src="https://public.cypherd.io/icons/logos/${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(tokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="20" height="20"/>
      <p>${_.get(tokenDetail, ['chainDetails', 'backendName'])}</p>
      <img id="td-token-icon" src="${_.get(tokenDetail, ['logoUrl'])}" alt="${_.get(tokenDetail, ['name'])} logo" width="20" height="20">
      <p>${_.get(tokenDetail, ['name'])}</p>
      <p id="td-usd-value">${_.get(tokenDetail, ['actualBalance']) * _.get(tokenDetail, ['price'])}</p>
      <p id="td-token-balance">${_.get(tokenDetail, ['actualBalance'])}</p>
      <button class="blue-button" onclick='(function () {globalThis.exchangingTokenDetail = ${JSON.stringify(tokenDetail)}; bridgePopup("${_.get(tokenDetail, ['name'])}", "${_.get(tokenDetail, ['contractAddress'])}", "${_.get(tokenDetail, ['actualBalance'])}", "${_.get(tokenDetail, ['price'])}", "${_.get(tokenDetail, ['symbol'])}", "${_.get(tokenDetail, ['logoUrl'])}", "${_.get(tokenDetail, ['chainDetails', 'backendName'])}", "${_.get(tokenDetail, ['chainDetails', 'chain_id'])}")})()'>Exchange</button>
    </div>
  `).join(' ');

  // <button class="blue-button" onclick="bridgePopup('${_.get(tokenDetail, ['name'])}', '${_.get(tokenDetail, ['contractAddress'])}', '${_.get(tokenDetail, ['actualBalance'])}', '${_.get(tokenDetail, ['price'])}', '${_.get(tokenDetail, ['symbol'])}', '${_.get(tokenDetail, ['logoUrl'])}', '${_.get(tokenDetail, ['chainDetails', 'backendName'])}', '${_.get(tokenDetail, ['chainDetails', 'chain_id'])}')">Exchange</button>
  // <button class="blue-button" onclick='(function () {globalThis.exchangingTokenDetail = ${JSON.stringify(tokenDetail)}; bridgePopup("${_.get(tokenDetail, ['name'])}", "${_.get(tokenDetail, ['contractAddress'])}", "${_.get(tokenDetail, ['actualBalance'])}", "${_.get(tokenDetail, ['price'])}", "${_.get(tokenDetail, ['symbol'])}", "${_.get(tokenDetail, ['logoUrl'])}", "${_.get(tokenDetail, ['chainDetails', 'backendName'])}", "${_.get(tokenDetail, ['chainDetails', 'chain_id'])}")})()'>Exchange</button>

  const htmlValue = `
    <div id="popup">
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(requiredTokenDetail, ['chainDetails', 'backendName']).toLowerCase()} logo" width="42" height="42">
        <img src="${_.get(requiredTokenDetail, ['logoUrl'])}" alt="Arbitrum logo" width="42" height="42">
      </div>
      <div>
        <h2>You need ETH in BSC to use this dApp</h2>
        <p>You can exchange with below tokens in your wallet  </p>
      </div>
      <div id="tokens-available-flex-box">
        ${tokensAvailableList}
      </div>
    </div>
  `;

  return htmlValue;
};

// tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId

// export const bridgeInputHTML = `'<div id="bp-back-close-button-flex-box"><p>' + tokenSymbol + '</p></div>'`;

// export const bridgeInputHTML = `'<div id="bridgePopupCSS">' +
//  '<h2>Enter Token Amount</h2>' +
//  '</div>'`;

// export const bridgeInputHTML = ` '<div id="bridgePopupCSS"> <div id="bp-back-close-button-flex-box"> <p>Back Button</p>  <p>Close Button</p> </div>  <h2>Enter Token Amount</h2>  <div id="bp-amount-input-flex-box"> <div id="bp-max-button"> <p>MAX</p> </div> <div id="bp-amount-input"> <p>USD</p> <h1 id="bp-amount-value">0.00</h1> <div id="bp-token-value-flex-box"> <p id="bp-token-value">00</p> <p>tokenSymbol</p> </div> </div> <div id="bp-switch-button"> <p>SWITCH</p> </div> </div> <div id="bp-balance-flex-box"> <div id="bp-balance-logo"> <p>img</p> </div> <div id="bp-balance-detail"> <div id="bp-balance-detail-usd"> <p>chainName</p> <p>$ actualBalance * price </p> </div> <div id="bp-balance-detail-token"> <p>tokenSymbol</p> <p>actualBalance</p> </div> </div> </div> <div id="bp-submit-button-container"> <button class="blue-button">Submit</button> </div> </div>'`;

export const bridgeInputHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<h2>Enter Token Amount</h2>'+
  '<div id="bp-amount-input-flex-box">'+
    '<div id="bp-max-button">'+
      '<p>MAX</p>'+
    '</div>'+
    '<div id="bp-amount-input">'+
      '<p>USD</p>'+
      '<input type="text" id="bp-amount-value" placeholder="0.00">'+
      '<div id="bp-token-value-flex-box">'+
        '<p id="bp-token-value">00</p>'+
        '<p>' + tokenSymbol + '</p>'+
      '</div>'+
    '</div>'+
    '<div id="bp-switch-button">'+
      '<p>SWITCH</p>'+
    '</div>'+
  '</div>'+
  '<div id="bp-balance-flex-box">'+
    '<div id="bp-balance-logo">'+
      '<img src="' + tokenLogoUrl + '" alt="' + tokenLogoUrl + '" width="42" height="42">'+
    '</div>'+
    '<div id="bp-balance-detail">'+
      '<div id="bp-balance-detail-usd">'+
        '<p>' + chainName + '</p>'+
        '<p id="bp-balance-detail-usd-value">$' + (actualBalance * price).toFixed(4) + '</p>'+
      '</div>'+
      '<div id="bp-balance-detail-token">'+
        '<p>' + tokenSymbol + '</p>'+
        '<p id="bp-balance-detail-token-value">' + parseFloat(actualBalance).toFixed(6) + '</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="bp-submit-button-container">'+
    '<button class="blue-button" onclick="bridgeSubmit(' + chainId + ', ' + "'" +  chainName + "'" + ')">Submit</button>'+
  '</div>'+
'</div>'`;

// tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId

// const inputField = document.getElementById("bp-amount-value");

// inputField?.addEventListener("input", () => {
//   console.log('inputing ....');
// });


export const bridgeSummaryHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<div id="bp-heading">'+
    '<h2>Summary</h2>'+
  '</div>'+
  '<div id="bp-summary-container">'+
    '<div class="bp-summary-row exchange-row">'+
      '<p>Exchange from</p>'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.exchangingTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.exchangingTokenDetail.chainDetails.backendName +'</p>'+
      '<img src="' + globalThis.exchangingTokenDetail.logoUrl + '" alt="' + globalThis.exchangingTokenDetail.name + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.exchangingTokenDetail.name +'</p>'+
    '</div>'+
    '<div class="bp-summary-row amount-row">'+
      '<p>Amount Sending</p>'+
      '<p>' + parseFloat(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(6) + ' ' + globalThis.exchangingTokenDetail.chainDetails.symbol + '</p>'+
      '<p>$' + parseFloat(globalThis.bridgeInputDetails.usdValueEntered).toFixed(2) +'</p>'+
    '</div>'+
    '<div class="bp-summary-row exchange-row">'+
      '<p>Exchange to</p>'+
      '<img src="https://public.cypherd.io/icons/logos/' + globalThis.requiredTokenDetail.chainDetails.backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.requiredTokenDetail.chainDetails.backendName +'</p>'+
      '<img src="' + globalThis.requiredTokenDetail.logoUrl + '" alt="' + globalThis.requiredTokenDetail.name + ' logo" width="22" height="22">'+
      '<p>'+ globalThis.requiredTokenDetail.name +'</p>'+
    '</div>'+
    '<div class="bp-summary-row amount-row">'+
      '<p>Amount Receiving</p>'+
      '<p id="token-received"> ...' + globalThis.requiredTokenDetail.chainDetails.symbol + '</p>'+
      '<p id="usd-received">$ ... </p>'+
    '</div>'+
  '</div>'+
  '<div>'+
    '<button id="blue-button" onclick="demoCall(1)">Exchange</button>'+
  '</div>'+
'</div>'`;

export const bridgeSwitchHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
  '</div>'+
  '<div id="bp-heading">'+
    '<h2>Switch to '+ fetchEthereumChainData("0x" + chainId.toString(16)).chainName +' for this exchange</h2>'+
  '</div>'+
  '<div id="bp-switch-container">'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + fetchChainDetails(currentChainId).backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
      '<p>' + fetchEthereumChainData(currentChainId).nativeCurrency.symbol + '</p>'+
      '<p>'+ fetchEthereumChainData(currentChainId).chainName +'</p>'+
    '</div>'+
    '<div id="bp-switch-icon-container">'+
      '<img src="https://public.cypherd.io/icons/logos/switch_network.png" alt="switch icon" width="100" height="100">'+
    '</div>'+
    '<div id="bp-switch-chain-container">'+
      '<img src="https://public.cypherd.io/icons/logos/' + chainName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
      '<p>' + fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol + '</p>'+
      '<p>'+ chainName +'</p>'+
    '</div>'+
  '</div>'+
  '<button class="blue-button" onclick="navigateAfterSwitch(' + "'0x" + chainId.toString(16) + "'" + ', ' + "'" +  chainName + "'" + ')">Switch</button>'+
'</div>'`;
