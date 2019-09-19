// @flow
import React, { forwardRef } from 'react';

/**
 * forwardRef doesn't support defaultProps, so we have to make
 * it optional and disable the eslint rule.
 * Note that we're giving className a default value in the destructure on line 18
 * so the behaviour is the same.
 */

type StepWrapperProps = {|
  children: React$Node,
  isActive: boolean,
  // eslint-disable-next-line react/require-default-props
  className?: string,
|};

const StepWrapper = forwardRef<StepWrapperProps, HTMLDivElement>(
  ({ children, isActive, className = '' }: StepWrapperProps, ref) => (
    <div
      ref={ref}
      tabIndex="-1"
      className={`mv6 outline-0 ${className} ${isActive ? '' : 'o-50'}`}>
      {children}
    </div>
  ),
);

StepWrapper.displayName = 'StepWrapper';

export default StepWrapper;
