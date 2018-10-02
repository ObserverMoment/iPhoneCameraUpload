import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, CameraRoll, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';

import CameraButton from '../components/CameraButton';
import Button from '../components/Button';
import StyledText from '../components/StyledText';

import { colors, fonts } from '../assets/styles/variables';

import { saveAssetsTodb } from '../api';

export default class UploadAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      videos: [], // TODO.
      message: null
    }
  }

  // TODO: Once back end is updated these need to be saved onto an innovation, not a concept.
  // NOTE: Set up for testing only. Please use Innovation: 'Poker' and concept 'WeSellPokerTables = ID 54' (hard coded below)
  saveToDb = async (conceptId) => {
    console.log('save to db');
    const newPhotos = [ ...this.state.photos ];
    const newVideos = [ ...this.state.videos ];
    saveAssetsTodb(54, newPhotos, newVideos, this.confirmUpload, this.alertFailedUpload);
  }

  confirmUpload = () => {
    console.log('confirmUpload');
    this.setState({ photos: [], videos: [], message: 'Assets saved' });
    setTimeout(() => this.setState({ message: null}), 3000);
  }

  alertFailedUpload = () => {
    console.log('alertFailedUpload');
    this.setState({ message: 'Upload Failed' });
    setTimeout(() => this.setState({ message: 'null'}), 4000);
  }

  removeNewPhoto = (index) => {
    this.setState({ photos: [ ...this.state.photos.slice(0,index), ...this.state.photos.slice(index+1) ] });
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      this.setState({ photos: [ ...this.state.photos, data ]})
    }
  }

  accessCameraRoll = () => {
    CameraRoll.getPhotos({ first: 10 }).then(photos => {
      console.log(photos);
    }).catch(err => console.log(err))
  }

  handleCancel = () => {
    const { partnerId, innovationId, name } = this.props.navigation.state.params;
    this.setState({ photos: [], videos: [] });
    this.props.navigation.navigate(
      'InnovationAssets',
      { partnerId, innovationId, name }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagePreviews}>
          {this.state.photos.map((photo, index) => (
            <TouchableOpacity key={photo.uri} onPress={() => this.removeNewPhoto(index)}>
              <Image style={styles.previewImage} source={{ uri: photo.uri }} />
              <View style={styles.iconContainer}>
                <Icon name='remove-circle' type='ion-icon' color={colors.warningTone} size={18} />
              </View>
            </TouchableOpacity>
          ))}
          {this.state.message &&
            <View style={styles.messageContainer}>
              <StyledText style={styles.message}>{this.state.message}</StyledText>
            </View>
          }
        </View>

        <View style={styles.viewWindowContainer}>

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
        </View>

        <View style={styles.userActions}>
          <CameraButton onPress={this.takePicture}/>
          {/* <Button title="Library" type="primary" onPress={this.accessCameraRoll}/> */}
        </View>

        <View style={styles.userButtons}>
          <Button title="Save" type="primary" onPress={() => this.saveToDb()}/>
          <Button title="Close" type="primary" onPress={() => this.handleCancel()}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreviews: {
    flexDirection: 'row',
    backgroundColor: colors.lightBackground,
    flex: 0.15,
  },
  previewImage: {
    width: 55,
    height: 55,
    padding: 4,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  messageContainer: {
    backgroundColor: colors.secondaryTone,
    alignSelf: 'flex-end'
  },
  message: {
    textAlign: 'center',
    color: colors.primaryText,
    fontSize: fonts.h3,
  },
  viewWindowContainer: {
    flex: 1
  },
  viewWindow: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.appBackground,
  },
  userActions: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.appBackground,
    flex: 0.3
  },
  userButtons: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primaryText
  }
});
