// @flow
import React, { Fragment, PureComponent } from 'react';

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
        type: Number(value) > 100 ? 'water' : 'coffee',
        inputError: false,
      });
    }
  };

  render() {
    const { value, type, inputError } = this.state;
    return (
      <Fragment>
        <p className="f3">
          Please let me know how much coffee (or water) you are going to use:
          <InlineInput
            type="text"
            className="ph1"
            value={value}
            onChange={this.handleChange}
            error={inputError}
          />{' '}
          g{type && ` of ${type}`}.
        </p>
        <ColorButton onClick={this.completeStep}>Next</ColorButton>
      </Fragment>
    );
  }
}

export default SetAmountStep;
