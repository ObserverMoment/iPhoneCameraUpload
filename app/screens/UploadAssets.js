import React, { Component, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, CameraRoll, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';

import ImageViewer from '../components/ImageViewer';
import CameraButton from '../components/CameraButton';
import Loader from '../components/Loader';
import Button from '../components/Button';
import StyledText from '../components/StyledText';

import { colors } from '../assets/styles/variables';

import { uploadAsset } from '../api';

export default class UploadAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPhoto: null,
      message: null,
      isProcessing: false,
    }
  }

  saveToDb = () => {
    const { innovationId } = this.props.navigation.state.params;
    this.setState({ isProcessing: true });
    uploadAsset('canvases', innovationId, 'Innovation', this.state.newPhoto, this.confirmUpload, this.alertFailedUpload);
  }

  confirmUpload = () => {
    this.setState({ newPhoto: null, isProcessing: false, message: 'Assets saved' });
    setTimeout(() => this.setState({ message: null}), 3000);
  }

  alertFailedUpload = () => {
    this.setState({ isProcessing: false, message: 'Upload Failed' });
    setTimeout(() => this.setState({ message: 'null'}), 4000);
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const imageCapture = await this.camera.takePictureAsync(options)
      this.setState({ newPhoto: imageCapture });
    }
  }

  accessCameraRoll = () => {
    CameraRoll.getPhotos({ first: 10 }).then(photos => {
      console.log(photos);
    }).catch(err => console.log(err))
  }

  handleCancel = () => {
    const { innovationId, name } = this.props.navigation.state.params;
    this.setState({ newPhoto: null });
    this.props.navigation.navigate(
      'InnovationOverview',
      { innovationId, name }
    );
  }

  render() {
    const { newPhoto, message, isProcessing } = this.state;

    return (
      <View style={styles.container}>
        {newPhoto
          ? (
            <ImageViewer
              confirmLabel="Save"
              onConfirm={this.saveToDb}
              confirmButtonType="textSmall"
              cancelLabel="Re-Take"
              onCancel={() => this.setState({ newPhoto: null })}
              cancelButtonType="textSmall"
              uri={newPhoto.uri}
            />
          )
          : (
            <Fragment>
              <View style={styles.viewWindowContainer}>
                {!isProcessing
                  ? (
                    <RNCamera
                        ref={ref => {
                          this.camera = ref;
                        }}
                        style = {styles.viewWindow}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                          console.log(barcodes)
                        }}
                    />
                  )
                  : <Loader />
                }
              </View>

              <View style={styles.userActions}>
                <Button title="Library" type="textSmall" onPress={this.accessCameraRoll}/>
                <CameraButton onPress={this.takePicture}/>
                <Button title="Close" type="textSmall" onPress={() => this.handleCancel()}/>
              </View>
            </Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewWindowContainer: {
    flex: 1
  },
  viewWindow: {
    flex: 1,
    alignItems: 'center',
  },
  userActions: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.appBackground,
    flex: 0.15,
    flexDirection: 'row',
  },
});
