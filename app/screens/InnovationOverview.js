import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Header from '../components/Header';
import AssetList from '../components/AssetList';
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import StyledText from '../components/StyledText';

import { colors, fonts } from '../assets/styles/variables';

import { getInnovationAssets } from '../api';

import { apiConfig } from '../config';

export default class InnovationOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the asset list for the innovation in here.
      assets: [], // Array of asset objects.
      openViewer: false,
      assetToView: null,
    }
  }

  handleData = (assets) => {
    this.setState({ assets });
  }

  retrieveAssets = (id) => {
    // Make an API call to get back all the assets here. Save the results into state.
    const onSuccess = (assets) => this.handleData(assets);
    getInnovationAssets(id, onSuccess);
  }

  componentDidMount = () => {
    this.mounted = true;
    this.retrieveAssets(this.props.navigation.state.params.innovation.id);
  }

  componentWillReceiveProps = (prevProps) => {
    if (prevProps.navigation.state.params.innovation.id !== this.props.navigation.state.params.innovation.id) {
      if (this.mounted) {
        this.retrieveAssets(this.props.navigation.state.params.innovation.id);
      }
    }
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  handleOpenViewer = (asset) => {
    this.setState({ openViewer: true, assetToView: asset });
  }

  render() {
    const { assets, openViewer, assetToView } = this.state;
    const { navigation } = this.props;
    const { params: { innovation } } = navigation.state;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <StyledText style={styles.title} text={innovation.sprintName} />
          </View>
          {assets && assets.length > 0
            ? openViewer && assetToView
              ? (
                <ImageViewer
                  onCancel={() => this.setState({ openViewer: false, assetToView: null })}
                  source={{ uri: `${apiConfig.apiDomain}${assetToView.url}`}}
                  title={assetToView.title}
                />
              )
              : (
                <View style={styles.listContainer}>
                  <AssetList assets={assets} openViewer={this.handleOpenViewer}/>
                  <View style={styles.actions}>
                    <Button title="Add Concept" type="primary" onPress={() => navigation.navigate(
                        'AddConcept',
                        { id: innovation.id, assets: innovation }
                      )} />
                    <Button title="Upload Asset" type="primary" onPress={() => navigation.navigate(
                        'UploadAssets',
                        { innovationId: innovation.id, innovationAssets: assets }
                      )}
                    />
                    <Button title="Switch Innovation" type="secondary" onPress={() => navigation.navigate('SelectInnovation')} />
                  </View>
                </View>
              )
            : <StyledText style={styles.message} text="No assets uploaded" />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 5
  },
  listContainer: {
    justifyContent: 'space-around',
    flex: 1,
    marginBottom: 10,
  },
  title: {
    color: colors.primaryText,
    fontSize: fonts.h3,
  },
  message: {
    color: colors.primaryText,
    textAlign: 'center',
    padding: 15
  },
  actions: {
  }
})
