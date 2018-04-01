import React from 'react';
import { Dimensions, KeyboardAvoidingView, View, Keyboard, Alert } from 'react-native';
import Expo, { AuthSession, LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { RoundTextInput } from '../components/common';

const fetch = require('node-fetch');

const auth0ClientId = 'U1bMTR9reF5bQkeDsfDKvlwQ8C9ozk8v';
const auth0Domain = 'https://thomashzhu.auth0.com';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: '#a29bfe',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      color: '#FFF',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onSubmitButtonPressed = async (name, email, password) => {
    const details = { name, email, password };

    let formBody = [];

    for (var property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join('&');

    try {
      const response = await fetch('https://daug-app.herokuapp.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      });

      const responseJSON = await response.json();

      if (response.status === 201) {
        const { navigate } = this.props.navigation;
        navigate('HomeTabs');
      } else {
        const error = responseJSON.message;
        Alert.alert('Sign up failed!', `Unable to Signup. ${error}!`);
      }
    } catch (error) {
      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later');
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  fbLogIn = async () => {
    const { type } = await Expo.Facebook.logInWithReadPermissionsAsync('170311167091859', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      Keyboard.dismiss();
      
      const { navigate } = this.props.navigation;
      navigate('HomeTabs');
    }
  }

  twitterLogIn = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const params = {
      connection: 'twitter',
      client_id: auth0ClientId,
      response_type: 'token',
      scope: 'openid name',
      redirect_uri: redirectUrl,
    };
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize?${queryString}`,
    });

    if (result.type === 'success') {
      Keyboard.dismiss();

      const { navigate } = this.props.navigation;
      navigate('HomeTabs');
    }
  }

  render() {
    const { name, email, password } = this.state;

    const isSignUpInfoNotEmpty =
      (name && this.validateEmail(email) && password.length >= 8);

    return (
      <LinearGradient colors={['#a29bfe', '#b8b3fe']} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
              error={!email || this.validateEmail(email) ? '' : 'Invalid email'}
            />

            <RoundTextInput
              iconName="lock"
              placeholder="Password"
              value={this.state.password}
              textDidChange={(text) => { this.setState({ password: text }); }}
              error={!password || password.length >= 8 ? '' : 'Password must be at least 8 characters.'}
              isPassword
            />
          </View>

          <Button
            buttonStyle={styles.button}
            onPress={() => isSignUpInfoNotEmpty &&
              this.onSubmitButtonPressed(name, email, password)
            }
            backgroundColor={isSignUpInfoNotEmpty ? '#FF9800' : '#9E9E9E'}
            icon={{ name: 'user', type: 'simple-line-icon' }}
            title="Sign Up"
          />

          <View style={styles.border} />

          <Button
            buttonStyle={styles.button}
            onPress={this.fbLogIn}
            backgroundColor="#4267B2"
            icon={{ name: 'social-facebook', type: 'simple-line-icon' }}
            title="Sign up with Facebook"
          />

          <Button
            buttonStyle={styles.button}
            onPress={this.twitterLogIn}
            backgroundColor="#29ABEC"
            icon={{ name: 'social-twitter', type: 'simple-line-icon' }}
            title="Sign up with Twitter"
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 204,
  },
  loginButton: {
    marginTop: 18,
    height: 36,
    width: Dimensions.get('window').width * 0.6,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    height: 1,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#F1F1F6',
    marginTop: 32,
    marginBottom: 12,
  },
  button: {
    marginTop: 18,
    width: Dimensions.get('window').width * 0.65,
  },
  socialButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    height: 36,
    width: Dimensions.get('window').width * 0.6,
  },
};

export default SignUpScreen;
