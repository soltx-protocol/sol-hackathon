const { Connection } = require('@solana/web3.js');
const FranciumSDK = require('francium-sdk').default;
const { TOKENS_LIST } = require('francium-sdk');
const { bnToNumber } = require('./common.js');

const RPC_ENDPOINT = 'https://ssc-dao.genesysgo.net/';
// const RPC_ENDPOINT = 'https://free.rpcpool.com/';

const fr = new FranciumSDK({
	connection: new Connection(RPC_ENDPOINT),
});

async function getTokenPrice(tokenSymbol) {
	const result = await fr.getTokenPriceInfo();
	const tokenPriceDict = result.tokenPrice;

	if (Object.keys(tokenPriceDict).includes(tokenSymbol)) {
		return tokenPriceDict[tokenSymbol];
	}

	throw new Error(`Token ${tokenSymbol} not found`);
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

async function getLPInfo(lpId) {
	const farmLPDict = await fr.getFarmLPPriceInfo();

	if (Object.keys(farmLPDict).includes(lpId)) {
		return farmLPDict[lpId];
	}

	throw new Error(`LP ${lpId} not found`);
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
async function getUserFarmPositionById(id, address) {
	const farmPositionList = await fr.getUserFarmPosition(address);

	const position = farmPositionList.filter(item => item.id === id);

	if (position.length > 0) {
		return position[0];
	}

	throw new Error(`Position ${id} not found`);
}

// async function getUserFarmPositionLeverageInfo(id, address) {
// 	const farmPosition = await getUserFarmPositionById(id, address);
// 	const { lpAmount } = farmPosition;
// 	const borrowedInfoList = farmPosition.borrowed;

// 	let totalDebtUSD = 0;
// 	for (const borrowedInfo of borrowedInfoList) {
// 		const tokenSymbol = borrowedInfo.symbol;
// 		const tokenAmount = borrowedInfo.amount;
// 		const tokenInfo = TOKENS_LIST[tokenSymbol];
// 		const tokenDecimals = tokenInfo.decimals;
// 		const tokenPrice = await getTokenPrice(tokenSymbol);
// 		console.log(`${tokenPrice} ${tokenAmount} ${tokenDecimals}`);

// 		// TODO find method to handle decimal in bn.js
// 		const d = 10 ** (tokenDecimals - 2);
// 		const debtUSD = (tokenPrice * tokenAmount.divn(d).toNumber()) / 10 ** 2;
// 		totalDebtUSD += debtUSD;
// 		console.log(`${tokenSymbol} debt ${debtUSD}`);
// 	}

// 	// TODO find by ID ?
// 	const lpId = id.replace('[Orca Aquafarm]', '');
// 	const lpInfo = await getLPInfo(lpId);
// 	const { lpDecimals } = lpInfo;
// 	const lpPrice = lpInfo.price;
// 	// TODO Use price AMM ?
// 	const equityUSD = (lpAmount.idivn(10 ** (lpDecimals - 2)).toNumber() * lpPrice) / 100;
// 	console.log(equityUSD);
// 	const result = {
// 		debtUSD: totalDebtUSD,
// 		equityUSD,
// 		leverage: equityUSD / (equityUSD - totalDebtUSD),
// 	};

// 	return result;
// }

class UserFarmPosition {
	farmPositionInfo;

	farmPoolInfo;

	pcTokenPrice;

	coinTokenPrice;

	constructor(farmPositionInfo, farmPoolInfo, pcTokenPrice, coinTokenPrice) {
		this.farmPositionInfo = farmPositionInfo;
		this.farmPoolInfo = farmPoolInfo;
		this.pcTokenPrice = pcTokenPrice;
		this.coinTokenPrice = coinTokenPrice;
	}

	static async initialize(positionId, address) {
		const farmPositionInfo = await getUserFarmPositionById(positionId, address);
		const farmPoolId = positionId.replace('[Orca Aquafarm]', '');
		const farmPoolInfo = await getLPInfo(farmPoolId);
		const { pcToken } = farmPoolInfo;
		const pcTokenPrice = await getTokenPrice(pcToken);
		const { coinToken } = farmPoolInfo;
		const coinTokenPrice = await getTokenPrice(coinToken);
		return new UserFarmPosition(farmPositionInfo, farmPoolInfo, pcTokenPrice, coinTokenPrice);
	}

	getTokenPrice(tokenSymbol) {
		if (tokenSymbol === this.farmPoolInfo.pcToken) {
			return this.pcTokenPrice;
		}
		if (tokenSymbol === this.farmPoolInfo.coinToken) {
			return this.coinTokenPrice;
		}
		throw new Error(`Token price ${tokenSymbol} not found`);
	}

	getDebtUSD() {
		const borrowedInfoList = this.farmPositionInfo.borrowed;

		const totalDebtUSD = borrowedInfoList.reduce((prevTotal, borrowedInfo) => {
			const tokenSymbol = borrowedInfo.symbol;
			const tokenAmount = borrowedInfo.amount;
			const tokenInfo = TOKENS_LIST[tokenSymbol];
			const tokenDecimals = tokenInfo.decimals;
			const tokenPrice = this.getTokenPrice(tokenSymbol);
			const debtUSD = tokenPrice * bnToNumber(tokenAmount, tokenDecimals);
			console.info(`${tokenSymbol} debt ${debtUSD}`);

			return prevTotal + debtUSD;
		}, 0);

		return totalDebtUSD;
	}

	getEquityUSD() {
		const { lpAmount } = this.farmPositionInfo;
		const { lpDecimals } = this.farmPoolInfo;
		const lpPrice = this.farmPoolInfo.price;
		// TODO Use price AMM ?
		const equityUSD = lpPrice * bnToNumber(lpAmount, lpDecimals);
		return equityUSD;
	}

	getLeverage() {
		const equityUSD = this.getEquityUSD();
		const debtUSD = this.getDebtUSD();
		return equityUSD / (equityUSD - debtUSD);
	}
}

module.exports = {
	UserFarmPosition,
};
