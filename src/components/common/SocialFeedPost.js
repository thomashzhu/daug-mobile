import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { selectUser, selectPost } from '../../actions';
import { timeSince } from '../../utils/Helpers';

const fetch = require('node-fetch');

const SERVER_ROOT_URL = 'https://daug-app.herokuapp.com';

class SocialFeedPost extends Component {
  constructor(props) {
    super(props);

    const { loggedInUser } = props.user;
    const { id: postId, comments, likes } = props.item;

    const isCommented = (_.findIndex(comments, comment => (
      comment.userId === loggedInUser.id
    )) !== -1);
    const isLiked = (_.findIndex(likes, like => (
      like.userId === loggedInUser.id
    )) !== -1);

    this.state = {
      postId,
      user: null,
      commentCount: comments ? comments.length : 0,
      isCommented,
      likeCount: likes ? likes.length : 0,
      isLiked,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  commentButtonPressed = () => {

  }

  likeButtonPressed = async () => {
    try {
      const { loggedInUser } = this.props.user;
      const { postId, isLiked, likeCount } = this.state;
      
      if (isLiked) {
        await axios.post(`${SERVER_ROOT_URL}/api/posts/${postId}/unlike/${loggedInUser.id}`);
        this.setState({ likeCount: likeCount - 1 });
      } else {
        await axios.post(`${SERVER_ROOT_URL}/api/posts/${postId}/like/${loggedInUser.id}`);
        this.setState({ likeCount: likeCount + 1 });
      }

      this.setState({ isLiked: !isLiked });
    } catch (error) {
      console.log('error', error);
    }
  }

  fetchUserData = async () => {
    try {
      const { item } = this.props;

      const response = await fetch(`${SERVER_ROOT_URL}/api/users/${item.userId}`);
      const responseJSON = await response.json();

      if (response.status === 200) {
        this.setState({ user: responseJSON });
      } else {
        const error = responseJSON.message;
        Alert.alert('Loading user failed!', `Unable to obtain user data. ${error}!`);
      }
    } catch (error) {
      Alert.alert(`Loading user failed!', 'Please try again later. ${error}!`);
    }
  }

  renderUserProfilePicture = () => {
    const { user } = this.state;
    const profileImage = (user ? user.profile_image : null);

    if (profileImage) {
      return <Image style={styles.postHeaderIcon} source={{ uri: profileImage }} />;
    }
    return null;
  }

  renderImage = () => {
    const { item, postNavigationDisabled } = this.props;

    if (item && item.image) {
      return (
        <TouchableWithoutFeedback
          disabled={postNavigationDisabled}
          onPress={() => this.props.selectPost(item)}
        >
          <Image style={styles.postImage} source={{ uri: item.image }} />
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  renderDescription = () => {
    const { description } = this.props.item;
    const { item, postNavigationDisabled } = this.props;

    if (description) {
      return (
        <TouchableWithoutFeedback
          disabled={postNavigationDisabled}
          onPress={() => this.props.selectPost(item)}
        >
          <View>
            <Text style={styles.postCaption}>{description}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  render() {
    const { item, profileNavigationDisabled } = this.props;
    const {
      user, isCommented, commentCount, isLiked, likeCount,
    } = this.state;

    return (
      <View>
        <TouchableOpacity
          disabled={profileNavigationDisabled}
          style={styles.postHeader}
          onPress={() => this.props.selectUser(user)}
        >
          {this.renderUserProfilePicture()}
          <Text style={styles.postHeaderName}>{user ? user.name : ''}</Text>
        </TouchableOpacity>
  
        <View style={{ height: item.image ? 300 : 0 }}>
          {this.renderImage()}
        </View>

        {this.renderDescription()}
  
        <View style={styles.postStatistics}>
          <Text style={{ flex: 1 }}>{timeSince(new Date(item.createdAt))}</Text>
  
          <TouchableOpacity
            style={styles.postInteractiveButtonContainer}
            onPress={this.commentButtonPressed}
          >
            <View style={styles.postInteractiveButton}>
              <SimpleLineIcons
                name={isCommented ? 'bubbles' : 'bubble'}
                color={isCommented ? 'red' : 'black'}
                size={24}
              />
              <Text style={styles.postInteractionCount}>{commentCount}</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.postInteractiveButtonContainer}
            onPress={this.likeButtonPressed}
          >
            <View style={styles.postInteractiveButton}>
              <SimpleLineIcons
                name="heart"
                color={isLiked ? 'red' : 'black'}
                size={24}
              />
              <Text style={styles.postInteractionCount}>{likeCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
  
        <View style={styles.border} />
      </View>
    );
  }
}

SocialFeedPost.propTypes = {
  user: PropTypes.shape({
    loggedInUser: PropTypes.shape(),
  }).isRequired,
  item: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  profileNavigationDisabled: PropTypes.bool,
  postNavigationDisabled: PropTypes.bool,
  selectUser: PropTypes.func.isRequired,
  selectPost: PropTypes.func.isRequired,
};

SocialFeedPost.defaultProps = {
  profileNavigationDisabled: false,
  postNavigationDisabled: false,
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    height: 64,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  postHeaderIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  postHeaderName: {
    marginLeft: 8,
    flex: 1,
  },
  postImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  postCaption: {
    padding: 8,
    backgroundColor: '#FFF',
  },
  postStatistics: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  postInteractiveButtonContainer: {
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInteractiveButton: {
    flex: 1,
    flexDirection: 'row',
  },
  postInteractionCount: {
    paddingLeft: 4,
  },
  border: {
    height: 1,
    backgroundColor: '#DADADA',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  selectUser,
  selectPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialFeedPost);
