// @flow
import React, { useContext } from 'react';
import { useTimer } from './useTimer';
import TimerContext from './TimerContext';

type TimerContextProviderProps = {|
  children: React$Node,
  multiplier?: number,
|};

export const TimerContextProvider = ({
  children,
  multiplier,
}: TimerContextProviderProps) => {
  const { time, isRunning, toggleTimer, reset } = useTimer(multiplier);
  const context = { time, isRunning, toggleTimer, reset };
  return (
    <TimerContext.Provider value={context}>{children}</TimerContext.Provider>
  );
};

TimerContextProvider.defaultProps = {
  multiplier: undefined,
};

export function useTimerContext() {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error(
      'Cannot use timerContext without wrapping in TimerContextProvider',
    );
  }

  return context;
}
