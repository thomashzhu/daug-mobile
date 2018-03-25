import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectUser, selectPost } from '../../actions';
import { timeSince } from '../../utils/Helpers';

const fetch = require('node-fetch');

class SocialFeedPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isCommented: false,
      isLiked: false,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const { item } = this.props;

      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${item.userId}`);
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
    const { item, navigationDisabled } = this.props;

    if (item && item.image) {
      return (
        <TouchableWithoutFeedback
          disabled={navigationDisabled}
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

    if (description) {
      return <Text style={styles.postCaption}>{description}</Text>;
    }
    return null;
  }

  render() {
    const { item, navigationDisabled } = this.props;
    const { user, isCommented, isLiked } = this.state;

    return (
      <View>
        <TouchableOpacity
          disabled={navigationDisabled}
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
    image: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  navigationDisabled: PropTypes.bool.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectPost: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  selectUser,
  selectPost,
};

export default connect(null, mapDispatchToProps)(SocialFeedPost);
