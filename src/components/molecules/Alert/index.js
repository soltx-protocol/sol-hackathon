import React from 'react';
import classnames from 'classnames';

import { useAlert, ALERT_TYPE } from 'models/alert';

import NormalIcon from 'images/icon/status-success.inline.svg';
// import WarningIcon from 'images/icon/status-warning.inline.svg';
import ErrorIcon from 'images/icon/status-error.inline.svg';

import Modal from '../Modal';

import styles from './index.css';

export const AlertComponent = ({ className, type, message }) => (
	<div className={classnames(styles.alert, className)}>
		{type === ALERT_TYPE.NORMAL && <NormalIcon />}
		{type === ALERT_TYPE.ERROR && <ErrorIcon />}
		<div className={styles.content}>
			<div className={styles.title}>{type === ALERT_TYPE.NORMAL ? 'Success' : 'Error'}</div>
			<span>{message}</span>
		</div>
	</div>
);

const Alert = ({ className }) => {
	const [alert] = useAlert();

	return (
		<Modal className={styles.modal} active={alert.active}>
			<AlertComponent className={className} type={alert.type} message={alert.data} />
		</Modal>
	);
};

export default Alert;
