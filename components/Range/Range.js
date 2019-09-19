// @flow
import React, { useState } from 'react';
import uuid from 'uuid/v4';

import Line from '../Line';
import StyledRange from './StyledRange';

export function stengthToSegments(value: number) {
  const baseline = 3;
  if (value < 33) {
    return baseline - 1;
  }
  if (value > 66) {
    return baseline + 1;
  }
  return baseline;
}

export const createLineSegments = (segments: number) =>
  [...Array(segments)]
    .map((el, index, array) => Math.round(index * (100 / array.length)))
    .filter(Boolean);

type Props = {
  className: string,
  idleSlider: string,
  separators: number,
  activeSliders: Array<string>,
  onChange: (SyntheticInputEvent<HTMLFormElement>) => void,
  value: number,
};

const Range = (props: Props) => {
  const [hasChanged, setHasChanged] = useState(false);

  function onChangeHandler(event: SyntheticInputEvent<HTMLFormElement>) {
    const { onChange } = props;
    setHasChanged(true);
    onChange(event);
  }

  const {
    className,
    separators,
    activeSliders,
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
        createLineSegments(separators).map(separator => (
          <Line key={uuid()} position={separator} />
        ))}
      <StyledRange
        activeSliders={activeSliders}
        hasChanged={hasChanged}
        idleSlider={idleSlider}
        onChange={onChangeHandler}
        type="range"
        value={value}
        {...rest}
      />
    </div>
  );
};

Range.defaultProps = {
  className: '',
  separators: 0,
  activeSliders: ['😳'],
  idleSlider: '😴',
};

export default Range;
