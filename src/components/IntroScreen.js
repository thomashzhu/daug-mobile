import React from 'react';
import { Dimensions, View, Text, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DangerZone, LinearGradient } from 'expo';
import PropTypes from 'prop-types';

const fetch = require('node-fetch');

const { width } = Dimensions.get('window');
const { Lottie } = DangerZone;
const sources = require('../assets/lotties/intro');

let isPlayed = false;

class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      animations: [],
    };
  }

  async componentDidMount() {
    this.pingServer();
  }

  pingServer = async () => {
    try {
      const response = await fetch('https://daug-app.herokuapp.com/api', {
        method: 'GET',
      });

      if (response.status !== 200) {
        Alert.alert('ERROR', 'Server request failed.');
      }
    } catch (error) {
      Alert.alert('ERROR', `Server is down ${error}`);
    }
  }

  playAnimation = (index) => {
    const animation = this.state.animations[index];
    animation.reset();
    animation.play();
  }

  renderSlide = ({ item, index }) => (
    <Lottie
      ref={(animation) => {
        this.state.animations[index] = animation;

        if (!isPlayed && this.state.animations[0]) {
          isPlayed = true;
          this.playAnimation(0);
        }
      }}
      style={{
        width: 400,
        height: 400,
      }}
      source={item}
    />
  );

  render = () => {
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient colors={['#fff', '#e2e7e9']} style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={sources}
              renderItem={this.renderSlide}
              sliderWidth={width}
              itemWidth={400}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              onSnapToItem={this.playAnimation}
            />
          </View>

          <Text style={styles.slogan}>{'"'}Daug... where pets hang out{'"'}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        
      }),
    }),
  }).isRequired,
};

const styles = {
  container: {
    flex: 1,
    // backgroundColor: '#F1F1F6',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    height: width,
  },
  carousel: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slogan: {
    color: '#B4B4D9',
    fontWeight: 'bold',
    fontSize: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#a29bfe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '200',
  },
};

export default IntroScreen;
