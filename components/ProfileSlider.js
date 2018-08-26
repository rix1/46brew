// @flow
import React, { PureComponent, Fragment } from 'react';

import Range from './Range';
import Line from './Line';

type Props = {};
type State = {
  tasteValue: number,
  strengthValue: number,
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
    });
  };

  render() {
    const { strengthValue, tasteValue } = this.state;

    return (
      <Fragment>
        <div className="flex">
          <Range
            className="w-40"
            onChange={this.onChange('tasteValue')}
            value={tasteValue}
            separators={[50]}
            idleSlider="☕️"
            activeSliders={['🤤', '😯']}
          />

          <Line position={0} contained />
          <Range
            className="w-60"
            onChange={this.onChange('strengthValue')}
            value={strengthValue}
            separators={[33, 66]}
            idleSlider="☕️"
            activeSliders={['😌', '😯', '😵']}
          />
        </div>
        <p className="mt4">
          <strong>Taste:</strong> {tasteValue}{' '}
          {tasteValue < 50 ? '(more sweet)' : '(more bitter)'}
          <strong className="ml3">Strength:</strong> {strengthValue}
        </p>
      </Fragment>
    );
  }
}

export default ProfileSlider;
