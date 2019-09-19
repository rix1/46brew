// @flow
import React from 'react';

import Stat from '../Stat';

import BrewActivity from './BrewActivity';
import VisualizePours from './VisualizePours';

type Props = {
  activity: string,
  pourNumber: number,
  currentWeight: number,
  targetWeight: number,
  timeToNextStep: number,
  weightSteps: Array<number>,
};

const BrewViz = ({
  activity,
  pourNumber,
  currentWeight,
  targetWeight,
  timeToNextStep,
  weightSteps,
}: Props) => {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="w-100">
        <VisualizePours steps={weightSteps} activePour={pourNumber} />
      </div>
      <div className="relative w-100 tc">
        <div className="tc">
          <style jsx>{`
            span {
              color: #333333;
              font-feature-settings: 'tnum';
              font-variant-numeric: tabular-nums;
            }
            .waiting {
              color: #aaaaaa;
            }
          `}</style>
          <span className={`f-headline lh-solid fw2 ${activity}`}>
            {timeToNextStep}
          </span>
        </div>
        <BrewActivity activity={activity} />
      </div>

      <div className="relative w-100 bt bb flex flex-wrap pv4 mv4 b--light-gray">
        <div className="db ttu tracked tc w-100">Weight</div>
        <Stat desc="Current">{currentWeight}</Stat>
        <Stat desc="Target">{targetWeight}</Stat>
      </div>
    </div>
  );
};

export default BrewViz;
