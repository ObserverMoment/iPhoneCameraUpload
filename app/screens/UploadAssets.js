import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, CameraRoll } from 'react-native';
import { RNCamera } from 'react-native-camera';

import CameraButton from '../components/CameraButton';
import StyledText from '../components/StyledText';
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
  // NOTE: Set up for testing only. Please use Innovation: 'Where Can We Go' and concept 'Test Uploading Mobile App = ID 149' (hard coded below)
  saveToDb = async (conceptId) => {
    const newPhotos = [ ...this.state.photos ];
    const newVideos = [ ...this.state.videos ];
    saveAssetsTodb(149, newPhotos, newVideos, this.confirmUpload, this.alertFailedUpload);
  }

  confirmUpload = () => {
    this.setState({ photos: [], videos: [], message: 'Assets saved' });
    setTimeout(() => this.setState({ message: null}), 4000);
  }

  alertFailedUpload = () => {
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
            <View key={photo.uri}>
              <Image style={{ width: 40, height: 40, margin: 4 }} source={{ uri: photo.uri }} />
              <Text onPress={() => this.removeNewPhoto(index)}>Delete</Text>
            </View>
          ))}
        </View>
        <View style={{flex: 0.7}}>
          {
            <Text style={{color: 'black'}}>{this.state.message}</Text>
          }
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes)
              }}
          />
        </View>

        <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white'}}>
          <TouchableOpacity
              onPress={this.takePicture}
              style = {styles.capture}
          >
          </TouchableOpacity>
          <TouchableOpacity
              onPress={this.accessCameraRoll}
              style = {styles.userAction}
          >
            <Text style={{fontSize: 14, color: 'white'}}>Library</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white'}}>

        <TouchableOpacity
            onPress={() => this.saveToDb()}
            style={styles.userAction}
        >
            <Text style={{fontSize: 14, color: 'white'}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.handleCancel()}
            style={styles.userAction}
        >
            <Text style={{fontSize: 14, color: 'white'}}>Cancel</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imagePreviews: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 0.1,
    marginTop: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
  userAction: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
    backgroundColor: 'black',
    flex: 0.3
  }
});
