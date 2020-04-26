// @flow
import React, { PureComponent } from 'react';

import getArrayValueFromPercent from '../lib/getArrayValueFromPercent';
import Range, { stengthToSegments } from './Range/Range';
import Line from './Line';
import ColorButton from './ColorButton';
import BlankButton from './BlankButton';

const DEFAULT_TASTE_VALUE = 50;
const DEFAULT_STRENGTH_VALUE = 50;
type Props = {|
  onComplete: ({ taste: number, strength: number }) => void,
|};
type State = {
  tasteValue: number,
  strengthValue: number,
  valuesAdjusted: boolean,
};

const defaultState = {
  tasteValue: DEFAULT_TASTE_VALUE,
  strengthValue: DEFAULT_STRENGTH_VALUE,
  valuesAdjusted: false,
};

class ProfileSlider extends PureComponent<Props, State> {
  state = defaultState;

  componentDidMount() {}

  onChange = (type: string) => (value: number) => {
    this.setState({
      [type]: value,
      valuesAdjusted: true,
    });
  };

  onComplete = () => {
    const { onComplete } = this.props;
    const { tasteValue, strengthValue, valuesAdjusted } = this.state;

    if (onComplete && valuesAdjusted) {
      onComplete({ taste: tasteValue, strength: strengthValue });
    }
  };

  render() {
    const { strengthValue, tasteValue, valuesAdjusted } = this.state;
    const stepSize =
      typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 1;

    const separators = stengthToSegments(strengthValue);

    const showResetButton =
      valuesAdjusted &&
      (tasteValue !== DEFAULT_TASTE_VALUE ||
        strengthValue !== DEFAULT_STRENGTH_VALUE);

    return (
      <>
        <div className="mv4 flex w-100 tnum">
          <span className="w-40">
            <span className="fw5 db dib-ns">Taste:</span> {tasteValue}{' '}
            {getArrayValueFromPercent(tasteValue, [
              'Sweeter',
              'Normal',
              'More acidity',
            ])}
          </span>
          <span className="mr-auto">
            <span className="fw5 db dib-ns">Strength:</span> {strengthValue}{' '}
            {getArrayValueFromPercent(strengthValue, [
              'Weak',
              'Normal',
              'Strong',
            ])}
          </span>

          <BlankButton
            className="fr self-baseline"
            hidden={!showResetButton}
            onClick={() => {
              this.setState(defaultState);
            }}>
            Reset
          </BlankButton>
        </div>

        <div className="flex">
          <Range
            min={10}
            max={90}
            step={stepSize}
            className="w-40"
            onChange={this.onChange('tasteValue')}
            value={tasteValue}
            separators={2}
            idleSlider="😴"
            sliderIcons={['🤤', '😏']}
            onBlur={() =>
              this.setState({
                valuesAdjusted: true,
              })
            }
          />

          <Line position={0} wrapped />
          <Range
            min={10}
            max={90}
            step={stepSize}
            className="w-60"
            onChange={this.onChange('strengthValue')}
            value={strengthValue}
            separators={separators}
            idleSlider="😴"
            sliderIcons={['😌', '😊', '😛']}
            onBlur={() =>
              this.setState({
                valuesAdjusted: true,
              })
            }
          />
        </div>
        <span className="f6 mt3 silver w-100 db tc mb4">
          Space between lines indicate the number of pours: {separators + 2}
        </span>

        <ColorButton
          onClick={() => {
            if (valuesAdjusted) {
              this.onComplete();
            } else {
              this.setState(
                {
                  tasteValue: DEFAULT_TASTE_VALUE,
                  strengthValue: DEFAULT_STRENGTH_VALUE,
                  valuesAdjusted: true,
                },
                this.onComplete,
              );
            }
          }}>
          {valuesAdjusted ? 'Next' : 'Use defaults'}
        </ColorButton>
      </>
    );
  }
}

export default ProfileSlider;
