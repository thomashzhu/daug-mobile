import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const CaptionTextInput = (props) => {
  const { caption, onChangeText, value } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>{caption}</Text>

      <TextInput
        style={styles.textInput}
        underlineColorAndroid="rgba(0,0,0,0)"
        onChangeText={onChangeText}
        value={value}
      />

      <View style={styles.border} />
    </View>
  );
};

CaptionTextInput.propTypes = {
  caption: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    height: 60,
    marginBottom: 12,
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
