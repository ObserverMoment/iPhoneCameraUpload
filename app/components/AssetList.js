import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { Icon } from 'react-native-elements';

import Card from './Card';
import StyledText from './StyledText';

import { colors } from '../assets/styles/variables';

import { deleteAsset } from '../api';

export default class AssetList extends Component {
  render() {
    const { assets, editMode } = this.props;
    return (
      <View style={styles.container}>
        {
          assets && assets.map(asset => (
            <Card key={asset.id}>
              <View>
                <StyledText style={styles.assetId}>Asset {asset.id}</StyledText>
                <Image
                  style={styles.image}
                  source={{ uri: `https://inventure-api-staging.herokuapp.com${asset.url}`}}
                />
                {editMode && <View style={styles.iconContainer}>
                                <Icon
                                  name='remove-circle'
                                  type='ion-icon'
                                  color={colors.warningTone}
                                  size={18}
                                />
                            </View>
                }
              </View>

            </Card>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  assetId: {
    padding: 2
  },
  image: {
    width: 95,
    height: 95,
  },
  iconContainer: {
    padding: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent'
  }
})
