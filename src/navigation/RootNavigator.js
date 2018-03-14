import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

const isUserLoggedIn = require('../../App');

export default StackNavigator({
  IntroStack: {
    screen: IntroStack,
  },
  HomeTabs: {
    screen: HomeTabs,
  },
}, {
  initialRouteName: isUserLoggedIn ? 'HomeTabs' : 'IntroStack',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});
