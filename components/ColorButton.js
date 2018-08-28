// @flow
import React from 'react';
import { cx, css } from 'emotion';
import { withTheme } from 'emotion-theming';
import { type ThemeProps } from '../FlowTypes';

type Props = {
  children: React$Node,
  className?: string,
};

const ColorButton = ({
  children,
  className = '',
  theme,
  ...rest
}: Props & ThemeProps = {}) => (
  <button
    type="button"
    className={cx(
      css`
        background-color: ${theme.colors.orange};
      `,
      'f5 fw4 white-90 pointer pv1 bn br2',
      className,
    )}
    {...rest}>
    {children}
  </button>
);

const Wrapped: React$ComponentType<Props> = withTheme(ColorButton);
export default Wrapped;
