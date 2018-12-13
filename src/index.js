import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import getStore from './root.store';
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

	componentDidUpdate() {
		if (this.state.isStoreReady) {
			this.state.store.dispatch({ type: 'NAVIGATION_READY' });
		}
	}

	render() {
		if (!this.state.isStoreReady) {
			return (
				<SplashScreen />
			);
		}

		return (
			<Provider store={this.state.store}>
				<PersistGate loading={null} persistor={this.state.persistor}>
					<GistApp
						ref={navigatorRef => {
							navigatorService.setContainer(navigatorRef);
						}}
					>
					</GistApp>
				</PersistGate>
			</Provider>
		);
	}
}
