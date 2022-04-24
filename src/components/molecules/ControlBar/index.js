import { PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';

import KingIcon from 'images/icon/king.inline.svg';

import { useAccount } from 'models/account';
import { useHistory } from 'models/routing';

import styles from './index.css';

const ControlBar = ({ className }) => {
	const [{ account }] = useAccount();
	const [inputValue, setInputValue] = useState(account);
	const history = useHistory();

	const onChange = e => {
		setInputValue(e.target.value);
	};

	const onGenerate = () => {
		try {
			const publicKey = new PublicKey(inputValue);

			if (!PublicKey.isOnCurve(publicKey)) {
				alert('Account is invalid');
				return;
			}

			if (account !== inputValue) {
				history.push(`/account/${inputValue}`);
			}
		} catch (err) {
			console.log(err);
			alert('Account is invalid');
		}
	};

	useEffect(() => {
		setInputValue(account);
	}, [account]);

	return (
		<div className={classnames(styles.controlBar, className)}>
			<div className={styles.king}>
				<KingIcon />
				<div className={styles.description}>{'Top Asset Owner\nToday'}</div>
			</div>
			<div className={styles.wallet}>
				<Input
					className={styles.input}
					placeholder="Insert wallet address"
					value={inputValue}
					onChange={onChange}
				/>
				<Button onClick={onGenerate}>Generate</Button>
			</div>
		</div>
	);
};

export default ControlBar;
