// @flow
import { createContext } from 'react';

type TimerContextType = {
  time: number,
  isRunning: boolean,
  toggleTimer: () => void,
  reset: () => void,
};

export default createContext<?TimerContextType>();
