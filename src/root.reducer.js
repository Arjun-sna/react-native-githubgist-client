import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import gistsReducer from './gists/gists.reducer';
import initReducer from './init/init.reducer';

export const rootReducer = combineReducers({
  ...initReducer,
	...authReducer,
	...gistsReducer,
});

