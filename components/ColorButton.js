// @flow
import React from 'react';
import theme from '../lib/theme';

type Props = {|
  children: React$Node,
  className: string,
  type: string,
  onClick: (SyntheticEvent<HTMLButtonElement>) => void,
|};

const ColorButton = ({ children, className, ...rest }: Props) => (
  <>
    <style jsx>{`
      button {
        background-color: ${theme.colors.orange};
      }
    `}</style>
    <button
      type="button"
      className={`f4 fw4 white-90 pointer pv1 bn br2 w-100 pv2 ${className}`}
      {...rest}>
      {children}
    </button>
  </>
);

ColorButton.defaultProps = {
  className: '',
  onClick: () => {},
  type: 'button',
};

export default ColorButton;
