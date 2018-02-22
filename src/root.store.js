import { compose, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reactotron from 'reactotron-react-native'
import { rootReducer } from './root.reducer';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const getMiddlewares = () => {
	const middlewares = [sagaMiddleware];

	if (__DEV__) {
		middlewares.push(createLogger());
	}
	return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
	const enhancers = [];

	return enhancers;
};

let store;

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

if (__DEV__) {
	store = createStore(
		persistReducer(persistConfig, rootReducer),
		compose(getMiddlewares(), ...getEnhancers())
	);
} else {
	store = createStore(
		persistReducer(persistConfig, rootReducer),
		composeWithDevTools(getMiddlewares(), ...getEnhancers())
	);
}

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;