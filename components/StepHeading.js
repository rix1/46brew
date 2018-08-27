// @flow
import React from 'react';
import Emoji from './Emoji';

type Props = {
  children: React$Node,
  done: boolean,
};

const StepHeading = ({ children, done = false }: Props) => (
  <h1>
    {done ? (
      <Emoji description="Done!" emoji="✅" />
    ) : (
      <Emoji description="Ready?" emoji="👉" />
    )}{' '}
    {children}
  </h1>
);

export default StepHeading;
