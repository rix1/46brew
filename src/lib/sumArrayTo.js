// @flow

export const sumArrayTo = (
  arr: Array<number>,
  compareFn: (number) => boolean,
): number => {
  return arr.reduce((prev, next, index) => {
    if (compareFn(index)) {
      return prev + next;
    }
    return prev;
  }, 0);
};
