import React from 'react';
import { hot } from 'react-hot-loader/root';

import Search from 'components/molecules/Search';
import DuneTxPool from 'components/molecules/DuneTxPool';

import ControlBar from 'components/molecules/ControlBar';
import styles from './index.css';

const Home = () => (
	<div className={styles.home}>
		<ControlBar className={styles.top} />
		<Search className={styles.search} />
		<div className={styles.header}>Overall</div>
		<div className={styles.content}>
			<DuneTxPool />
			<DuneTxPool poolAccount="EuK3xDa4rWuHeMQCBsHf1ETZNiEQb5C476oE9u9kp8Ji" />
			<DuneTxPool poolAccount="FgZut2qVQEyPBibaTJbbX2PxaMZvT1vjDebiVaDp5BWP" />
		</div>
	</div>
);

export default hot(Home);
