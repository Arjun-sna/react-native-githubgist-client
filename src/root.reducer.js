import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import gistsReducer from './gists/gists.reducer';

export const rootReducer = combineReducers({
	...authReducer,
	...gistsReducer,
});

