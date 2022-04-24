import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

export const DuneLargestLiquidityProviderOnSOLUSDC = ({ className }) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src="https://dune.com/embeds/630797/1177796/0d0169ec-bb2c-4b82-937e-4ec94bdf62cf"
		title="The Largest Liquidity Provider"
	/>
);

export const DuneLargestTradeByPool = ({
	className,
	account = '87E4KtN7F4LivKhjqXaoQAvS3a8HnM4DnMUrbMrkVvXY',
	feeAccount = 'BynpQprCNjcY2KHeffDKzquyKWvJxikty3donrMT4ZPU',
	tokenAccountB = '7LFnr5YgUyEgPMCLGNQ9N7wM5MFRNqCuRawLZTe5q4c7',
}) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src={`https://dune.com/embeds/632632/1178944/4b5ef98d-3328-41d9-b8bf-ea1b59402b38?account=${account}&feeAccount=${feeAccount}&tokenAccountB=${tokenAccountB}`}
		title="Largest Trade By Pool"
	/>
);

export const DuneDailyActiveWallet = ({ className }) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src="https://dune.com/embeds/632045/1177839/e923fa08-4827-4c63-855e-3a9cb7a23068"
		title="Daily Active Wallet"
	/>
);

export const DuneAverageTradingVolumeInFeb2022 = ({ className }) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src="https://dune.com/embeds/631445/1176822/c5c63622-5d96-492e-8e32-de89367e9d9e"
		title="The Average Trading Volume in Feb 2022"
	/>
);

export const DuneAverageDailyTradingVolumeByPool = ({
	className,
	account = '87E4KtN7F4LivKhjqXaoQAvS3a8HnM4DnMUrbMrkVvXY',
}) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src={`https://dune.com/embeds/631945/1177675/76ed0b61-fe55-4257-99cb-6ce78fac78cb?account=${account}`}
		title="The Average Daily Trading Volume By Pool"
	/>
);

export const DuneFirstTrade = ({ className }) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src="https://dune.com/embeds/630624/1177678/754051da-28d0-4521-bac5-6cefd39a5d78"
		title="The First Trade Information"
	/>
);

export const DuneDailyFeeByPool = ({
	className,
	feeAccount = 'DLWewB12jzGn4wXJmFCddWDeof1Ma4cZYNRv9CP5hTvX',
	poolTokenMint = '3e1W6Aqcbuk2DfHUwRiRcyzpyYRRjg6yhZZcyEARydUX',
}) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src={`https://dune.com/embeds/630914/1176681/3d573057-a39b-4bdf-9f63-abf84db2dd9f?feeAccount=${feeAccount}&poolTokenMint=${poolTokenMint}`}
		title="Daily Pool Fee(LP)"
	/>
);

export const DuneTop5Traders = ({ className }) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src="https://dune.com/embeds/630617/1176454/f4732340-aafa-43e7-984a-6efe22f8d9f4"
		title="Top 5 Traders"
	/>
);

const DuneChart = ({
	className,
	title,
	poolAccount = 'EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U',
}) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src={`https://dune.com/embeds/626001/1167393/2d14ec26-c13f-483d-8093-aedc1c69ab18?pool_account=${poolAccount}`}
		title={title}
	/>
);

export default DuneChart;
