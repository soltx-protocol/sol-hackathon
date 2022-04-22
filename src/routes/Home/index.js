import React from 'react';
import { hot } from 'react-hot-loader/root';

import CloseIcon from 'images/icon/close.inline.svg';

import styles from './index.css';

const Home = () => (
	<div>
		<div className={styles.welcome}>
			Welcome to
			<br />
			soltx web starter
			<br />
			This is on {process.env.NODE_ENV} server
		</div>
		<CloseIcon />
	</div>
);

export default hot(Home);
