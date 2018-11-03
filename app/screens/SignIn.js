import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import StyledText from '../components/StyledText';
import Button from '../components/Button';

import { colors, fonts } from '../assets/styles/variables';

import { signIn } from '../api';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'bosonsoul@gmail.com',
      password: 'beanieman7',
      activeField: ''
    }
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    const onSuccess = () => this.props.navigation.navigate('SelectInnovation');
    signIn(email, password, onSuccess);
  }

  render() {
    const { navigation: {navigate} } = this.props;
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <StyledText style={[styles.header, styles.logo1]}>IN</StyledText>
          <StyledText style={[styles.header, styles.logo2]}>VENTURE</StyledText>
        </View>
        <TextInput
          value={email.toLowerCase()}
          onChangeText={(email) => this.setState({ email })}
          style={styles.textInput}
          textContentType="emailAddress"
        />
        <TextInput
          value={password}
          onChangeText={(password) => this.setState({ password })}
          style={styles.textInput}
          textContentType="password"
          secureTextEntry={true}
        />
        <Button title="Submit" type="primary" onPress={this.handleSignIn} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#1A2227',
    color: 'white'
  },
  logoContainer: {
    flexDirection: 'row'
  },
  header: {
    fontSize: fonts.landingHeader,
    fontWeight: 'bold',
  },
  logo1: {
    color: colors.primaryTone,
  },
  logo2: {
    color: colors.primaryText,
  },
  text: {
    color: colors.primaryText
  },
  textInput: {
    alignSelf: 'stretch',
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    color: colors.primaryText,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 10,
    height: 70,
    fontSize: fonts.textInput
  }
})
