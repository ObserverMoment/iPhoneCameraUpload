import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import Button from '../components/Button';

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

  handlePressEnter = () => {

  }

  handleSignIn = () => {
    const { email, password } = this.state;
    const onSuccess = () => this.props.navigation.navigate('App');
    signIn(email, password, onSuccess);
  }

  render() {
    const { navigation: {navigate} } = this.props;
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.text,styles.header ]}>InVenture Research</Text>
        <Text style={[styles.text,styles.header ]}>Sign In</Text>
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
        <Button title="Submit" onPress={this.handleSignIn}
        />
        <Text style={styles.text}>Show / hide password</Text>
        <Text style={styles.text}>Forgot password?</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#1A2227',
  },
  text: {
    color: 'white'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10
  },
  textInput: {
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 10,
    height: 70,
    fontSize: 28
  }
})
