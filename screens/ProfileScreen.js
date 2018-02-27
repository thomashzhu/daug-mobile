import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const posts = require('../data/posts');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
    };
  }

  render() {
    const { index } = this.state;
    const item = posts[index];

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerImage} source={{ uri: item.post.image }} />
        </View>

        <View style={styles.profilePanel}>
          <View style={styles.topPanel}>
            <View style={styles.profilePictureContainer}>
              <Image style={styles.profilePicture} source={{ uri: item.post.image }} />
            </View>

            <View style={styles.statusPanel}>
              <View style={styles.topStatusPanelRow}>
                <Text style={styles.stats}>1{'\n'}Posts</Text>
                <Text style={styles.stats}>281{'\n'}Followers</Text>
                <Text style={styles.stats}>124{'\n'}Following</Text>
              </View>

              <View style={styles.bottomStatusPanelRow}>
                <TouchableOpacity>
                  <View style={styles.editProfileButtonContainer}>
                    <Text style={styles.editProfileButton}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomPanel}>
            <Text style={styles.petName}>Roxie</Text>
            <Text style={styles.petDescription}>{item.name}{'\''}s dear dear friend...</Text>
          </View>
        </View>

        <View style={styles.border} />
        
        <ScrollView style={styles.personalFeeds} />
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  index: PropTypes.number.isRequired,
};

const styles = {
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  headerImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  profilePanel: {
    height: 200,
  },
  topPanel: {
    height: 110,
    flexDirection: 'row',
  },
  profilePictureContainer: {
    height: 110,
    width: 110,
    padding: 10,
  },
  profilePicture: {
    resizeMode: 'cover',
    height: 90,
    width: 90,
    borderRadius: 45,
    marginTop: -40,
  },
  statusPanel: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  topStatusPanelRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomStatusPanelRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButtonContainer: {
    marginTop: 8,
    height: 32,
    width: 190,
    borderRadius: 8,
    borderColor: '#DADADA',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButton: {
    fontWeight: 'bold',
  },
  bottomPanel: {
    padding: 16,
    height: 100,
    justifyContent: 'center',
  },
  petName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
  },
  petDescription: {
    flex: 1,
    fontWeight: 'bold',
  },
  border: {
    height: 1,
    backgroundColor: '#DADADA',
  },
  personalFeeds: {
    flex: 1,
  },
};

export default ProfileScreen;
