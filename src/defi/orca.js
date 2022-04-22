import { Connection } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig } from '@orca-so/sdk';
import Decimal from 'decimal.js';

// const { Connection } = require('@solana/web3.js');
// const { getOrca, OrcaPoolConfig } = require('@orca-so/sdk');
// const Decimal = require('decimal.js');

const mainnetURL = 'https://api.mainnet-beta.solana.com';

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
