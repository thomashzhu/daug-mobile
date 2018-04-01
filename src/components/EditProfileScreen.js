import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, Alert, ScrollView, TouchableOpacity, Text, View, Image, DeviceEventEmitter } from 'react-native';
import { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';

import { updateUser } from '../actions';

import Header from './common/Header';
import CaptionTextInput from './common/CaptionTextInput';
import LoadingModal from './common/LoadingModal';

const SERVER_ROOT_URL = 'https://daug-app.herokuapp.com';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    const {
      profile_image: profileImage, name, bio, email, phone_number: phoneNumber,
    } = this.props.loggedInUser;

    this.state = {
      profileImage,
      name: name || '',
      bio: (bio === 'null' || !bio ? '' : bio),
      email: email || '',
      phoneNumber: phoneNumber || '',
      isLoading: false,
    };
  }

  pushUser = async () => {
    this.setState({ isLoading: true });

    const { id } = this.props.loggedInUser;
    const {
      profileImage, name, bio, email, phoneNumber,
    } = this.state;

    try {
      const { status, data: json } = await axios.put(`${SERVER_ROOT_URL}/api/users/${id}`, {
        profile_image: profileImage, name, bio, email, phone_number: phoneNumber,
      });
      debugger;
      if (status === 200) {
        this.setState({ isLoading: false });
        debugger;
        this.props.updateUser(json);
        debugger;
        DeviceEventEmitter.emit('updatedProfile', { id });
        DeviceEventEmitter.emit('postCreated');
        
        debugger;
        const { goBack } = this.props.navigation;
        goBack();
      } else {
        this.setState({ isLoading: false });

        Alert.alert('Update user failed!', 'Unable to update user information!');
      }
    } catch (error) {
      this.setState({ isLoading: false });

      Alert.alert('Update user failed!', `Unable to update user information. ${error}`);
    }
  }

  takeAndUploadPhotoAsync = async () => {
    const result = await ImagePicker.launchCameraAsync({
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
        this.setState({ profileImage: response.body.postResponse.location });
      } else {
        Alert.alert('Failed to upload picture.');
      }
    });
  }

  render() {
    const { goBack } = this.props.navigation;
    const {
      profileImage, name, bio, email, phoneNumber,
    } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{ flex: 1 }}>
          <Header
            headerLeft={() => (
              <TouchableOpacity onPress={() => goBack()}>
                <Text style={styles.headerButton}>Cancel</Text>
              </TouchableOpacity>
            )}
            title="Edit Profile"
            headerRight={() => (
              <TouchableOpacity onPress={() => this.pushUser()}>
                <Text style={styles.headerButton}>Done</Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.border} />

          <ScrollView style={styles.scrollView}>
            <View style={styles.publicProfile}>
              <View style={styles.profilePictureContainer}>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: profileImage }}
                />
                
                <TouchableOpacity onPress={() => this.takeAndUploadPhotoAsync()}>
                  <Text style={styles.changePhotoButton}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <CaptionTextInput
                style={{ marginBottom: 12 }}
                caption="Name"
                onChangeText={text => this.setState({ name: text })}
                value={name}
              />
              
              <CaptionTextInput
                style={{ marginBottom: 12 }}
                caption="Bio"
                onChangeText={text => this.setState({ bio: text })}
                value={bio}
              />
            </View>

            <Text style={styles.privateProfileHeader}>PRIVATE INFORMATION</Text>

            <View style={styles.privateProfile}>
              <CaptionTextInput
                style={{ marginBottom: 12 }}
                caption="Email"
                onChangeText={text => this.setState({ email: text })}
                value={email}
              />

              <CaptionTextInput
                style={{ marginBottom: 12 }}
                caption="Phone"
                onChangeText={text => this.setState({ phoneNumber: text })}
                value={phoneNumber || ''}
              />
            </View>
          </ScrollView>

          <LoadingModal visible={this.state.isLoading} />
        </View>
      </SafeAreaView>
    );
  }
}

EditProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
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
  border: {
    height: 1,
    backgroundColor: '#DADADA',
  },
  scrollView: {
    flexDirection: 'column',
  },
  publicProfile: {
    paddingTop: 18,
    backgroundColor: '#FFF',
  },
  profilePictureContainer: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    marginBottom: 10,
    height: 144,
    width: 144,
    borderRadius: 72,
    resizeMode: 'cover',
  },
  changePhotoButton: {
    color: '#33B5E5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  privateProfileHeader: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 18,
    paddingBottom: 10,
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
  },
  privateProfile: {
    paddingTop: 18,
    backgroundColor: '#FFF',
  },
});

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
