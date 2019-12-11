// @flow

const getArrayValueFromPercent = (
  value: number,
  stringArray: Array<string>,
): string => {
  const bucketSize = 100 / stringArray.length;
  return (
    stringArray.find((indicator, index) => value <= (index + 1) * bucketSize) ||
    '🤔'
  );
};

export default getArrayValueFromPercent;
