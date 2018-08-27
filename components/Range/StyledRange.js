// @flow
import styled from 'react-emotion';
import { getSymbol } from './utils';

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
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><text x="1px" y="16px" font-size="16px" style="isolation:isolate">${getSymbol}</text></svg>');
      transform: translateY(-2px);
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><text x="1px" y="16px" font-size="16px" style="isolation:isolate">${props => (props.hasChanged ? getSymbol : props.idleSlider)}</text></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 100%;
    cursor: pointer;
    height: 56px;
    width: 56px;
    position: relative;
    transition: all 0.1s linear;
  }
`;

export default StyledRange;
