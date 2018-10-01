import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import InnovationListItem from './InnovationListItem';

export default class InnovationList extends Component {
  render() {
    const { innovations, navigation } = this.props;
    return (
      <View style={styles.container}>
        {
          innovations && innovations.map(innovation => (
            <InnovationListItem key={innovation.innovationId} innovation={innovation} navigation={navigation} />
          ))
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around'
  }
})
