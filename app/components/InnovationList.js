import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from './Button';

export default class InnovationList extends Component {
  render() {
    const { innovations, navigation } = this.props;
    return (
      <View style={styles.container}>
        {
          innovations && innovations.map(innovation => (
            <View key={innovation.innovationId}>
              <Button
                title={innovation.name}
                type='primary'
                onPress={() => navigation.navigate(
                  'InnovationAssets',
                  { partnerId: innovation.partnerId, innovationId: innovation.innovationId, name: innovation.name }
                )}
              />
            </View>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    padding: 10
  }
})
