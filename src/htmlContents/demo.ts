import _ from "lodash";

export const demo = (address: string) => {
  return `<div id="popup"><h2 id="header2">Hello!</h2><p>Welcome ${address}</p><p>Oops! you don't have sufficient balance in the token. Do u wish to Bridge or Buy ?</p><button id="closePopup">Close</button></div>`;
}

export const noBalanceScript = () => {
  // const value = `<script defer>var buttonElements = document.getElementsByClassName('blue-button'); for(var i = 0; i<buttonElements.length; i++) { buttonElements[i].addEventListener('click', function () {console.log('1234')}) }; </script>`;
  const value = `
    <script defer>

      function bridgePopup (tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId) {
        console.log("Pressed", tokenName, tokenContractAddress, actualBalance, price, tokenSymbol, tokenLogoUrl, chainName, chainId);
        document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};
      }

      const parentElement = document.querySelector("#popupBackground");
      parentElement.addEventListener("input", event => {
        if (event.target && event.target.matches("input[type='text']")) {
          const tokenValueElement = document.querySelector("#bp-token-value");
          const price = document.querySelector("#bp-balance-detail-token-value").textContent;
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

      function fetchEthereumChainData (chainId) {
        switch(chainId) {
          case "0x1": {return {
            chainId: '0x${Number(1).toString(16)}',
            chainName: 'Ethereum Mainnet',
            backendName:  'ETH',
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
            backendName:  'POLYGON',
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
            backendName:  'BSC',
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
            backendName:  'AVALANCHE',
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
            backendName:  'FANTOM',
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
            backendName:  'ARBITRUM',
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
            backendName:  'OPTIMISM',
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
            backendName:  'EVMOS',
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
            console.log("the fetched data : ", {...fetchEthereumChainData("0x" + targetNetworkId.toString(16))});
            const {backendName, ...paramValue} = fetchEthereumChainData("0x" + targetNetworkId.toString(16));
            console.log('paramValue : ', paramValue);
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ ...paramValue}],
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
        const usdBalance = document.querySelector("#bp-balance-detail-usd-value");
        const numericUsdBalance = parseFloat(usdBalance.textContent.slice(1));
        console.log(parseFloat(numericUsdBalance), parseFloat(usdValueEntered));
        if (parseFloat(numericUsdBalance) >= parseFloat(usdValueEntered)) {
          console.log("Bridge Eligible", "0x" + chainId.toString(16));
          console.log("The current Network is : ", await checkNetwork("0x" + chainId.toString(16)));
          if (await checkNetwork("0x" + chainId.toString(16))) {
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

      function navigateAfterSwitch () {
        document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
      }
    </script>`;
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

export const noBalanceHTML = (totalHoldings: any, requiredTokenDetails: any) => {

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
      <button class="blue-button" onclick="bridgePopup('${_.get(tokenDetail, ['name'])}', '${_.get(tokenDetail, ['contractAddress'])}', '${_.get(tokenDetail, ['actualBalance'])}', '${_.get(tokenDetail, ['price'])}', '${_.get(tokenDetail, ['symbol'])}', '${_.get(tokenDetail, ['logoUrl'])}', '${_.get(tokenDetail, ['chainDetails', 'backendName'])}', '${_.get(tokenDetail, ['chainDetails', 'chain_id'])}')">Exchange</button>
    </div>
  `).join(' ');

  const htmlValue = `
    <div id="popup">
      <div id="icon-flex-box">
        <img src="https://public.cypherd.io/icons/logos/${_.get(requiredTokenDetails, ['chainDetails', 'backendName']).toLowerCase()}.png" alt="${_.get(requiredTokenDetails, ['chainDetails', 'backendName']).toLowerCase()} logo" width="42" height="42">
        <img src="${_.get(requiredTokenDetails, ['logoUrl'])}" alt="Arbitrum logo" width="42" height="42">
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
        '<p>' + parseFloat(actualBalance).toFixed(6) + '</p>'+
        '<p id="bp-balance-detail-token-value">' + parseFloat(price).toFixed(6) + '</p>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="bp-submit-button-container">'+
    '<button class="blue-button" onclick="bridgeSubmit(' + chainId + ', ' + "'" +  chainName + "'" + ')">Submit</button>'+
  '</div>'+
'</div>'`;

// const inputField = document.getElementById("bp-amount-value");

// inputField?.addEventListener("input", () => {
//   console.log('inputing ....');
// });


export const bridgeSummaryHTML = `'<div id="bridge-popup-css">'+
  '<div id="bp-back-close-button-flex-box">'+
    '<button onclick="backToNoBalanceHTML()">Back Button</button>'+
    '<button onclick="closePopup()">Close Button</button>'+
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
      '<img src="https://public.cypherd.io/icons/logos/' + fetchEthereumChainData(currentChainId).backendName.toLowerCase() + '.png" alt="' + chainName + ' logo" width="42" height="42">'+
      '<p>' + fetchEthereumChainData(currentChainId).nativeCurrency.symbol + '</p>'+
      '<p>'+ fetchEthereumChainData(currentChainId).backendName +'</p>'+
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
  '<button class="blue-button" onclick="switchNetwork(0x' + chainId.toString(16) + ',' + "'" +  chainName + "'" + '); navigateAfterSwitch()">Switch</button>'+
  ''+
  ''+
  ''+

'</div>'`;
