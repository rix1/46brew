// @flow
import React, { PureComponent } from 'react';
import { cx } from 'react-emotion';
import uuid from 'uuid/v4';

import Line from '../Line';
import StyledRange from './StyledRange';

type Props = {
  className?: string,
  idleSlider?: string,
  separators?: Array<number>,
  activeSliders?: Array<string>,
  onChange: (SyntheticInputEvent<HTMLFormElement>) => void,
  value: number,
};
type State = {
  hasChanged: boolean,
};

class Range extends PureComponent<Props, State> {
  static defaultProps = {
    className: '',
    separators: [],
    activeSliders: ['😳'],
    idleSlider: '😴',
  };

  state = {
    hasChanged: false,
  };

  onChange = (event: SyntheticInputEvent<HTMLFormElement>) => {
    const { onChange } = this.props;
    this.setState({
      hasChanged: true,
    });
    onChange(event);
  };

  render() {
    const {
      className,
      separators,
      activeSliders,
      idleSlider,
      value,
      onChange,
      ...rest
    } = this.props;

    const { hasChanged } = this.state;

    return (
      <div
        className={cx('relative br3', className)}
        style={{
          backgroundColor: `hsla(
        48,
        ${value}%,
        ${100 - 0.25 * value}%,
        1
      )`,
        }}>
        {separators &&
          separators.map(separator => (
            <Line key={uuid()} position={separator} />
          ))}
        <StyledRange
          type="range"
          value={value}
          activeSliders={activeSliders}
          idleSlider={idleSlider}
          onChange={this.onChange}
          hasChanged={hasChanged}
          {...rest}
        />
      </div>
    );
  }
}

export default Range;
