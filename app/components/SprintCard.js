import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { dvOfficesById, innovationTypeLabels } from '../config/innovationConfig';
import { currentStageDisplay } from '../utils/functions';

const SprintCard = ({ innovation }) => {
  // Calculate stage
  const [ nextStageName ] = currentStageDisplay(innovation.keyDates);
  return (
    <View style={styles.sprintCard}>
      <Text style={styles.sprintCardText}>{innovation.sprintName}</Text>
      <Text style={styles.sprintCardText}>Case code: {innovation.chargeCode}</Text>
      <Text style={styles.sprintCardText}>DV Office: {dvOfficesById[innovation.dvOfficeId]}</Text>
      <Text style={styles.sprintCardText}>Type: {innovationTypeLabels[innovation.sprintType]}</Text>
      <Text style={styles.sprintCardText}>Currently in {nextStageName}</Text>
    </View>
  )
}

export default SprintCard;

const styles = StyleSheet.create({
  sprintCard: {
    backgroundColor: '#232D33',
    padding: 10,
    margin: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 2 },
  },
  sprintCardText: {
    color: '#eff3f5',
  }
})
