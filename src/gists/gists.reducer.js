import array from 'lodash/array';
import { createReducer } from '../utils';
import {
	userGistsFetch,
	starredGistsFetch,
	publicGistsFetch,
	fetchGistComments,
	fetchInitialFavoriteValue,
} from './gists.actiontype';

const setInProgressState = state => ({
	...state,
	inProgress: true,
});

const setGistData = (state, { payload }) => {
	const { data, links } = payload;
	const isLinkAvailable = links && links.next;
	let newDataItems = data;

	if (state.nextPageNo > 1) {
		newDataItems = array.concat(state.gists, data);
	}

	return {
		...state,
		inProgress: false,
		linkToNextPage: isLinkAvailable ? links.next.url : '',
		hasMoreData: !!isLinkAvailable,
		nextPageNo: isLinkAvailable ? links.next.page : state.nextPageNo,
		gists: newDataItems,
	};
};

const setError = (state, { error }) => ({
	...state,
	inProgress: false,
	error,
});

const clearCache = () => ({
	gists: [],
	hasMoreData: true,
	nextPageNo: 1,
	comments: [],
});

const setGistComments = (state, { payload }) => {
	const { data, error, links } = payload;

	const isLinkAvailable = links && links.next;
	let newComments = data;

	console.log('isLinkAvailable', links, !!isLinkAvailable, 'nextPageno', state.nextPageNo);
	if (state.nextPageNo > 1) {
		newComments = array.concat(state.comments, data);
	}
	console.log('data******************', data, newComments);

	return {
		...state,
		inProgress: false,
		linkToNextPage: isLinkAvailable ? links.next.url : '',
		hasMoreComments: !!isLinkAvailable,
		nextPageNo: isLinkAvailable ? links.next.page : state.nextPageNo,
		comments: newComments,
		error,
	};
};

const setFavoriteValue = (state, { payload }) => {
	const { value } = payload;

	return {
		...state,
		isStarred: value,
		inProgress: false,
	};
};

export default {
	userGistsData: createReducer({
		[userGistsFetch.progressType]: setInProgressState,
		[userGistsFetch.successType]: setGistData,
		[userGistsFetch.errorType]: setError,
		CLEAR_CACHE: clearCache,
	}, {
		gists: [], inProgress: false, nextPageNo: 1, hasMoreData: true,
	}),
	publicGistsData: createReducer({
		[publicGistsFetch.progressType]: setInProgressState,
		[publicGistsFetch.successType]: setGistData,
		[publicGistsFetch.errorType]: setError,
		CLEAR_CACHE: clearCache,
	}, {
		gists: [], inProgress: false, nextPageNo: 1, hasMoreData: true,
	}),
	starredGistsData: createReducer({
		[starredGistsFetch.progressType]: setInProgressState,
		[starredGistsFetch.successType]: setGistData,
		[starredGistsFetch.errorType]: setError,
		CLEAR_CACHE: clearCache,
	}, {
		gists: [], inProgress: false, nextPageNo: 1, hasMoreData: true,
	}),
	gistComments: createReducer(
		{
			[fetchGistComments.progressType]: setInProgressState,
			[fetchGistComments.successType]: setGistComments,
			[fetchGistComments.errorType]: setError,
			CLEAR_CACHE: clearCache,
		},
		{
			comments: [], inProgress: false, hasMoreComments: true, nextPageNo: 1,
		}
	),
	initialFavoriteValue: createReducer({
		[fetchInitialFavoriteValue.successType]: setFavoriteValue,
		[fetchInitialFavoriteValue.progressType]: setInProgressState,
	}, { isStarred: false, inProgress: false }),
};
