// @flow

type Args = {
  value: number,
  activeSliders: Array<string>,
};

export const getSymbol = ({ value, activeSliders }: Args) => {
  const bucketSize = 100 / activeSliders.length;
  return (
    activeSliders.find(
      (indicator, index) => value <= (index + 1) * bucketSize,
    ) || '🤔'
  );
};
