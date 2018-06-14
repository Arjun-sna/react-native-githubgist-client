import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import headerparser from 'parse-link-header';
import { userGistsFetch, starredGistsFetch, publicGistsFetch, fetchGistComments } from './gists.actiontype';
import { requestUserGists, requestPublicGists, requestStarredGists, requestGistComments, fetchAccessToken } from '../api';

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

function* fetchStarredGists() {
	try {
		const moreDataAvailabe = yield select(state => state.starredGistsData.hasMoreData);

		if (moreDataAvailabe) {
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

export default function* gistsSaga() {
	yield all([
		takeLatest(userGistsFetch.actionType, fetchUserGists),
		takeLatest(starredGistsFetch.actionType, fetchStarredGists),
		takeLatest(publicGistsFetch.actionType, fetchPublicGists),
		takeLatest(fetchGistComments.actionType, fetchCommentsForGist),
	]);
}
