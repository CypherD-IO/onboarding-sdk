
// Mainnet
window.Cypher({
  address: '0x71d357ef7e29f07473f9edfb2140f14605c9f309',
  targetChainIdHex: '0x89',
  requiredTokenContractAddress: "0x874e178a2f3f3f9d34db862453cd756e7eab0381",
  requiredTokenBalance: 13,
  callBack: () => { console.log('callBack called'); }
});




// Testnet
// window.Cypher({
//   address: '0xdEc1bc71bf91431D60eF2742f412DCd1c5A204B8',
//   targetChainIdHex: '0x5',
//   requiredTokenBalance: 1,
//   isTestnet: true,
//   callBack: () => { console.log('callBack called'); }
// });

