import AccountInfo from 'components/molecules/AccountInfo';
import ControlBar from 'components/molecules/ControlBar';
import { DuneDailyTradeInformationByPool } from 'components/molecules/DuneChart';
import Search from 'components/molecules/Search';
import { useAccount } from 'models/account';
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import styles from './index.css';

const Account = () => {
	const [{ account }] = useAccount();
	const [pool, setPool] = useState(null);

	const onSearch = option => {
		setPool(option);
	};

	const onClear = () => {
		setPool(null);
	};

	return (
		<div className={styles.account}>
			<ControlBar className={styles.top} />
			{/* <SearchByAccount className={styles.search} onSearch={onSearch} onClear={onClear} /> */}
			<Search className={styles.search} onSearch={onSearch} onClear={onClear} />
			<AccountInfo className={styles.accountInfo} />

			<div className={styles.content}>
				{pool === null ? (
					<>
						<DuneDailyTradeInformationByPool
							account="default"
							feeAccount="default"
							tokenAccountB="default"
							walletAddress={account}
						/>
					</>
				) : (
					<>
						<DuneDailyTradeInformationByPool
							account={pool?.account}
							feeAccount={pool?.feeAccount}
							tokenAccountB={pool?.tokenAccountB}
							walletAddress={account}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default hot(Account);
