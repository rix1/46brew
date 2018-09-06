/* eslint-env jest */

import { sumArrayTo } from './sumArrayTo';

describe('sumArrayTo', () => {
  it('sums an array of numbers if no index is given', () => {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(sumArrayTo(arr)).toBe(arr.length);
  });
  it('sums an array of numbers with index', () => {
    const arr = [1, 1, 1, 99, 99, 99];
    expect(sumArrayTo(arr, 3)).toBe(3);
  });
  it('returns 0 for empty arrays', () => {
    const arr = [];
    expect(sumArrayTo(arr)).toBe(0);
  });
});
