import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AppContainer from './components/AppContainer';
import AuthLoading from './screens/AuthLoading';
import SignIn from './screens/SignIn';
import ForgotPassword from './screens/ForgotPassword';
import InnovationOverview from './screens/InnovationOverview';
import SelectInnovation from './screens/SelectInnovation';
import UploadAssets from './screens/UploadAssets';

const AuthStack = createSwitchNavigator(
  {
    SignIn: SignIn,
    ForgotPassword: ForgotPassword,
  }
);

const AssetStack = createSwitchNavigator({
  InnovationOverview: InnovationOverview,
  UploadAssets: UploadAssets,
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    SelectInnovation: SelectInnovation,
    Assets: AssetStack,
  },{
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <RootStack />
      </AppContainer>
    )
  }
}
