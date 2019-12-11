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

function getType(value: number): Brew$UnitType {
  return value > 100 ? 'water' : 'coffee';
}

export function coffeeConverter(amount: number): number {
  const type = getType(amount);
  if (type === 'water') {
    return waterToCoffee(amount);
  }
  return coffeeToWater(amount);
}

export function getCoffeeWeight(baseWeight: number, brewUnit: Brew$UnitType) {
  if (brewUnit === 'coffee') {
    return baseWeight;
  }
  return waterToCoffee(baseWeight);
}
