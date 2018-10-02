import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { ApplicationRecord, User } from '../models';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.checkAuthToken();
  }

  // Fetch the token from storage then navigate to the appropriate place
  checkAuthToken = async () => {
    const userToken = await AsyncStorage.getItem('inventure-auth');
    // This will switch to the App screen or Auth screen and this loading
    if (userToken) {
      try {
        // Setting the .jwt attribute triggers the static generateAuthHeader function.
        ApplicationRecord.jwt = userToken;
        const user = (await User.find('me')).data;
        this.props.navigation.navigate('SelectInnovation');
      }
      catch (err) {
        console.log(err);
        this.props.navigation.navigate('Auth');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
