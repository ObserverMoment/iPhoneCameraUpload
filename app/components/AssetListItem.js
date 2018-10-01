import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class AssetListItem extends Component {
  render() {
    const { asset, editMode } = this.props;
    return (
      <View>
        <Text>Asset ID: {asset.id}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: `https://inventure-api-staging.herokuapp.com${asset.url}`}}
        />
        {editMode && <Text>Delete</Text>}
      </View>
    )
  }
}
