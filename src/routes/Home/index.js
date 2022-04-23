import React from 'react';
import { hot } from 'react-hot-loader/root';

import Search from 'components/molecules/Search';
import { DuneDailyFeeByPool, DuneTop5Traders } from 'components/molecules/DuneTxPool';

import ControlBar from 'components/molecules/ControlBar';
import styles from './index.css';

const Home = () => (
	<div className={styles.home}>
		<ControlBar className={styles.top} />
		<Search className={styles.search} />
		<div className={styles.header}>Overall</div>
		<div className={styles.content}>
			<DuneTop5Traders />
			<DuneDailyFeeByPool />
		</div>
	</div>
);

export default hot(Home);
