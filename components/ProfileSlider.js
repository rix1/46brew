// @flow
import React, { PureComponent } from 'react';

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

  componentDidMount() {
    console.log('mounted');
  }

  onChange = (type: string) => (
    event: SyntheticInputEvent<HTMLFormElement>,
  ) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  render() {
    return (
      <div className="flex">
        <input
          type="range"
          className="w-40"
          onChange={this.onChange('tasteValue')}
          value={this.state.tasteValue}
        />
        <input
          type="range"
          className="w-60"
          onChange={this.onChange('strengthValue')}
          value={this.state.strengthValue}
        />
      </div>
    );
  }
}

export default ProfileSlider;
