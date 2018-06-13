import { call, select, all, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import navigatorService from '../utils/navigatorService';

export default function* appLoader() {
	yield all([
		call(delay, 2000),
		take(REHYDRATE),
		take('NAVIGATION_READY'),
	]);
	navigatorService.reset('Login');
}
