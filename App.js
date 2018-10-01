import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import AuthLoading from './app/screens/AuthLoading';
import SignIn from './app/screens/SignIn';
import ForgotPassword from './app/screens/ForgotPassword';
import InnovationAssets from './app/screens/InnovationAssets';
import Dashboard from './app/screens/Dashboard';
import UploadAssets from './app/screens/UploadAssets';

const AuthStack = createSwitchNavigator(
  {
    SignIn: SignIn,
    ForgotPassword: ForgotPassword
  }
);

const AppStack = createSwitchNavigator({
  Dashboard: Dashboard,
  InnovationAssets: InnovationAssets,
  UploadAssets: UploadAssets
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },{
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    )
  }
}
