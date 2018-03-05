import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../components/SocialFeedScreen';
import ProfileScreen from '../components/ProfileScreen';
import PostDetailScreen from '../components/PostDetailScreen';

export default StackNavigator({
  SocialFeed: {
    screen: SocialFeedScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
  PostDetail: {
    screen: PostDetailScreen,
  },
});
