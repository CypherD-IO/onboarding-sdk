import { ARCH_HOST, ChainBackendNames } from "../constants/server";
import { bridgeInputHTML, bridgeSummaryHTML, bridgeSwitchHTML, noBalanceHTML } from "../htmlContents";
import { onGetQuote } from "../utils/bridge";

declare let globalThis : any;

// document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};

export const noBalanceScript = () => {
  const value = `
    <script defer>


      console.log(Web3.utils.toChecksumAddress('0x71d357ef7e29f07473f9edfb2140f14605c9f309'));

      async function ConnectMetaMask() {
        if (window.ethereum) {
          try {
            const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const resp = fetch('${ARCH_HOST}/v1/authentication/sign-message/'+walletAddress[0], {
              method: 'GET',
            }).then(function(response){
              return response.json()})
              .then(function(data)
              {
                console.log('the data from connectMetaMask : ', data);
                SignWithMetaMask({ message: data.message, walletAddress: walletAddress[0] });
              });
          } catch (error) {
            console.log({ titleText: 'Please install an Ethereum based wallet extension to connect t' });
          }
        }
      }

      async function SignWithMetaMask({
        message,
        walletAddress,
      }) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(message);
        await GetAuthToken({ signature, walletAddress });
      }

      async function GetAuthToken({
        signature,
        walletAddress,
      }) {
        const resp = fetch('${ARCH_HOST}/v1/authentication/verify-message/'+walletAddress, {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({ signature: signature })
        }).then(function(response){
          return response.json()})
          .then(function(data)
          {
            console.log('the data get aut token : ', data);
            globalThis.AUTH_TOKEN = data.token;
            globalThis.REFRESH_TOKEN = data.refreshToken;
          });
      }

      function showBridgePopup (tokenDetail) {
        console.log('pressed token details is', JSON.parse(tokenDetail));
      }

      function bridgePopup (tokenDetail) {
        globalThis.exchangingTokenDetail = tokenDetail;
        console.log("Pressed", tokenDetail);
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

      const CONTRACT_DECIMAL_TO_ETHER_UNITS = {
        6: 'picoether',
        9: 'gwei',
        18: 'ether',
      };

      const EVM_CHAINS_NATIVE_TOKEN_MAP = new Map([
        ['ETH', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['ARBITRUM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['OPTIMISM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['POLYGON', '0x0000000000000000000000000000000000001010'],
        ['AVALANCHE', '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
        ['BSC', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['FANTOM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['EVMOS', '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b']
      ]);

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
          const currentChainId = await fetchCurrentNetwork();
          if (await checkNetwork("0x" + chainId.toString(16))) {
            console.log('global vallue ', globalThis.requiredTokenDetail);
            await onGetQuote();
            document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
          } else {
            console.log('chainId', chainId);
            console.log('symbol', chainId, fetchEthereumChainData("0x" + chainId.toString(16)).nativeCurrency.symbol);
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
            fromAmount: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
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
              globalThis.bridgeQuote = data;
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

      async function getGasPrice(chain) {
        console.log('in getGasPrice');

        const response = fetch('${ARCH_HOST}/v1/prices/gas/' + chain).then( response => response.json() );
        console.log(response);
        return response;
      }

      async function estimateGasLimit({
        amountToSend,
        contractAddress,
        fromAddress,
        toAddress,
        web3,
      }) {
        console.log('in estimateGAsLimit');

        const contract = new web3.eth.Contract(
          [
            {
              name: 'transfer',
              type: 'function',
              inputs: [
                {
                  name: '_to',
                  type: 'address',
                },
                {
                  type: 'uint256',
                  name: '_tokens',
                },
              ],
              constant: false,
              outputs: [],
              payable: false,
            },
          ],
          contractAddress,
        );

        const contractData = contract.methods.transfer(toAddress, amountToSend).encodeABI();
        console.log('contractData : ', contractData ,{
          from: fromAddress,
          to: contractAddress,
          value: '0x0',
          data: contractData,
        });

        const gasLimit = await web3.eth.estimateGas({
          from: fromAddress,
          to: contractAddress,
          value: '0x0',
          data: contractData,
        });

        console.log('gasLimit : ', gasLimit);

        return gasLimit;
      }

      async function sendNativeCoin({
        fromAddress,
        toAddress,
        gasPrice,
        gasLimit,
        amountToSend,
      }) {
        console.log('in sendNativeToken');

        const tx = {
          from: fromAddress,
          to: toAddress,
          value: amountToSend,
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        };

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const response = await signer.sendTransaction(tx);

        const receipt = await response.wait();
        return receipt?.hash;
      }

      async function sendToken({
        contractAddress,
        toAddress,
        amount,
        gasLimit,
      }) {
        console.log('in sendToken');
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log('ehters.BrowserProvider', provider);
        const signer = await provider.getSigner();

        const contractAbiFragment = [
          {
            name: 'transfer',
            type: 'function',
            inputs: [
              {
                name: '_to',
                type: 'address',
              },
              {
                type: 'uint256',
                name: '_tokens',
              },
            ],
            constant: false,
            outputs: [],
            payable: false,
            gas: gasLimit,
          },
        ];

        const contract = new ethers.Contract(contractAddress, contractAbiFragment, signer);

        const response = await contract.transfer(toAddress, amount);

        const receipt = await response.wait();

        return receipt?.hash;
      }

      async function send({
        chain,
        amountToSend,
        toAddress,
        contractAddress,
        contractDecimal,
      }) {
        try {
          console.log('in Send top');
          console.log('in Send');
          console.log('printing ... ', '${globalThis.exchangingTokenDetail}');
          const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id).rpcEndpoint;
          console.log('rpc', rpcEndpoint);
          const web3 = new Web3(rpcEndpoint);


          let userAddress = globalThis.userDetails.address;

          console.log('rpc', rpcEndpoint, 'web3', web3, 'userAddress', userAddress);
          console.log('chain', chain);

          if (chain === '${ChainBackendNames.EVMOS}') {
            userAddress = web3.utils.toChecksumAddress(userAddress);
            console.log('chain evmos', chain);
          }

          console.log('chain', chain);
          const gasPrice = await getGasPrice(chain);
          console.log('gaPrivce', gasPrice);
          console.log('CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals]',  CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals]);
          const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals];
          console.log('etherUnit', etherUnit);
          const parsedSendingAmount = web3.utils.toWei(amountToSend.toString(), etherUnit).toString();

          const isNativeToken = EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress;
          console.log('isNativeToken', isNativeToken);
          await switchNetwork(globalThis.exchangingTokenDetail?.chainDetails?.chain_id, chain);
          const gasLimit = await estimateGasLimit({
            amountToSend: parsedSendingAmount,
            contractAddress,
            fromAddress: userAddress,
            toAddress,
            web3,
          });

          console.log('gasLimit Received : ', gasLimit);

          if (isNativeToken) {
            const txnHash = await sendNativeCoin({
              fromAddress: userAddress,
              toAddress,
              gasPrice: web3.utils.toWei(gasPrice.gasPrice.toString(), 'gwei').toString(),
              gasLimit: gasLimit.toString(),
              amountToSend: parsedSendingAmount,
            });
            return { isError: false, hash: txnHash };
          } else {
            console.log('going to Send Token');
            const txnHash = await sendToken({ contractAddress, toAddress, amount: parsedSendingAmount, gasLimit });
            return { isError: false, hash: txnHash };
          }
        } catch (error) {
          console.log('error', error);
          return { isError: true, error: error };
        }
        return { isError: true };
      }

      const onDepositFund = async (hash) => {
        console.log('in deposit', onDepositFund);
        const depositPostBody = {
          address: globalThis.userDetails.address,
          quoteUUID: globalThis.bridgeQuote.quoteUuid,
          txnHash: hash,
        };
        console.log('body : ', depositPostBody);
        const resp = fetch('${ARCH_HOST}/v1/bridge/quote/' + globalThis.bridgeQuote.quoteUuid + '/deposit', {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(depositPostBody)
        }).then(function(response){
          return response.json()})
          .then(function(data)
          {
            console.log('deposit data : ', data);
            if (!data.isError) {
              console.log('SucessFully Bridged the amount.');
            } else {
              console.log({ titleText: resp.error.message + ' Please contact Cypher support ', });
            }
          });
      };

      async function bridge () {
        console.log(globalThis.exchangingTokenDetail);
        console.log('in bridge', {
          amountToSend: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
          contractAddress: globalThis.exchangingTokenDetail?.contractAddress,
          toAddress: globalThis.bridgeQuote?.step1TargetWallet,
          chain: globalThis.exchangingTokenDetail?.chainDetails?.backendName,
          contractDecimal: globalThis.exchangingTokenDetail?.contractDecimals,
        });
        const resp = await send({
          amountToSend: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
          contractAddress: globalThis.exchangingTokenDetail?.contractAddress,
          toAddress: globalThis.bridgeQuote?.step1TargetWallet,
          chain: globalThis.exchangingTokenDetail?.chainDetails?.backendName,
          contractDecimal: globalThis.exchangingTokenDetail?.contractDecimals,
        });

        if (!resp.isError && resp.hash) {
          console.log('resp', resp);
          await onDepositFund(resp?.hash);
        } else {
          console.log({ titleText: resp?.error?.message.toString() });
        }
      }
    </script>`;
  return value;
}

// const depositPostBody = {
//   address: globalThis.userDetails.address,
//   quoteUUID: globalThis.bridgeQuote.quoteUuid,
//   txnHash: hash,
// };
