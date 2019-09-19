// @flow
import React from 'react';
import theme from '../lib/theme';

type Props = { className: string, error: boolean };

const InlineInput = ({ className, error, ...rest }: Props) => (
  <>
    <style jsx>{`
      input {
        border: none;
        border-bottom: ${theme.sizes.lineWidth} dotted gray;
        outline: none;
        width: 3em;
        text-align: right;
      }
      input:focus {
        border-bottom: ${theme.sizes.lineWidth} solid ${theme.colors.orange};
      }
      .error {
        border-bottom-color: red;
      }
    `}</style>
    <input className={`ph2 ${className} ${error ? 'error' : ''}`} {...rest} />
  </>
);

InlineInput.defaultProps = {
  className: '',
  error: false,
};

export default InlineInput;
