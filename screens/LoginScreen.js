import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProfileScreen from './ProfileScreen';
import SocialFeedScreen from './SocialFeedScreen';

export default class LoginScreen extends React.Component {
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
    backgroundColor: 'red'
  }
});