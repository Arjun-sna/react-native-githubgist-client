import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
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
		if (process.env.LOGGER_ENABLED) {
			middlewares.push(createLogger());
		}
	}
	return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
	const enhancers = [];

	// enhancers.push(autoRehydrate());
	return enhancers;
};

let store;

if (__DEV__) {
	store = createStore(
		rootReducer,
		compose(getMiddlewares(), ...getEnhancers())
	);
} else {
	store = createStore(
		rootReducer,
		composeWithDevTools(getMiddlewares(), ...getEnhancers())
	);
}

sagaMiddleware.run(rootSaga);

export default store;