import { Colors } from "../constants/colors";
import { ARCH_HOST, ChainBackendNames } from "../constants/server";
import {
  bridgeInputHTML,
  bridgeLoadingHTML,
  bridgeSuccessHTML,
  bridgeSummaryHTML,
  bridgeSwitchHTML,
  noBalanceHTML,
  switchBackHTML,
} from "../htmlContents";
import { get, post, request } from "../utils/fetch";

// document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};

export const noBalanceScript = () => {
  const theme = globalThis.theme;
  const value = `
  <script>
    // tailwind.config = {
    //   theme: {
    //     extend: {
    //       colors: {
    //         primaryBg: 'var(--theme-primaryBg)',
    //         secondaryBg: 'var(--theme-secondaryBg)',
    //         primaryText: 'var(--theme-primaryText)',
    //         borderColor: 'var(--theme-borderColor)',
    //         stripedTableBg: 'var(--theme-stripedTableBg)'
    //       }
    //     }
    //   }
    // }
  </script>
    <script defer>
    switchTheme(globalThis.theme);
    // const root = document.documentElement;
    // root.style.setProperty('--theme-primaryBg', globalThis.Colors[globalThis.theme].primaryBg);
    function switchTheme(theme=''){
      if(!theme) {
        globalThis.theme = globalThis.theme === "light" ? "dark" : "light";
      }
      // globalThis.Colors = '${Colors.dark}'
      const root = document.documentElement;
      // root.style.setProperty('--theme-primaryBg', globalThis.Colors[globalThis.theme].primaryBg);
      Object.keys(globalThis.Colors[globalThis.theme]).forEach((cssVar, index) => {
        root.style.setProperty(cssVar, globalThis.Colors[globalThis.theme][cssVar]);
      });
    }

    // setTimeout(()=>{
    //   maximizeWindow();
    // }, 5000);

    function minimizeWindow(event){
      event?.stopPropagation();
      const sdkContainer = document.getElementById("sdkContainer");
      const popupBackground = document.getElementById("popupBackground");
      const bridgeLoadingContainer = document.getElementById("bridgeLoadingContainer");
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

    function maximizeWindow(){
      const sdkContainer = document.getElementById("sdkContainer");
      const popupBackground = document.getElementById("popupBackground");
      const bridgeLoadingContainer = document.getElementById("bridgeLoadingContainer");
      if(sdkContainer && sdkContainer.style.zoom === "0.4"){
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

    function onFocusInput(e){
      e.target.placeholder="";
    }

    function onBlurInput(e){
      e.target.placeholder="0.00";
    }

      var toastMixin = globalThis.Cypher.Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        position: 'top',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', globalThis.Cypher.Swal.stopTimer)
          toast.addEventListener('mouseleave', globalThis.Cypher.Swal.resumeTimer)
        }
      });

      const request = globalThis.Cypher.request
      const post = globalThis.Cypher.post
      const get = globalThis.Cypher.get

        get('${ARCH_HOST}/v1/swap/evm/chains').then(
          function (data) {
            globalThis.swapSupportedChains = data.chains;
          }
        );

      function isSwap () {
        return (globalThis.requiredTokenDetail.chainDetails.backendName === globalThis.exchangingTokenDetail.chainDetails.backendName);
      }

      async function ConnectMetaMask() {
        if (window.ethereum) {
          try {
            const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const resp = get('${ARCH_HOST}/v1/authentication/sign-message/'+walletAddress[0]).then(function(data){
                SignWithMetaMask({ message: data.message, walletAddress: walletAddress[0] });
            });
          } catch (error) {
            console.log({ titleText: 'Please install an Ethereum based wallet extension to connect' });
          }
        }
      }

      async function SignWithMetaMask({
        message,
        walletAddress,
      }) {
        const provider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(message);
        await GetAuthToken({ signature, walletAddress });
      }

      async function GetAuthToken({
        signature,
        walletAddress,
      }) {
          const resp = post('${ARCH_HOST}/v1/authentication/verify-message/'+walletAddress, JSON.stringify({ signature: signature })).then(function(data){
            globalThis.AUTH_TOKEN = data.token;
            globalThis.REFRESH_TOKEN = data.refreshToken;
          });
      }

      function requiredUsdValue (requiredTokenDetail, exchangingTokenDetail) {
        const amountRequired = (globalThis.cypherWalletDetails.fromTokenRequiredBalance * requiredTokenDetail.price) - (exchangingTokenDetail.actualBalance * exchangingTokenDetail.price);
        return amountRequired;
      }

      function isTokenSwapSupported (tokenArray, tokenToCheck) {

        const tokenPresent =  tokenArray.filter(function (token)
        {
          return token.address.toLowerCase() === tokenToCheck.toLowerCase();
        });
        return tokenPresent.length > 0;
      }

      function swapContractAddressCheck(contractAddress, chainId = '') {
        if (contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          return '0x0000000000000000000000000000000000000000';
        }
        if (contractAddress === '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000' && chainId === '0xa') {
          return '0x0000000000000000000000000000000000000000';
        }
        return contractAddress;
      }

      async function bridgePopup (tokenDetail) {
        globalThis.exchangingTokenDetail = tokenDetail;
        if (isSwap()) {
          if (globalThis.swapSupportedChains?.includes(parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16))) {
            const swapSupportedChainList = get('${ARCH_HOST}/v1/swap/evm/chains/' + parseInt(globalThis.exchangingTokenDetail.chainDetails.chain_id, 16) + '/tokens').then(
                function (data) {
                  if (isTokenSwapSupported(data.tokens, swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id))) {
                    document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};
                    addInputEventListner();
                  } else {
                    toastMixin.fire({
                      title: 'Sorry...',
                      text: 'Swap is not currently supported for ' + globalThis.exchangingTokenDetail.name + ' token. Please choose other tokens.',
                      icon: 'error'
                    });
                  }
                });
          } else {
            toastMixin.fire({
              title: 'Sorry...',
              text: 'Swap is not currently supported for ' + globalThis.exchangingTokenDetail.chainDetails.backendName + ' chain. Please choose any token from other chains.',
              icon: 'error'
            });
          }
        } else {
          document.getElementById("popupBackground").innerHTML = ${bridgeInputHTML};
          addInputEventListner();
        }
      }

      const popupBackgroundParentElement = document.querySelector("#popupBackground");
      function updateUsdValue (event) {
        if (event.target && event.target.matches("input[type='text']")) {
          const tokenValueElement = document.querySelector("#bp-token-value");
          const price = parseFloat(globalThis.exchangingTokenDetail.price);
          const newValue = (parseFloat(event.target.value) / price).toFixed(6);
          tokenValueElement.innerHTML = newValue.toString();
        }
      };
      popupBackgroundParentElement?.addEventListener("input",updateUsdValue);

      function backToNoBalanceHTML () {
        document.getElementById("popupBackground").innerHTML = ${noBalanceHTML};
      }

      function addInputEventListner () {
        const popupBackgroundParentElement = document.querySelector("#popupBackground");
        popupBackgroundParentElement?.addEventListener("input",updateUsdValue);
      }

      function closePopup () {
        const sdkContainer = document.getElementById("sdkContainer");
        sdkContainer.remove();
        // window.location.reload();
        // delete window.Cypher;
      }

      async function fetchCurrentNetwork () {
        if (window.ethereum) {
          const currentChainId = await window.ethereum.request({
            method: 'eth_chainId',
          });
          return currentChainId;
        } else {
          toastMixin.fire({
            title: 'Oops...',
            text: 'Not connected to any Network',
            icon: 'error'
          });
        }
      }

      async function checkNetwork (targetNetworkId) {
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
          toastMixin.fire({
            title: 'Oops...',
            text: 'Not connected to any Network',
            icon: 'error'
          });
          return false;
        }
      };

      const gasFeeReservation = {
        AVALANCHE: 0.001,
        BSC: 0.001,
        COSMOS: 0.1,
        EVMOS: 0.1,
        FANTOM: 0.1,
        JUNO: 0.1,
        OSMOSIS: 0.1,
        POLYGON: 0.1,
        ETH: 0.001,
        ARBITRUM: 0.001,
        OPTIMISM: 0.001,
        STARGAZE: 0.1,
      };

      function fetchChainDetails (chainId) {
        switch(chainId) {
          case "0x5": {
            return {
              chainName: 'ethereum-goerli',
              name: 'Ethereum-Goerli',
              symbol: 'GTH',
              id: 0,
              backendName: 'ETH_GOERLI',
              chain_id: '0x5',
              native_token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
              chainIdNumber: 5,
              rpcEndpoint: 'https://rpc.ankr.com/eth_goerli',
            };
            break;
          }
          case "0x13881": {
            return {
              chainName: 'polygon-mumbai',
              name: 'Polygon Mumbai',
              symbol: 'MATIC',
              id: 0,
              backendName: 'POLYGON_MUMBAI',
              chain_id: '0x13881',
              native_token_address: '0x0000000000000000000000000000000000001010',
              chainIdNumber: 80001,
              rpcEndpoint: 'https://rpc.ankr.com/eth_goerli',
            };
            break;
          }
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
        switch(chainId) {
          case "0x13881": {return {
            chainId: '0x${Number(80001).toString(16)}',
            chainName: 'Polygon Mumbai',
            nativeCurrency: {
              name: 'Matic',
              symbol: 'Matic',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com'],
            }
            break;
          }
          case "0x5": {return {
            chainId: '0x${Number(5).toString(16)}',
            chainName: 'Ethereum Goreli',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'GTH',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
            blockExplorerUrls: ['https://goreli.etherscan.io'],
            }
            break;
          }
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
        ['OPTIMISM', '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'],
        ['POLYGON', '0x0000000000000000000000000000000000001010'],
        ['AVALANCHE', '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
        ['BSC', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['FANTOM', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
        ['EVMOS', '0x93581991f68dbae1ea105233b67f7fa0d6bdee7b']
      ]);

      async function switchNetwork (targetNetworkId, chainName) {
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
                params: [{...fetchEthereumChainData(targetNetworkId)}],
              });
              return true;
            } catch (error) {
              return false;
            }
            return false;
          }

        // refresh
      };

      async function bridgeSubmitConditionCheck (chainId, chainName) {
        const usdValueEntered = document.querySelector("#bp-amount-value").value;
        const amountRequired = requiredUsdValue(globalThis.requiredTokenDetail, globalThis.exchangingTokenDetail);
        if (parseFloat(usdValueEntered) >= Math.max(10, amountRequired)) {
          await bridgeSubmit (chainId, chainName);
        } else {
          toastMixin.fire({
            title: 'Oops...',
            text: 'Please Enter a value greater than the minimum amount ( $' + Math.max(10, amountRequired).toFixed(2) + ' ).',
            icon: 'error'
          });
        }
      }

      async function bridgeSubmit (chainId, chainName) {
        const usdValueEntered = document.querySelector("#bp-amount-value").value;
        const tokenValueEntered = document.querySelector("#bp-token-value").textContent;
        const usdBalance = document.querySelector("#bp-balance-detail-usd-value");
        const numericUsdBalance = parseFloat(usdBalance.textContent.slice(1));
        const tokenBalance = document.querySelector("#bp-balance-detail-token-value").textContent;
        globalThis.bridgeInputDetails = { usdValueEntered, tokenValueEntered, numericUsdBalance, tokenBalance };
        if (parseFloat(numericUsdBalance) >= parseFloat(usdValueEntered)) {
          const currentChainId = await fetchCurrentNetwork();
          if (await checkNetwork("0x" + chainId.toString(16))) {
            await onGetQuote();
            document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
          } else {
            document.getElementById("popupBackground").innerHTML = ${bridgeSwitchHTML};
          }
        } else {
          toastMixin.fire({
            title: 'Oops...',
            text: 'Value entered is greater than your balance',
            icon: 'error'
          });
        }
      }

      async function navigateAfterSwitch (chainId, chainName) {
        const {connector, provider} = globalThis.cypherWalletDetails;
        if(connector && provider){
          await connector.activate(parseInt(chainId));
        }
        else {
          await switchNetwork(chainId, chainName)
        }
        await onGetQuote();
        document.getElementById("popupBackground").innerHTML = ${bridgeSummaryHTML};
      }

      async function getAllowanceApproval({
        chain,
        contractAddress,
        contractData,
        gasLimit,
        gasPrice,
        isNative
      }) {
        try {
          const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id).rpcEndpoint;

          const web3 = new globalThis.Cypher.Web3(rpcEndpoint);

          let userAddress = globalThis.cypherWalletDetails.address;

          if (chain === '${ChainBackendNames.EVMOS}') {
            userAddress = web3.utils.toChecksumAddress(userAddress);
          }
          const tx = {
            from: userAddress,
            to: contractAddress,
            gasPrice: web3.utils.toWei(gasPrice.toFixed(9), 'gwei').toString(),
            gas: gasLimit,
            value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(globalThis.exchangingTokenDetail?.contractDecimals), 'ether') : '0x0',
            data: contractData,
          };

          const provider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const response = await signer.sendTransaction(tx);

          const receipt = await response.wait();
          return { hash: receipt?.hash, isError: false };

        } catch (e) {
          return { isError: true, error: e.toString() };
        }
      }

      async function getSwapAllowanceApproval () {
        const approvalResp = await getAllowanceApproval({
          chain: globalThis.exchangingTokenDetail.chainDetails.backendName,
          contractData: globalThis.allowanceData.contractData,
          gasLimit: globalThis.swapQuoteData.data.gas,
          gasPrice: globalThis.allowanceData.gasPrice.gasPrice,
          contractAddress: swapContractAddressCheck(globalThis.exchangingTokenDetail.contractAddress, globalThis.exchangingTokenDetail.chainDetails.chain_id),
          isNative: EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress
        });
        if (!approvalResp.isError) {
          globalThis.allowanceData = { ...globalThis.allowanceData, isAllowance: false };
        } else {
          toastMixin.fire({
            title: 'Oops...',
            text: approvalResp.error.toString(),
            icon: 'error'
          });
        }
      };

      async function checkAllowance({
        chain,
        contractAddress,
        routerAddress,
        amount,
        contractDecimal,
        isNative
      }) {
        await switchNetwork(globalThis.exchangingTokenDetail?.chainDetails?.chain_id, globalThis.exchangingTokenDetail?.chainDetails?.chainName);

        const contractABI = [
          {
            constant: true,
            inputs: [
              {
                name: '',
                type: 'address',
              },
              {
                name: '',
                type: 'address',
              },
            ],
            name: 'allowance',
            outputs: [
              {
                name: '',
                type: 'uint256',
              },
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                name: 'guy',
                type: 'address',
              },
              {
                name: 'wad',
                type: 'uint256',
              },
            ],
            name: 'approve',
            outputs: [
              {
                name: '',
                type: 'bool',
              },
            ],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ];

        const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id).rpcEndpoint;

        const web3 = new globalThis.Cypher.Web3(rpcEndpoint);

        let userAddress = globalThis.cypherWalletDetails.address;

        if (chain === '${ChainBackendNames.EVMOS}') {
          userAddress = web3.utils.toChecksumAddress(userAddress);
        }

        const gasPrice = await getGasPrice(chain);

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log('going to call contract');
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

      async function swapTokens({
        chain,
        chainId,
        routerAddress,
        contractData,
        isNative,
        amount,
      }) {
        try {
          const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id).rpcEndpoint;

          const web3 = new globalThis.Cypher.Web3(rpcEndpoint);

          let userAddress = globalThis.cypherWalletDetails.address;

          if (chain === '${ChainBackendNames.EVMOS}') {
            userAddress = web3.utils.toChecksumAddress(userAddress);
          }
          const gasPrice = await getGasPrice(chain);

          const gasLimit = await web3.eth.estimateGas({
            from: userAddress,
            to: routerAddress,
            value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(globalThis.exchangingTokenDetail?.contractDecimals), 'ether') : '0x0',
            data: contractData,
          });

          const tx = {
            chainId: chainId,
            value: isNative ? web3.utils.toWei(String(amount), 'ether') : '0x0',
            to: routerAddress,
            data: contractData,
            gas: web3.utils.toHex(2 * Number(gasLimit)),
            gasPrice: web3.utils.toWei(gasPrice.gasPrice.toFixed(9), 'gwei'),
          };

          const provider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const response = await signer.sendTransaction(tx);

          const receipt = await response.wait();
          return { hash: receipt?.hash, isError: false };

        } catch (e) {
          return { isError: true, error: e.toString() };
        }
      }

      async function swap () {
        const swapResp = await swapTokens({
          chain: globalThis.exchangingTokenDetail.chainDetails.backendName,
          chainId: globalThis.swapQuoteData.data.chainId,
          routerAddress: globalThis.swapQuoteData.router,
          contractData: swapQuoteData.data.data,
          isNative: EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress,
          amount: globalThis.bridgeInputDetails.tokenValueEntered.toString(),
        });
        if (!swapResp.isError) {
          maximizeWindow();
          document.getElementById("popupBackground").innerHTML = ${bridgeSuccessHTML};
        } else {
          toastMixin.fire({
            title: 'Swap Failed',
            text: swapResp.error.toString(),
            icon: 'error'
          });
        }
      };

      async function onGetQuote () {
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
            const response = post('${ARCH_HOST}/v1/swap/sdk/evm/chains/' + globalThis.exchangingTokenDetail.chainDetails.chain_id + '/quote', JSON.stringify(payload)).then(async function(data)
            {
              globalThis.swapQuoteData = {...data};
              document.getElementById("token-received").textContent = parseFloat(data.toToken.amount).toFixed(6) + ' ' + globalThis.requiredTokenDetail.symbol;
              document.getElementById("usd-received").textContent = '$ ' + parseFloat(data.value).toFixed(2);

              if (!data.isError) {
                if (EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) !== globalThis.exchangingTokenDetail?.contractAddress) {
                  const allowanceResp = await checkAllowance({
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
                      document.getElementById("bridge-submit-blue-button").disabled = false;
                      document.getElementById("bridge-submit-blue-button").classList.remove("disabled-button");
                    } else {
                      globalThis.allowanceData = {
                        isAllowance: false
                      };
                      document.getElementById("bridge-submit-blue-button").disabled = false;
                      document.getElementById("bridge-submit-blue-button").classList.remove("disabled-button");
                    }
                  } else {
                    toastMixin.fire({
                      title: 'Oops...',
                      text: allowanceResp.error,
                      icon: 'error'
                    });
                  }
                } else {
                  globalThis.allowanceData = {
                    isAllowance: false
                  };
                  document.getElementById("bridge-submit-blue-button").disabled = false;
                  document.getElementById("bridge-submit-blue-button").classList.remove("disabled-button");
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
                setLoading(false);
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
          const result = post('${ARCH_HOST}/v1/bridge/sdk/quote', JSON.stringify(reqQuoteData)).then(function(data){
              if(data?.errors?.length > 0) {
                toastMixin.fire({
                  title: 'Oops...',
                  text: data.errors[0].message,
                  icon: 'error'
                });
              } else {
                globalThis.bridgeQuote = data;
                document.getElementById("token-received").textContent = data.transferAmount.toFixed(6) + ' ' + globalThis.requiredTokenDetail.symbol;
                document.getElementById("usd-received").textContent = '$ ' + data.usdValue.toFixed(2);
                document.getElementById("bridge-submit-blue-button").disabled = false;
                document.getElementById("bridge-submit-blue-button").classList.remove("disabled-button");
              }
            });
        }
      }

      async function getGasPrice(chain) {
        let response = await get('${ARCH_HOST}/v1/prices/gas/' + chain);
        return response;
      }

      async function estimateGasLimit({
        amountToSend,
        contractAddress,
        fromAddress,
        toAddress,
        web3,
        isNative
      }) {

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

        const gasLimit = await web3.eth.estimateGas({
          from: fromAddress,
          to: contractAddress,
          value: isNative ? web3.utils.toWei(Number(globalThis.bridgeInputDetails.tokenValueEntered).toFixed(globalThis.exchangingTokenDetail?.contractDecimals), 'ether') : '0x0',
          data: contractData,
        });

        return gasLimit;
      }

      async function sendNativeCoin({
        fromAddress,
        toAddress,
        gasPrice,
        gasLimit,
        amountToSend,
        signer,
        isWalletConnect = false
      }) {

        const tx = {
          from: fromAddress,
          to: toAddress,
          value: amountToSend,
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        };


        const response = await signer.sendTransaction(tx);
        const receipt = await response.wait();
        if (!isWalletConnect) {
          return receipt?.hash;
        } else{
          return receipt?.transactionHash;
        }
      }

      async function sendToken({
        contractAddress,
        toAddress,
        amount,
        gasLimit,
        signer,
        isWalletConnect = false
      }) {

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

        const contract = new globalThis.Cypher.ethers.Contract(contractAddress, contractAbiFragment, signer);

        const response = await contract.transfer(toAddress, amount);

        let hash;

        if (!isWalletConnect) {
          const receipt = await response.wait();
          hash = receipt?.hash;
        } else {
          const receipt = await globalThis.cypherWalletDetails.provider?.waitForTransaction(response.hash);
          hash = receipt?.transactionHash;
        }

        return hash;
      }

      async function send({
        chain,
        amountToSend,
        toAddress,
        contractAddress,
        contractDecimal,
      }) {
        try {
          const rpcEndpoint = fetchChainDetails(globalThis.exchangingTokenDetail.chainDetails.chain_id).rpcEndpoint;
          const web3 = new globalThis.Cypher.Web3(rpcEndpoint);


          let userAddress = globalThis.cypherWalletDetails.address;
          const {connector, provider} = globalThis.cypherWalletDetails;
          const chainId = globalThis.exchangingTokenDetail?.chainDetails?.chain_id;
          console.log(chainId);

          if (chain === '${ChainBackendNames.EVMOS}') {
            userAddress = web3.utils.toChecksumAddress(userAddress);
          }

          const gasPrice = await getGasPrice(chain);
          const etherUnit = CONTRACT_DECIMAL_TO_ETHER_UNITS[globalThis.exchangingTokenDetail.contractDecimals];
          const parsedSendingAmount = web3.utils.toWei(amountToSend.toString(), etherUnit).toString();
          const isNativeToken = EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress;
          let signer;
          let isWalletConnect = false;
          if(connector && provider){
            if (provider.provider.signer.connection.chainId !== parseInt(chainId)) {
              await connector.activate(parseInt(chainId));
            }
            isWalletConnect = true;
            signer = await provider.getSigner();
          }else{
            await switchNetwork(chainId, chain);
            const etherProvider = new globalThis.Cypher.ethers.BrowserProvider(window.ethereum);
            signer = await etherProvider.getSigner();
          }
          console.log(signer);
          const gasLimit = await estimateGasLimit({
            amountToSend: parsedSendingAmount,
            contractAddress,
            fromAddress: userAddress,
            toAddress,
            web3,
            isNative: EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail?.chainDetails?.backendName) === globalThis.exchangingTokenDetail?.contractAddress
          });



          if (isNativeToken) {
            const txnHash = await sendNativeCoin({
              fromAddress: userAddress,
              toAddress,
              gasPrice: web3.utils.toWei(gasPrice.gasPrice.toString(), 'gwei').toString(),
              gasLimit: gasLimit.toString(),
              amountToSend: parsedSendingAmount,
              signer,
              isWalletConnect
            });
            return { isError: false, hash: txnHash };
          } else {
            const txnHash = await sendToken({ contractAddress, toAddress, amount: parsedSendingAmount, gasLimit, signer, isWalletConnect });
            return { isError: false, hash: txnHash };
          }
        } catch (error) {
          toastMixin.fire({
            title: 'Oops...',
            text: error,
            icon: 'error'
          });
          console.log('error', error);
          return { isError: true, error: error };
        }
        return { isError: true };
      }

      const onDepositFund = async (hash) => {
        return new Promise((resolve)=>{
        const depositPostBody = {
          address: globalThis.cypherWalletDetails.address,
          quoteUUID: globalThis.bridgeQuote.quoteUuid,
          txnHash: hash,
        };
          const resp = post('${ARCH_HOST}/v1/bridge/sdk/quote/' + globalThis.bridgeQuote.quoteUuid + '/deposit', JSON.stringify(depositPostBody)).then(function(data)
          {
            if (!data.isError) {
              console.log('SucessFully Bridged the amount.');
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

      async function bridge () {
        const resp = await send({
          amountToSend: parseFloat(globalThis.bridgeInputDetails.tokenValueEntered),
          contractAddress: globalThis.exchangingTokenDetail?.contractAddress,
          toAddress: globalThis.bridgeQuote?.step1TargetWallet,
          chain: globalThis.exchangingTokenDetail?.chainDetails?.backendName,
          contractDecimal: globalThis.exchangingTokenDetail?.contractDecimals,
        });

        return new Promise((resolve)=>{
          if (!resp.isError && resp.hash) {
            const bridgeResponse = onDepositFund(resp?.hash).then(function(response) {
                resolve(response);
              }
            );
          } else {
            toastMixin.fire({
              title: 'Oops...',
              text: resp?.error?.message.toString(),
              icon: 'error'
            });
            console.log({ titleText: resp?.error?.message.toString() });
          }
        });
      }

      async function onBridgeClick () {
        document.getElementById("popupBackground").innerHTML = ${bridgeLoadingHTML};
        if (isSwap()) {
          if (globalThis.allowanceData.isAllowance) {
            await getSwapAllowanceApproval();
          }
          await swap();
        } else {
          bridgeResult = bridge().then(async function(response){

            if (response?.message === "success") {
              minimizeWindow(null);
              const interval = setInterval(() => {
                  const status = get('${ARCH_HOST}/v1/activities/status/bridge/' + globalThis.bridgeQuote.quoteUuid).then(
                    async function (data) {
                      if (data?.activityStatus?.status === "COMPLETED") {
                        if(await checkNetwork(globalThis.requiredTokenDetail.chainDetails.chain_id)) {
                          maximizeWindow();
                          document.getElementById("popupBackground").innerHTML = ${bridgeSuccessHTML};
                        } else {
                          maximizeWindow();
                          document.getElementById("popupBackground").innerHTML = ${switchBackHTML};
                        }
                        clearInterval(interval);
                      }
                    });
              }, 10000);
            }
          });
        }
      }

      async function onMax () {
        const reserve = gasFeeReservation[globalThis.exchangingTokenDetail.chainDetails.backendName];
        if (globalThis.exchangingTokenDetail.contractAddress === EVM_CHAINS_NATIVE_TOKEN_MAP.get(globalThis.exchangingTokenDetail.chainDetails.backendName)) {
          if (reserve && (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price - reserve)) {
            const usdValueAfterReduction = (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price - reserve);
            document.getElementById("bp-amount-value").value = usdValueAfterReduction.toFixed(2).toString();
            document.getElementById("bp-token-value").textContent = (parseFloat(usdValueAfterReduction) / globalThis.exchangingTokenDetail.price).toFixed(6).toString();
          } else {
            console.log({ titleText: 'Insufficient funds for gas' });
            toastMixin.fire({
              title: 'Oops...',
              text: 'Insufficient funds for gas',
              icon: 'error'
            });
          }
        } else {
          document.getElementById("bp-amount-value").value = (globalThis.exchangingTokenDetail.actualBalance * globalThis.exchangingTokenDetail.price).toFixed(2).toString();
          document.getElementById("bp-token-value").textContent = (parseFloat(globalThis.exchangingTokenDetail.actualBalance) / globalThis.exchangingTokenDetail.price).toFixed(6).toString();
        }
      };

      function openChat() {
        const client = 'sdk:' + window.location.host;
        const url = globalThis.cypherWalletUrl
        window.open(url + '/?userId=' + globalThis.cypherWalletDetails.address + '&client=' + client, "_blank");
      }
    </script>`;
  return value;
};

// const depositPostBody = {
//   address: globalThis.cypherWalletDetails.address,
//   quoteUUID: globalThis.bridgeQuote.quoteUuid,
//   txnHash: hash,
// };
