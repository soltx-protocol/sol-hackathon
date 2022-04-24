import { getOrcaPool } from 'defi/orca';
import { createAction, handleActions } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

export const setAccount = createAction('SET_ACCOUNT', async account => {
	const result = await getOrcaPool(account);

	console.log(result);

	return {
		account,
		pools: Object.keys(result).map(id => ({ ...result[id], value: id, label: id })),
	};
});

export const cleanAccount = createAction('CLEAN_ACCOUNT');

const reducer = {
	account: handleActions(
		{
			SET_ACCOUNT_FULFILLED: (state, action) => ({
				...state,
				address: action.payload.account,
				pools: action.payload.pools,
			}),

			CLEAN_ACCOUNT: state => ({
				...state,
				address: '',
			}),
		},
		{
			address: '',
			pools: [],
		},
	),
};

const mapHooksToState = state => ({
	account: state.account.address,
	pools: state.account.pools,
});

export const useAccount = () => useRedux(mapHooksToState, { setAccount, cleanAccount });

export default { reducer };
