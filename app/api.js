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

export const createConcept = async (innovationId, attrsToCreate, onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    const newConcept = new Concept();
    for ( const key of Object.keys(attrsToCreate) ) {
      newConcept[key] = attrsToCreate[key];
    }
    newConcept.innovationId = innovationId;
    await newConcept.save();

    if (attrsToCreate.assetsToLink) {
      await linkAssets(newConcept.id, 'Concept', 'canvases', attrsToCreate.assetsToLink)
    }

    onSuccess && onSuccess();
  }
  catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

// First param is the partner Id
export const getInnovationAssets = async (id, onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    const { data } = await Attachment.where({ record_id: id }).all();
    onSuccess(data);
  } catch (err) {
    console.log(err);
    onFail && onFail();
  }
}

export const uploadAsset = async (assetType, parentId, parentType, asset, onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    const newAsset = new Attachment({
      data: asset.base64,
      filename: asset.uri,
      name: assetType,
      recordId: parentId,
      recordType: parentType,
    });
    await newAsset.save()

    onSuccess();
  } catch (err) {
    console.log(err);
    onFail && onFail()
  }
}

// Link already attached assets - uses the same data blob and file but makes a new attachment on the back end.
export const linkAssets = async (parentId, parentType, assetType, assetsToLink, onSuccess=null, onFail=null) => {
  try {
    await buildHeader();
    for (const asset of assetsToLink) {
      const newAttachment = new Attachment({
        blobId: asset.blobId.toString(), // API was throwing error blob_id should be a string, not sure why. Strong params states it as an integer.
        name: assetType,
        recordId: parentId,
        recordType: parentType,
      });
      await newAttachment.save();
      // TODO: Investigate why the title will not get saved on create action when passed to the new attachment constructor.
      if (asset.title) {
        newAttachment.title = asset.title;
        await newAttachment.save();
      }
    }
    onSuccess && onSuccess();
  } catch (err) {
    console.log(err);
    dispatch({ type: parentType === 'innovation' ? UPLOAD_ASSET_ERROR : ADD_CONCEPT_CANVAS_ERROR });
    onFail && onFail();
  }
}
