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

const buildHeader = async () => {
  const auth = await AsyncStorage.getItem('inventure-auth');
  // Setting the .jwt attribute triggers the static generateAuthHeader function.
  ApplicationRecord.jwt = auth;
}

export const signIn = async (email, password, onSuccess=null, onFail=null) => {
  try {
    const session = new Session({ email: email, password: password });
    const success = await session.save();
    if (success) {
      await AsyncStorage.setItem('inventure-auth', JSON.stringify({ token: session.token }));
      onSuccess && onSuccess()
    } else {
      throw session.errors.base.fullMessage;
    }
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

export const signOut = async (onSuccess=null) => {
  await AsyncStorage.removeItem('inventure-auth');
  onSuccess && onSuccess()
}

export const getInnovations = async (onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    const { data } = await Innovation.includes([ 'key_dates' ]).all();
    onSuccess && onSuccess(data);
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

// First param is the partner Id
export const getInnovationAssets = async (id, onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    const { data } = await Attachment.where({ record_id: id }).all();
    console.log('Get assets', data);
    onSuccess(data);
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

// export const getInnovationConcepts = async (id, onSuccess=null, onFail=null) => {
//   try {
//     buildHeader();
//   } catch (err) {
//     console.log(err);
//     onFail && onFail();
//   }
// }

export const uploadAsset = async (assetType, parentId, parentType, asset, onSuccess=null, onFail=null) => {
  try {
    console.log(asset);
    await buildHeader();
    const newAsset = new Attachment({
      data: asset.base64,
      filename: asset.uri,
      name: assetType,
      recordId: parentId,
      recordType: parentType,
    });
    console.log(newAsset);
    await newAsset.save()

    onSuccess();
  } catch (err) {
    console.log(err);
    onFail && onFail()
  }
}

export const editAsset = (assetId, updatedAssetAttrs, onSuccess=null, onFail=null) => async dispatch => {
  try {
    await buildHeader();
    const assetToUpdate = (await Attachment.find(assetId)).data;
    for (const key of Object.keys(updatedAssetAttrs)) {
      assetToUpdate[key] = updatedAssetAttrs[key];
    }
    await assetToUpdate.save();

    onSuccess && onSuccess();
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

export const deleteAsset = async (assetId, onSuccess=null, onFail=null) => {
  console.log('deleting asset', assetId);
  try {
    await buildHeader();
    const asset = (await Attachment.find(assetId)).data;
    console.log('asset', asset);
    const success = await asset.destroy();
    console.log('success', success);
    onSuccess && onSuccess();
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}
