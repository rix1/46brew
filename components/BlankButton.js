// @flow
import React from 'react';

type Props = {|
  children: React$Node,
  className: string,
  onClick: (SyntheticEvent<HTMLButtonElement>) => void,
  hidden: boolean,
|};

const BlankButton = ({ children, className, ...rest }: Props) => (
  <button
    type="button"
    className={`f5 fw4 dim link navy underline pointer pv1 bg-transparent bn ${className}`}
    {...rest}>
    {children}
  </button>
);

BlankButton.defaultProps = {
  className: '',
  onClick: () => {},
  hidden: false,
};

export default BlankButton;
