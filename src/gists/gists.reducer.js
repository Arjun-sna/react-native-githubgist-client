import array from 'lodash/array';
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

const setPublicGistData = (state, { payload }) => {
	const { data, links } = payload;
	const isLinkAvailable = links && links.next;

	let newDataItems = data;
	if (state.nextPageNo) {
		newDataItems = array.concat(state.publicGists, data)
	}
	return {
		...state,
		inProgress: false,
		linkToNextPage: isLinkAvailable ? links.next.url : '',
		nextPageNo: isLinkAvailable ? links.next.page : state.nextPageNo,
		publicGists: newDataItems,
	}
};

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
	}, { userGists: [], inProgress: false }),
	publicGistsData: createReducer({
		[publicGistsFetch.progressType]: setInProgressState,
		[publicGistsFetch.successType]: setPublicGistData,
		[publicGistsFetch.errorType]: setError,
	}, { publicGists: [], inProgress: false }),
	starredGistsData: createReducer({
		[starredGistsFetch.progressType]: setInProgressState,
		[starredGistsFetch.successType]: setStarredGistData,
		[starredGistsFetch.errorType]: setError,
	}, { starredGists: [], inProgress: false }),
}