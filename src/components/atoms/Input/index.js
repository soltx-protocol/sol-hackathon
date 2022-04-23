/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classnames from 'classnames';

// import EyeIcon from 'images/icon/eye-show.inline.svg';
// import EyeHideIcon from 'images/icon/eye-hide.inline.svg';

import { isExist } from 'util/helper';

import styles from './index.css';

const Input = ({
	className,
	Icon,
	isLeftIcon,
	onClickIcon = () => {},
	disabled = false,
	error = false,
	...other
}) => (
	<div
		className={classnames(styles.input, className, {
			[styles.icon]: isExist(Icon),
			[styles.isLeftIcon]: isExist(Icon) && isLeftIcon,
			[styles.disabled]: disabled,
			[styles.error]: error,
		})}
	>
		<input disabled={disabled} {...other} />
		{isExist(Icon) && (
			<button className={styles.icon} onClick={onClickIcon} type="button">
				<Icon />
			</button>
		)}
	</div>
);

export default Input;
