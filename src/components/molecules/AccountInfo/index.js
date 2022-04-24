import React from 'react';
import classnames from 'classnames';

import { useAccount } from 'models/account';
import styles from './index.css';

const AccountInfo = ({ className }) => {
	const [{ account }] = useAccount();

	return (
		<div className={classnames(styles.accountInfo, className)}>
			<div className={styles.header}>Individual Account </div>
			<div className={styles.account}>{account === '' ? '-' : account}</div>
			<div className={styles.coin}>Asset:</div>
		</div>
	);
};

export default AccountInfo;
