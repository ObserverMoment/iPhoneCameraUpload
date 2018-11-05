import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';
import { Icon } from 'react-native-elements';

const CameraButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon
        name='add-circle'
        type='ion-icon'
        size={50}
        color={colors.coolBlue1}
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
