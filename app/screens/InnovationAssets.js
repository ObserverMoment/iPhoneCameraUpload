import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Header from '../components/Header';
import AssetList from '../components/AssetList';
import Button from '../components/Button';
import StyledText from '../components/StyledText';

import { colors, fonts } from '../assets/styles/variables';

import { getInnovationAssets } from '../api';

export default class InnovationAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the asset list for the innovation in here.
      assets: [], // Array of asset objects.
      editMode: false,
      perPage: 9,
      pageNumber: 0
    }
  }

  handleData = (innovationData) => {
    const assets = innovationData.innovation.concepts.reduce((acum, nextConcept) => {

      const nextConceptCanvases = nextConcept.canvasesAttachments.reduce((acum, nextCanvas) => {
        return [ ...acum, nextCanvas ];
      }, [])

      return [ ...acum, ...nextConceptCanvases];
    }, []);

    this.setState({ assets });
  }

  retrieveAssets = () => {
    // Make an API call to get back all the canvasses here. Save the results into state.
    const partnerId = this.props.navigation.state.params.partnerId;
    const onSuccess = (innovationData) => this.handleData(innovationData);
    getInnovationAssets(partnerId, onSuccess);
  }

  componentDidMount = () => {
    this.retrieveAssets();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.navigation.state.params.partnerId !== this.props.navigation.state.params.partnerId) {
      this.retrieveAssets();
    }
  }

  render() {
    const { assets, editMode, perPage, pageNumber } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;
    // Split assets into an array per page.
    const totalPages = Math.ceil(assets.length / perPage);
    const displayAssets = assets.length > perPage ? assets.slice(perPage * pageNumber, perPage * pageNumber + perPage) : assets;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.titleContainer}>
              <StyledText style={styles.title}>{params.name}</StyledText>
              {assets && assets.length > 0 &&
                <Button title={editMode ? 'Done' : 'Edit'} type='textSmall' onPress={() => this.setState({editMode: !editMode})} />
              }

            </View>
            {assets && assets.length > 0
              ? <AssetList assets={displayAssets} editMode={editMode}/>
              : <StyledText style={styles.message}>No assets uploaded</StyledText>
            }
          </View>
          <View style={styles.actions}>
            <Button title="Upload Asset" type="primary" onPress={() => navigation.navigate(
                'UploadAssets',
                { partnerId: params.partnerId, innovationId: params.innovationId, name: params.name }
              )}
            />
            <Button title="Switch Innovation" type="primary" onPress={() => navigation.navigate('SelectInnovation')} />
          </View>
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
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    padding: 5
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
