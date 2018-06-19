import { call, select, put, all, takeLatest, take } from 'redux-saga/effects';
import headerparser from 'parse-link-header';
import {
	userGistsFetch,
	starredGistsFetch,
	publicGistsFetch,
	fetchGistComments,
	starGist,
	fetchInitialFavoriteValue,
	UnstarGist,
} from './gists.actiontype';
import {
	requestUserGists,
	requestPublicGists,
	requestStarredGists,
	requestGistComments,
	requestStarGist,
	checkStarredGistFavoriteValue,
	requestUnstarGist,
} from '../api';

const tokenSelector = state => state.auth.access_token;
const userNameSelector = state => state.loggedInUser.userName;

function* fetchUserGists() {
	try {
		const moreDataAvailabe = yield select(state => state.userGistsData.hasMoreData);

		if (moreDataAvailabe) {
			yield put(userGistsFetch.progress());
			const requestData = yield all([select(tokenSelector), select(userNameSelector), select(state => state.userGistsData.nextPageNo)]);
			const { headers, data } = yield call(requestUserGists, requestData[0], requestData[1], requestData[2]);
			const links = headerparser(headers.link);

			yield put(userGistsFetch.success({ data, links }));
		}
	} catch (err) {
		yield put(userGistsFetch.error(err));
	}
}

function* fetchStarredGists(action) {
	try {
		const moreDataAvailabe = yield select(state => state.starredGistsData.hasMoreData);

		if (moreDataAvailabe || action.shouldRefresh) {
			yield put(starredGistsFetch.progress());
			const requestData = yield all([select(tokenSelector), select(state => state.starredGistsData.nextPageNo)]);
			const { headers, data } = yield call(requestStarredGists, requestData[0], requestData[1]);
			const links = headerparser(headers.link);

			yield put(starredGistsFetch.success({ data, links }));
		}
	} catch (err) {
		yield put(starredGistsFetch.error(err));
	}
}

function* fetchPublicGists() {
	try {
		const moreDataAvailabe = yield select(state => state.publicGistsData.hasMoreData);

		if (moreDataAvailabe) {
			yield put(publicGistsFetch.progress());
			const requestData = yield all([select(tokenSelector), select(state => state.publicGistsData.nextPageNo)]);
			const { headers, data } = yield call(requestPublicGists, requestData[0], requestData[1]);
			const links = headerparser(headers.link);

			yield put(publicGistsFetch.success({ data, links }));
		}
	} catch (err) {
		yield put(publicGistsFetch.error(err));
	}
}

function* fetchCommentsForGist(action) {
	try {
		// const hasMoreComments = yield select(state => state.gistComments.hasMoreComments);

		// if (hasMoreComments) {
		yield put(fetchGistComments.progress());
		const token = yield select(tokenSelector);
		const { data } = yield call(requestGistComments, token, action.payload);

		yield put(fetchGistComments.success({ data }));
		// }
	} catch (err) {
		yield put(publicGistsFetch.error(err));
	}
}

function* starAGist(action) {
	try {
		const token = yield select(tokenSelector);
		const status = yield call(requestStarGist, token, action.payload);

		if (status === 204) {
			yield call(fetchStarredGists, { shouldRefresh: true });

			return;
		}
	} catch (err) {
		console.log(err);
	}
}

function* getInitialFavoriteValue(action) {
	try {
		const token = yield select(tokenSelector);

		yield call(checkStarredGistFavoriteValue, token, action.payload);
		yield put(fetchInitialFavoriteValue.success({ value: true }));
	} catch (err) {
		yield put(fetchInitialFavoriteValue.success({ value: false }));

		return null;
	}
}

function* unstarAGist(action) {
	try {
		const token = yield select(tokenSelector);

		const status = yield call(requestUnstarGist, token, action.payload);

		if (status === 204) {
			yield call(fetchStarredGists, { shouldRefresh: true });
		}
	} catch (err) {
		console.log(err);
	}
}

export default function* gistsSaga() {
	yield all([
		takeLatest(userGistsFetch.actionType, fetchUserGists),
		takeLatest(starredGistsFetch.actionType, fetchStarredGists),
		takeLatest(publicGistsFetch.actionType, fetchPublicGists),
		takeLatest(fetchGistComments.actionType, fetchCommentsForGist),
		takeLatest(starGist.actionType, starAGist),
		takeLatest(fetchInitialFavoriteValue.actionType, getInitialFavoriteValue),
		takeLatest(UnstarGist.actionType, unstarAGist),
	]);
}
