import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import SocialFeedList from './common/SocialFeedList';
import LoadingIndicator from './common/LoadingIndicator';

const fetch = require('node-fetch');

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
      isLoading: false,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch('https://daug-app.herokuapp.com/api/posts/all');

      if (response.status === 200) {
        const responseJSON = await response.json();
        
        this.setState({ isLoading: false, posts: responseJSON });
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message;

        console.log(responseJSON);

        this.setState({ isLoading: false, errors: responseJSON.errors });
        Alert.alert('Loading posts failed!', `Unable to load posts. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error });

      console.log(error);

      Alert.alert('Loading posts failed!', 'Unable to load posts. Please try again later');
    }
  }

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
            posts={this.state.posts}
            navigation={this.props.navigation}
          />
        </ScrollView>

        <LoadingIndicator visible={this.state.isLoading} />
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
