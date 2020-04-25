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
  onChange,
}: TimerContextProviderProps) => {
  // const { time, isRunning, toggleTimer, stop } = ;
  // const context = { time, isRunning, toggleTimer, stop };
  return (
    <TimerContext.Provider value={useTimer(multiplier, onChange)}>
      {children}
    </TimerContext.Provider>
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
