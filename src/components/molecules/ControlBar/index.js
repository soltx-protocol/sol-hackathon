import React from 'react';
import classnames from 'classnames';

import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

import KingIcon from 'images/icon/king.inline.svg';

import styles from './index.css';

const ControlBar = ({ className }) => (
	<div className={classnames(styles.controlBar, className)}>
		<div className={styles.king}>
			<KingIcon />
			<div className={styles.description}>{'Top Asset Owner\nToday'}</div>
		</div>
		<div className={styles.wallet}>
			<Input className={styles.input} placeholder="Insert wallet address" />
			<Button>Generate</Button>
		</div>
	</div>
);

export default ControlBar;
