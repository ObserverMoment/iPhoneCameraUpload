import React from 'react';
import { StyleSheet, View, Image, TouchableOPacity, Text } from 'react-native';

import Button from './Button';

const ImageViewer = ({ confirmLabel, onConfirm, confirmButtonType, cancelLabel, onCancel, cancelButtonType, uri }) => {
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button title={cancelLabel} type={cancelButtonType} onPress={onCancel} />
        <Button title={confirmLabel} type={confirmButtonType} onPress={onConfirm} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri }} />
      </View>
    </View>
  )
}

export default ImageViewer;

const styles = StyleSheet.create({
  container: {

  },
  actions: {

  },
  imageContainer: {

  }
})
