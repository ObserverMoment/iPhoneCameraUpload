import React, { Component, Fragment } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import StyledText from './StyledText';
import { colors } from '../assets/styles/variables';
import { deleteAsset } from '../api';
import { apiConfig } from '../config';

export default class AssetSelector extends Component {
  render() {
    const { assets, selectedAssetIds, updateSelected } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          {assets && assets.map(asset => (
            <TouchableOpacity key={asset.id} onPress={() => updateSelected(asset.id)}>
              <View style={selectedAssetIds.includes(asset.id) ? [ styles.asset,  styles.selected ] : styles.asset}>
                  <Image
                    style={styles.image}
                    source={{ uri: `${apiConfig.apiDomain}${asset.url}`}}
                  />
                  {asset.title &&
                    <StyledText
                      style={styles.assetTitle}
                      text={asset.title.length > 20 ? asset.title.slice(0,20) : asset.title }
                    />
                  }
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 5,
    marginBottom: 10,
  },
  asset: {
    padding: 5,
    borderColor: 'transparent',
    borderWidth: 1,
    margin: 3,
  },
  selected: {
    borderColor: colors.coolBlue2,
  },
  assetTitle: {
    fontSize: 12,
    padding: 2,
    maxWidth: 90,
  },
  image: {
    minWidth: 130,
    minHeight: 130,
    maxWidth: 150,
    maxHeight: 150,
  },
})
