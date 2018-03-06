import React from 'react';
import { View } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <View style={styles.container}>
    <RootNavigator />
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
