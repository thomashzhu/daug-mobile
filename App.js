import React from 'react';
import { View } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import HomeTabs from './src/navigation/HomeTabs';

const App = () => (
  <View style={styles.container}>
    {/* <RootNavigator /> */}
    <HomeTabs />
  </View>
);

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
