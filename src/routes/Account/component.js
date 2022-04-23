import DuneChart from 'components/molecules/DuneChart';
import { useAccount } from 'models/account';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Account = () => {
	const [{ account }] = useAccount();

	return (
		<div className={styles.account}>
			<div className={styles.content}>
				<DuneChart />
				<DuneChart poolAccount={account} />
				<DuneChart poolAccount={account} />
			</div>
		</div>
	);
};

export default hot(Account);
