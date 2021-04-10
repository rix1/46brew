import { sumArrayTo } from './sumArrayTo';

describe('sumArrayTo', () => {
  it('sums an array of numbers if no index is given', () => {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(sumArrayTo(arr, (index) => index < arr.length)).toBe(arr.length);
  });
  it('it returns the first element if index i 0', () => {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(sumArrayTo(arr, (index) => index === 0)).toBe(1);
  });
  it('sums an array of numbers with index', () => {
    const arr = [1, 1, 1, 99, 99, 99];
    expect(sumArrayTo(arr, (index) => index < 3)).toBe(3);
  });
  it('returns 0 for empty arrays', () => {
    const arr = [];
    expect(sumArrayTo(arr, (index) => index < arr.length)).toBe(0);
  });
});
