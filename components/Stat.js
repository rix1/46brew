// @flow
import React from 'react';

type Props = {
  children: React$Node,
  desc: string,
};

const Stat = ({ desc, children }: Props) => (
  <div className="mv3 db tc w-50 w-33-ns">
    <strong className="db">{desc}</strong>{' '}
    <span className="f1 fw2">{children}</span>
  </div>
);

export default Stat;
