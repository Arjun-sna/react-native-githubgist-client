import array from 'lodash/array';
import { createReducer } from '../utils';
import { userGistsFetch, starredGistsFetch, publicGistsFetch } from './gists.actiontype';

const setInProgressState = state => ({
	...state,
	inProgress: true,
});

const setGistData = (state, { payload }) => {
	const { data, links } = payload;
	const isLinkAvailable = links && links.next;
	let newDataItems = data;
	if (state.nextPageNo > 1) {
		newDataItems = array.concat(state.gists, data)
	}

	return {
		...state,
		inProgress: false,
		linkToNextPage: isLinkAvailable ? links.next.url : '',
		nextPageNo: isLinkAvailable ? links.next.page : state.nextPageNo,
		gists: newDataItems,
	}
};

const setError = (state, { error }) => ({
	...state,
	inProgress: false,
	error,
});

export default {
	userGistsData: createReducer({
		[userGistsFetch.progressType]: setInProgressState,
		[userGistsFetch.successType]: setGistData,
		[userGistsFetch.errorType]: setError,
	}, { gists: [], inProgress: false, nextPageNo: 1 }),
	publicGistsData: createReducer({
		[publicGistsFetch.progressType]: setInProgressState,
		[publicGistsFetch.successType]: setGistData,
		[publicGistsFetch.errorType]: setError,
	}, { gists: [], inProgress: false, nextPageNo: 1 }),
	starredGistsData: createReducer({
		[starredGistsFetch.progressType]: setInProgressState,
		[starredGistsFetch.successType]: setGistData,
		[starredGistsFetch.errorType]: setError,
	}, { gists: [], inProgress: false, nextPageNo: 1 }),
}