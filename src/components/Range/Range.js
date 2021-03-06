// @flow
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Line from '../Line';
import StyledRange from './StyledRange';

export function stengthToSegments(value: number): number {
  const baseline = 3;
  if (value < 33) {
    return baseline - 1;
  }
  if (value > 66) {
    return baseline + 1;
  }
  return baseline;
}

export const createLineSegments = (segments: number): number[] =>
  [...Array(segments)]
    .map((el, index, array) => Math.round(index * (100 / array.length)))
    .filter(Boolean);

type Props = {|
  className: string,
  separators: number,
  ...React$ElementConfig<typeof StyledRange>,
  onChange: (number) => void,
|};

const Range = (props: Props): React.Element<'div'> => {
  const [hasChanged, setHasChanged] = React.useState(false);

  function onChangeHandler(event) {
    const { onChange } = props;
    setHasChanged(true);
    onChange(Number(event.currentTarget.value));
  }

  const {
    className,
    separators,
    sliderIcons,
    idleSlider,
    value,
    onChange,
    ...rest
  } = props;

  return (
    <div
      className={`relative br3 f4 f3-ns ${className}`}
      style={{
        backgroundColor: `hsla(48, ${value}%, ${100 - 0.25 * value}%, 1 )`,
      }}>
      {!!separators &&
        createLineSegments(separators).map((separator) => (
          <Line key={uuidv4()} position={separator} />
        ))}
      <StyledRange
        sliderIcons={sliderIcons}
        hasChanged={hasChanged}
        idleSlider={idleSlider}
        onChange={onChangeHandler}
        value={value}
        {...rest}
      />
    </div>
  );
};

Range.defaultProps = {
  className: '',
  separators: 0,
};

export default Range;
