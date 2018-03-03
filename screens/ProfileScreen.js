import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import IntroScreen from './IntroScreen';

const posts = require('../data/posts');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      screen: '',
    };
  }

  render() {
    const { index, screen } = this.state;
    const item = posts[index];

    if (screen === 'IntroScreen') {
      return <IntroScreen />;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image style={styles.headerImage} source={{ uri: item.post.image }} />
        </View>

        <View style={styles.profilePanel}>
          <View style={styles.topPanel}>
            <View style={styles.profilePictureContainer}>
              <Image style={styles.profilePicture} source={{ uri: item.post.image }} />
            </View>

            <View style={styles.statusPanel}>
              <View style={styles.topStatusPanelRow}>
                <Text style={styles.stats}>1{'\n'}Posts</Text>
                <Text style={styles.stats}>281{'\n'}Followers</Text>
                <Text style={styles.stats}>124{'\n'}Following</Text>
              </View>

              <View style={styles.bottomStatusPanelRow}>
                <TouchableOpacity>
                  <View style={styles.editProfileButtonContainer}>
                    <Text style={styles.editProfileButton}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomPanel}>
            <Text style={styles.petName}>Roxie</Text>
            <Text style={styles.petDescription}>{item.name}{'\''}s dear dear friend...</Text>
          </View>
        </View>

        <View style={styles.border} />
        
        <View style={styles.personalFeeds}>
          <TouchableOpacity onPress={() => this.setState({ screen: 'IntroScreen' })}>
            <View style={styles.logoutButtonContainer}>
              <Text style={styles.logoutButton}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  index: PropTypes.number.isRequired,
};

const styles = {
  header: {
    height: 180,
  },
  headerImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  profilePanel: {
    height: 180,
  },
  topPanel: {
    height: 90,
    flexDirection: 'row',
  },
  profilePictureContainer: {
    height: 110,
    width: 110,
    padding: 10,
  },
  profilePicture: {
    resizeMode: 'cover',
    height: 90,
    width: 90,
    borderRadius: 45,
    marginTop: -40,
  },
  statusPanel: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  topStatusPanelRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomStatusPanelRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButtonContainer: {
    marginTop: 8,
    height: 32,
    width: 190,
    borderRadius: 8,
    borderColor: '#DADADA',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButton: {
    fontWeight: 'bold',
  },
  bottomPanel: {
    padding: 16,
    height: 100,
    justifyContent: 'center',
  },
  petName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
  },
  petDescription: {
    flex: 1,
    fontWeight: 'bold',
  },
  border: {
    height: 1,
    backgroundColor: '#DADADA',
  },
  personalFeeds: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonContainer: {
    height: 48,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29ABEC',
  },
  logoutButton: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
};

export default ProfileScreen;
