import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

import { useBoolean } from 'util/hook';
import { focusInChildren } from 'util/helper';

import styles from './index.css';

const DropdownBasic = ({
	className,
	valueClassName,
	panelClassName,
	valueComponent,
	panelComponent,
	keepOpen = false,
	disabled = false,
	onClose,
	onOpen,
}) => {
	const refValue = useRef(null);
	const refPanel = useRef(null);
	const [isDropdown, { toggle: togglePanel, setFalse: closePanel }] = useBoolean({
		onFalse: onClose,
		onTrue: onOpen,
	});

	useEffect(() => {
		if (refPanel.current && isDropdown) {
			// Focus on panel after dropdown open
			refPanel.current.focus();
		}
	});

	const onBlur = ({ relatedTarget }) => {
		if (
			!keepOpen &&
			!focusInChildren(relatedTarget, refPanel.current) &&
			refValue.current !== relatedTarget
		) {
			closePanel();
		}
	};

	const focusPanel = () => {
		refPanel.current.focus();
	};

	return (
		<div
			className={classnames(styles.dropdownBasic, className, {
				[styles.dropdown]: isDropdown,
				[styles.disabled]: disabled,
			})}
		>
			<div
				ref={refValue}
				className={classnames(styles.content, valueClassName)}
				onClick={disabled ? closePanel : togglePanel}
				onKeyPress={() => {}}
				role="button"
				tabIndex="0"
			>
				{valueComponent({ isDropdown })}
			</div>
			{isDropdown && (
				<div
					ref={refPanel}
					className={classnames(styles.menu, panelClassName)}
					onBlur={onBlur}
					role="button"
					tabIndex="0"
				>
					{panelComponent({ isDropdown, closePanel, focusPanel })}
				</div>
			)}
		</div>
	);
};

export default DropdownBasic;
