import React from 'react';
import { Dimensions, View, TouchableOpacity, Text, Alert, Keyboard } from 'react-native';
import { AuthSession } from 'expo';

import SocialFeedScreen from './SocialFeedScreen';
import RoundTextInput from '../components/round_text_input';

const auth0ClientId = 'U1bMTR9reF5bQkeDsfDKvlwQ8C9ozk8v';
const auth0Domain = 'https://thomashzhu.auth0.com';

class SignUpScreen extends React.Component {
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
    if (name !== '' && email !== '' && password !== '') {
      Keyboard.dismiss();
      
      Alert.alert(
        'Success',
        'Name: ' + name + '\nEmail: ' + email + '\nPassword: ' + password,
      );
      this.setState({ screen: 'SocialFeedScreen' });
    }
  }

  fbLogIn = async () => {
    const { type } = await Expo.Facebook.logInWithReadPermissionsAsync('170311167091859', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      this.setState({ screen: 'SocialFeedScreen' });
    }
  }

  toQueryString = (params) => {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  twitterLogIn = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + this.toQueryString({
        connection: 'twitter',
        client_id: auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(result);
    if (result.type === 'success') {
      this.setState({ screen: 'SocialFeedScreen' });
    }
  }

  render() {
    const { screen, name, email, password } = this.state;

    const isSignUpInfoNotEmpty = !(email === '' || password === '');

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

        <TouchableOpacity
          style={[styles.backgroundContainer, isSignUpInfoNotEmpty && { backgroundColor: '#29ABEC' }]}
          onPress={() => this.onSubmitButtonPressed(name, email, password)}
        >
          <Text style={styles.submitButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backgroundContainer, { backgroundColor: '#29ABEC' }]}
          onPress={this.fbLogIn}
        >
          <Text style={styles.submitButton}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backgroundContainer, { backgroundColor: '#29ABEC' }]}
          onPress={this.twitterLogIn}
        >
          <Text style={styles.submitButton}>Twitter</Text>
        </TouchableOpacity>
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
    color: 'white',
    fontSize: 18,
  },
};

export default SignUpScreen;
