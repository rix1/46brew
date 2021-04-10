// @flow
import * as React from 'react';
import InlineInput from './InlineInput';
import ColorButton from './ColorButton';

type Props = {|
  onCompleted: (Brew$Weight) => void,
|};

type State = {|
  resetWeight: string,
|};

class ResetScaleStep extends React.PureComponent<Props, State> {
  state: State = {
    resetWeight: '',
  };

  completeStep: (event: SyntheticEvent<HTMLFormElement>) => void = (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const { resetWeight } = this.state;
    if (!resetWeight) {
      this.setState({ resetWeight: '0' }, () => this.completeStep(event));
      return;
    }

    const { onCompleted } = this.props;
    onCompleted(Number(resetWeight || 0));
  };

  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void = (
    event: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    if (!Number.isNaN(Number(value))) {
      this.setState({
        resetWeight: value,
      });
    }
  };

  render(): React.Element<'form'> {
    const { resetWeight } = this.state;
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
            step={0.1}
          />{' '}
          grams.
        </p>
        <ColorButton type="submit">Next</ColorButton>
      </form>
    );
  }
}

export default ResetScaleStep;
