import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

import SprintCard from './SprintCard';

export default class InnovationList extends Component {
  render() {
    const { innovations, navigation } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {innovations && innovations.map(innovation => (
          <TouchableOpacity
            key={innovation.id}
            onPress={() => navigation.navigate(
              'InnovationOverview',
              { innovation: innovation }
            )}
            style={styles.sprintCard}
          >
            <SprintCard
              innovation={innovation}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    padding: 4,
    marginTop: 5,
  },
  sprintCard: {
    marginVertical: 1,
  },
})
