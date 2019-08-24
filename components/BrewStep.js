// @flow
import React, { Fragment } from 'react';

import { timeToString } from '../lib/formatTime';
import BrewControls from './BrewTracker/BrewControls';
import StepHeading from './StepHeading';
import BrewViz from './BrewTracker/BrewViz';
import { useBrewTracker } from './BrewTracker/useBrewTracker';

import TextMuted from './TextMuted';
import { useTimerContext } from './Timer/Timer';

type Props = {
  baseMeasurement: ?Brew$UnitType, // eslint-disable-linesl
  baseWeight: number, // eslint-disable-linesl
  resetWeight?: number,
  strength: number, // eslint-disable-linesl
  taste: number, // eslint-disable-linesl
};

const BrewStep = ({
  baseMeasurement,
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
  } = useBrewTracker(baseMeasurement, baseWeight, resetWeight, strength, taste);
  const { time } = useTimerContext();

  return (
    <Fragment>
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
        {...{
          activity,
          currentWeight,
          pourNumber,
          weightSteps,
          targetWeight,
          timeToNextStep,
        }}
      />
    </Fragment>
  );
};

BrewStep.defaultProps = {
  resetWeight: 0,
};

export default BrewStep;
