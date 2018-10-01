import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import AssetListItem from './AssetListItem'

export default class AssetList extends Component {
  render() {
    const { assets, editMode } = this.props;
    return (
      <View style={styles.container}>
        {
          assets && assets.map(asset => (
            <AssetListItem key={asset.id} asset={asset} editMode={editMode}/>
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
