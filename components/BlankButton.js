// @flow
import React from 'react';
import { cx } from 'emotion';

type Props = {
  children: React$Node,
  className?: string,
};

const BlankButton = ({ children, className = '', ...rest }: Props = {}) => (
  <button
    type="button"
    className={cx(
      'f5 fw4 dim link navy underline pointer pv1 transparent bn',
      className,
    )}
    {...rest}>
    {children}
  </button>
);

export default BlankButton;
