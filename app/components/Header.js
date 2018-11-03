import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';
import { signOut } from '../api';

import Button from './Button';

export default class Header extends Component {
  handleSignOut = () => {
    signOut(() => this.props.navigation.navigate('Auth'));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={[styles.header, styles.logo1]}>IN</Text>
          <Text style={[styles.header, styles.logo2]}>VENTURE</Text>
        </View>
        <Button title="Sign Out" type="textSmall" onPress={this.handleSignOut}/>
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
    paddingTop: 2,
    paddingBottom: 2
  },
  logoContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 4,
    paddingRight: 8,
  },
  header: {
    fontSize: fonts.siteHeader,
  },
  logo1: {
    color: colors.primaryTone,
  },
  logo2: {
    color: colors.primaryText,
  },
})
