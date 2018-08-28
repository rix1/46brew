// @flow
import { getWeightSteps, TIME_BETWEEN_POURS, POUR_TIME } from './utils';

import type { Props, State } from './BrewTracker';

export default function(nextProps: Props, prevState: State): State | null {
  const { time, baseWeight, baseMesurement, taste, strength } = nextProps;
  const {
    pourNumber,
    pouringTimeTarget,
    waitingTimeTarget,
    weightSteps,
    activity,
  } = prevState;

  // Initial setup
  if (
    !weightSteps.length &&
    baseWeight &&
    baseMesurement &&
    taste &&
    strength
  ) {
    return {
      ...prevState,
      weightSteps: getWeightSteps(baseWeight, baseMesurement, taste, strength),
    };
  }

  // We done!
  if (activity === 'done') {
    return null;
  }

  // Timer just started
  if (activity === 'start' && time > 0) {
    return {
      ...prevState,
      activity: 'pouring',
    };
  }

  // We're finished pouring, now we wait...
  if (time > pouringTimeTarget) {
    // We're on our last pour. Not sure if we should end here or not?
    if (pourNumber === weightSteps.length - 1) {
      return {
        ...prevState,
        activity: 'done',
      };
    }

    return {
      ...prevState,
      pourNumber: pourNumber + 1,
      pouringTimeTarget: time + TIME_BETWEEN_POURS + POUR_TIME,
      activity: 'waiting',
    };
  }

  // Waiting time is over!
  // We're finished waiting, let's pour!
  if (time > waitingTimeTarget) {
    return {
      ...prevState,
      waitingTimeTarget: nextProps.time + TIME_BETWEEN_POURS + POUR_TIME,
      activity: 'pouring',
    };
  }
  return null;
}
