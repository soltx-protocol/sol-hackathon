import { Connection, PublicKey } from '@solana/web3.js';
import { getOrca, OrcaFarmConfig, OrcaPoolConfig } from '@orca-so/sdk';
import Decimal from 'decimal.js';

const commitment = 'confirmed';
const mainnetURL = 'https://ssc-dao.genesysgo.net';

function getUSDCQuoteConfig(token) {
	const pair = `${token}_USDC`;
	return OrcaPoolConfig[pair];
}

export async function getQuoteFromOrca(token) {
	const connection = new Connection(mainnetURL, 'singleGossip');
	const orca = getOrca(connection);

	try {
		const orcaSolPool = orca.getPool(getUSDCQuoteConfig(token));
		const solToken = orcaSolPool.getTokenA();
		const solAmount = new Decimal(1);
		const quote = await orcaSolPool.getQuote(solToken, solAmount);
		// const orcaAmount = quote.getMinOutputAmount();
		const orcaRate = quote.getRate();
		return orcaRate;
	} catch (err) {
		console.warn(err);
		throw err;
	}
}

const activeFarms = ['SOL_USDC_AQ', 'ORCA_USDC_AQ', 'POLIS_USDC_DD'];
const activePools = ['SOL_USDC', 'ORCA_USDC'];

const FarmData = {
	POLIS_USDC_DD: {
		account: 'CdKPtCb5fBRaGFS4bJgytfReeHuFyhpe9YUyWHPnEWZG',
		authority: '8XB9V3VuHtPBzHqvxzcmpkpaoXNXjZMD8VBHC79SxcEL',
		nonce: 251,
		poolTokenMint: 'GteBdo9sqE7T41G8AJsaG9WHW48uXBwsLLznmu2TBdgy',
		tokenAccountA: 'EbXNEUiKxSU1vwwhrbVNVk3qX4o1yU3p75SQUUMfc1zH',
		tokenAccountB: 'CLCj9b1vdPutrkvZS8ACTM5q42SXB2Q7khnMLVxDMGEK',
		feeAccount: '3gZQ2YnrXbnRwJj5poffLirF7CwacatvtfGCNRFrbJdr',
		feeNumerator: 25,
		feeDenominator: 10000,
		ownerTradeFeeNumerator: 5,
		ownerTradeFeeDenominator: 10000,
		ownerWithdrawFeeNumerator: 0,
		ownerWithdrawFeeDenominator: 0,
		hostFeeNumerator: 0,
		hostFeeDenominator: 0,
		tokenAName: 'POLIS',
		tokenBName: 'USDC',
		curveType: 'ConstantProduct',
		programVersion: 2,
		name: 'POLIS/USDC[aquafarm]',
	},

	ORCA_USDC_AQ: {
		account: '2p7nYbtPBgtmY69NsE8DAW6szpRJn7tQvDnqvoEWQvjY',
		authority: '3fr1AhdiAmWLeNrS24CMoAu9pPgbzVhwLtJ6QUPmw2ob',
		nonce: 254,
		poolTokenMint: 'n8Mpu28RjeYD7oUX3LG1tPxzhRZh3YYLRSHcHRdS3Zx',
		tokenAccountA: '9vYWHBPz817wJdQpE8u3h8UoY3sZ16ZXdCcvLB7jY4Dj',
		tokenAccountB: '6UczejMUv1tzdvUzKpULKHxrK9sqLm8edR1v9jinVWm9',
		feeAccount: '7CXZED4jfRp3qdHB9Py3up6v1C4UhHofFvfT6RXbJLRN',
		feeNumerator: 25,
		feeDenominator: 10000,
		ownerTradeFeeNumerator: 5,
		ownerTradeFeeDenominator: 10000,
		ownerWithdrawFeeNumerator: 0,
		ownerWithdrawFeeDenominator: 0,
		hostFeeNumerator: 0,
		hostFeeDenominator: 0,
		tokenAName: 'ORCA',
		tokenBName: 'USDC',
		curveType: 'ConstantProduct',
		programVersion: 2,
		name: 'ORCA/USDC[aquafarm]',
	},

	SOL_USDC_AQ: {
		account: 'EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U',
		authority: 'JU8kmKzDHF9sXWsnoznaFDFezLsE5uomX2JkRMbmsQP',
		nonce: 252,
		poolTokenMint: 'APDFRM3HMr8CAGXwKHiu2f5ePSpaiEJhaURwhsRrUUt9',
		tokenAccountA: 'ANP74VNsHwSrq9uUSjiSNyNWvf6ZPrKTmE4gHoNd13Lg',
		tokenAccountB: '75HgnSvXbWKZBpZHveX68ZzAhDqMzNDS29X6BGLtxMo1',
		feeAccount: '8JnSiuvQq3BVuCU3n4DrSTw9chBSPvEMswrhtifVkr1o',
		feeNumerator: 25,
		feeDenominator: 10000,
		ownerTradeFeeNumerator: 5,
		ownerTradeFeeDenominator: 10000,
		ownerWithdrawFeeNumerator: 0,
		ownerWithdrawFeeDenominator: 0,
		hostFeeNumerator: 0,
		hostFeeDenominator: 0,
		tokenAName: 'SOL',
		tokenBName: 'USDC',
		curveType: 'ConstantProduct',
		programVersion: 2,
		name: 'SOL/USDC[aquafarm]',
	},
};

const PoolData = {
	SOL_USDC: FarmData.SOL_USDC_AQ,
	ORCA_USDC: FarmData.ORCA_USDC_AQ,
};

export const getOrcaPool = async address => {
	const publicKey = new PublicKey(address);

	const connection = new Connection(mainnetURL, commitment);
	const orca = getOrca(connection);

	const farmBalance = await Promise.all(
		activeFarms.map(async farm => {
			const orcaSolFarm = orca.getFarm(OrcaFarmConfig[farm]);

			const balance = await orcaSolFarm.getFarmBalance(publicKey);

			return { value: balance.toNumber(), id: farm, isDD: farm.includes('DD') };
		}),
	);

	const poolBalance = await Promise.all(
		activePools.map(async pool => {
			const orcaSolPool = orca.getPool(OrcaPoolConfig[pool]);

			const lpBalance = await orcaSolPool.getLPBalance(publicKey);

			return { value: lpBalance.toNumber(), id: pool };
		}),
	);

	const result = {};

	farmBalance.forEach(farm => {
		if (farm.isDD && farm.value > 0) {
			result[FarmData[farm.id].name] = FarmData[farm.id];
		}
	});

	poolBalance.forEach(pool => {
		if (pool.value > 0) {
			result[PoolData[pool.id].name] = PoolData[pool.id];
		}
	});

	console.log(result);

	// console.log(poolBalance);

	return result;
};
