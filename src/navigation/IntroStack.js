import { StackNavigator } from 'react-navigation';

import IntroScreen from '../components/IntroScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';

export default StackNavigator({
  Home: {
    screen: IntroScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
});
