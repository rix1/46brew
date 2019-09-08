// @flow
import React, { PureComponent, Fragment } from 'react';

import getStringFromValue from '../lib/getStringFromValue';
import Range, { stengthToSegments } from './Range/Range';
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

    const separators = stengthToSegments(strengthValue);

    const showResetButton =
      hasChanged &&
      (tasteValue !== DEFAULT_TASTE_VALUE ||
        strengthValue !== DEFAULT_STRENGTH_VALUE);

    return (
      <Fragment>
        <div
          className="mv4 flex w-100"
          css={`
            font-feature-settings: 'tnum';
            font-variant-numeric: tabular-nums;
          `}>
          <span className="w-40">
            <span className="fw5 db dib-ns">Taste:</span> {tasteValue}{' '}
            {getStringFromValue(tasteValue, [
              'Sweeter',
              'Normal',
              'More acidity',
            ])}
          </span>
          <span className="mr-auto">
            <span className="fw5 db dib-ns">Strength:</span> {strengthValue}{' '}
            {getStringFromValue(strengthValue, ['Weak', 'Normal', 'Strong'])}
          </span>

          <BlankButton
            css="
              padding-top: 0;
              padding-bottom: 0;
                "
            className="fr self-baseline"
            hidden={!showResetButton}
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
        </div>

        <div className="flex">
          <Range
            min={10}
            max={90}
            className="w-40"
            onChange={this.onChange('tasteValue')}
            value={tasteValue}
            separators={2}
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
            separators={separators}
            idleSlider="😴"
            activeSliders={['😌', '😊', '😛']}
            onBlur={() =>
              this.setState({
                strengthValueSet: true,
              })
            }
          />
        </div>
        <span className="f6 mt3 silver w-100 db tc mb4">
          Space between lines indicate the number of pours: {separators + 2}
        </span>

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
