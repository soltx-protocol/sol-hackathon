import React from 'react';
import classnames from 'classnames';

import LogoIcon from 'images/icon/logo.inline.svg';
import TradeIcon from 'images/icon/trade.inline.svg';
import TradeActiveIcon from 'images/icon/trade-active.inline.svg';

import styles from './index.css';

export const NAV_SELECT = {
	DASHBOARD: 'DASHBOARD',
	NONE: 'NONE',
};

const Navbar = ({ className, select = NAV_SELECT.NONE }) => (
	<div className={classnames(styles.navbar, className)}>
		<div className={styles.icon}>
			<LogoIcon />
		</div>
		<button
			className={classnames({ [styles.active]: select === NAV_SELECT.DASHBOARD })}
			type="button"
		>
			<div>{select === NAV_SELECT.DASHBOARD ? <TradeActiveIcon /> : <TradeIcon />} Dashboard</div>
		</button>
	</div>
);

export default Navbar;
