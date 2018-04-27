import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import headerparser from 'parse-link-header';
import { userGistsFetch, starredGistsFetch, publicGistsFetch } from './gists.actiontype';
import { requestUserGists, requestPublicGists, requestStarredGists } from '../api';

const tokenSelector = (state) => state.auth.access_token;
const userNameSelector = (state) => state.loggedInUser.userName;

function* fetchUserGists() {
	try {
		yield put(userGistsFetch.progress());
		const requestData = yield all([select(tokenSelector), select(userNameSelector)]);
		const { headers, data } = yield call(requestUserGists, requestData[0], requestData[1]);
		const links = headerparser(headers.link)
		yield put(userGistsFetch.success({ data, links }));
	} catch(err) {
		yield put(userGistsFetch.error(err));
	}
}

function* fetchStarredGists() {
	try {
		yield put(starredGistsFetch.progress());
		const token = yield select(tokenSelector);
		const { headers, data } = yield call(requestStarredGists, token);
		const links = headerparser(headers.link)
		yield put(starredGistsFetch.success({ data, links }));
	} catch(err) {
		yield put(starredGistsFetch.error(err));
	}
}

function* fetchPublicGists() {
	try {
		yield put(publicGistsFetch.progress());
		const token = yield select(tokenSelector);
		const { headers, data } = yield call(requestPublicGists, token);
		const links = headerparser(headers.link)
		yield put(publicGistsFetch.success({ data, links }));
	} catch(err) {
		yield put(publicGistsFetch.error(err));
	}
}

export default function* gistsSaga() {
	yield all([
		takeLatest(userGistsFetch.actionType, fetchUserGists),
		takeLatest(starredGistsFetch.actionType, fetchStarredGists),
		takeLatest(publicGistsFetch.actionType, fetchPublicGists)
	])
}