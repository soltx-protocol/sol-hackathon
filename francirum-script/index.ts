import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
import {getQuoteFromOrca} from './orca';
import * as frUtils from './franciumUtils';



const address = ''

// getLPInfo('SOL-USDC').then(res => console.log(res)).catch(e => alert(e))

//  fr.getTokenPriceInfo().then(res => console.log(res))
// getTokenPrice('SOL').then(res => console.log(res)).catch(e => alert(e))
let positionId = 'SOL-USDC[Orca Aquafarm]'

// frUtils.getUserFarmPositionLeverageInfo(positionId, address).then(res => console.log(res)).catch(e => console.log(e))

/*getQuoteFromOrca('SOL').then(
  res => {console.log(res)}
)*/
const main = async () => {
  try {
    let farmPosition = await frUtils.UserFarmPosition.initialize(positionId, address);
    console.log(farmPosition.getDebtUSD());
    console.log(farmPosition.getEquityUSD());
    console.log(farmPosition.getLeverage());
  } catch(e) {
    console.log(e);
    throw e;
  }
}

main()