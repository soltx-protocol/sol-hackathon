const  BN = require('bn.js');

function bnToNumber(bn, decimals) {

    const decimalBN = new BN(decimals);
    const divisor = new BN(10).pow(decimalBN);

    const beforeDecimal = bn.div(divisor);
    const afterDecimal = bn.mod(divisor);

    return Number(`${beforeDecimal}.${afterDecimal}`);
}

module.exports = {
	bnToNumber
}
