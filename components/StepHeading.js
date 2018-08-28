// @flow
import React from 'react';
import Emoji from './Emoji';

type Props = {
  children: React$Node,
  done: boolean,
  emoji?: string,
};

const StepHeading = ({ children, emoji = '👉', done = false }: Props) => (
  <h1 className="f3 f2-ns pt3">
    <span className="o-80">
      {done ? (
        <Emoji description="Done!" emoji="✅" />
      ) : (
        <Emoji description="Ready?" emoji={emoji} />
      )}{' '}
    </span>
    {children}
  </h1>
);

export default StepHeading;
