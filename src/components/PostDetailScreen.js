import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, FlatList, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import SocialFeedPost from './common/SocialFeedPost';

class PostDetailScreen extends Component {
  static navigationOptions = {
    title: 'Post',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FD746C',
  };

  renderComment = ({ item: comment }) => {
    const { content, user } = comment;
    const { name: username, image: userPicture } = user;

    return (
      <View style={styles.commentContainer}>
        <Image
          style={styles.commentAuthorPicture}
          source={{ uri: userPicture }}
        />

        <View style={styles.commentInfoContainer}>
          <Text style={{ flex: 1 }}>{username}</Text>
          <Text style={styles.comment}>{content}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { item, isCommented, isLiked } = navigation.state.params;

    const { comments } = item;

    return (
      <ScrollView>
        <SocialFeedPost
          item={item}
          onPressProfilePicture={() => navigate('Profile', { item })}
          isCommented={isCommented}
          isLiked={isLiked}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          image: PropTypes.string.isRequired,
          caption: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          user: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
          comments: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string.isRequired,
            user: PropTypes.shape({
              name: PropTypes.string.isRequired,
              image: PropTypes.string.isRequired,
            }).isRequired,
          })),
        }).isRequired,
        isCommented: PropTypes.bool.isRequired,
        isLiked: PropTypes.bool.isRequired,
      }),
    }),
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

export default PostDetailScreen;
