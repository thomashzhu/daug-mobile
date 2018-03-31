import { StackNavigator } from 'react-navigation';

import AppLoadingScreen from '../components/AppLoadingScreen';
import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

export default StackNavigator({
  Loading: {
    screen: AppLoadingScreen,
  },
  IntroStack: {
    screen: IntroStack,
  },
  HomeTabs: {
    screen: HomeTabs,
  },
}, {
  initialRouteName: 'Loading',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
});
