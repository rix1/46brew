// @flow
import React from 'react';

import { timeToString } from '../lib/formatTime';
import BrewControls from './BrewTracker/BrewControls';
import StepHeading from './StepHeading';
import BrewViz from './BrewTracker/BrewViz';
import { useBrewTracker } from './BrewTracker/useBrewTracker';

import TextMuted from './TextMuted';
import { useTimerContext } from './Timer/Timer';

type Props = {
  brewUnit: ?Brew$UnitType,
  baseWeight: number,
  resetWeight?: number,
  strength: number,
  taste: number,
};

const BrewStep = ({
  brewUnit,
  baseWeight,
  resetWeight,
  strength,
  taste,
}: Props) => {
  const {
    activity,
    currentWeight,
    pourNumber,
    weightSteps,
    targetWeight,
    timeToNextStep,
  } = useBrewTracker(brewUnit, baseWeight, resetWeight, strength, taste);
  const { time } = useTimerContext();

  return (
    <>
      <div className="flex justify-between items-end">
        <StepHeading done={false}>It&apos;s brew time!</StepHeading>
        <BrewControls />
      </div>
      <div className="flex justify-between">
        <TextMuted>Pour no. {pourNumber}</TextMuted>
        <TextMuted
          css={`
            font-feature-settings: 'tnum';
            font-variant-numeric: tabular-nums;
          `}>
          {timeToString(time)}
        </TextMuted>
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
