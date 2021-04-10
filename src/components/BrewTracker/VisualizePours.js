// @flow
import * as React from 'react';
import uuidv4 from 'uuid/v4';
import { sumArrayTo } from '../../lib/sumArrayTo';
import PourVisualizer from './PourVisualizer';

type Props = {|
  steps: Array<number>,
  activePour: number,
|};

const VisualizePours = ({ steps, activePour }: Props) => {
  const sum = sumArrayTo(steps, (index) => index < steps.length);
  const conversionFactor = 100 / sum;

  return steps.map<React.Node>((el, index) => (
    <PourVisualizer
      active={activePour === index}
      key={uuidv4()}
      width={el * conversionFactor}
      weight={el}
    />
  ));
};

// This only need render when `activePour` changes. Memoize to avoid uneccesarry re-renders.
export default (React.memo<Props>(VisualizePours): React$AbstractComponent<
  Props,
  mixed,
>);
