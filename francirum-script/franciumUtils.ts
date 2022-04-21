import { Connection, PublicKey } from '@solana/web3.js';
import FranciumSDK from 'francium-sdk';
import { TOKENS_LIST } from 'francium-sdk';
import BN from 'bn.js';

export const fr = new FranciumSDK({
    connection: new Connection('https://free.rpcpool.com')
  });
  
export async function getTokenPrice(tokenSymbol: string): Promise<number> {
    const result = await fr.getTokenPriceInfo()
    const tokenPriceDict = result['tokenPrice']
    for (let key in tokenPriceDict) {
        if (key == tokenSymbol) {
            return tokenPriceDict[key]
        } 
    }
    throw `Token ${tokenSymbol} not found`
}

/*
{ 
  'SOL-USDC[Raydium]': {
    price: 158.53864376697996,
    priceAmm: 157.99103376090946,
    coinRelativePrice: 108.0509727616634,
    pcPerLP: 78.99551688045473,
    coinPerLP: 0.7310949162364452,
    pcToken: 'USDC',
    pcAmount: <BN: 255329a6668e>,
    coinToken: 'SOL',
    coinAmount: <BN: 1596ffdcd2de6>,
    lpTotalSupply: <BN: 1d87e4a6bbaa7>,
    lpDecimals: 9
  }
}
*/

export async function getLPInfo(lpId: string) {
    const farmLPDict = await fr.getFarmLPPriceInfo()
    for (let farmLpId in farmLPDict) {
      if (farmLpId == lpId) {
        return farmLPDict[farmLpId]
      }
    }
    throw `LP ${lpId} not found`
}

/*
{
  id: 'SOL-USDC[Orca Aquafarm]',
  lpAmount: <BN: 31b899bb0>,
  lpShares: <BN: 2d2220f93>,
  priceKey: 'SOL-USDC',
  lpDecimals: 6,
  userInfoPublicKey: PublicKey {
    _bn: <BN: 18c70731154b618f29dd982c47529933dc853108a107990dd3301535889dab37>
  },
  borrowed: [
    { symbol: 'USDC', amount: <BN: 227934b82> },
    { symbol: 'SOL', amount: <BN: 10a5883a7b> }
  ]
}
*/
export async function getUserFarmPositionById(id, address) {
    const farmPositionList = await fr.getUserFarmPosition(address)
    for (let index in farmPositionList) {
      if (id == farmPositionList[index]['id']) {
        return farmPositionList[index]
      }
    }
    throw `Position ${id} not found`
}

export async function getUserFarmPositionLeverageInfo(id, address) {
    const farmPosition = await getUserFarmPositionById(id, address)
    const lpAmount = farmPosition['lpAmount']
    const borrowedInfoList = farmPosition['borrowed']

    let totalDebtUSD = 0
    for await (let borrowedInfo of borrowedInfoList) {
        let tokenSymbol = borrowedInfo['symbol']
        let tokenAmount = borrowedInfo['amount']
        let tokenInfo = TOKENS_LIST[tokenSymbol]
        let tokenDecimals = tokenInfo['decimals']
        const tokenPrice = await getTokenPrice(tokenSymbol)
        console.log(`${tokenPrice} ${tokenAmount} ${tokenDecimals}`)
        
        // TODO find method to handle decimal in bn.js
        let d = 10 ** (tokenDecimals - 2)
        let debtUSD = tokenPrice * tokenAmount.divn(d).toNumber() / 10 ** 2
        totalDebtUSD = totalDebtUSD + debtUSD
        console.log(`${tokenSymbol} debt ${debtUSD}`)
    }
    
    // TODO find by ID ?
    const lpId = id.replace('[Orca Aquafarm]', '')
    const lpInfo = await getLPInfo(lpId)
    const lpDecimals = lpInfo['lpDecimals']
    // TODO Use price AMM ?
    let equityUSD = lpAmount.idivn(10 ** (lpDecimals - 2)).toNumber() * lpInfo['price'] / 100
    console.log(equityUSD)
    let result = {
        'debtUSD': totalDebtUSD,
        'equityUSD': equityUSD,
        'leverage': equityUSD / (equityUSD - totalDebtUSD)
    }

    return result
}