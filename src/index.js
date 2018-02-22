import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from './root.store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { GistApp } from './routes';
import navigatorService from './utils/navigatorService';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<GistApp
						ref={navigatorRef => {
							navigatorService.setContainer(navigatorRef);
						}}
					>
						<StatusBar />
					</GistApp>
				</PersistGate>
			</Provider>
		);
	}
};
