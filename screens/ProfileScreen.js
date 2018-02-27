import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './LoginScreen';
import SocialFeedScreen from './SocialFeedScreen';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'blue'
  }
});
