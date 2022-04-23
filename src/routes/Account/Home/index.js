import React from 'react';
import { hot } from 'react-hot-loader/root';

import Avatar from 'images/avatar.png';

import Search from 'components/molecules/Search';
import ControlBar from 'components/molecules/ControlBar';

import styles from './index.css';

const Account = () => {
	return (
		<div className={styles.account}>
			<ControlBar className={styles.top} />
			<Search className={styles.search} />
			<div className={styles.description}>
				<div className={styles.header}>Individual Account </div>
				<div className={styles.account}>-</div>
				<div className={styles.coin}>Asset:</div>
			</div>

			<div className={styles.introduction}>
				<img src={Avatar} alt="avatar" />
				<div className={styles.content}>
					<div className={styles.title}>Aloha</div>
					<div className={styles.tip}>Please insert Wallet Address~</div>
				</div>
			</div>
		</div>
	);
};

export default hot(Account);