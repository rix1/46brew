// @flow
import React from 'react';
import getArrayValueFromPercent from '../../lib/getArrayValueFromPercent';
import createInlineSVG from './createInlineSVG';

type StyledRangeProps = {|
  sliderIcons: string[],
  hasChanged: boolean,
  idleSlider: string,
  value: number,
  max: number | string,
  min: number | string,
  step: number,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (SyntheticFocusEvent<HTMLInputElement>) => void,
|};

const StyledRange = ({
  sliderIcons,
  hasChanged,
  idleSlider,
  value,
  ...rest
}: StyledRangeProps) => {
  const icon = hasChanged
    ? getArrayValueFromPercent(value, sliderIcons)
    : idleSlider;

  return (
    <>
      <style data-description="dynamic styles" jsx>{`
      input::-webkit-slider-thumb {
                background-image: url('${createInlineSVG(icon)}');
      }
    `}</style>
      <style jsx>{`
        input {
          -webkit-appearance: none;
          background: none;
          width: 100%;
          height: 10px;
          margin: 0px 0px;
        }
        input::-webkit-slider-thumb {
          -webkit-appearance: none;
          background-size: contain;
          background-repeat: no-repeat;
          border-radius: 100%;
          cursor: pointer;
          height: 2em;
          width: 2em;
          margin-top: -0.2em;
          position: relative;
          transition: all 0.1s linear;
        }
        input:focus {
          outline: 0;
        }
        input:focus::-webkit-slider-thumb {
          box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }
      `}</style>
      <input type="range" {...rest} value={value} />
    </>
  );
};

StyledRange.defaultProps = {
  max: 100,
  min: 0,
  step: 1,
  sliderIcons: ['😳'],
  idleSlider: '😴',
  hasChanged: false,
};

export default StyledRange;
