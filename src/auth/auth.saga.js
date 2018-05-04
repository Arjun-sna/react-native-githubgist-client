import { call, select, all, put, take } from 'redux-saga/effects';
import { logIn, fetchAuthUser } from './auth.actiontype';
import { fetchAccessToken, getAuthUser } from '../api';
import navigatorService from '../utils/navigatorService';

const tokenSelector = (state) => state.auth.access_token;

function* loginAndFetchUser() {
	while (true) {
		try {
			const { payload } = yield take(logIn.actionType);
			yield put(logIn.progress());
			const loginResponse = yield call(fetchAccessToken, payload);
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
			yield take(fetchAuthUser.actionType);
			yield put(fetchAuthUser.progress());
			const token = yield select(tokenSelector);			
			const userResponse = yield call(getAuthUser, token);
			yield put(fetchAuthUser.success(userResponse));			
			navigatorService.reset('Home');			
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