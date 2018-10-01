import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import Header from '../components/Header';
import AssetList from '../components/AssetList';

import globalStyles from '../assets/styles/globalStyles';

import { getInnovationAssets } from '../api';

export default class InnovationAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store the asset list for the innovation in here.
      assets: [], // Array of asset objects.
      editMode: false
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
    const { assets, editMode } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;
    return (
      <View style={globalStyles.pageContainer}>
        <Header navigation={navigation} />
        <Text style={globalStyles.heading1}>Innovation Assets for {params.name} </Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
          <Text style={{ fontWeight: 'bold'}}>(Partner ID: {params.partnerId})</Text>
          <Text style={{ fontWeight: 'bold'}}>(Innovation ID: {params.innovationId})</Text>
          <Button title={editMode ? 'Done' : 'Edit'} onPress={() => this.setState({editMode: !editMode})} />
        </View>
        {assets && assets.length > 0
          ? <AssetList assets={assets} editMode={editMode}/>
          : <Text style={globalStyles.message}>No assets uploaded</Text>
        }

        <Button title="Upload new asset" onPress={() => navigation.navigate('UploadAssets')} />
        <Button title="Back to dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    )
  }
}
