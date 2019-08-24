// @flow
import React from 'react';
import { useTimerContext } from '../Timer/Timer';
import ColorButton from '../ColorButton';

const BrewControls = () => {
  const { isRunning, toggleTimer } = useTimerContext();
  return (
    <span>
      <ColorButton className="mb3" onClick={toggleTimer}>
        {isRunning ? 'Pause' : 'Start'}
      </ColorButton>
    </span>
  );
};

export default BrewControls;
