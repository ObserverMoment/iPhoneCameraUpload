import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';
import { Icon } from 'react-native-elements';

const CameraButton = ({ onPress }) => {
  <TouchableOpacity onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon
        name='circle-slice-8'
        type='material-community'
      />
    </View>
    <Icon />
  </TouchableOpacity>
}

export default CameraButton;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 20
  }
})
