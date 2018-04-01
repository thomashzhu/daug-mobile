import React from 'react';
import { Dimensions, KeyboardAvoidingView, View, Alert, Keyboard } from 'react-native';
import Expo, { AuthSession, LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { RoundTextInput } from '../components/common';
import { logInUser } from '../actions';

const fetch = require('node-fetch');

const auth0ClientId = 'U1bMTR9reF5bQkeDsfDKvlwQ8C9ozk8v';
const auth0Domain = 'https://thomashzhu.auth0.com';

class LoginScreen extends React.Component {
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
      email: '',
      password: '',
    };
  }

  onSubmitButtonPressed = async (email, password) => {
    if (email !== '' && password !== '') {
      Keyboard.dismiss();
    
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

        const responseJSON = await response.json();

        if (response.status === 201) {
          this.props.logInUser(responseJSON.user, this.props.navigation);
          
          navigate('HomeTabs');
        } else {          
          const error = responseJSON.message;
          Alert.alert('Log in failed!', `Unable to Login. ${error}!`);
        }
      } catch (error) {        
        Alert.alert('Log in failed!', 'Unable to Login. Please try again later');
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
      <LinearGradient colors={['#a29bfe', '#b8b3fe']} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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

          <Button
            buttonStyle={styles.button}
            onPress={() => isLoginInfoNotEmpty && this.onSubmitButtonPressed(email, password)}
            backgroundColor={isLoginInfoNotEmpty ? '#FF9800' : '#9E9E9E'}
            icon={{ name: 'login', type: 'simple-line-icon' }}
            title="Login"
          />

          <View style={styles.border} />

          <Button
            buttonStyle={styles.button}
            onPress={this.fbLogIn}
            backgroundColor="#4267B2"
            icon={{ name: 'social-facebook', type: 'simple-line-icon' }}
            title="Login with Facebook"
          />

          <Button
            buttonStyle={styles.button}
            onPress={this.twitterLogIn}
            backgroundColor="#29ABEC"
            icon={{ name: 'social-twitter', type: 'simple-line-icon' }}
            title="Login with Twitter"
          />

          {/* <LoadingModal visible={this.state.isLoading} /> */}
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  logInUser: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    height: 136,
  },
  button: {
    marginTop: 18,
    width: Dimensions.get('window').width * 0.65,
  },
  border: {
    height: 1,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: '#F1F1F6',
    marginTop: 36,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '200',
  },
};

const mapDispatchToProps = {
  logInUser,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
