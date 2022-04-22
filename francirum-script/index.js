const { UserFarmPosition } = require('./franciumUtils.js');

const address = '';

// getLPInfo('SOL-USDC').then(res => console.log(res)).catch(e => alert(e))

//  fr.getTokenPriceInfo().then(res => console.log(res))
// getTokenPrice('SOL').then(res => console.log(res)).catch(e => alert(e))
const positionId = 'SOL-USDC[Orca Aquafarm]';

// frUtils.getUserFarmPositionLeverageInfo(positionId, address).then(res => console.log(res)).catch(e => console.log(e))

/* getQuoteFromOrca('SOL').then(
  res => {console.log(res)}
) */
const main = async () => {
	try {
		const farmPosition = await UserFarmPosition.initialize(positionId, address);
		console.log(farmPosition.getDebtUSD());
		console.log(farmPosition.getEquityUSD());
		console.log(farmPosition.getLeverage());
	} catch (e) {
		console.log(e);
		throw e;
	}
};

main();
