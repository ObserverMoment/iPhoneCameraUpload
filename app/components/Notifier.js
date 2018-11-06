import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledText from './StyledText';

const Notifier = () => (
  <View style={styles.container}>
    <StyledText text="Something has happened probably" />
  </View>
)

export default Notifier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
