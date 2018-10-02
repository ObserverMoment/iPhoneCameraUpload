import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';

const AppContainer = ({ children }) => (
  <View style={styles.pageContainer}>{children}</View>
)

export default AppContainer;

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 22,
    flex: 1,
    backgroundColor: colors.appBackground,
    padding: 5
  }
})
