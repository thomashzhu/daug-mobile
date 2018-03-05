import { StackNavigator } from 'react-navigation';

import IntroStack from './IntroStack';
import HomeTabs from './HomeTabs';

export default StackNavigator({
  IntroStack: {
    screen: IntroStack,
  },
  HomeTabs: {
    screen: HomeTabs,
  },
}, {
  initialRouteName: 'IntroStack',
  mode: 'modal',
  headerMode: 'none',
});
