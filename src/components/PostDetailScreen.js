import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  // renderComment = ({ item: comment }) => {
  //   const { content, user } = comment;
  //   const { name: username, image: userPicture } = user;

  //   return (
  //     <View style={styles.commentContainer}>
  //       <Image
  //         style={styles.commentAuthorPicture}
  //         source={{ uri: userPicture }}
  //       />

  //       <View style={styles.commentInfoContainer}>
  //         <Text style={{ flex: 1 }}>{username}</Text>
  //         <Text style={styles.comment}>{content}</Text>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    const { selectedPost } = this.props.post;
    const comments = [];

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
  post: PropTypes.shape({
    selectedPost: PropTypes.shape({
      id: PropTypes.number.isRequired,
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
  post: state.post,
});

export default connect(mapStateToProps)(PostDetailScreen);
