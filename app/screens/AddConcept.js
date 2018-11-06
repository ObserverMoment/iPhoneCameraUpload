import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import AssetSelector from '../components/AssetSelector';
import StyledText from '../components/StyledText';
import Button from '../components/Button';
import { createConcept } from '../api';

export default class AddConcept extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      selectedAssetIds: [],
      step: 0,
    }
  }

  updateFormField = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSelectCanvas = (assetId) => {
    const { selectedAssetIds } = this.state;
    const updatedArray = selectedAssetIds.includes(assetId)
                          ? selectedAssetIds.filter(id => id !== assetId)
                          : selectedAssetIds.concat(assetId)
    this.setState({ selectedAssetIds: updatedArray })
  }

  handleSaveConcept = () => {
    const { name, description, selectedAssetIds } = this.state;
    const { innovation, assets } = this.props.navigation.state.params;
    const attrsToCreate = {
      name,
      description,
      assetsToLink: selectedAssetIds.length > 0
                ? assets && assets.filter(asset => selectedAssetIds.includes(asset.id)).map(asset => ({ ...asset.attributes }))
                : null

    }
    const onSuccess = () => this.props.navigation.navigate('InnovationOverview', { innovation, assets });
    createConcept(innovation.id, attrsToCreate, onSuccess);
  }

  render() {
    const { name, description, selectedAssetIds, step } = this.state;
    const { innovation, assets } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <StyledText style={styles.headerText} text="Create a new Concept" />
          {step === 0
            ? (
              <View>
                <StyledText text="1. Name*" />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({ name: text })}
                  value={name}
                  autoFocus
                />
                <StyledText text="2. Description" />
                <TextInput
                  style={styles.textArea}
                  onChangeText={(text) => this.setState({ description: text })}
                  value={description}
                  multiline={true}
                />
                <Button
                  type="tertiary"
                  title="Link assets"
                  onPress={() => this.setState({ step: 1 })}
                />
              </View>
            )
            : (
              <View style={styles.selectorContainer}>
                <StyledText style={styles.headerText} text="3. Link Assets" />
                <AssetSelector assets={assets} selectedAssetIds={selectedAssetIds} updateSelected={this.handleSelectCanvas}/>
                <Button
                  type="tertiary"
                  title="Back"
                  onPress={() => this.setState({ step: 0 })}
                />
              </View>
            )
          }
        </View>

        <View>
          <View style={name ? styles.showMakeConcept : styles.hideMakeConcept}>
            <Button
              type="primary"
              title={selectedAssetIds.length > 0 ? 'Make Concept with assets' : 'Make Concept' }
              onPress={this.handleSaveConcept}
            />
          </View>
          <Button
            type="textSmall"
            title="Cancel"
            onPress={() => navigation.navigate('InnovationOverview', { innovation, assets })}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
  },
  textInput: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 2,
    color: 'white',
  },
  textArea: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    margin: 10,
    color: 'white',
    minHeight: 100,
  },
  hideMakeConcept: {
    opacity: 0,
  },
  showMakeConcept: {
    opacity: 1,
  },
  selectorContainer: {
    flex: 1,
  }
})
