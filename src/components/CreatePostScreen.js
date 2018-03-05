import React from 'react';
import { StyleSheet, SafeAreaView, Platform, NativeModules, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import Header from './common/Header';

const CreatePostScreen = (props) => {
  const { goBack } = props.navigation;

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
          <TouchableOpacity onPress={() => goBack()}>
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
          underlineColorAndroid="rgba(0,0,0,0)"
        />
      </View>
    </SafeAreaView>
  );
};

CreatePostScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
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
