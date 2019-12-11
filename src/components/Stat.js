// @flow
import React from 'react';

type Props = {
  children: React$Node,
  desc: string,
};

const Stat = ({ desc, children }: Props) => (
  <div className="mv3 db tc w-50">
    <span className="f-subheadline fw2">{children}</span>
    <span className="f5 moon-gray">g.</span>
    <span className="db moon-gray f6 mt4 ttu">{desc}</span>
  </div>
);

export default Stat;
