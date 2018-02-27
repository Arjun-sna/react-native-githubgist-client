import { all, fork, call } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import splashSaga from './auth/splash.saga';

function* rootSaga() {
	yield all([fork(authSaga), call(splashSaga)]);
}

export default rootSaga;


