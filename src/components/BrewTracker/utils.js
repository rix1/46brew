// @flow

import {
  TASTE_BASE_PARTS,
  STRENGTH_BASE_PARTS,
  COFFEE_MULTIPLIER,
} from '../../lib/constants';

import { getCoffeeWeight } from '../../lib/conversion';

import { createLineSegments, stengthToSegments } from '../Range/Range';
import { sumArrayTo } from '../../lib/sumArrayTo';

export function convertTasteToWeight(baseWeight: number, taste: number) {
  const tasteWeight = baseWeight * COFFEE_MULTIPLIER * TASTE_BASE_PARTS;
  return [
    Math.round(tasteWeight * (taste / 100)),
    Math.round(tasteWeight * ((100 - taste) / 100)),
  ];
}

export function convertStrenghtToWeights(
  baseWeight: number,
  strength: number,
): Array<number> {
  const strenghtWeight = baseWeight * COFFEE_MULTIPLIER * STRENGTH_BASE_PARTS;
  const pours = createLineSegments(stengthToSegments(strength));
  return [...Array(pours.length + 1)].map((el, i, array) =>
    Math.round(strenghtWeight / array.length),
  );
}

export function getWeightSteps(
  baseWeight: number,
  taste: number,
  strength: number,
) {
  const coffeeWeight = getCoffeeWeight(baseWeight);
  return [
    ...convertTasteToWeight(coffeeWeight, taste),
    ...convertStrenghtToWeights(coffeeWeight, strength),
  ];
}

export function getTimeToNextStep(
  activity: $PropertyType<Brew$State, 'activity'>,
  pouringTimeTarget: $PropertyType<Brew$State, 'pouringTimeTarget'>,
  waitingTimeTarget: $PropertyType<Brew$State, 'waitingTimeTarget'>,
  time: $PropertyType<Brew$MachineProps, 'time'>,
) {
  if (activity === 'pouring') {
    return pouringTimeTarget - time;
  }
  if (activity === 'waiting') {
    return waitingTimeTarget - time;
  }
  return 0;
}

export function getCurrentWeightDisplay(
  activity: Brew$Activity,
  resetWeight: Brew$Weight,
  weightSteps: $PropertyType<Brew$State, 'weightSteps'>,
  pourNumber: $PropertyType<Brew$State, 'pourNumber'>,
) {
  switch (activity) {
    case 'start':
      return resetWeight;
    case 'done':
      return (
        sumArrayTo(weightSteps, (index) => index <= pourNumber) + resetWeight
      );
    default:
      if (pourNumber === 0) {
        return (
          sumArrayTo(weightSteps, (index) => index <= pourNumber) + resetWeight
        );
      }
      return (
        sumArrayTo(weightSteps, (index) => index < pourNumber) + resetWeight
      );
  }
}

export function getTargetWeightDisplay(
  activity: Brew$Activity,
  resetWeight: Brew$Weight,
  weightSteps: $PropertyType<Brew$State, 'weightSteps'>,
  pourNumber: $PropertyType<Brew$State, 'pourNumber'>,
) {
  switch (activity) {
    case 'done':
      return sumArrayTo(weightSteps, (index) => index <= pourNumber);
    default:
      return (
        sumArrayTo(weightSteps, (index) => index <= pourNumber) + resetWeight
      );
  }
}
