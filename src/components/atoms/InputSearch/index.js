/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import SearchIcon from 'images/icon/search.inline.svg';

import { focusInChildren } from 'util/helper';
import { useBoolean } from 'util/hook';

import Input from '../Input';

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

const InputSearch = ({
	className,
	keepOpen,
	disabled,
	options = [],
	initialValue = [],
	value: propsValue,
	onChange = () => {},
	...other
}) => {
	const refValue = useRef(null);
	const refPanel = useRef(null);
	const [isDropdown, { toggle: togglePanel, setFalse: closePanel }] = useBoolean({
		onFalse: () => {},
		onTrue: () => {},
	});

	const [value, onChangeValue] = useSelect({ initialValue, onChange, propsValue });

	const filterOptions =
		value.length > 0
			? options.filter(item => item.value.includes(value[0].value.toLowerCase()))
			: options;

	const onBlur = ({ relatedTarget }) => {
		if (
			!keepOpen &&
			!focusInChildren(relatedTarget, refPanel.current) &&
			refValue.current !== relatedTarget
		) {
			closePanel();
		}
	};

	return (
		<div
			className={classnames(styles.inputSearch, className, {
				[styles.dropdown]: isDropdown,
				[styles.disabled]: disabled,
			})}
		>
			<div
				ref={refValue}
				className={classnames(styles.content)}
				onClick={disabled ? closePanel : togglePanel}
				onKeyPress={() => {}}
				role="button"
				tabIndex="0"
			>
				<Input
					{...other}
					type="text"
					Icon={SearchIcon}
					isLeftIcon
					value={value.length > 0 ? value[0].value : ''}
					onChange={e => onChangeValue({ label: '', value: e.target.value })}
					onBlur={onBlur}
				/>
			</div>
			{isDropdown && filterOptions.length > 0 && (
				<div
					ref={refPanel}
					className={classnames(styles.menu)}
					onBlur={onBlur}
					role="button"
					tabIndex="0"
				>
					{filterOptions.map(option => (
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
				</div>
			)}
		</div>
	);
};

export default InputSearch;
