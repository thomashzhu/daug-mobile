import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, TouchableOpacity, View, Text, Image, TextInput, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import Header from './common/Header';

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };
  }
  
  onSubmitButtonPressed = async () => {
    this.setState({ isLoading: true });

    // const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var post = {
      'description': this.state.text
    };

    var formBody = [];

    for (var property in post) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(post[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join('&');

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/7/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ isLoading: false })
        Alert.alert(
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: 'Continue', onPress: () => navigate('SocialFeed') },
          ],
          { cancelable: false },
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON);

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error });

      console.log(error);

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  render = () => {
    const { goBack } = this.props.navigation;

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
            source={{ uri: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb' }}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.author}>Roxie</Text>

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
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View>
      </SafeAreaView>
    );
  };
}

CreatePostScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 0 : NativeModules.StatusBarManager.HEIGHT,
  },
  headerButton: {
    color: '#FD746C',
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
    marginLeft: 12,
    marginRight: 12,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default CreatePostScreen;
