// @flow
import React, { memo } from 'react';
import uuidv4 from 'uuid/v4';
import { sumArrayTo } from '../../lib/sumArrayTo';
import PourVisualizer from './PourVisualizer';

type Props = {|
  steps: Array<number>,
  activePour: number,
|};

const VisualizePours = ({ steps, activePour }: Props) => {
  const sum = sumArrayTo(steps, steps.length);
  const conversionFactor = 100 / sum;

  return steps.map<React$Node>((el, index) => (
    <PourVisualizer
      active={activePour - 1 === index}
      key={uuidv4()}
      width={el * conversionFactor}
    />
  ));
};

// This only need render when `activePour` changes. Memoize to avoid uneccesarry re-renders.
export default memo<Props>(VisualizePours);
