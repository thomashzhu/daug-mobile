import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, Alert, ScrollView, TouchableOpacity, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUser } from '../actions';

import Header from './common/Header';
import CaptionTextInput from './common/CaptionTextInput';
import LoadingModal from './common/LoadingModal';

const fetch = require('node-fetch');

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    const {
      profile_image: profileImage, name, bio, email,
    } = this.props.loggedInUser;

    this.state = {
      profileImage,
      name,
      bio: (bio === 'null' || !bio ? '' : bio),
      email,
      isLoading: false,
    };
  }

  pushUser = async () => {
    this.setState({ isLoading: true });

    const { id } = this.props.loggedInUser;
    const {
      profileImage, name, bio, email,
    } = this.state;
    const details = {
      profile_image: profileImage, name, bio, email,
    };

    let formBody = [];

    for (var property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join('&');

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      });

      const responseJSON = await response.json();

      if (response.status === 200) {
        this.setState({ isLoading: false });

        this.props.updateUser(responseJSON);
        const { goBack } = this.props.navigation;
        goBack();
      } else {
        this.setState({ isLoading: false });

        const error = responseJSON.message;
        Alert.alert('Update user failed!', `Unable to update user information. ${error}!`);
      }
    } catch (error) {
      this.setState({ isLoading: false });

      Alert.alert('Update user failed!', 'Unable to update user information. Please try again later');
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    const {
      profileImage, name, bio, email,
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
                
                <TouchableOpacity>
                  <Text style={styles.changePhotoButton}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <CaptionTextInput
                caption="Name"
                onChangeText={text => this.setState({ name: text })}
                value={name}
              />
              
              <CaptionTextInput
                caption="Bio"
                onChangeText={text => this.setState({ bio: text })}
                value={bio}
              />
            </View>

            <Text style={styles.privateProfileHeader}>PRIVATE INFORMATION</Text>

            <View style={styles.privateProfile}>
              <CaptionTextInput
                caption="Email"
                onChangeText={text => this.setState({ email: text })}
                value={email}
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
    profile_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
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
