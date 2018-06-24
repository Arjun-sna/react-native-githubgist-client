import React from 'react';
import { View } from 'react-native';
import codePush from 'react-native-code-push';
import Root from './src/index';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
const CodePushApp = codePush(codePushOptions)(Root);

const App = () => (
	<View style={{ flex: 1 }}>
		<CodePushApp />
	</View>
);

export default App;
