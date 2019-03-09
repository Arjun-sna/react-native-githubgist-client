import React from 'react';
import { View, SafeAreaView } from 'react-native';
import codePush from 'react-native-code-push';
import Root from './src/index';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
const CodePushApp = codePush(codePushOptions)(Root);

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <CodePushApp />
  </SafeAreaView>
);

export default App;
