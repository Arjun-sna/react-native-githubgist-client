import { all, fork, call } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import splashSaga from './auth/splash.saga';
import gistsSaga from './gists/gists.saga';

function* rootSaga() {
	yield all([fork(authSaga), call(splashSaga), call(gistsSaga)]);
}

export default rootSaga;
