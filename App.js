import React from 'react';
import { View } from 'react-native';

import IntroScreen from './screens/IntroScreen';

const App = () => (
  <View style={styles.container}>
    <IntroScreen />
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
