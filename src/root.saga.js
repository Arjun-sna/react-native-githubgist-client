import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';

function* rootSaga() {
	yield all([fork(authSaga)]);
}

export default rootSaga;


