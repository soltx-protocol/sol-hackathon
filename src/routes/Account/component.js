import DuneTxPool from 'components/molecules/DuneTxPool';
import { useAccount } from 'models/account';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Account = () => {
	const [{ account }] = useAccount();

	return (
		<div className={styles.account}>
			<div className={styles.content}>
				<DuneTxPool />
				<DuneTxPool poolAccount={account} />
				<DuneTxPool poolAccount={account} />
			</div>
		</div>
	);
};

export default hot(Account);
