import React from 'react';
import classnames from 'classnames';

import OrcaLogo from 'images/orca.png';
import SoltxLogo from 'images/icon/soltx.inline.svg';
import TradeIcon from 'images/icon/trade.inline.svg';
import TradeActiveIcon from 'images/icon/trade-active.inline.svg';
import WalletIcon from 'images/icon/wallet.inline.svg';
import WalletActiveIcon from 'images/icon/wallet-active.inline.svg';

import styles from './index.css';

export const NAV_SELECT = {
	OVERALL: 'OVERALL',
	WALLET: 'WALLET',
	NONE: 'NONE',
};

const Navbar = ({ className, select = NAV_SELECT.NONE }) => (
	<div className={classnames(styles.navbar, className)}>
		<div className={styles.icon}>
			<img src={OrcaLogo} alt="orca" /> Hackboard
		</div>
		<button
			className={classnames({ [styles.active]: select === NAV_SELECT.OVERALL })}
			type="button"
		>
			<div>{select === NAV_SELECT.OVERALL ? <TradeActiveIcon /> : <TradeIcon />} Overall</div>
		</button>
		<button className={classnames({ [styles.active]: select === NAV_SELECT.WALLET })} type="button">
			<div>
				{select === NAV_SELECT.WALLET ? <WalletActiveIcon /> : <WalletIcon />} Individual Wallet
			</div>
		</button>
		<div className={styles.bottom}>
			<SoltxLogo />
			Created by Soltx
		</div>
	</div>
);

export default Navbar;
