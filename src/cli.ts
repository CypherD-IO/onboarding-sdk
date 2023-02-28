#!/usr/bin/env node
import { Cypher } from './main';

(async () => {
  await Cypher(
    {
      address: '0xdEc1bc71bf91431D60eF2742f412DCd1c5A204B8',
      targetChainIdHex: '0x5',
      requiredTokenBalance: 1,
      isTestnet: true,
      callBack: () => { console.log('callBack called'); }
    })

})();
