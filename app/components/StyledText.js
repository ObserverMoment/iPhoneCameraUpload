import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, fonts } from '../assets/styles/variables';

const StyledText = ({ style, children }) => (
  <Text style={[ styles.text, style ]}>{children}</Text>
)

export default StyledText;

const styles = StyleSheet.create({
  text: {
    fontSize: fonts.sppFontSize,
    color: colors.primaryText,
    fontFamily: 'MarkOT'
  }
});
