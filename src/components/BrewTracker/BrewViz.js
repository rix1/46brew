// @flow
import React from 'react';

import Stat from '../Stat';

import TextMuted from '../TextMuted';
import BrewActivity from './BrewActivity';
import VisualizePours from './VisualizePours';

type Props = {|
  activity: $PropertyType<Brew$State, 'activity'>,
  pourNumber: $PropertyType<Brew$State, 'pourNumber'>,
  currentWeight: Brew$Weight,
  targetWeight: Brew$Weight,
  timeToNextStep: Brew$Time,
  weightSteps: $PropertyType<Brew$State, 'weightSteps'>,
|};

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
      <div className="w-100 mv4-ns mv3">
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
          <span className={`f-headline lh-title fw2 ${activity}`}>
            {timeToNextStep}
          </span>
        </div>
        <TextMuted>
          <BrewActivity activity={activity} />
        </TextMuted>
      </div>

      <div className="relative w-100 bt bb flex flex-wrap pv4 mb4 mt4 mt5-ns b--light-gray">
        <div className="db ttu tracked tc w-100">Weight</div>
        <Stat desc="Current">{currentWeight}</Stat>
        <Stat desc="Target">{targetWeight}</Stat>
      </div>
    </div>
  );
};

export default BrewViz;
