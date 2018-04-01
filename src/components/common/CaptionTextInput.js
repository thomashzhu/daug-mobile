import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const CaptionTextInput = (props) => {
  const {
    caption, onChangeText, onSubmitEditing, placeholder, value,
  } = props;

  return (
    <View {...props} style={styles.container}>
      <Text style={styles.caption}>{caption}</Text>

      <TextInput
        style={styles.textInput}
        underlineColorAndroid="rgba(0,0,0,0)"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        value={value}
      />

      <View style={styles.border} />
    </View>
  );
};

CaptionTextInput.propTypes = {
  caption: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

CaptionTextInput.defaultProps = {
  onSubmitEditing: () => {},
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    height: 56,
    backgroundColor: '#FFF',
  },
  caption: {
    color: '#555',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  border: {
    height: 1,
    backgroundColor: '#DADADA',
  },
});

export default CaptionTextInput;
