import DuneTxPool from 'components/molecules/DuneTxPool';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Home = () => (
	<div className={styles.home}>
		<DuneTxPool />
		<DuneTxPool poolAccount="EuK3xDa4rWuHeMQCBsHf1ETZNiEQb5C476oE9u9kp8Ji" />
		<DuneTxPool poolAccount="FgZut2qVQEyPBibaTJbbX2PxaMZvT1vjDebiVaDp5BWP" />
	</div>
);

export default hot(Home);
