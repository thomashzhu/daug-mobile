import React from 'react';
import { ScrollView, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const posts = require('../data/posts');

class SocialFeedScreen extends React.Component {
  static navigationOptions = {
    title: 'DAUG',
    headerStyle: {
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#FD746C',
    // gesturesEnabled: false,
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
    
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.postHeader} onPress={() => navigate('Profile', { item })}>
          <Image style={styles.postHeaderIcon} source={{ uri: item.image }} />
          <Text style={styles.postHeaderName}>{item.name}</Text>
        </TouchableOpacity>

        <View style={styles.postContent}>
          <Image style={styles.postImage} source={{ uri: item.post.image }} />
          <Text style={styles.postCaption}>{item.post.caption}</Text>
        </View>

        <View style={styles.postStatistics}>
          <Text style={{ flex: 1 }}>{item.post.date}</Text>

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
    state: PropTypes.shape({
      params: PropTypes.shape({
        
      }),
    }),
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
    backgroundColor: '#DADADA',
  },
  postHeader: {
    flexDirection: 'row',
    height: 64,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#F9F9F9',
  },
  postStatistics: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
};

export default SocialFeedScreen;
