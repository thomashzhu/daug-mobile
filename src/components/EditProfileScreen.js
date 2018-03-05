import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, ScrollView, TouchableOpacity, Text, View, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Header from './common/Header';
import CaptionTextInput from './common/CaptionTextInput';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    const { name, image, bio } = props.navigation.state.params.item.user;

    this.state = {
      name,
      image,
      bio,
      email: 'charlie@doggo.com',
    };
  }
  render() {
    const { goBack } = this.props.navigation;
    const { name, image, bio } = this.state;

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
              <TouchableOpacity onPress={() => goBack()}>
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
                  source={{ uri: image }}
                />
                
                <TouchableOpacity>
                  <Text style={styles.changePhotoButton}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <CaptionTextInput
                caption="Name"
                onChangeText={({ text }) => this.setState({ name: text })}
                value={this.state.name}
              />
              
              <CaptionTextInput
                caption="Bio"
                onChangeText={({ text }) => this.setState({ bio: text })}
                value={this.state.bio}
              />
            </View>

            <Text style={styles.privateProfileHeader}>PRIVATE INFORMATION</Text>

            <View style={styles.privateProfile}>
              <CaptionTextInput
                caption="Email"
                onChangeText={({ text }) => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

EditProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        item: PropTypes.shape({
          user: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
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

export default EditProfileScreen;
