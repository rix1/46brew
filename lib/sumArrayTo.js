// @flow

export const sumArrayTo = (arr: Array<number>, sumToIndex: number) => {
  const sumTo = sumToIndex || arr.length;
  return arr.reduce((prev, next, index) => {
    if (index < sumTo) {
      return prev + next;
    }
    return prev;
  }, 0);
};
