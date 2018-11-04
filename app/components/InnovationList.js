import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import SprintCard from './SprintCard';

export default class InnovationList extends Component {
  render() {
    const { innovations, navigation } = this.props;
    return (
      <View style={styles.container}>
        {innovations && innovations.map(innovation => (
          <TouchableOpacity
            key={innovation.id}
            onPress={() => navigation.navigate(
              'InnovationOverview',
              { innovation: innovation }
            )}
          >
            <SprintCard
              innovation={innovation}
            />
          </TouchableOpacity>
        ))}
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
