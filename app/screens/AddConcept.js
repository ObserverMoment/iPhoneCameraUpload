import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AddConcept extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      assetIds: [],
    }
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  hhandleSelectCanvas = (assetId) => {
    const { assetIds } = this.state;
    const updatedArray = assetIds.includes(assetId)
                          ? assetIds.filter(id => id !== assetId)
                          : assetIds.concat(assetId)
    this.setState({ assetIds: updatedArray })
  }

  handleSaveConcept = (innovationId) => {
    const { name, description, assetIds } = this.state;
    const { innovation } = this.props.navigation.state.params;
    const attrsToCreate = {
      name,
      description,
      assetsToLink: assetIds.map(id => ({ ...innovationAssetsById[id] }))
    }
    createConcept(innovationId, attrsToCreate, redirectUrl);
  }

  render() {

    return (
      <View><Text>Hello Concept</Text></View>
    )
  }
}

export default AddConcept;
