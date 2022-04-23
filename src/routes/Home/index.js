import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import Search from 'components/molecules/Search';
import { DuneDailyFeeByPool, DuneTop5Traders } from 'components/molecules/DuneChart';

import ControlBar from 'components/molecules/ControlBar';
import styles from './index.css';

const Home = () => {
	const [pool, setPool] = useState(null);

	const onSearch = option => {
		setPool(option);
	};

	const onClear = () => {
		setPool(null);
	};

	return (
		<div className={styles.home}>
			<ControlBar className={styles.top} />
			<Search className={styles.search} onSearch={onSearch} onClear={onClear} />
			<div className={styles.header}>{pool === null ? 'Overall' : `Overall - ${pool.value}`}</div>
			<div className={styles.content}>
				{pool === null ? (
					<>
						<DuneTop5Traders />
					</>
				) : (
					<>
						<DuneDailyFeeByPool poolTokenMint={pool?.poolTokenMint} feeAccount={pool?.feeAccount} />
					</>
				)}
			</div>
		</div>
	);
};

export default hot(Home);
