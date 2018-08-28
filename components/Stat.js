// @flow
import React from 'react';

type Props = {
  children: React$Node,
  desc: string,
};

const Stat = ({ desc, children }: Props) => (
  <div className="mv3 db tc w-33">
    <strong className="db">{desc}</strong>{' '}
    <span className="f1 fw2">{children}</span>
  </div>
);

export default Stat;
