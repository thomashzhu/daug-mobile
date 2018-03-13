import React from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const LoadingIndicator = props => (
  <Modal
    animationType="fade"
    transparent
    visible={props.visible}
    onRequestClose={() => {}}
  >
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  </Modal>
);

LoadingIndicator.propTypes = {
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
