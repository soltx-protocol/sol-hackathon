import React from 'react';
import classnames from 'classnames';

import OrcaLogo from 'images/orca.png';
import SoltxLogo from 'images/icon/soltx.inline.svg';
import TradeIcon from 'images/icon/trade.inline.svg';
import TradeActiveIcon from 'images/icon/trade-active.inline.svg';
import AccountIcon from 'images/icon/wallet.inline.svg';
import AccountActiveIcon from 'images/icon/wallet-active.inline.svg';

import { useHistory } from 'models/routing';

import styles from './index.css';

export const NAV_SELECT = {
	OVERALL: 'OVERALL',
	ACCOUNT: 'ACCOUNT',
	NONE: 'NONE',
};

const Navbar = ({ className, select = NAV_SELECT.NONE }) => {
	const history = useHistory();

	const onClick = link => {
		history.push(link);
	};

	return (
		<div className={classnames(styles.navbar, className)}>
			<div className={styles.icon}>
				<img src={OrcaLogo} alt="orca" /> Hackboard
			</div>
			<button
				className={classnames({ [styles.active]: select === NAV_SELECT.OVERALL })}
				type="button"
				onClick={() => onClick('/')}
			>
				<div>{select === NAV_SELECT.OVERALL ? <TradeActiveIcon /> : <TradeIcon />} Overall</div>
			</button>
			<button
				className={classnames({ [styles.active]: select === NAV_SELECT.ACCOUNT })}
				type="button"
				onClick={() => onClick('/account')}
			>
				<div>
					{select === NAV_SELECT.ACCOUNT ? <AccountActiveIcon /> : <AccountIcon />} Individual
					Account
				</div>
			</button>
			<div className={styles.bottom}>
				<SoltxLogo />
				Created by Soltx
			</div>
		</div>
	);
};

export default Navbar;
