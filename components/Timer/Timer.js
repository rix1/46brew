// @flow
import React, { useContext } from 'react';
import { useTimer } from './useTimer';
import TimerContext from './TimerContext';

type TimerContextProviderProps = {
  children: React$Node,
};

export const TimerContextProvider = ({
  children,
}: TimerContextProviderProps) => {
  const { time, isRunning, toggleTimer, reset } = useTimer();
  const context = { time, isRunning, toggleTimer, reset };
  return (
    <TimerContext.Provider value={context}>{children}</TimerContext.Provider>
  );
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
