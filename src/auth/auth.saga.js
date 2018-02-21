import { call, select, all, put, take } from 'redux-saga/effects';
import { logIn, fetchAuthUser } from './auth.actiontype';
import { fetchAccessToken } from '../api';

const tokenSelector = (state) => state.access_token;

function* loginAndFetchUser() {
	while (true) {
		try {
			console.log("login response before " + JSON.stringify(logIn))			
			const { loginPayload } = yield take(logIn.actionType);
			console.log("login response inp " + loginPayload)			
			
			yield put(logIn.progress());
			const loginResponse = yield call(fetchAccessToken, loginPayload);
			console.log("login response " + JSON.stringify(loginResponse))
			yield put(logIn.success(loginResponse));
			yield put(fetchAuthUser.action());
		} catch (error) {
			yield put(logIn.error(error));
		}
	}
}

function* getUser() {
	while (true) {
		try {
			console.log("getuser response before " + fetchAuthUser.actionType);						
			yield take(fetchAuthUser.actionType);
			yield put(fetchAuthUser.progress());
			const userResponse = yield call(fetchUser, tokenSelector);
			console.log("user response " + JSON.stringify(loginResponse))
			yield put(fetchAuthUser.success(userResponse));
		} catch (error) {
			yield put(fetchAuthUser.error(error));
		}
	}
}

export default function* authSaga() {
	yield all([
		call(loginAndFetchUser),
		call(getUser),
	]);
}