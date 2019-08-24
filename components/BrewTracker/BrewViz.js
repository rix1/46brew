// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';
import { withTheme } from 'emotion-theming';
import styled, { cx, css } from 'react-emotion';

import { sumArrayTo } from '../../lib/sumArrayTo';
import Stat from '../Stat';

import BrewActivity from './BrewActivity';

type Props = {
  activity: string,
  pourNumber: number,
  currentWeight: number,
  targetWeight: number,
  timeToNextStep: number,
  weightSteps: Array<number>,
};

const LineSegment = withTheme(styled.span`
  width: ${props => Math.round(props.w)}%;
  height: 4px;
  background-color: ${props =>
    props.active ? props.theme.colors.peach : props.theme.colors.dusty};
`);

const BrewViz = ({
  activity,
  pourNumber,
  currentWeight,
  targetWeight,
  timeToNextStep,
  weightSteps,
}: Props) => {
  const sum = sumArrayTo(weightSteps, weightSteps.length);
  const conversionFactor = 100 / sum;

  return (
    <div className="flex justify-between flex-wrap">
      <div className="w-100">
        {weightSteps.map((el, index) => (
          <LineSegment
            active={pourNumber - 1 === index}
            className="dib br3"
            key={uuidv4()}
            w={el * conversionFactor}
          />
        ))}
      </div>
      <div className="relative w-100 tc">
        <div className="tc">
          <span
            css={`
              font-feature-settings: 'tnum';
              font-variant-numeric: tabular-nums;
            `}
            className={cx(
              'f-headline lh-solid fw2',
              css`
                color: ${activity === 'waiting' ? '#AAAAAA' : '#333333'};
              `,
            )}>
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
