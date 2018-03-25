import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, DeviceEventEmitter, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dismissUser } from '../actions';
import SocialFeedList from './common/SocialFeedList';

const fetch = require('node-fetch');

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

    const { selectedUser, loggedInUser } = this.props.user;
    const isCurrentUser = (!selectedUser || selectedUser.id === loggedInUser.id);

    this.state = {
      isLoading: false,
      isCurrentUser,
      posts: isCurrentUser ? [] : loggedInUser.posts,
    };
  }

  componentWillMount() {
    const { isCurrentUser } = this.state;
    const { loggedInUser, selectedUser } = this.props.user;
    const userId = isCurrentUser
      ? loggedInUser.id
      : selectedUser.id;

    this.fetchPosts(userId);

    if (isCurrentUser) {
      DeviceEventEmitter.addListener('updatedProfile', ({ id }) => {
        this.fetchPosts(id);
      });
    }
  }

  componentWillUnmount() {
    this.props.dismissUser();

    const { isCurrentUser } = this.state;
    if (isCurrentUser) {
      DeviceEventEmitter.removeListener('updatedProfile');
    }
  }

  fetchPosts = async (userId) => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${userId}`);
      const responseJSON = await response.json();

      if (response.status === 200) {
        this.setState({ isLoading: false, posts: responseJSON.posts });
      } else {
        this.setState({ isLoading: false });

        const error = responseJSON.message;
        Alert.alert('Loading posts failed!', `Unable to load posts. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false });
      
      Alert.alert('Loading posts failed!', 'Unable to load posts. Please try again later');
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
    } catch (error) {
      // Error saving data
    }

    const { navigate } = this.props.navigation;
    navigate('IntroStack');
  }

  renderBanner = (bannerImage) => {
    if (!bannerImage) {
      return <View style={{ height: 90 }} />;
    }
    return (
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{ uri: bannerImage }}
        />
      </View>
    );
  }

  renderPosts = () => {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          style={{ justifyContent: 'center' }}
          size="large"
        />
      );
    }

    return (
      <SocialFeedList
        navigationDisabled
        posts={this.state.posts}
      />
    );
  }

  render() {
    const { selectedUser, loggedInUser } = this.props.user;
    const { isCurrentUser, posts } = this.state;
    const {
      name, bio, profile_image: profileImage, banner_image: bannerImage,
    } = (isCurrentUser ? loggedInUser : selectedUser);
    
    const { navigate } = this.props.navigation;

    const primaryButtonText = (isCurrentUser ? 'Edit Profile' : 'Following');
    const onPressPrimaryButton = (isCurrentUser ?
      () => { navigate('EditProfile'); } :
      () => { Alert.alert('Feature to be implemented'); }
    );

    return (
      <ScrollView style={{ flexDirection: 'column' }}>
        {this.renderBanner(bannerImage)}

        <View style={styles.profilePanel}>
          <View style={styles.topPanel}>
            <View style={styles.profilePictureContainer}>
              <Image style={styles.profilePicture} source={{ uri: profileImage }} />
            </View>

            <View style={styles.statusPanel}>
              <View style={styles.topStatusPanelRow}>
                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{posts ? posts.length : 0}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>100</Text>
                  <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>50</Text>
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
            <Text style={styles.petDescription}>{bio === 'null' ? 'Nothing yet...' : bio}</Text>
          </View>
        </View>

        <View style={styles.border} />
        
        {this.renderPosts()}

        <View style={styles.personalFeeds}>
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.logoutButtonContainer}>
              <Text style={styles.logoutButton}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedInUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    selectedUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      userId: PropTypes.number,
    }),
  }).isRequired,
  dismissUser: PropTypes.func.isRequired,
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
    marginTop: 18,
    marginBottom: 18,
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  dismissUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
