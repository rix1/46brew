// @flow
import { useState, useEffect } from 'react';
import screenLock from '../../lib/screenLock';
import { POUR_TIME, TIME_BETWEEN_POURS } from '../../lib/constants';
import { useTimerContext } from '../Timer/Timer';
import brewStateMachine from './brewStateMachine';
import {
  getTimeToNextStep,
  getCurrentWeightDisplay,
  getTargetWeightDisplay,
} from './utils';

export type State = {|
  pourNumber: Brew$PourNumber,
  pouringTimeTarget: number,
  waitingTimeTarget: number,
  weightSteps: Brew$WeightSteps,
  activity: Brew$Activity,
|};

export function useBrewTracker(
  baseWeight: Brew$Weight,
  resetWeight: Brew$Weight,
  strength: Brew$Strength,
  taste: Brew$Taste,
): {|
  activity: 'done' | 'pouring' | 'start' | 'waiting',
  currentWeight: any,
  pourNumber: number,
  targetWeight: any,
  timeToNextStep: any,
  weightSteps: Brew$WeightSteps | Array<Brew$Weight>,
|} {
  const { time, isRunning, toggleTimer } = useTimerContext();

  const [pourNumber, setPourNumber] = useState(0);
  const [pouringTimeTarget, setPouringTimeTarget] = useState(POUR_TIME);
  const [waitingTimeTarget, setWaitingTimeTarget] = useState(
    TIME_BETWEEN_POURS + POUR_TIME,
  );
  const [weightSteps, setWeightSteps] = useState([]);
  const [activity, setActivity] = useState('start');

  useEffect(() => {
    const nextState = brewStateMachine(
      {
        time,
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
      if (nextState.activity === 'done' && isRunning) {
        toggleTimer();

        screenLock.release();
      }

      if (nextState.activity === 'pouring') {
        if (!screenLock.hasLock()) {
          screenLock.request();
        }
      }

      setPourNumber(nextState.pourNumber);
      setPouringTimeTarget(nextState.pouringTimeTarget);
      setWaitingTimeTarget(nextState.waitingTimeTarget);
      setWeightSteps(nextState.weightSteps);
      setActivity(nextState.activity);
    }
  }, [
    activity,
    baseWeight,
    isRunning,
    pouringTimeTarget,
    pourNumber,
    strength,
    taste,
    time,
    toggleTimer,
    waitingTimeTarget,
    weightSteps,
  ]);

  return {
    activity,
    weightSteps,
    pourNumber,
    currentWeight: getCurrentWeightDisplay(
      activity,
      resetWeight,
      weightSteps,
      pourNumber,
    ),
    targetWeight: getTargetWeightDisplay(
      activity,
      resetWeight,
      weightSteps,
      pourNumber,
    ),
    timeToNextStep: getTimeToNextStep(
      activity,
      pouringTimeTarget,
      waitingTimeTarget,
      time,
    ),
  };
}
