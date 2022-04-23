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

export const getOrcaPool = async address => {
	const publicKey = new PublicKey(address);

	const connection = new Connection(mainnetURL, commitment);
	const orca = getOrca(connection);

	const orcaSolFarm = orca.getFarm(OrcaFarmConfig.SOL_USDC_AQ);

	const farmBalance = await orcaSolFarm.getFarmBalance(publicKey);

	console.log(farmBalance.toNumber());

	const orcaSolPool = orca.getPool(OrcaPoolConfig.SOL_USDC);

	const lpBalance = await orcaSolPool.getLPBalance(publicKey);

	console.log(lpBalance.toNumber());

	return farmBalance;
};
