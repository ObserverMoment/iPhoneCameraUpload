import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOPacity, Dimensions } from 'react-native';

import StyledText from './StyledText';
import Button from './Button';

import { colors } from '../assets/styles/variables';

class ImageViewer extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
      screenWidth: 0,
    }
  }

  componentDidMount = () => {
    const { source } = this.props;
    const screenWidth = Dimensions.get('window').width - 50;
    Image.getSize(source, (width, height) => this.setState({ width, height, screenWidth }));
  }

  render() {
    const { width, height, screenWidth } = this.state;
    const { cancelLabel, onCancel, cancelButtonType, confirmLabel, onConfirm, confirmButtonType, source, title, hasConfirm } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.actions}>
          <Button title={cancelLabel} type={cancelButtonType} onPress={onCancel} />
          {hasConfirm &&
            <Button title={confirmLabel} type={confirmButtonType} onPress={onConfirm} />
          }
        </View>
        <View style={styles.imageContainer}>
          <View>
            <Image style={{ height: (screenWidth/width) * height, width: screenWidth }} source={source} />
          </View>
          <View>
            {title && <StyledText style={styles.title} text={title} />}
          </View>
        </View>
      </View>
    )
  }
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
  title: null,
}
