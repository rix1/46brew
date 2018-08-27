// @flow
import React, { PureComponent, Fragment } from 'react';
import InlineInput from './InlineInput';

type Props = {
  onCompleted: ({ resetWeight: string }) => void,
};

type State = {
  resetWeight: string,
  inputError: boolean,
};

class ResetScaleStep extends PureComponent<Props, State> {
  state = {
    resetWeight: '',
    inputError: false,
  };

  completeStep = () => {
    const { onCompleted } = this.props;
    const { resetWeight } = this.state;
    if (resetWeight) {
      onCompleted({
        resetWeight,
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
        resetWeight: value,
      });
    }
  };

  render() {
    const { resetWeight, inputError } = this.state;
    return (
      <Fragment>
        <p className="f3">
          Place your container on the scale and zero out. Place (wet) filter and
          add coffee. Now, let me know what the scale reads:{' '}
          <InlineInput
            type="text"
            className="ph1"
            value={resetWeight}
            onBlur={this.completeStep}
            onChange={this.handleChange}
            error={inputError}
          />{' '}
          grams.
        </p>
      </Fragment>
    );
  }
}

export default ResetScaleStep;
