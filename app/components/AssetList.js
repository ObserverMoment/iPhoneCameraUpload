import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { Icon } from 'react-native-elements';

import StyledText from './StyledText';
import { colors } from '../assets/styles/variables';
import { deleteAsset } from '../api';
import { apiConfig } from '../config';

export default class AssetList extends Component {
  render() {
    const { assets, editMode } = this.props;
    return (
      <View style={styles.container}>
        {
          assets && assets.map(asset => (
            <View key={asset.id}>
                <Image
                  style={styles.image}
                  source={{ uri: `${apiConfig.apiDomain}${asset.url}`}}
                />
                {asset.title &&
                  <StyledText style={styles.assetTitle}>
                    Asset {asset.title.length > 20 ? asset.title.slice(0,20) : asset.title }
                  </StyledText>
                }
                {editMode && (
                  <View style={styles.iconContainer}>
                    <Icon
                      name='remove-circle'
                      type='ion-icon'
                      color={colors.warningTone}
                      size={18}
                    />
                  </View>
                )}
            </View>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  assetTitle: {
    padding: 2,
    maxWidth: 90,
  },
  image: {
    width: 90,
    height: 90,
    maxWidth: 90,
    maxHeight: 90,
  },
  iconContainer: {
    padding: 0,
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent'
  }
})
