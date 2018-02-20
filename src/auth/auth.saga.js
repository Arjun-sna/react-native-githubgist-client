import { call, select } from 'redux-saga/effects';
import { logIn, fetchAuthUser } from './auth.actiontype';
import { fetchAccessToken } from '../api';

const tokenSelector = (state) => state.access_token;

function* loginAndFetchUser() {
	while (true) {
		try {
			const { loginPayload } = yield take(LOGIN.ACTION);
			yield put(logIn.progress);
			const loginResponse = yield call(fetchAccessToken, loginPayload);
			console.log("login response " + JSON.stringify(loginResponse))
			yield put(logIn.success(loginResponse));
			yield put(fetchAuthUser.action);
		} catch (err) {
			yield put(logIn.error(error));
		}
	}
}

function* fetchAuthUser() {
	try {
		yield put(fetchAuthUser.progress);
		const userResponse = yield call(fetchUser, tokenSelector);
		console.log("user response " + JSON.stringify(loginResponse))		
		yield put(fetchAuthUser.success(userResponse));
	} catch (error) {
		yield put(fetchAuthUser.error(error));
	}
}