// @flow
import React from 'react';
import { cx, css } from 'react-emotion';

type StepWrapperProps = {
  children: React$Node,
  isActive: boolean,
  forwardRef: React$Ref<'div'>,
  className?: string,
};

const StepWrapper = ({
  children,
  isActive,
  forwardRef,
  className = '',
}: StepWrapperProps = {}) => (
  <div
    ref={forwardRef}
    className={cx(
      'mv6',
      className,
      css`
        opacity: ${isActive ? 1 : 0.5};
      `,
    )}>
    {children}
  </div>
);

export default StepWrapper;
