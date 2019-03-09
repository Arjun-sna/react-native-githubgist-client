import { call, select, all, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist';
import codePush from 'react-native-code-push';
import navigatorService from '../utils/navigatorService';

export const rehydratedSelector = state => state.app.autoRehydrated;

export default function* appLoader() {
  try {
    yield call(codePush.sync, {
      // install them immediately
      installMode: codePush.InstallMode.IMMEDIATE,
    });
    const rehydrated = yield select(rehydratedSelector);

    if (!rehydrated) {
      yield all([
        call(delay, 2000),
        take(REHYDRATE),
        take('NAVIGATION_READY'),
      ]);
    }
    navigatorService.reset('Login');
  } catch (e) {
    console.log('error in sage', e.message);
  }
}
