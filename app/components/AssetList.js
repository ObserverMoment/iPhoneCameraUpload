import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import { deleteAsset } from '../api';

export default class AssetList extends Component {
  render() {
    const { assets, editMode } = this.props;
    return (
      <View style={styles.container}>
        {
          assets && assets.map(asset => (
            <View key={asset.id}>
              <Text>Asset ID: {asset.id}</Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: `https://inventure-api-staging.herokuapp.com${asset.url}`}}
              />
              {editMode && <Text onPress={() => deleteAsset(asset.id)}>Delete</Text>}
            </View>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
