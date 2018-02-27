import React from 'react';
import { Text, View } from 'react-native';

import LoginScreen from './LoginScreen';
import SocialFeedScreen from './SocialFeedScreen';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
};
