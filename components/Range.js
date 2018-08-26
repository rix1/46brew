// @flow
import React from 'react';
import styled, { cx } from 'react-emotion';
import uuid from 'uuid/v4';

import Line from './Line';

type Props = {
  className?: string,
  idleSlider?: string,
  separators: Array<number>,
  activeSliders?: Array<string>,
  value: number,
};

const getSymbol = ({ value, activeSliders }) => {
  const bucketSize = 100 / activeSliders.length;
  return (
    activeSliders.find(
      (indicator, index) => value <= (index + 1) * bucketSize,
    ) || '🤔'
  );
};

const RangeInput = styled.input`
  -webkit-appearance: none;
  background: none;
  width: 100%;
  height: 10px;
  margin: 0px 0px;

  &:focus {
    outline: 0;

    &::-webkit-slider-thumb {
      box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.04);
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><text x="1px" y="16px" font-size="16px" style="isolation:isolate">${getSymbol}</text></svg>');
      transform: translateY(-2px);
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><text x="1px" y="16px" font-size="16px" style="isolation:isolate">${props => props.idleSlider}</text></svg>');
    background-size: contain;
    ${''} background-repeat: no-repeat;
    border-radius: 100%;
    cursor: pointer;
    height: 56px;
    width: 56px;
    position: relative;
    transition: all 0.1s linear;
  }
`;

const Range = ({
  className = '',
  separators = [],
  activeSliders = ['😳'],
  idleSlider = '😴',
  value = 50,
  ...rest
}: Props = {}) => (
  <div
    className={cx('relative br3', className)}
    style={{
      backgroundColor: `hsla(
        48,
        ${value}%,
        ${100 - 0.25 * value}%,
        1
      )`,
    }}>
    {separators.map(separator => (
      <Line key={uuid()} position={separator} />
    ))}
    <RangeInput
      type="range"
      value={value}
      activeSliders={activeSliders}
      idleSlider={idleSlider}
      {...rest}
    />
  </div>
);

const Wrapped: React$ComponentType<Props> = Range;

export default Wrapped;
