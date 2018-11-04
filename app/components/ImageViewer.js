import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOPacity } from 'react-native';

import StyledText from './StyledText';
import Button from './Button';

const ImageViewer = ({ cancelLabel, onCancel, cancelButtonType, confirmLabel, onConfirm, confirmButtonType, source, title, hasConfirm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button title={cancelLabel} type={cancelButtonType} onPress={onCancel} />
        {hasConfirm &&
          <Button title={confirmLabel} type={confirmButtonType} onPress={onConfirm} />
        }
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={source} />
        {/* {title && <StyledText style={styles.title}>{title}</StyledText>} */}
      </View>
    </View>
  )
}

export default ImageViewer;

const styles = StyleSheet.create({
  container: {

  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    padding: 10,
    margin: 10,
  },
  image: {
    height: 300,
  },
  title: {
    textAlign: 'center',
  }
})

ImageViewer.propTypes = {
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmButtonType: PropTypes.string,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  cancelButtonType: PropTypes.string,
  source: PropTypes.object.isRequired,
  hasConfirm: PropTypes.bool,
  title: PropTypes.string,
}

ImageViewer.defaultProps = {
  confirmLabel: 'Confirm',
  confirmButtonType: 'textSmall',
  cancelLabel: 'Close',
  cancelButtonType: 'textSmall',
  hasConfirm: false,
  title: '',
}
