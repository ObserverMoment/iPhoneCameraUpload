import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, fonts } from '../assets/styles/variables';

const StyledText = ({ style, text }) => (
  <Text style={[ styles.text, style ]}>{text}</Text>
)

export default StyledText;

const styles = StyleSheet.create({
  text: {
    fontSize: fonts.appFontSize,
    color: colors.primaryText,
    fontFamily: 'MarkOT'
  }
});
