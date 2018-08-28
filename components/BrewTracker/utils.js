// @flow
import { getSeparators } from '../ProfileSlider';
import { type UnitType } from '../../FlowTypes';
import { type State } from './BrewTracker';

const TASTE_PARTS = 2;
const STRENGTH_PARTS = 3;
const COFFEE_MULTIPLIER = 3;
const COFFEE_TO_WATER_RATIO = 0.065;
export const TIME_BETWEEN_POURS = 42; // The meaing 👀
export const POUR_TIME = 10;

export const convertTasteToWeight = (baseWeight: number, taste: number) => {
  const tasteWeight = baseWeight * COFFEE_MULTIPLIER * TASTE_PARTS;
  return [
    Math.round(tasteWeight * (taste / 100)),
    Math.round(tasteWeight * ((100 - taste) / 100)),
  ];
};

export const convertStrenghtToWeight = (
  baseWeight: number,
  strength: number,
): Array<number> => {
  const strenghtWeight = baseWeight * COFFEE_MULTIPLIER * STRENGTH_PARTS;
  const separators = getSeparators(strength);
  return [...Array(separators.length + 1)].map(
    (el, i, array) => strenghtWeight / array.length,
  );
};

export const getCoffeeWeight = (
  baseWeight: number,
  baseMesurement: UnitType,
) => {
  if (baseMesurement === 'coffee') {
    return baseWeight;
  }
  return Math.round(baseWeight * COFFEE_TO_WATER_RATIO);
};

export const getWeightSteps = (
  baseWeight: number,
  baseMesurement: UnitType,
  taste: number,
  strength: number,
) => {
  const coffeeWeight = getCoffeeWeight(baseWeight, baseMesurement);
  console.log([
    ...convertTasteToWeight(coffeeWeight, taste),
    ...convertStrenghtToWeight(coffeeWeight, strength),
  ]);
  return [
    ...convertTasteToWeight(coffeeWeight, taste),
    ...convertStrenghtToWeight(coffeeWeight, strength),
  ];
};

export const sumArrayTo = (arr: Array<number>, sumToIndex: number) =>
  arr.reduce((prev, next, index) => {
    if (index < sumToIndex) {
      return prev + next;
    }
    return prev;
  }, 0);

export const getTimeToNextStep = (state: State, time: number) => {
  const { pouringTimeTarget, waitingTimeTarget, activity } = state;

  if (activity === 'pouring') {
    return pouringTimeTarget - time;
  }
  if (activity === 'waiting') {
    return waitingTimeTarget - time;
  }
  return 0;
};
