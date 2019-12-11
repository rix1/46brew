// @flow
import React from 'react';

type TextMutedProps = {|
  children: React$Node,
  className: string,
|};

const TextMuted = ({ children, className, ...rest }: TextMutedProps) => (
  <span className={`dib f6 moon-gray ${className}`} {...rest}>
    {children}
  </span>
);

TextMuted.defaultProps = {
  className: '',
};

export default TextMuted;
