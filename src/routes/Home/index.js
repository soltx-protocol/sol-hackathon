import DuneTxPool from 'components/molecules/DuneTxPool';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Home = () => (
	<div className={styles.home}>
		<DuneTxPool />
		<DuneTxPool />
		<DuneTxPool />
	</div>
);

export default hot(Home);
