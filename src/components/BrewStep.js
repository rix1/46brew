// @flow
import React from 'react';

import { timeToString } from '../lib/formatTime';
import BrewControls from './BrewTracker/BrewControls';
import StepHeading from './StepHeading';
import BrewViz from './BrewTracker/BrewViz';
import { useBrewTracker } from './BrewTracker/useBrewTracker';

import TextMuted from './TextMuted';
import { useTimerContext } from './Timer/Timer';
import BrewActivity from './BrewTracker/BrewActivity';

type Props = {
  baseWeight: Brew$Weight,
  resetWeight: Brew$Weight,
  strength: Brew$Strength,
  taste: Brew$Taste,
};

const BrewStep = ({ baseWeight, resetWeight, strength, taste }: Props) => {
  const {
    activity,
    currentWeight,
    pourNumber,
    weightSteps,
    targetWeight,
    timeToNextStep,
  } = useBrewTracker(baseWeight, resetWeight, strength, taste);
  const { time } = useTimerContext();
  return (
    <>
      <div className="flex justify-between items-end">
        <StepHeading done={activity === 'done'}>
          {activity === 'start' ? (
            "It's brew time"
          ) : (
            <BrewActivity activity={activity} />
          )}
        </StepHeading>
        <BrewControls />
      </div>
      <div className="flex justify-between">
        <TextMuted>Pour no. {pourNumber + 1}</TextMuted>
        <TextMuted className="tnum">{timeToString(time)}</TextMuted>
      </div>

      <BrewViz
        activity={activity}
        currentWeight={currentWeight}
        pourNumber={pourNumber}
        weightSteps={weightSteps}
        targetWeight={targetWeight}
        timeToNextStep={timeToNextStep}
      />
    </>
  );
};

BrewStep.defaultProps = {
  resetWeight: 0,
};

export default BrewStep;
