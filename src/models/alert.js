import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { sleep } from 'util/helper';

import { useRedux } from 'util/hook/redux';

export const ALERT_TYPE = {
	NORMAL: 'NORMAL',
	ERROR: 'ERROR',
};

export const setModalBackgroundScrollY = () => {
	if (!document.body.classList.contains('no-scroll')) {
		document.body.style.top = `-${window.pageYOffset}px`;
		document.body.classList.add('no-scroll');
	}

	if (!document.documentElement.classList.contains('no-scroll')) {
		document.documentElement.classList.add('no-scroll');
	}
};

export const restoreModalBackgroundScrollY = () => {
	document.documentElement.classList.remove('no-scroll');

	if (document.body.classList.contains('no-scroll')) {
		document.body.classList.remove('no-scroll');

		const matchesTop = document.body.style.top.match(/\d+/g);

		if (matchesTop !== null && matchesTop.length > 0) {
			document.body.style.top = 'unset';
			window.scrollTo(0, parseInt(matchesTop[0], 10));
		}
	}
};

export const openAlert = createAction('OPEN_ALERT', (type, data) => ({
	type,
	data,
}));

export const closeAlert = createAction('CLOSE_ALERT');

export const openAlertProgress = createAction(
	'OPEN_ALERT_PROGRESS',
	(type, data) => async dispatch => {
		await dispatch(openAlert(type, data));

		await sleep(3000);

		await dispatch(closeAlert());
	},
);

export const openNormalAlert = data => openAlertProgress(ALERT_TYPE.NORMAL, data);
export const openErrorAlert = data => openAlertProgress(ALERT_TYPE.ERROR, data);

const reducer = {
	alert: handleActions(
		{
			OPEN_ALERT: (state, action) => ({
				...state,

				type: action.payload.type,
				active: true,
				data: action.payload.data,
			}),

			CLOSE_ALERT: state => ({
				...state,

				type: '',
				active: false,
				data: '',
			}),
		},
		{
			type: '',
			active: false,
			data: '',
		},
	),
};

const selectAlert = createSelector(
	state => state.alert,
	alert => alert,
);

export const useAlert = () =>
	useRedux(selectAlert, {
		openAlert: openAlertProgress,
		openNormalAlert,
		openErrorAlert,
		closeAlert,
	});

export default { reducer };
