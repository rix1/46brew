// @flow
import React, { PureComponent } from 'react';

import { coffeeConverter, getType, getCups } from '../lib/conversion';

import { COFFE_CUP_SIZE } from '../lib/constants';
import InlineInput from './InlineInput';
import ColorButton from './ColorButton';

type Props = {|
  onCompleted: Brew$Weight => void,
|};

type State = {|
  value: number,
  inputError: boolean,
|};

class SetAmountStep extends PureComponent<Props, State> {
  state = {
    value: 0,
    inputError: false,
  };

  completeStep = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onCompleted } = this.props;
    const { value } = this.state;
    if (value) {
      onCompleted(value);
    } else {
      this.setState({
        inputError: true,
      });
    }
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!Number.isNaN(Number(value))) {
      this.setState({
        value: Number(value),
        inputError: false,
      });
    }
  };

  render() {
    const { value, inputError } = this.state;
    const converted = coffeeConverter(value) || 0;
    const cups = getCups(value);

    return (
      <form onSubmit={this.completeStep}>
        <p className="f3">
          Please let me know how much coffee (or water) you are going to use:
          <InlineInput
            className="ph1"
            error={inputError}
            type="number"
            value={value}
            onChange={this.handleChange}
          />{' '}
          {`g of ${getType(value)}.`}
        </p>
        <span className="db lh-copy fw5">That is...</span>
        <span className="ml3 db lh-copy">
          {converted} grams of {getType(converted)}
        </span>
        <span className="ml3 db mb3 lh-copy">{cups} cups of coffee</span>
        <ColorButton type="submit">Next</ColorButton>
      </form>
    );
  }
}

export default SetAmountStep;
