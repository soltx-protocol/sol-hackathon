import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

export const DuneDailyFeeByPool = ({
	className,
	feeAccount = 'DLWewB12jzGn4wXJmFCddWDeof1Ma4cZYNRv9CP5hTvX',
	poolTokenMint = '3e1W6Aqcbuk2DfHUwRiRcyzpyYRRjg6yhZZcyEARydUX',
}) => (
	<iframe
		className={classnames(styles.duneChart, className)}
		src={`https://dune.com/embeds/630914/1176681/3d573057-a39b-4bdf-9f63-abf84db2dd9f?feeAccount=${feeAccount}&poolTokenMint=${poolTokenMint}`}
		title="Top 5 Traders"
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
