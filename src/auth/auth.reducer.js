import { createReducer } from '../utils';
import { logIn, fetchAuthUser } from './auth.actiontype';

const setInProgress = state => ({
	...state,
	inprogress: true,
});

const setAuthData = (state, { access_token }) => ({
	...state,
	inprogress: false,
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
		[logIn.progress]: setInProgress,
		[logIn.success]: setAuthData,
		[logIn.error]: setError,
	}),
	loggeInUser: createReducer({
		[fetchAuthUser.progress]: setInProgress,
		[fetchAuthUser.success]: setUserData,
		[fetchAuthUser.error]: setError,
	})
};