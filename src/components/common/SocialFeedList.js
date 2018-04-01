import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import SocialFeedPost from './SocialFeedPost';

class SocialFeedList extends Component {
  constructor(props) {
    super(props);

    const { posts } = props;
    this.state = { posts };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.posts });
  }

  renderPost = ({ item }) => {
    const { profileNavigationDisabled, postNavigationDisabled } = this.props;

    return (
      <SocialFeedPost
        item={item}
        profileNavigationDisabled={profileNavigationDisabled}
        postNavigationDisabled={postNavigationDisabled}
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
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })),
  profileNavigationDisabled: PropTypes.bool,
  postNavigationDisabled: PropTypes.bool,
};

SocialFeedList.defaultProps = {
  profileNavigationDisabled: false,
  postNavigationDisabled: false,
};

SocialFeedList.defaultProps = {
  posts: [],
};

export default SocialFeedList;
