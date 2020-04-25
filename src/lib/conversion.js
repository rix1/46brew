// @flow

import { COFFEE_TO_WATER_RATIO, COFFEE_CUP_SIZE } from './constants';

// 26g coffee yields 400g of water
export function coffeeToWater(amount: number): number {
  return Math.round((amount / COFFEE_TO_WATER_RATIO) * 10) / 10;
}

// 400g water yields 26g of coffee
export function waterToCoffee(amount: number): number {
  return Math.round(amount * COFFEE_TO_WATER_RATIO * 10) / 10;
}

export function getType(value: number): Brew$UnitType {
  return value > 100 ? 'water' : 'coffee';
}

export function coffeeConverter(amount: number): number {
  const type = getType(amount);
  if (type === 'water') {
    return waterToCoffee(amount);
  }
  return coffeeToWater(amount);
}

export function getCups(amount: number): number {
  const type = getType(amount);
  if (type === 'coffee') {
    return (
      Math.round(Number(coffeeToWater(amount) / COFFEE_CUP_SIZE) * 10) / 10
    );
  }
  return Math.round(Number(amount / COFFEE_CUP_SIZE) * 10) / 10;
}

export function getCoffeeWeight(baseWeight: number) {
  if (getType(baseWeight) === 'coffee') {
    return baseWeight;
  }
  return waterToCoffee(baseWeight);
}
