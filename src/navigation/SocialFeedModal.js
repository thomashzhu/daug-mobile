import { StackNavigator } from 'react-navigation';

import SocialFeedStack from './SocialFeedStack';
import CreatePostScreen from '../components/CreatePostScreen';

export default StackNavigator({
  SocialFeed: {
    screen: SocialFeedStack,
  },
  CreatePost: {
    screen: CreatePostScreen,
  },
}, {
  initialRouteName: 'SocialFeed',
  mode: 'modal',
  headerMode: 'none',
});
