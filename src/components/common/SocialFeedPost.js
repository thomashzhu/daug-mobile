import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class SocialFeedPost extends Component {
  constructor(props) {
    super(props);

    const { isCommented, isLiked } = props;

    this.state = {
      isCommented,
      isLiked,
    };
  }

  render() {
    const { item, onPressProfilePicture, onPressPostContent } = this.props;
    const { isCommented, isLiked } = this.state;

    return (
      <View>
        <TouchableOpacity
          style={styles.postHeader}
          onPress={onPressProfilePicture}
        >
          <Image style={styles.postHeaderIcon} source={{ uri: item.image }} />
          <Text style={styles.postHeaderName}>{item.user.name}</Text>
        </TouchableOpacity>
  
        <View style={styles.postContent}>
          <TouchableWithoutFeedback onPress={onPressPostContent}>
            <Image style={styles.postImage} source={{ uri: item.image }} />
          </TouchableWithoutFeedback>
          <Text style={styles.postCaption}>{item.caption}</Text>
        </View>
  
        <View style={styles.postStatistics}>
          <Text style={{ flex: 1 }}>{item.date}</Text>
  
          <TouchableOpacity
            style={styles.postInteractiveButtonContainer}
            onPress={() => { this.setState({ isCommented: !isCommented }); }}
          >
            <View style={styles.postInteractiveButton}>
              <SimpleLineIcons
                name={isCommented ? 'bubbles' : 'bubble'}
                color={isCommented ? 'red' : 'black'}
                size={24}
              />
              <Text style={styles.postInteractionCount}>10</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.postInteractiveButtonContainer}
            onPress={() => { this.setState({ isLiked: !isLiked }); }}
          >
            <View style={styles.postInteractiveButton}>
              <SimpleLineIcons
                name="heart"
                color={isLiked ? 'red' : 'black'}
                size={24}
              />
              <Text style={styles.postInteractionCount}>200</Text>
            </View>
          </TouchableOpacity>
        </View>
  
        <View style={styles.border} />
      </View>
    );
  }
}

SocialFeedPost.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onPressProfilePicture: PropTypes.func.isRequired,
  onPressPostContent: PropTypes.func,
  isCommented: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

SocialFeedPost.defaultProps = {
  onPressPostContent: null,
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
  postContent: {
    height: 300,
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

export default SocialFeedPost;
