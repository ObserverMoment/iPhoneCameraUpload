import {
  ApplicationRecord,
  User,
  Role,
  Session,
  Reset,
  Partner,
  Innovation,
  Concept,
  Attachment
} from './models';

import { AsyncStorage } from 'react-native';

export const signIn = async (email, password, onSuccess) => {
  try {
    const session = new Session({ email: email, password: password });
    const success = await session.save();
    if (success) {
      await AsyncStorage.setItem('inventure-auth', JSON.stringify({ token: session.token }));
      onSuccess()
    } else {
      throw session.errors.base.fullMessage;
    }
  } catch (err) {
    console.log(err);
  }
}

export const signOut = async (onSuccess) => {
  await AsyncStorage.removeItem('inventure-auth');
  onSuccess()
}

export const getInnovations = async (onSuccess) => {
  try {
    const auth = await AsyncStorage.getItem('inventure-auth');
    // Setting the .jwt attribute triggers the static generateAuthHeader function.
    ApplicationRecord.jwt = auth;
    const { data } = await Partner.includes('innovation')
                                  .select([ 'name', 'charge_code' ])
                                  .all();
    onSuccess(data);
  } catch (err) {
    console.log(err);
  }
}

// First param is the partner Id
export const getInnovationAssets = async (id, onSuccess) => {
  try {
    const auth = await AsyncStorage.getItem('inventure-auth');
    // Setting the .jwt attribute triggers the static generateAuthHeader function.
    ApplicationRecord.jwt = auth;
    const { data } = await Partner.includes({ innovation: { concepts: [ 'canvases_attachments' ] } }).find(id);
    onSuccess(data);
  } catch (err) {
    console.log(err);
  }
}

export const saveAssetsTodb = async (conceptId, newPhotos, newVideos, onSuccess, onFail) => {
  try {
    for (const photo of newPhotos) {
      const newAsset = new Attachment({
        data: photo.base64,
        filename: photo.uri,
        name: 'canvases',
        recordId: conceptId,
        recordType: 'Concept'
      });
      await newAsset.save()
    }

    for (const video of newVideos) {
      console.log('video', video);
    }
    onSuccess();
  } catch (err) {
    console.log(err);
    onFail()
  }
}

export const deleteAsset = async (assetId) => {
  console.log('deleting asset', assetId);
  try {
    const asset = (await Attachment.find(assetId)).data;
    console.log('asset', asset);
    const success = await asset.destroy();
    console.log('success', success);
  } catch (err) {
    console.log(err);
  }
}
