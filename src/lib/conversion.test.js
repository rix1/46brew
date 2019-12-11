/* eslint-env jest */

import {
  coffeeToWater,
  waterToCoffee,
  coffeeConverter,
  getCoffeeWeight,
} from './conversion';

describe('coffee to water', () => {
  it('converts coffee to water correctly', () => {
    expect(coffeeToWater(26)).toBe(400);
  });
  it('rounds properly', () => {
    expect(coffeeToWater(22)).toBe(338.5);
  });
});

describe('water to coffee', () => {
  it('converts water to coffee correctly', () => {
    expect(waterToCoffee(400)).toBe(26);
  });
  it('rounds properly', () => {
    expect(waterToCoffee(350)).toBe(22.8);
  });
});

describe('coffeeConverter', () => {
  it('converts water to coffee correctly', () => {
    expect(coffeeConverter(400, 'water')).toBe(26);
  });
  it('converts coffee to water correctly', () => {
    expect(coffeeConverter(26, 'coffee')).toBe(400);
  });
});

describe('getCoffeeWeight', () => {
  it('returns coffee weight if type is coffee', () => {
    const inputValue = 22;
    expect(getCoffeeWeight(inputValue, 'coffee')).toBe(inputValue);
  });
  it('returns coffee weight if type is water', () => {
    const inputValue = 224;
    expect(getCoffeeWeight(inputValue, 'water')).toBe(14.6);
  });
});
