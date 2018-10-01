import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Button from './Button';

export default class InnovationListItem extends Component {
  render() {
    const { innovation, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          title={innovation.name}
          onPress={() => navigation.navigate(
            'InnovationAssets',
            { partnerId: innovation.partnerId, innovationId: innovation.innovationId, name: innovation.name }
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
})
