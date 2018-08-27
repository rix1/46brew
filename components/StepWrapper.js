// @flow
import React from 'react';
import { cx, css } from 'react-emotion';

type StepWrapperProps = {
  children: React$Node,
  isActive: boolean,
};

const StepWrapper = ({ children, isActive }: StepWrapperProps) => (
  <div
    className={cx(
      'mv5',
      css`
        opacity: ${isActive ? 1 : 0.5};
      `,
    )}>
    {children}
  </div>
);

export default StepWrapper;
