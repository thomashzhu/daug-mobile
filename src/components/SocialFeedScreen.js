import React from 'react';
import { ScrollView, FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import SocialFeedPost from './common/SocialFeedPost';

const posts = require('../data/posts');

class SocialFeedScreen extends React.Component {
  static navigationOptions = {
    title: 'DAUG',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FD746C',
  };

  constructor(props) {
    super(props);

    this.state = {
      isCommented: false,
      isLiked: false,
    };
  }

  renderPost = ({ item }) => {
    const { isCommented, isLiked } = this.state;
    const { navigate } = this.props.navigation;
    
    const primaryButtonText = 'Follow';
    const onPressPrimaryButton = (() =>
      Alert.alert('Under Construction', 'Following feature to be implemented')
    );

    return (
      <SocialFeedPost
        item={item}
        onPressProfilePicture={() => navigate('Profile', { item, primaryButtonText, onPressPrimaryButton })}
        onPressPostContent={() => navigate('PostDetail', { item, isCommented, isLiked })}
        isCommented={isCommented}
        isLiked={isLiked}
      />
    );
  };

  render = () => {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.createPostContainer}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigate('CreatePost')}
          >
            <Text style={styles.createPostLinkText}>Create Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createPostIconButton}
            onPress={() => navigate('CreatePost')}
          >
            <SimpleLineIcons
              name="picture"
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createPostIconButton}
            onPress={() => navigate('CreatePost')}
          >
            <SimpleLineIcons
              style={styles.createPostIconButton}
              name="note"
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.border} />

        <ScrollView style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            keyExtractor={(item, index) => index}
            extraData={this.state}
            data={posts}
            renderItem={this.renderPost}
          />
        </ScrollView>
      </View>
    );
  }
}

SocialFeedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = {
  createPostContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  createPostLinkText: {
    color: '#FD746C',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
  createPostIconButton: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  border: {
    height: 1,
    backgroundColor: '#DDD',
  },
};

export default SocialFeedScreen;
