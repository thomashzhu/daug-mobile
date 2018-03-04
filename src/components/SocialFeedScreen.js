import React from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Platform, NativeModules } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';

const { StatusBarManager } = NativeModules;

const posts = require('../data/posts');

class SocialFeedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: '',
      selectedIndex: -1,
      isCommented: false,
      isLiked: false,
    };
  }

  renderPost = ({ item }) => {
    const { isCommented, isLiked } = this.state;
    
    return (
      <View style={styles.postContainer}>
        <View style={styles.border} />

        <TouchableOpacity style={styles.postHeader} onPress={() => this.setState({ screen: 'ProfileScreen', selectedIndex: item.id })}>
          <Image style={styles.postHeaderIcon} source={{ uri: item.image }} />
          <Text style={styles.postHeaderName}>{item.name}</Text>
        </TouchableOpacity>

        <View style={styles.postContent}>
          <Image style={styles.postImage} source={{ uri: item.post.image }} />
          <Text style={styles.postCaption}>{item.post.caption}</Text>
        </View>

        <View style={styles.postStatistics}>
          <Text style={styles.postStatisticsDate}>{item.post.date}</Text>

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
      </View>
    );
  };

  render() {
    const { screen, selectedIndex } = this.state;

    if (screen === 'ProfileScreen' && selectedIndex !== -1) {
      return <ProfileScreen index={selectedIndex} />;
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <FlatList
            style={styles.list}
            keyExtractor={(item, index) => index}
            extraData={this.state}
            data={posts}
            renderItem={this.renderPost}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = {
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  list: {
    flex: 1,
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
  postImageContainer: {
    flex: 1,
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
  postStatisticsDate: {
    flex: 1,
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
