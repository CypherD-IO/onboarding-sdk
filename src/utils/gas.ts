import { get } from ".";

declare let globalThis: any;

export const getGasPrice = async (chain: string) => {
  const response = await get(`v1/prices/gas/${chain}`);
  return response;
}

export const estimateGasLimit = async ({
  amountToSend,
  contractAddress,
  fromAddress,
  toAddress,
  web3,
  isNative
}: any) => {
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
