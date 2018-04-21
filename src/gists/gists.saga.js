import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { userGistsFetch, starredGistsFetch, publicGistsFetch } from './gists.actiontype';
import { requestUserGists, requestPublicGists, requestStarredGists } from '../api';

const tokenSelector = (state) => state.auth.access_token;
const userNameSelector = (state) => state.loggedInUser.userName;

function* fetchUserGists() {
	try {
		yield put(userGistsFetch.progress());
		const requestData = yield all([select(tokenSelector), select(userNameSelector)]);
		const response = yield call(requestUserGists, requestData[0], requestData[1]);
		yield put(userGistsFetch.success(response));
	} catch(err) {
		yield put(userGistsFetch.error(err));
	}
}

function* fetchStarredGists() {
	try {
		yield put(starredGistsFetch.progress());
		const token = yield select(tokenSelector);
		const response = yield call(requestStarredGists, token);
		yield put(starredGistsFetch.success(response));
	} catch(err) {
		yield put(starredGistsFetch.error(err));
	}
}

function* fetchPublicGists() {
	try {
		yield put(publicGistsFetch.progress());
		const token = yield select(tokenSelector);
		const response = yield call(requestPublicGists, token);
		yield put(publicGistsFetch.success(response));
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