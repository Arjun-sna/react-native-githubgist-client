import React from 'react';
import { StyleSheet, View } from 'react-native';

import Root from './src/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => (
  <View style={styles.container}>
    <Root />
  </View>
);

export default App;
