import moment from 'moment';

// Find and display the current IS Stage at a given date for any array of keyDate objects
// Receives: an array of keyDate objects and a date to check against.
// Returns: an array [ string: stageName, int: index ]
// Conditions: If date is before KO return'Pre-KO', if after the last stage (Sprint is finished) return 'COMPLETE'
export const currentStageDisplay = (keyDates, date=moment()) => { // default to today if no date given.
  if (keyDates.length === 0) { return [ 'Pre-KO', 0 ] }
  const nextStageIndex = keyDates && keyDates.findIndex(keyDate => moment(keyDate.date).isAfter(moment(date)) );
  return nextStageIndex === -1
              ? [ 'COMPLETE', -1 ]
              : nextStageIndex === 0  ? [ 'Pre-KO', 0 ] : [ keyDates[nextStageIndex].name, nextStageIndex ]
}
