// @flow
import React from 'react';

type Props = {
  x?: number,
  y?: number,
  reason: string,
  children: React$Node,
};

const PixelShifter = ({ x = 0, y = 0, children }: Props = {}) => (
  <span
    className="dib"
    style={{
      transform: `translate(${x}px, ${y}px)`,
    }}>
    {children}
  </span>
);

export default PixelShifter;
