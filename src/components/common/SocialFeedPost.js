import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const fetch = require('node-fetch');

class SocialFeedPost extends Component {
  constructor(props) {
    super(props);

    const { navigationDisabled, isCommented, isLiked } = props;

    this.state = {
      user: {
        name: '',
        profile_image: '',
      },
      navigationDisabled,
      isCommented,
      isLiked,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const { userId } = this.props.item;
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${userId}`);

      if (response.status === 200) {
        const responseJSON = await response.json();

        this.setState({ user: responseJSON });
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message;

        console.log(responseJSON);

        Alert.alert('Loading user failed!', `Unable to obtain user data. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error });

      console.log(error);

      Alert.alert('Loading user failed!', 'Please try again later');
    }
  }

  renderUserProfilePicture = () => {
    const { profile_image: profileImage } = this.state.user;

    if (profileImage) {
      return <Image style={styles.postHeaderIcon} source={{ uri: profileImage }} />;
    }
    return null;
  }

  renderImage = () => {
    const { item, onPressPostContent } = this.props;
    const { navigationDisabled } = this.state;

    if (item.image) {
      return (
        <TouchableWithoutFeedback
          disabled={navigationDisabled}
          onPress={onPressPostContent}
        >
          <Image style={styles.postImage} source={{ uri: item.image }} />
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }

  renderDescription = () => {
    const { description } = this.props.item;

    if (description) {
      return <Text style={styles.postCaption}>{description}</Text>;
    }
    return null;
  }

  render() {
    const { item, onPressProfilePicture } = this.props;
    const { navigationDisabled, isCommented, isLiked } = this.state;

    return (
      <View>
        <TouchableOpacity
          disabled={navigationDisabled}
          style={styles.postHeader}
          onPress={onPressProfilePicture}
        >
          {this.renderUserProfilePicture()}
          <Text style={styles.postHeaderName}>{this.state.user.name}</Text>
        </TouchableOpacity>
  
        <View style={{ height: item.image ? 300 : 100 }}>
          {this.renderImage()}
          {this.renderDescription()}
        </View>
  
        <View style={styles.postStatistics}>
          <Text style={{ flex: 1 }}>{item.createdAt}</Text>
  
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
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  onPressProfilePicture: PropTypes.func.isRequired,
  onPressPostContent: PropTypes.func,
  isCommented: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  navigationDisabled: PropTypes.bool,
};

SocialFeedPost.defaultProps = {
  onPressPostContent: null,
  navigationDisabled: false,
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

export default SocialFeedPost;
