import { combineReducers } from 'redux';

import routing from './routing';
import alert from './alert';

const reducers = combineReducers({
	...routing.reducer,
	...alert.reducer,
});

export default reducers;
