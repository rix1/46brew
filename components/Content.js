// @flow
import React from 'react';

type Props = {
  children: React$Node,
};

const Content = ({ children }: Props) => (
  <div className="ph3">
    <div className="mw8 center">{children}</div>
  </div>
);

export default Content;
