// @flow
import React from 'react';
import TextMuted from '../TextMuted';

type Props = {
  activity: 'start' | 'pouring' | 'waiting' | 'done',
};
const BrewActivity = ({ activity }: Props) => {
  // TODO: ADD BREW CONTEXT

  switch (activity) {
    case 'pouring':
      return <TextMuted>Pour water now</TextMuted>;
    case 'waiting':
      return <TextMuted>Wait, let it rest</TextMuted>;
    case 'start':
      return <TextMuted>Wating to start...</TextMuted>;
    case 'done':
      return <TextMuted>Done!</TextMuted>;
    default:
      return null;
  }
};

export default BrewActivity;
