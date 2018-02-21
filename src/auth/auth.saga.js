import { call, select, all, put, take } from 'redux-saga/effects';
import { logIn, fetchAuthUser } from './auth.actiontype';
import { fetchAccessToken } from '../api';
import navigatorService from '../utils/navigatorService';

const tokenSelector = (state) => state.access_token;

function* loginAndFetchUser() {
	while (true) {
		try {
			const { payload } = yield take(logIn.actionType);
			console.log("login req rec " + JSON.stringify(payload))
			
			yield put(logIn.progress());
			const loginResponse = yield call(fetchAccessToken, payload);
			console.log("login response " + JSON.stringify(loginResponse))
			yield put(logIn.success(loginResponse));
			navigatorService.reset('Main');
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