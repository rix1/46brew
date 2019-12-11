// @flow
import React, { PureComponent } from 'react';
import InlineInput from './InlineInput';
import ColorButton from './ColorButton';

type Props = {
  onCompleted: Brew$Weight => void,
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

  completeStep = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onCompleted } = this.props;
    const { resetWeight } = this.state;
    if (resetWeight) {
      onCompleted(Number(resetWeight));
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
        resetWeight: value,
      });
    }
  };

  render() {
    const { resetWeight, inputError } = this.state;
    return (
      <form onSubmit={this.completeStep}>
        <p className="lh-copy gray">
          First place your container on the scale and zero out. Then add your
          (wet) filter and add coffee.
        </p>
        <p className="f3">
          Now, let me know what the scale reads:
          <InlineInput
            type="number"
            className="ph1"
            value={resetWeight}
            onChange={this.handleChange}
            error={inputError}
          />{' '}
          grams.
        </p>
        <ColorButton type="submit">Next</ColorButton>
      </form>
    );
  }
}

export default ResetScaleStep;
