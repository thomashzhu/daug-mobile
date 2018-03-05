import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import ProfileScreen from '../components/ProfileScreen';
import SocialFeedRootStack from './SocialFeedRootStack';

const SocialFeedTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="layers"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
SocialFeedTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const ProfileTabIcon = ({ tintColor }) => (
  <SimpleLineIcons
    name="user"
    color={tintColor}
    size={Platform.OS === 'ios' ? 22 : 25}
  />
);
ProfileTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default TabNavigator({
  SocialTab: {
    screen: SocialFeedRootStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: SocialFeedTabIcon,
    },
  },
  ProfileTab: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ProfileTabIcon,
    },
  },
}, {
  initialRouteName: 'SocialTab',
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS !== 'ios',
  swipeEnabled: Platform.OS !== 'ios',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#FD746C',
    inactiveTintColor: '#999',
    style: {
      backgroundColor: '#FFF',
      padding: Platform.OS === 'ios' ? 5 : 0,
    },
    indicatorStyle: {
      backgroundColor: '#FFF',
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
