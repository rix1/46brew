// @flow
import { getWeightSteps, TIME_BETWEEN_POURS, POUR_TIME } from './utils';

import type { Props, State } from './BrewTracker';

export default function(nextProps: Props, prevState: State) {
  const { time, baseWeight, baseMesurement, taste, strength } = nextProps;
  const {
    currentIndex,
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
    return {
      ...prevState,
      pouringTimeTarget: time + TIME_BETWEEN_POURS + POUR_TIME,
      activity: 'waiting',
    };
  }

  // Waiting time is over!
  if (time > waitingTimeTarget) {
    // We're on our last pour. Not sure if we should end here or not?
    if (currentIndex === weightSteps.length - 1) {
      return {
        ...prevState,
        activity: 'done',
      };
    }

    // We're finished waiting, let's pour!

    return {
      ...prevState,
      currentIndex: currentIndex + 1,
      waitingTimeTarget: nextProps.time + TIME_BETWEEN_POURS + POUR_TIME,
      activity: 'pouring',
    };
  }
  return null;
}
