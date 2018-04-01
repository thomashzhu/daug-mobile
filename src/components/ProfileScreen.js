import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { logOutUser, dismissUser } from '../actions';
import SocialFeedList from './common/SocialFeedList';

const SERVER_ROOT_URL = 'https://daug-app.herokuapp.com';

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
      isFollowing: null,
      user: null,
    };
  }

  componentWillMount() {
    const { isCurrentUser } = this.state;
    const { loggedInUser, selectedUser } = this.props.user;
    const userId = isCurrentUser
      ? loggedInUser.id
      : selectedUser.id;

    this.fetchUser(userId);

    if (isCurrentUser) {
      DeviceEventEmitter.addListener('updatedProfile', ({ id }) => {
        this.fetchUser(id);
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

  fetchUser = async (userId) => {
    this.setState({ isLoading: true });
    
    const { data: user } = await axios.get(`${SERVER_ROOT_URL}/api/users/${userId}`);
    const { followers } = user;
    const { loggedInUser: { id: loggedInUserId } } = this.props.user;
    const followingIndex = _.findIndex(followers, follower => (
      follower.followerId === loggedInUserId
    ));

    this.setState({
      isLoading: false,
      isFollowing: followingIndex !== -1,
      user,
    });
  }

  followerUser = async () => {
    const { user } = this.state;
    if (!user) return;

    const { id: userId, followers } = user;
    const { loggedInUser: { id: loggedInUserId } } = this.props.user;
    const followingIndex = _.findIndex(followers, follower => (
      follower.followerId === loggedInUserId
    ));

    if (followingIndex !== -1) {
      await axios.post(`${SERVER_ROOT_URL}/api/users/${loggedInUserId}/unfollow/${userId}`);
      this.setState({
        isFollowing: false,
      });
    } else {
      await axios.post(`${SERVER_ROOT_URL}/api/users/${loggedInUserId}/follow/${userId}`);
      this.setState({
        isFollowing: true,
      });
    }
  }

  logout = () => {
    this.props.navigation.navigate('IntroStack');
    this.props.logOutUser();
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

  renderFollowButton = () => {
    const { isCurrentUser, isFollowing } = this.state;
    const { navigate } = this.props.navigation;

    let followingButtonText;
    if (isFollowing === null) {
      followingButtonText = '...';
    } else {
      followingButtonText = (isFollowing ? 'Unfollow' : 'Follow');
    }

    const buttonText = (isCurrentUser ? 'Edit Profile' : followingButtonText);
    const onPressPrimaryButton = (isCurrentUser ?
      () => navigate('EditProfile') :
      () => this.followerUser()
    );

    return (
      <View style={styles.bottomStatusPanelRow}>
        <TouchableOpacity onPress={onPressPrimaryButton}>
          <View style={styles.editProfileButtonContainer}>
            <Text style={styles.editProfileButton}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderPosts = () => {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
        />
      );
    }

    const { user: { posts } } = this.state;

    return (
      <SocialFeedList
        navigationDisabled
        posts={posts}
      />
    );
  }

  render() {
    const { selectedUser, loggedInUser } = this.props.user;
    if (!selectedUser && !loggedInUser) {
      return (
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
        />
      );
    }

    const { isCurrentUser, user } = this.state;
    const {
      name, bio, profile_image: profileImage, banner_image: bannerImage,
      posts, followers, following,
    } = user || (isCurrentUser ? loggedInUser : selectedUser);

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
                  <Text style={{ fontWeight: 'bold' }}>{posts ? posts.length : '...'}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{ followers ? followers.length : '...' }</Text>
                  <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                </View>

                <View style={styles.stats}>
                  <Text style={{ fontWeight: 'bold' }}>{ following ? following.length : '...' }</Text>
                  <Text style={{ fontWeight: 'bold' }}>Following</Text>
                </View>
              </View>

              {this.renderFollowButton()}
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
    }),
    selectedUser: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      userId: PropTypes.number,
    }),
  }).isRequired,
  logOutUser: PropTypes.func.isRequired,
  dismissUser: PropTypes.func.isRequired,
};

const styles = {
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
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
  logOutUser,
  dismissUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
