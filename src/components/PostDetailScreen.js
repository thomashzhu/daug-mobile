import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, FlatList, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import SocialFeedPost from './common/SocialFeedPost';
import CaptionTextInput from './common/CaptionTextInput';

const SERVER_ROOT_URL = 'https://daug-app.herokuapp.com';

class PostDetailScreen extends Component {
  static navigationOptions = {
    title: 'Post',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FD746C',
  };

  constructor(props) {
    super(props);

    const { selectedPost: { id: selectedPostId, comments } } = props.post;
    const { loggedInUser: { id: loggedInUserId } } = props.user;

    this.state = {
      postId: selectedPostId,
      userId: loggedInUserId,
      newComment: '',
      comments: _.orderBy(comments, ['createdAt'], ['desc']),
    };
  }

  createComment = async () => {
    try {
      const {
        postId, userId, newComment, comments,
      } = this.state;

      await axios.post(`${SERVER_ROOT_URL}/api/posts/${postId}/comment/${userId}`, newComment);
      console.log('comment added', `${SERVER_ROOT_URL}/api/posts/${postId}/comment/${userId}`);
      this.setState({
        comments: [newComment, ...comments],
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  renderComment = ({ item: comment, index }) => {
    if (index === 0) {
      const { newComment } = this.state;

      return (
        <CaptionTextInput
          caption="New Comment"
          onChangeText={text => this.setState({ newComment: text })}
          onSubmitEditing={this.createComment}
          value={newComment}
        />
      );
    }

    const { description, user } = comment;
    const { name, profile_image: profileImage } = user;

    return (
      <View style={styles.commentContainer}>
        <Image
          style={styles.commentAuthorPicture}
          source={{ uri: profileImage }}
        />

        <View style={styles.commentInfoContainer}>
          <Text style={{ flex: 1 }}>{name}</Text>
          <Text style={styles.comment}>{description}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { selectedPost } = this.props.post;
    const { comments } = selectedPost;

    return (
      <ScrollView>
        <SocialFeedPost
          item={selectedPost}
          navigationDisabled
        />

        <Text style={styles.commentHeader}>
          {comments ? comments.length : 'NO'} COMMENTS
        </Text>

        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(element, index) => index}
          data={comments}
          renderItem={this.renderComment}
        />
      </ScrollView>
    );
  }
}

PostDetailScreen.propTypes = {
  user: PropTypes.shape({
    loggedInUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  post: PropTypes.shape({
    selectedPost: PropTypes.shape({
      id: PropTypes.number.isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          profile_image: PropTypes.string.isRequired,
        }).isRequired,
      })),
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  commentHeader: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  commentContainer: {
    height: 54,
    padding: 8,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAuthorPicture: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  commentInfoContainer: {
    flex: 1,
    marginLeft: 8,
  },
  comment: {
    flex: 1,
    color: '#666',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
});

export default connect(mapStateToProps)(PostDetailScreen);
