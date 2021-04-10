// @flow
import * as React from 'react';
import theme from '../lib/theme';

type Props = {|
  className: string,
  error: boolean,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  value: string | string[] | number,
  min: number | void,
  step: number | void,
|};

const InlineInput = ({ className, error, ...rest }: Props): React.Node => (
  <>
    <style jsx>{`
      input {
        border: none;
        border-bottom: ${theme.sizes.lineWidth} dotted gray;
        outline: none;
        width: 3.6em;
        text-align: right;
      }
      input:focus {
        border-bottom: ${theme.sizes.lineWidth} solid ${theme.colors.orange};
      }
      .error {
        border-bottom-color: red;
      }
    `}</style>
    <input
      className={`ph2 ${className} ${error ? 'error' : ''}`}
      inputMode="numeric"
      pattern="[0-9]*"
      type="text"
      {...rest}
    />
  </>
);

InlineInput.defaultProps = {
  className: '',
  error: false,
  min: undefined,
};

export default InlineInput;
