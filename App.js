import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './root.store';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View>
					<StatusBar />
					<Text>Coming soon...</Text>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
