import React from 'react';
import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native';

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
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.setState({ screen: 'LoginScreen' })}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.setState({ screen: 'SignupScreen' })}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
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
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
};

export default IntroScreen;
