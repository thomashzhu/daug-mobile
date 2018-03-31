import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, View, TextInput, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const textInputHeight = 48;

class RoundTextInput extends Component {
  renderError = (error) => {
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return null;
  };

  render = () => {
    const {
      error, iconName, isPassword, placeholder, textDidChange,
    } = this.props;

    const height = textInputHeight + (error ? 26 : 0);
    const marginBottom = (error ? 8 : 20);

    return (
      <KeyboardAvoidingView style={{ height, marginBottom }}>
        <View style={styles.textInputContainer}>
          <View style={styles.iconContainer}>
            <SimpleLineIcons
              name={iconName}
              color="white"
              size={textInputHeight / 2}
            />
          </View>
          <TextInput
            style={styles.textInput}
            secureTextEntry={isPassword}
            placeholder={placeholder}
            placeholderTextColor="white"
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => textDidChange(text)}
            autoCorrect={false}
          />
        </View>
        
        {this.renderError(error)}
      </KeyboardAvoidingView>
    );
  };
}

RoundTextInput.propTypes = {
  iconName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  textDidChange: PropTypes.func,
  error: PropTypes.string,
};

RoundTextInput.defaultProps = {
  error: '',
};

RoundTextInput.defaultProps = {
  isPassword: false,
  textDidChange: () => {},
};

const styles = {
  container: {
    marginBottom: 20,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.7,
    height: textInputHeight,
    borderRadius: textInputHeight / 2,
    borderWidth: 1,
    borderColor: 'white',
    paddingRight: textInputHeight / 2,
    justifyContent: 'center',
  },
  iconContainer: {
    height: textInputHeight,
    width: textInputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 4,
    color: 'white',
  },
  error: {
    marginTop: 8,
    paddingLeft: textInputHeight / 2,
    height: 18,
    color: 'white',
    fontSize: 12,
    alignItems: 'center',
  },
};

export default RoundTextInput;
