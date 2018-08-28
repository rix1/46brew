// @flow
import React, { PureComponent, Fragment } from 'react';

import Range from './Range/Range';
import Line from './Line';

type Props = {
  onComplete: ({ taste: number, strength: number }) => void,
};
type State = {
  tasteValue: number,
  strengthValue: number,
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
    tasteValue: 50,
    strengthValue: 50,
  };

  componentDidMount() {}

  onChange = (type: string) => (
    event: SyntheticInputEvent<HTMLFormElement>,
  ) => {
    this.setState({
      [type]: event.target.value,
      [`${type}Changed`]: true,
    });
  };

  onComplete = () => {
    const { onComplete } = this.props;
    const { tasteValue, strengthValue } = this.state;

    if (onComplete) {
      onComplete({ taste: tasteValue, strength: strengthValue });
    }
  };

  render() {
    const { strengthValue, tasteValue } = this.state;

    let tasteString = 'Normal';
    if (tasteValue < 33) {
      tasteString = 'Sweeter';
    }
    if (tasteValue > 66) {
      tasteString = 'More acidity';
    }

    return (
      <Fragment>
        <div className="flex">
          <Range
            className="w-40"
            onChange={this.onChange('tasteValue')}
            value={tasteValue}
            separators={[50]}
            idleSlider="😴"
            activeSliders={['🤤', '😏']}
            onBlur={this.onComplete}
          />

          <Line position={0} contained />
          <Range
            className="w-60"
            onChange={this.onChange('strengthValue')}
            value={strengthValue}
            separators={getSeparators(strengthValue)}
            idleSlider="😴"
            activeSliders={['😌']}
            onBlur={this.onComplete}
          />
        </div>
        <p className="mt4">
          <strong>Taste:</strong> {tasteValue} ({tasteString})
          <strong className="ml3">Strength:</strong> {strengthValue}
        </p>
      </Fragment>
    );
  }
}

export default ProfileSlider;
