// @flow
import styled from 'react-emotion';
import getStringFromValue from '../../lib/getStringFromValue';

const StyledRange = styled.input`
  -webkit-appearance: none;
  background: none;
  width: 100%;
  height: 10px;
  margin: 0px 0px;

  &:focus {
    outline: 0;

    &::-webkit-slider-thumb {
      box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.04);
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 18 18"><text text-anchor="middle" dy=".35em" y="50%" x="50%" font-size="14px">${props =>
        getStringFromValue(props.value, props.activeSliders)}</text></svg>');
      transform: translateY(-2px);
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 18 18"><text text-anchor="middle" dy=".35em" y="50%" x="50%" font-size="14px">${props =>
      props.hasChanged
        ? getStringFromValue(props.value, props.activeSliders)
        : props.idleSlider}</text></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 100%;
    cursor: pointer;
    height: 2em;
    width: 2em;
    margin-top: -.2em;
    position: relative;
    transition: all 0.1s linear;
  }
`;

export default StyledRange;
