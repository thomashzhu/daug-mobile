import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, TouchableOpacity, View, Text, Image, TextInput, Alert, DeviceEventEmitter } from 'react-native';
import { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { RNS3 } from 'react-native-aws3';

import Header from './common/Header';
import LoadingModal from './common/LoadingModal';

const fetch = require('node-fetch');

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      image: '',
      description: '',
    };
  }
  
  onSubmitButtonPressed = async () => {
    this.setState({ isLoading: true });

    const { id: userId } = this.props.user.loggedInUser;
    const now = new Date();

    const { image, description } = this.state;
    const post = {
      description,
      image,
      createdAt: now,
      updatedAt: now,
      userId,
    };

    var formBody = [];

    for (var property in post) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(post[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join('&');
    
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${userId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      });

      const responseJSON = await this.setState({ isLoading: false });

      if (response.status === 201) {
        this.setState({ isLoading: false });

        DeviceEventEmitter.emit('postCreated');

        const { navigate } = this.props.navigation;
        navigate('SocialFeed');
      } else {
        this.setState({ isLoading: false });

        const error = responseJSON.message;
        Alert.alert('Create post failed!', `Unable to create post. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false });

      Alert.alert('Create post failed!', 'Unable to create post. Please try again later');
    }
  }

  promptMediaType = () => {
    Alert.alert(
      'Media Type',
      null,
      [
        { text: 'Camera', onPress: () => this.takeAndUploadPhotoAsync('camera') },
        { text: 'Photo', onPress: () => this.takeAndUploadPhotoAsync('photos') },
        { text: 'Cancel', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }

  takeAndUploadPhotoAsync = async (mediaType) => {
    const mediaMethod = (mediaType === 'camera'
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync);

    const result = await mediaMethod({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (result.cancelled) {
      return;
    }
  
    const { uri } = result;
    const name = uri.split('/').pop();
  
    const match = /\.(\w+)$/.exec(name);
    const type = match ? `image/${match[1]}` : 'image';
  
    const picture = { uri, name, type };
  
    const options = {
      keyPrefix: 'uploads/',
      bucket: 'daug',
      region: 'us-east-1',
      accessKey: 'AKIAIKG2UJ7AHBKJ5N2Q',
      secretKey: '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',
      successActionStatus: 201,
    };

    RNS3.put(picture, options).then((response) => {
      if (response.status === 201) {
        this.setState({ image: response.body.postResponse.location });
      } else {
        Alert.alert('Failed to upload picture.');
      }
    });
  }

  renderImage = () => {
    const { image } = this.state;

    if (image) {
      return (
        <Image
          style={styles.picture}
          source={{ uri: image }}
        />
      );
    }

    return (
      <SimpleLineIcons
        name="camera"
        size={48}
      />
    );
  }

  render = () => {
    const { name, profile_image: profileImage } = this.props.user.loggedInUser;
    const { goBack } = this.props.navigation;
    const { description } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Header
          headerLeft={() => (
            <TouchableOpacity onPress={() => goBack()}>
              <Text style={styles.headerButton}>Cancel</Text>
            </TouchableOpacity>
          )}
          title="Create Post"
          headerRight={() => (
            <TouchableOpacity onPress={() => this.onSubmitButtonPressed()}>
              <Text style={styles.headerButton}>Share</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.postInformationContainer}>
          <Image
            style={styles.profilePicture}
            source={{ uri: profileImage }}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.author}>{name}</Text>

            <TouchableOpacity style={styles.locationContainer}>
              <SimpleLineIcons
                name="location-pin"
                size={12}
              />
              <Text style={styles.location}>Add Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <TextInput
            style={styles.content}
            multiline
            placeholder="What's on your mind?"
            placeholderTextColor="#DDD"
            onChangeText={text => this.setState({ description: text })}
            value={description}
            underlineColorAndroid="rgba(0,0,0,0)"
          />

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={styles.pictureCapture}
            onPress={this.promptMediaType}
          >
            {this.renderImage()}
          </TouchableOpacity>
        </View>

        <LoadingModal visible={this.state.isLoading} />
      </SafeAreaView>
    );
  };
}

CreatePostScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedInUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },
  headerButton: {
    color: '#B4B4D9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postInformationContainer: {
    marginTop: 8,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profilePicture: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    flex: 1,
    justifyContent: 'center',
    color: '#4343ae',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  location: {
    marginLeft: 4,
    fontSize: 11,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    fontSize: 24,
    textAlignVertical: 'top',
  },
  orText: {
    height: 36,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#BBB',
    alignSelf: 'center',
  },
  pictureCapture: {
    flex: 1,
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  post: state.post,
});

export default connect(mapStateToProps)(CreatePostScreen);
