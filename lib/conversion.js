// @flow

import { COFFEE_TO_WATER_RATIO } from './constants';

// 26g coffee yields 400g of water
export function coffeeToWater(amount: number): number {
  return Math.round((amount / COFFEE_TO_WATER_RATIO) * 10) / 10;
}

// 400g water yields 26g of coffee
export function waterToCoffee(amount: number): number {
  return Math.round(amount * COFFEE_TO_WATER_RATIO * 10) / 10;
}

/**
 * coffeeConverter
 * accepts coffee and returns the amount of water
 */
export function coffeeConverter(
  amount: number,
  measurement: Brew$UnitType,
): number {
  if (measurement === 'water') {
    return waterToCoffee(amount);
  }
  return coffeeToWater(amount);
}

export function getCoffeeWeight(
  baseWeight: number,
  baseMesurement: Brew$UnitType,
) {
  if (baseMesurement === 'coffee') {
    return baseWeight;
  }
  return waterToCoffee(baseWeight);
}
