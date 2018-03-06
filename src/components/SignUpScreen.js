import React from 'react';
import { Dimensions, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { AuthSession } from 'expo';
import PropTypes from 'prop-types';

import { RoundTextInput } from '../components/common';

const auth0ClientId = 'U1bMTR9reF5bQkeDsfDKvlwQ8C9ozk8v';
const auth0Domain = 'https://thomashzhu.auth0.com';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
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
      name: '',
      email: '',
      password: '',
    };
  }

  onSubmitButtonPressed = (name, email, password) => {
    if (name !== '' && email !== '' && password !== '') {
      Keyboard.dismiss();

      const { navigate } = this.props.navigation;
      navigate('HomeTabs');
    }
  }

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

    if (result.type === 'success') {
      Keyboard.dismiss();

      const { navigate } = this.props.navigation;
      navigate('HomeTabs');
    }
  }

  render() {
    const { name, email, password } = this.state;

    const isSignUpInfoNotEmpty = !(email === '' || password === '');

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

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        
      }),
    }),
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