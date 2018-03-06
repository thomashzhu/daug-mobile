import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import SocialFeedList from './common/SocialFeedList';

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
          <SocialFeedList
            posts={posts}
            navigation={this.props.navigation}
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
