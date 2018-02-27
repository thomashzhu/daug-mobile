import React from 'react';
import { StyleSheet, View } from 'react-native';

import IntroScreen from './screens/IntroScreen';

const App = () => (
  <View style={styles.container}>
    <IntroScreen />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
