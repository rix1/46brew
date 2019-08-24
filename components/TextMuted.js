// @flow
import React from 'react';
import { cx } from 'react-emotion';

type TextMutedProps = {
  children: React$Node,
  className?: string,
};

const TextMuted = ({
  children,
  className = '',
  ...rest
}: TextMutedProps = {}) => (
  <span className={cx('dib f6 moon-gray', className)} {...rest}>
    {children}
  </span>
);

export default TextMuted;
