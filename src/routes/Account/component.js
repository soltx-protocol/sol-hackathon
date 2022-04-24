import AccountInfo from 'components/molecules/AccountInfo';
import ControlBar from 'components/molecules/ControlBar';
import DuneChart from 'components/molecules/DuneChart';
import Search from 'components/molecules/Search';
import { useAccount } from 'models/account';
import React from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Account = () => {
	const [{ account }] = useAccount();

	return (
		<div className={styles.account}>
			<ControlBar className={styles.top} />
			<Search className={styles.search} />
			<AccountInfo className={styles.accountInfo} />

			<div className={styles.content}>
				<DuneChart />
				<DuneChart poolAccount={account} />
				<DuneChart poolAccount={account} />
			</div>
		</div>
	);
};

export default hot(Account);
