// @flow
import React, { PureComponent, Fragment } from 'react';

import getStringFromValue from '../lib/getStringFromValue';
import Range from './Range/Range';
import Line from './Line';
import ColorButton from './ColorButton';
import BlankButton from './BlankButton';

const DEFAULT_TASTE_VALUE = 50;
const DEFAULT_STRENGTH_VALUE = 50;

type Props = {
  onComplete: ({ taste: number, strength: number }) => void,
};
type State = {
  tasteValue: number,
  strengthValue: number,
  strengthValueSet: boolean,
  tasteValueSet: boolean,
};

export const getSeparators = (val: number) => {
  let separators = 3;
  if (val < 33) {
    separators -= 1;
  } else if (val > 66) {
    separators += 1;
  }

  return [...Array(separators)]
    .map((el, index, array) => Math.round(index * (100 / array.length)))
    .filter(Boolean);
};

class ProfileSlider extends PureComponent<Props, State> {
  state = {
    tasteValue: DEFAULT_TASTE_VALUE,
    strengthValue: DEFAULT_STRENGTH_VALUE,
    strengthValueSet: false,
    tasteValueSet: false,
  };

  componentDidMount() {}

  onChange = (type: string) => (
    event: SyntheticInputEvent<HTMLFormElement>,
  ) => {
    this.setState({
      [type]: event.target.value,
      [`${type}Set`]: true,
    });
  };

  onComplete = () => {
    const { onComplete } = this.props;
    const {
      tasteValue,
      strengthValue,
      strengthValueSet,
      tasteValueSet,
    } = this.state;

    if (onComplete && tasteValueSet && strengthValueSet) {
      onComplete({ taste: tasteValue, strength: strengthValue });
    }
  };

  render() {
    const {
      strengthValue,
      tasteValue,
      strengthValueSet,
      tasteValueSet,
    } = this.state;
    const hasChanged = strengthValueSet || tasteValueSet;
    return (
      <Fragment>
        <p className="mv4">
          <span className="fw5">Taste:</span> {tasteValue}{' '}
          {getStringFromValue(tasteValue, [
            'Sweeter',
            'Normal',
            'More acidity',
          ])}
          <span className="ml3 fw5">Strength:</span> {strengthValue}{' '}
          {getStringFromValue(strengthValue, ['Weak', 'Normal', 'Strong'])}
          {hasChanged &&
            (tasteValue !== DEFAULT_TASTE_VALUE ||
              strengthValue !== DEFAULT_STRENGTH_VALUE) && (
              <BlankButton
                onClick={() => {
                  this.setState({
                    tasteValue: DEFAULT_TASTE_VALUE,
                    tasteValueSet: true,
                    strengthValue: DEFAULT_STRENGTH_VALUE,
                    strengthValueSet: true,
                  });
                }}>
                Reset
              </BlankButton>
            )}
        </p>

        <div className="flex mb4">
          <Range
            className="w-40"
            onChange={this.onChange('tasteValue')}
            value={tasteValue}
            separators={[50]}
            idleSlider="😴"
            activeSliders={['🤤', '😏']}
            onBlur={() =>
              this.setState({
                tasteValueSet: true,
              })
            }
          />

          <Line position={0} contained />
          <Range
            className="w-60"
            onChange={this.onChange('strengthValue')}
            value={strengthValue}
            separators={getSeparators(strengthValue)}
            idleSlider="😴"
            activeSliders={['😌', '😊', '😛']}
            onBlur={() =>
              this.setState({
                strengthValueSet: true,
              })
            }
          />
        </div>

        <ColorButton
          onClick={() => {
            if (!hasChanged) {
              this.setState(
                {
                  tasteValue: DEFAULT_TASTE_VALUE,
                  tasteValueSet: true,
                  strengthValue: DEFAULT_STRENGTH_VALUE,
                  strengthValueSet: true,
                },
                this.onComplete,
              );
            } else {
              this.onComplete();
            }
          }}>
          {hasChanged ? 'Next' : 'Use defaults'}
        </ColorButton>
      </Fragment>
    );
  }
}

export default ProfileSlider;
