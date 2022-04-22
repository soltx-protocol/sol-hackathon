/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import classnames from 'classnames';

// import { isExist } from 'util/helper';
import { isExist } from 'util/helper';

import styles from './index.css';

export const BUTTON_SIZE_TYPE = {
	LARGE: 'LARGE',
	MEDIUM: 'MEDIUM',
	SMALL: 'SMALL',
};

const Button = ({
	children,
	className,
	disabled = false,
	outline = false,
	transparent = false,
	active = false,
	onClick = () => {},
	Icon,
	iconRight = false,
	size = BUTTON_SIZE_TYPE.MEDIUM,
	...other
}) => (
	<button
		className={classnames(styles.button, className, {
			[styles.disabled]: disabled,
			[styles.icon]: isExist(Icon),
			[styles.outline]: outline,
			[styles.transparent]: transparent,
			[styles.active]: active,
			[styles.large]: size === BUTTON_SIZE_TYPE.LARGE,
			[styles.small]: size === BUTTON_SIZE_TYPE.SMALL,
		})}
		type="button"
		onClick={e => {
			if (!disabled) {
				onClick(e);
			}
		}}
		{...other}
	>
		<div>
			{Icon && !iconRight && <Icon className={classnames(styles.icon)} />}
			{children}
			{Icon && iconRight && <Icon className={classnames(styles.icon, styles.right)} />}
		</div>
	</button>
);

export default Button;
