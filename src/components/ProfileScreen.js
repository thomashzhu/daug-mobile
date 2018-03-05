import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const posts = require('../data/posts');

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FD746C',
  };
  
  constructor(props) {
    super(props);

    const navigation = this.props && this.props.navigation;
    const state = navigation && navigation.state;
    const params = state && state.params;

    const item = params && params.item;
    const primaryButtonText = params && params.primaryButtonText;
    const onPressPrimaryButton = params && params.onPressPrimaryButton;

    this.state = {
      item: item || posts[0],
      primaryButtonText: primaryButtonText || 'Edit Profile',
      onPressPrimaryButton: onPressPrimaryButton || (navigation && (() => {
        this.props.navigation.navigate('EditProfile', { item: this.state.item });
      })),
    };
  }

  render() {
    const { item, primaryButtonText, onPressPrimaryButton } = this.state;
    const {
      name, image, bio, banner, followers, following, posts: userPosts,
    } = item.user;

    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image style={styles.headerImage} source={{ uri: banner }} />
        </View>

        <View style={styles.profilePanel}>
          <View style={styles.topPanel}>
            <View style={styles.profilePictureContainer}>
              <Image style={styles.profilePicture} source={{ uri: image }} />
            </View>

            <View style={styles.statusPanel}>
              <View style={styles.topStatusPanelRow}>
                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{userPosts.length}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{followers}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{following}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Following</Text>
                </View>
              </View>

              <View style={styles.bottomStatusPanelRow}>
                <TouchableOpacity onPress={onPressPrimaryButton}>
                  <View style={styles.editProfileButtonContainer}>
                    <Text style={styles.editProfileButton}>{primaryButtonText}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomPanel}>
            <Text style={styles.petName}>{name}</Text>
            <Text style={styles.petDescription}>{bio}</Text>
          </View>
        </View>

        <View style={styles.border} />
        
        <View style={styles.personalFeeds}>
          <TouchableOpacity onPress={() => navigate('IntroStack')}>
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            banner: PropTypes.string.isRequired,
            followers: PropTypes.number.isRequired,
            following: PropTypes.number.isRequired,
            posts: PropTypes.array.isRequired,
          }).isRequired,
        }).isRequired,
        primaryButtonText: PropTypes.string,
        onPressPrimaryButton: PropTypes.func,
      }),
    }),
  }),
};

ProfileScreen.defaultProps = {
  navigation: null,
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
