import { createReducer } from '../utils';
import { logIn, fetchAuthUser } from './auth.actiontype';

const setUserFetchInProgress = state => ({
	...state,
	inprogress: true,
});

const setAuthProgress = state => {
	console.log('In reducer');
	return ({
		...state,
		inprogress: true,
		isAuthenticated: false,
	})
};

const setAuthData = (state, { access_token }) => ({
	...state,
	inprogress: false,
	isAuthenticated: true,
	access_token,
});

const setUserData = (state, { }) => ({
	...state,
	inprogress: false
});

const setError = (state, { error }) => ({
	...state,
	inprogress: false,
	error,
});

export default {
	auth: createReducer({
		[logIn.progressType]: setAuthProgress,
		[logIn.successType]: setAuthData,
		[logIn.errorType]: setError,
	}),
	loggedInUser: createReducer({
		[fetchAuthUser.progressType]: setUserFetchInProgress,
		[fetchAuthUser.successType]: setUserData,
		[fetchAuthUser.errorType]: setError,
	})
};