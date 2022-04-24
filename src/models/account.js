import { createAction, handleActions } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

export const setAccount = createAction('SET_ACCOUNT', account => account);

export const cleanAccount = createAction('CLEAN_ACCOUNT');

const reducer = {
	account: handleActions(
		{
			SET_ACCOUNT: (state, action) => ({
				...state,
				address: action.payload,
			}),

			CLEAN_ACCOUNT: state => ({
				...state,
				address: '',
			}),
		},
		{
			address: '',
		},
	),
};

const mapHooksToState = state => ({
	account: state.account.address,
});

export const useAccount = () => useRedux(mapHooksToState, { setAccount, cleanAccount });

export default { reducer };
