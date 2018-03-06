import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';

import SocialFeedPost from './SocialFeedPost';

class SocialFeedList extends Component {
  constructor(props) {
    super(props);

    const { posts, navigationDisabled } = props;

    this.state = {
      posts,
      navigationDisabled,
      isCommented: false,
      isLiked: false,
    };
  }

  renderPost = ({ item }) => {
    const { navigate } = this.props.navigation;

    const { navigationDisabled, isCommented, isLiked } = this.state;

    const primaryButtonText = 'Follow';
    const onPressPrimaryButton = (() =>
      Alert.alert('Under Construction', 'Following feature to be implemented')
    );

    return (
      <SocialFeedPost
        item={item}
        navigationDisabled={navigationDisabled}
        onPressProfilePicture={() => navigate('Profile', { item, primaryButtonText, onPressPrimaryButton })}
        onPressPostContent={() => navigate('PostDetail', { item, isCommented, isLiked })}
        isCommented={isCommented}
        isLiked={isLiked}
      />
    );
  };

  render = () => {
    const { posts } = this.state;

    return (
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index}
        data={posts}
        renderItem={this.renderPost}
      />
    );
  };
}

SocialFeedList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigationDisabled: PropTypes.bool,
};

SocialFeedList.defaultProps = {
  posts: [],
  navigationDisabled: false,
};

export default SocialFeedList;
