import Button from 'components/atoms/Button';
import DuneTxPool from 'components/molecules/DuneTxPool';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import KingIcon from 'images/icon/king.inline.svg';

import Input, { InputSearch } from 'components/atoms/Input';
import styles from './index.css';

const Home = () => (
	<div className={styles.home}>
		<div className={styles.top}>
			<div className={styles.king}>
				<KingIcon />
				<div className={styles.description}>{'Top Asset Owner\nToday'}</div>
			</div>
			<div className={styles.wallet}>
				<Input className={styles.input} placeholder="Insert wallet address" />
				<Button>Generate</Button>
			</div>
		</div>

		<div className={styles.search}>
			<div className={styles.title}>Pool Search</div>
			<InputSearch />
		</div>
		<div className={styles.header}>Overall</div>
		<div className={styles.content}>
			<DuneTxPool />
			<DuneTxPool poolAccount="EuK3xDa4rWuHeMQCBsHf1ETZNiEQb5C476oE9u9kp8Ji" />
			<DuneTxPool poolAccount="FgZut2qVQEyPBibaTJbbX2PxaMZvT1vjDebiVaDp5BWP" />
		</div>
	</div>
);

export default hot(Home);
