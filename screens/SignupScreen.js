import React from 'react';
import { Text, View } from 'react-native';

import ProfileScreen from './ProfileScreen';
import SocialFeedScreen from './SocialFeedScreen';

export default class SignupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
};
