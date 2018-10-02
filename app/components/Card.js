import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({ children }) => (
  <View style={styles.card}>{children}</View>
)

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 2 },
  }
})
