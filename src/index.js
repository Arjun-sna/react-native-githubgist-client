import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './root.store';
import { GistApp } from './routes';
import navigatorService from './utils/navigatorService';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<GistApp
					ref={navigatorRef => {
						navigatorService.setContainer(navigatorRef);
					}}
				>
					<StatusBar />
				</GistApp>
			</Provider>
		);
	}
};
