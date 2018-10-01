import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ForgotPassword extends Component {
  render() {
    const { navigation: {navigate} } = this.props;
    return (
      <View>
        <Text>ForgotPassword</Text>
      </View>
    )
  }
}
