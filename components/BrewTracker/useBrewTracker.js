// @flow
import { useState, useEffect } from 'react';
import { POUR_TIME, TIME_BETWEEN_POURS } from '../../lib/constants';
import { sumArrayTo } from '../../lib/sumArrayTo';
import { useTimerContext } from '../Timer/Timer';
import brewStateMachine from './brewStateMachine';
import { getTimeToNextStep } from './utils';

export type State = {|
  pourNumber: number,
  pouringTimeTarget: number,
  waitingTimeTarget: number,
  weightSteps: Array<number>,
  activity: 'start' | 'pouring' | 'waiting' | 'done',
|};

export function useBrewTracker(
  baseMesurement,
  baseWeight,
  resetWeight,
  strength,
  taste,
) {
  const { time } = useTimerContext();

  const [pourNumber, setPourNumber] = useState(0);
  const [pouringTimeTarget, setPouringTimeTarget] = useState(POUR_TIME);
  const [waitingTimeTarget, setWaitingTimeTarget] = useState(
    TIME_BETWEEN_POURS + POUR_TIME,
  );
  const [weightSteps, setWeightSteps] = useState([]);
  const [activity, setActivity] = useState('start');

  useEffect(
    () => {
      const nextState = brewStateMachine(
        {
          time,
          baseMesurement,
          baseWeight,
          strength,
          taste,
        },
        {
          pourNumber,
          pouringTimeTarget,
          waitingTimeTarget,
          weightSteps,
          activity,
        },
      );
      if (nextState) {
        setPourNumber(nextState.pourNumber);
        setPouringTimeTarget(nextState.pouringTimeTarget);
        setWaitingTimeTarget(nextState.waitingTimeTarget);
        setWeightSteps(nextState.weightSteps);
        setActivity(nextState.activity);
      }
    },
    [time],
  );

  return {
    activity,
    weightSteps,
    pourNumber,
    currentWeight:
      activity === 'done'
        ? sumArrayTo(weightSteps, pourNumber + 1 + resetWeight)
        : sumArrayTo(weightSteps, pourNumber) + resetWeight,
    targetWeight:
      activity === 'done'
        ? 0
        : sumArrayTo(weightSteps, pourNumber + 1) + resetWeight,
    timeToNextStep: getTimeToNextStep(
      { pouringTimeTarget, waitingTimeTarget, activity },
      time,
    ),
  };
}