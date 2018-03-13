import React from 'react';
import { Dimensions, View, TouchableOpacity, Alert, Keyboard, Text } from 'react-native';
import Expo, { AuthSession } from 'expo';
import PropTypes from 'prop-types';

import { RoundTextInput, LoadingIndicator } from '../components/common';

const fetch = require('node-fetch');

const auth0ClientId = 'U1bMTR9reF5bQkeDsfDKvlwQ8C9ozk8v';
const auth0Domain = 'https://thomashzhu.auth0.com';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#ED8271',
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
      email: '',
      password: '',
      isLoading: false,
    };
  }

  onSubmitButtonPressed = async (email, password) => {
    if (email !== '' && password !== '') {
      Keyboard.dismiss();
    
      this.setState({ isLoading: true });

      const { navigate } = this.props.navigation;

      const details = { email, password };

      let formBody = [];

      for (var property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);

        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join('&');

      try {
        const response = await fetch('https://daug-app.herokuapp.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formBody,
        });

        let responseJSON = null;

        if (response.status === 201) {
          responseJSON = await response.json();

          console.log(responseJSON);

          this.setState({ isLoading: false });
          navigate('HomeTabs');
        } else {
          responseJSON = await response.json();
          const error = responseJSON.message;

          console.log(responseJSON);

          this.setState({ isLoading: false, errors: responseJSON.errors });
          Alert.alert('Log in failed!', `Unable to Login. ${error}!`);
        }
      } catch (error) {
        this.setState({ isLoading: false, response: error });

        console.log(error);

        Alert.alert('Log in failed!', 'Unable to Login. Please try again later')
      }
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
    const { email, password } = this.state;
    const isLoginInfoNotEmpty =
      (this.validateEmail(email) && password.length >= 8);

    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
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

        <TouchableOpacity
          style={[styles.button, isLoginInfoNotEmpty && { backgroundColor: '#29ABEC' }]}
          onPress={() => isLoginInfoNotEmpty && this.onSubmitButtonPressed(email, password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#29ABEC' }]}
          onPress={this.fbLogIn}
        >
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#29ABEC' }]}
          onPress={this.twitterLogIn}
        >
          <Text style={styles.buttonText}>Twitter</Text>
        </TouchableOpacity>

        <LoadingIndicator visible={this.state.isLoading} />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

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
  button: {
    flexDirection: 'row',
    marginTop: 18,
    height: 36,
    width: Dimensions.get('window').width * 0.56,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
};

export default LoginScreen;
