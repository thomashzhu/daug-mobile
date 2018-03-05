import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../components/SocialFeedScreen';
import ProfileScreen from '../components/ProfileScreen';

export default StackNavigator({
  SocialFeed: {
    screen: SocialFeedScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
});
