import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

import { signOut } from '../api';

export default class Header extends Component {
  handleSignOut = () => {
    signOut(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>InVenture Research</Text>
        <Button title="Sign Out" onPress={this.handleSignOut}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
