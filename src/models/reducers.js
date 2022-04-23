import { combineReducers } from 'redux';

import routing from './routing';
import alert from './alert';
import account from './account';

const reducers = combineReducers({
	...routing.reducer,
	...alert.reducer,
	...account.reducer,
});

export default reducers;
