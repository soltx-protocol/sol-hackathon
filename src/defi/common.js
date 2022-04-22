import BN from 'bn.js';

export function bnToNumber(bn, decimals) {
	const decimalBN = new BN(decimals);
	const divisor = new BN(10).pow(decimalBN);

	const beforeDecimal = bn.div(divisor);
	const afterDecimal = bn.mod(divisor);

	return Number(`${beforeDecimal}.${afterDecimal}`);
}
