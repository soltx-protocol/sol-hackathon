/* eslint-disable react/jsx-props-no-spreading */

import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';

import styles from './index.css';

const ModalComponent = ({ className, children, active, inline, onDeactive }) => {
	if (!active) {
		return null;
	}

	return (
		<div
			className={classnames(styles.modal, { [styles.inline]: inline }, className)}
			onClick={e => {
				if (e.target === e.currentTarget) {
					onDeactive(e);
				}
			}}
			role="presentation"
		>
			{children}
		</div>
	);
};

export const InlineModal = ({ children, ...other }) => (
	<ModalComponent inline {...other}>
		{children}
	</ModalComponent>
);

const Modal = ({ children, ...other }) => {
	const refDiv = useRef(document.createElement('div'));

	useLayoutEffect(() => {
		let modalRoot = document.getElementById('modal-root');

		if (modalRoot === null) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}

		modalRoot.appendChild(refDiv.current);

		return () => {
			modalRoot.removeChild(refDiv.current);
		};
	}, []);

	return ReactDOM.createPortal(
		<ModalComponent {...other}>{children}</ModalComponent>,
		refDiv.current,
	);
};

export default Modal;
