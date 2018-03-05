import React from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { DangerZone } from 'expo';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

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
      screen: null,
      animations: [],
    };
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

  render() {
    const { screen } = this.state;

    if (screen === 'LoginScreen') {
      return <LoginScreen />;
    } else if (screen === 'SignUpScreen') {
      return <SignUpScreen />;
    }

    return (
      <View style={styles.container}>
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
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ED8271',
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
  buttonRow: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#FD746C',
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
    color: 'white',
    fontSize: 18,
  },
};

export default IntroScreen;
