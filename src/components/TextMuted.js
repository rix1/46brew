// @flow

import * as React from 'react';

type TextMutedProps = {|
  children: React.Node,
  className: string,
|};

const TextMuted = ({
  children,
  className,
  ...rest
}: TextMutedProps): React.Element<'span'> => (
  <span className={`dib f6 moon-gray ${className}`} {...rest}>
    {children}
  </span>
);

TextMuted.defaultProps = {
  className: '',
};

export default TextMuted;
