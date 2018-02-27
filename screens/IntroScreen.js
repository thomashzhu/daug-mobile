import React from 'react';
import { Dimensions, View, Image, Text, Button } from 'react-native';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const logo = require('../assets/daug_logo.png');

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null,
    };
  }

  renderScreen() {
    const { screen } = this.state;

    if (screen === 'LoginScreen') {
      return <LoginScreen />;
    } else if (screen === 'SignupScreen') {
      return <SignupScreen />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} source={logo} />
          <Text style={styles.logoName}>DAUG</Text>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button
              color="white"
              style={styles.accountButton}
              onPress={() => this.setState({ screen: 'LoginScreen' })}
              title="Login"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color="white"
              style={styles.accountButton}
              onPress={() => this.setState({ screen: 'SignupScreen' })}
              title="Signup"
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      this.renderScreen()
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ED8271',
  },
  logo: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
  },
  logoName: {
    color: 'white',
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#FD746C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 24,
  },
};

export default IntroScreen;
