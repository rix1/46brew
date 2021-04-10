// @flow

export const sumArrayTo = (
  arr: Array<number>,
  compareFn: (number) => boolean,
) => {
  return arr.reduce((prev, next, index) => {
    if (compareFn(index)) {
      return prev + next;
    }
    return prev;
  }, 0);
};
