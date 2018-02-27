import React from 'react';
import { Dimensions, View, Button, Alert, Keyboard } from 'react-native';

import SocialFeedScreen from './SocialFeedScreen';
import RoundTextInput from '../components/round_text_input';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'null',
      name: '',
      email: '',
      password: '',
    };
  }

  onSubmitButtonPressed = (name, email, password) => {
    Keyboard.dismiss();

    Alert.alert(
      'Success',
      'Name: ' + name + '\nEmail: ' + email + '\nPassword: ' + password,
    );
    this.setState({ screen: 'SocialFeedScreen' });
  }

  render() {
    const { screen, name, email, password } = this.state;

    const isSignupInfoNotEmpty = !(email === '' || password === '');

    if (screen === 'SocialFeedScreen') {
      return <SocialFeedScreen />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <RoundTextInput
            iconName="user"
            placeholder="Name"
            value={this.state.name}
            textDidChange={(text) => { this.setState({ name: text }); }}
          />

          <RoundTextInput
            iconName="envelope-open"
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

        <View style={[styles.backgroundContainer, isSignupInfoNotEmpty && { backgroundColor: '#29ABEC' }]}>
          <Button
            style={styles.submitButton}
            title="Sign Up"
            color="white"
            onPress={() => this.onSubmitButtonPressed(name, email, password)}
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
    height: 204,
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

export default SignupScreen;
