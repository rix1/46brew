// @flow
import React, { Fragment, PureComponent } from 'react';

import { coffeeConverter, coffeeToWater } from '../lib/conversion';

import { COFFE_CUP_SIZE } from '../lib/constants';
import InlineInput from './InlineInput';
import ColorButton from './ColorButton';

type Props = {
  onCompleted: ({ baseMeasurement: Brew$UnitType, baseWeight: string }) => void,
};
type State = {
  type: ?Brew$UnitType,
  value: string,
  inputError: boolean,
};

class SetAmountStep extends PureComponent<Props, State> {
  state = {
    value: '',
    type: undefined,
    inputError: false,
  };

  completeStep = () => {
    const { onCompleted } = this.props;
    const { type, value } = this.state;
    if (type && value) {
      onCompleted({
        baseWeight: value,
        baseMeasurement: type,
      });
    } else {
      this.setState({
        inputError: true,
      });
    }
  };

  handleChange = (event: SyntheticInputEvent<HTMLFormElement>) => {
    const { value } = event.target;
    if (!Number.isNaN(Number(value))) {
      this.setState({
        value,
        type: this.getType(value),
        inputError: false,
      });
    }
  };

  getType = (value: number | string) =>
    Number(value) > 100 ? 'water' : 'coffee';

  getWater = () => {
    const { value, type } = this.state;
    if (type === 'water') {
      return Number(value);
    }
    return coffeeToWater(Number(value));
  };

  render() {
    const { value, type, inputError } = this.state;
    const converted = (type && coffeeConverter(Number(value), type)) || 0;
    const cups = Math.round(Number(this.getWater() / COFFE_CUP_SIZE) * 10) / 10;

    return (
      <Fragment>
        <p className="f3">
          Please let me know how much coffee (or water) you are going to use:
          <InlineInput
            type="number"
            className="ph1"
            value={value}
            onChange={this.handleChange}
            error={inputError}
          />{' '}
          g{type && ` of ${type}.`}
        </p>
        <span className="db lh-copy fw5">That is...</span>
        <span className="ml3 db lh-copy">
          {converted} grams of {this.getType(converted)}
        </span>
        <span className="ml3 db mb3 lh-copy">{cups} cups of coffee</span>
        <ColorButton onClick={this.completeStep}>Next</ColorButton>
      </Fragment>
    );
  }
}

export default SetAmountStep;
