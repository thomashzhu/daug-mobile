import React from 'react';
import { Dimensions, View, Button, Alert, Keyboard } from 'react-native';

import SocialFeedScreen from './SocialFeedScreen';
import RoundTextInput from '../components/round_text_input';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'null',
      email: '',
      password: '',
    };
  }

  onSubmitButtonPressed = (email, password) => {
    Keyboard.dismiss();

    if (email === 'dev@thomaszhu.com' && password === 'rn') {
      Alert.alert(
        'Success',
        'Email: dev@thomaszhu.com\nPassword is "rn"',
      );
      this.setState({ screen: 'SocialFeedScreen' });
    } else {
      Alert.alert(
        'Failure',
        'Email is dev@thomaszhu.com, and password is "rn".',
      );
    }
  }

  render() {
    const { screen, email, password } = this.state;
    const isLoginInfoNotEmpty = !(email === '' || password === '');

    if (screen === 'SocialFeedScreen') {
      return <SocialFeedScreen />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <RoundTextInput
            iconName="user"
            placeholder="Email"
            value={this.state.email}
            textDidChange={(text) => { this.setState({ email: text }); }}
          />

          <RoundTextInput
            iconName="lock"
            placeholder="Password"
            value={this.state.password}
            textDidChange={(text) => { this.setState({ password: text }); }}
            isPassword
          />
        </View>

        <View style={[styles.backgroundContainer, isLoginInfoNotEmpty && { backgroundColor: '#29ABEC' }]}>
          <Button
            style={styles.submitButton}
            title="Login"
            color="white"
            onPress={() => this.onSubmitButtonPressed(email, password)}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ED8271',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 136,
  },
  backgroundContainer: {
    flexDirection: 'row',
    marginTop: 24,
    height: 48,
    width: Dimensions.get('window').width * 0.56,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
  },
};

export default LoginScreen;
