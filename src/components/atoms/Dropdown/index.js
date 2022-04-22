/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import DropdownIcon from 'images/icon/dropdown.inline.svg';

import DropdownBasic from '../DropdownBasic';

import styles from './index.css';

const useSelect = ({ initialValue, onChange, propsValue }) => {
	const [value, setState] = useState(initialValue);

	const onChangeValue = newValue => {
		setState([newValue]);
		onChange([newValue]);
	};

	useEffect(() => {
		if (propsValue) {
			setState(propsValue);
		}
	}, propsValue);

	return [value, onChangeValue];
};

const Dropdown = ({
	initialValue = [],
	value: propsValue,
	onChange = () => {},
	placeholder,
	className,
	options = [],
	...other
}) => {
	const [value, onChangeValue] = useSelect({ initialValue, onChange, propsValue });

	const hasValue = value.length > 0 && options.some(item => item.value === value[0].value);

	return (
		<DropdownBasic
			className={className}
			valueClassName={classnames(styles.value, { [styles.hasValue]: hasValue })}
			valueComponent={() => (
				<>
					<div>{hasValue ? value[0].label : placeholder}</div>
					<DropdownIcon />
				</>
			)}
			panelClassName={styles.panel}
			panelComponent={({ closePanel }) => (
				<>
					{options.map(option => (
						<div
							key={option.value}
							className={classnames(styles.option, {
								[styles.isSelected]: value.length > 0 && option.value === value[0].value,
							})}
							onClick={() => {
								onChangeValue(option);
								closePanel();
							}}
							role="presentation"
						>
							{option.label}
						</div>
					))}
				</>
			)}
			{...other}
		/>
	);
};

export default Dropdown;
