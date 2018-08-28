// @flow
import React from 'react';
import Emoji from './Emoji';

type Props = {
  children: React$Node,
  done: boolean,
  emoji?: string,
  advanceButton?: React$Node,
};

const StepHeading = ({
  advanceButton,
  children,
  emoji = '👉',
  done = false,
}: Props = {}) => (
  <div className="flex justify-between items-end">
    <h1 className="f3 f2-ns pt3">
      <span className="o-80 f3 v-mid">
        {done ? (
          <Emoji description="Done!" emoji="✅" />
        ) : (
          <Emoji description="Ready?" emoji={emoji} />
        )}{' '}
      </span>
      {children}
    </h1>
    {advanceButton && <span className="mb3">{advanceButton}</span>}
  </div>
);

export default StepHeading;
