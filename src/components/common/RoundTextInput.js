import React from 'react';
import { Dimensions, KeyboardAvoidingView, View, TextInput } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const textInputHeight = 48;

const RoundTextInput = props => (
  <KeyboardAvoidingView style={styles.textInputContainer}>
    <View style={styles.iconContainer}>
      <SimpleLineIcons
        name={props.iconName}
        color="white"
        size={textInputHeight / 2}
      />
    </View>
    <TextInput
      style={styles.textInput}
      secureTextEntry={props.isPassword}
      placeholder={props.placeholder}
      placeholderTextColor="white"
      underlineColorAndroid="rgba(0,0,0,0)"
      onChangeText={(text) => { props.textDidChange(text); }}
    />
  </KeyboardAvoidingView>
);

RoundTextInput.propTypes = {
  iconName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  textDidChange: PropTypes.func,
};

RoundTextInput.defaultProps = {
  isPassword: false,
  textDidChange: () => {},
};

const styles = {
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.7,
    height: textInputHeight,
    borderRadius: textInputHeight / 2,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    paddingRight: textInputHeight / 2,
    justifyContent: 'center',
  },
  iconContainer: {
    height: textInputHeight - 2,
    width: textInputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 4,
    color: 'white',
  },
};

export default RoundTextInput;
