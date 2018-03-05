import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../components/ProfileScreen';
import EditProfileScreen from '../components/EditProfileScreen';

export default StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
}, {
  initialRouteName: 'Profile',
  mode: 'modal',
  headerMode: 'none',
});
