import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';
import { Icon } from 'react-native-elements';

const CameraButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon
        name='camera'
        type='ion-icon'
        size={90}
        color={colors.primaryTone}
      />
    </View>
    <Icon />
  </TouchableOpacity>
);

export default CameraButton;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 20
  }
});
