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
	onSearch = () => {},
	onClear = () => {},
	onChange = () => {},
	...other
}) => {
	const refValue = useRef(null);
	const refPanel = useRef(null);
	const [isDropdown, { toggle: togglePanel, setFalse: closePanel, setTrue: openPanel }] =
		useBoolean({
			onFalse: () => {},
			onTrue: () => {},
		});

	const [value, onChangeValue] = useSelect({ initialValue, onChange, propsValue });

	const filterOptions =
		value.length > 0 && value[0].value !== ''
			? options.filter(item => item.value.toLowerCase().includes(value[0].value.toLowerCase()))
			: options;

	const onBlur = ({ relatedTarget }) => {
		if (
			!keepOpen &&
			!focusInChildren(relatedTarget, refPanel.current) &&
			refValue.current !== relatedTarget
		) {
			closePanel();

			if (value.length === 0 || value[0].value === '') {
				onClear();
			}
		}
	};

	const onInputBlur = ({ relatedTarget }) => {
		if (
			!keepOpen &&
			!focusInChildren(relatedTarget, refValue.current) &&
			refPanel.current !== relatedTarget
		) {
			closePanel();

			if (value.length === 0 || value[0].value === '') {
				onClear();
			}
		}
	};

	const onInputChange = e => {
		onChangeValue({ label: '', value: e.target.value });

		if (!isDropdown) {
			openPanel();
		}
	};

	const onClickChange = option => {
		onChangeValue(option);
		closePanel();
		onSearch(option);
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
					className={styles.input}
					type="text"
					Icon={SearchIcon}
					isLeftIcon
					value={value.length > 0 ? value[0].value : ''}
					onChange={onInputChange}
					onBlur={onInputBlur}
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
								onClickChange(option);
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
