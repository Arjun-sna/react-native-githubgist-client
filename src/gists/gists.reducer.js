import { createReducer } from '../utils';
import { userGistsFetch, starredGistsFetch, publicGistsFetch } from './gists.actiontype';

const setInProgressState = state => ({
	...state,
	inProgress: true,
});

const setUserGistData = (state, { payload }) => ({
	...state,
	inProgress: false,
	userGists: payload,
});

const setPublicGistData = (state, { payload }) => ({
	...state,
	inProgress: false,
	publicGists: payload,
});

const setStarredGistData = (state, { payload }) => ({
	...state,
	inProgress: false,
	starredGists: payload,
});

const setError = (state, { error }) => ({
	...state,
	error,
});

export default {
	userGistsData: createReducer({
		[userGistsFetch.progressType]: setInProgressState,
		[userGistsFetch.successType]: setUserGistData,
		[userGistsFetch.errorType]: setError,
	}),
	publicGistsData: createReducer({
		[publicGistsFetch.progressType]: setInProgressState,
		[publicGistsFetch.successType]: setPublicGistData,
		[publicGistsFetch.errorType]: setError,
	}),
	starredGistsData: createReducer({
		[starredGistsFetch.progressType]: setInProgressState,
		[starredGistsFetch.successType]: setStarredGistData,
		[starredGistsFetch.errorType]: setError,
	}),
}