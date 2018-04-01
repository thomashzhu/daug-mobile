import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, FlatList, View, Image, Keyboard, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import SocialFeedPost from './common/SocialFeedPost';

const SERVER_ROOT_URL = 'https://daug-app.herokuapp.com';

class PostDetailScreen extends Component {
  static navigationOptions = {
    title: 'Post',
    headerStyle: {
      backgroundColor: '#a29bfe',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
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

  fetchPost = async () => {
    const { postId } = this.state;
    const { data: { comments } } = await axios.get(`${SERVER_ROOT_URL}/api/posts/${postId}`);
    this.setState({ comments: _.orderBy(comments, ['createdAt'], ['desc']) });
  }

  createComment = async () => {
    try {
      const { postId, userId, newComment } = this.state;
      if (!newComment) return;

      await axios.post(`${SERVER_ROOT_URL}/api/posts/${postId}/comment/${userId}`, {
        comment: newComment,
      });

      Keyboard.dismiss();
      await this.fetchPost();

      this.setState({ newComment: '' });
    } catch (error) {
      console.log('error', error);
    }
  }

  renderComment = ({ item: comment }) => {
    const { description, user } = comment;
    const { name, profile_image: profileImage } = user;

    return (
      <View style={styles.commentContainer}>
        {profileImage &&
          <Image
            style={styles.commentAuthorPicture}
            source={{ uri: profileImage }}
          />
        }

        <View style={styles.commentInfoContainer}>
          <Text style={{ flex: 1 }}>{name}</Text>
          <Text style={styles.comment}>{description}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { selectedPost } = this.props.post;
    const { newComment, comments } = this.state;

    return (
      <ScrollView>
        <SocialFeedPost
          item={selectedPost}
          profileNavigationDisabled={false}
          postNavigationDisabled
        />

        <Text style={styles.commentHeader}>
          {comments ? comments.length : 'NO'} COMMENTS
        </Text>

        <View style={styles.newComment}>
          <TextInput
            style={styles.newCommentInput}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => this.setState({ newComment: text })}
            placeholder="New comment..."
            value={newComment}
          />

          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={this.createComment}
          >
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>

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
          profile_image: PropTypes.string,
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
  newComment: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  sendButtonText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  newCommentInput: {
    flex: 1,
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
