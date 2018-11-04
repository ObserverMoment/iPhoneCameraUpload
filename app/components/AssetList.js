import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import ImageViewer from './ImageViewer';
import StyledText from './StyledText';
import Button from './Button';
import { colors } from '../assets/styles/variables';
import { deleteAsset } from '../api';
import { apiConfig } from '../config';

export default class AssetList extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      openViewer: false,
      assetToView: null,
    }
  }
  render() {
    const { openViewer, assetToView, editMode } = this.state;
    const { assets } = this.props;

    return (
      <View style={styles.container}>
        {!openViewer
          ? (
            <Fragment>
              <Button title={editMode ? 'Done' : 'Edit'} type='textSmall' onPress={() => this.setState({editMode: !editMode})} />
              <View style={styles.listContainer}>
                {assets && assets.map(asset => (
                  <TouchableOpacity key={asset.id} onPress={() => this.setState({ openViewer: true, assetToView: asset })}>
                    <View style={styles.asset}>
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
                          <View style={styles.iconsContainer}>
                            <View style={styles.icons}>
                              <View style={styles.icon}>
                                <Icon
                                  name='edit'
                                  color={colors.coolBlue1}
                                  size={22}
                                />
                              </View>
                              <View style={styles.icon}>
                                <Icon
                                  style={styles.icon}
                                  name='remove-circle'
                                  type='ion-icon'
                                  color={colors.warningTone}
                                  size={22}
                                />
                              </View>
                            </View>

                          </View>
                        )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Fragment>
          )
          : <ImageViewer
              onCancel={() => this.setState({ openViewer: false })}
              source={{ uri: `${apiConfig.apiDomain}${assetToView.url}`}}
              title={assetToView.title}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
  },
  asset: {
    padding: 5,
  },
  assetTitle: {
    fontSize: 10,
    padding: 2,
    maxWidth: 90,
    textAlign: 'center',
  },
  image: {
    width: 90,
    height: 90,
    maxWidth: 90,
    maxHeight: 90,
  },
  iconsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 4,
  }
})
