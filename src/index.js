import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import getStore from './root.store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { GistApp } from './routes';
import navigatorService from './utils/navigatorService';
import SplashScreen from './auth/screens/splash.screen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isStoreReady: false,
		};
	}

	componentDidMount() {
		getStore().then(({ store, persistor }) => this.setState({ isStoreReady: true, store, persistor }));
	}

	render() {		
		if (!this.state.isStoreReady) {
			return (
				<SplashScreen />
			)
		}
		return (
			<Provider store={this.state.store}>
				<PersistGate persistor={this.state.persistor}>
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

	componentDidUpdate() {
		if (this.state.isStoreReady) {
			this.state.store.dispatch({ type: 'NAVIGATION_READY' });
		}
	}
};
