import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.button}>
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#059690',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})
