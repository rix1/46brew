// @flow
import { getSeparators } from '../ProfileSlider';
import { type UnitType } from '../../FlowTypes';
import { type State } from './BrewTracker';

export const TIME_BETWEEN_POURS = 42; // The meaing of everything 👀
export const POUR_TIME = 10;

const TASTE_BASE_PARTS = 2;
const STRENGTH_BASE_PARTS = 3;
const COFFEE_TO_WATER_RATIO = 0.065;

/**
 * Tetsu Kasuya's original formula is:
 *    coffee x 3 x pours = water
 *
 * That gives us the following coffee to water ratio
 *    1 / (3 x pours) => 0.0666...
 *
 * Which is slightly more than 0.065 (my personal base) and what I use
 * to convert water to coffee in `getCoffeeWeight()` 👇
 *
 * To improve accuracy over Kasuya's formula I calculate a custom COFFEE_MULTIPLIER:
 */
const COFFEE_MULTIPLIER = 1 / (COFFEE_TO_WATER_RATIO * 5); // => 3.0765...

export const convertTasteToWeight = (baseWeight: number, taste: number) => {
  const tasteWeight = baseWeight * COFFEE_MULTIPLIER * TASTE_BASE_PARTS;
  return [
    Math.round(tasteWeight * (taste / 100)),
    Math.round(tasteWeight * ((100 - taste) / 100)),
  ];
};

export const convertStrenghtToWeight = (
  baseWeight: number,
  strength: number,
): Array<number> => {
  const strenghtWeight = baseWeight * COFFEE_MULTIPLIER * STRENGTH_BASE_PARTS;
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
