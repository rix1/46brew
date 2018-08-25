// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node,
};

const Content = ({ children }: Props) => (
  <div className="ph3">
    <div className="mw8 center">{children}</div>
  </div>
);

export default Content;
