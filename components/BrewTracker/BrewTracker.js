// @flow
import { PureComponent } from 'react';

import { TIME_BETWEEN_POURS, POUR_TIME } from '../../lib/constants';
import { sumArrayTo } from '../../lib/sumArrayTo';

import { getTimeToNextStep } from './utils';
import stateMachine from './brewStateMachine';

export type Props = {
  children: ({|
    activity: string,
    pourNumber: number,
    currentWeight: number,
    targetWeight: number,
    timeToNextStep: number,
    weightSteps: Array<number>,
  |}) => React$Node,
  onFinished: () => void,
  time: number, // eslint-disable-line
  taste: number, // eslint-disable-line
  strength: number, // eslint-disable-line
  baseWeight: number, // eslint-disable-line
  baseMesurement: ?Brew$UnitType, // eslint-disable-line
  resetWeight?: number,
};

export type State = {|
  pourNumber: number,
  pouringTimeTarget: number,
  waitingTimeTarget: number,
  weightSteps: Array<number>,
  activity: 'start' | 'pouring' | 'waiting' | 'done',
|};

class BrewTracker extends PureComponent<Props, State> {
  static defaultProps = {
    resetWeight: 0,
  };

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): State | null {
    return stateMachine(nextProps, prevState);
  }

  state = {
    pourNumber: 0,
    pouringTimeTarget: POUR_TIME, // eslint-disable-line
    waitingTimeTarget: TIME_BETWEEN_POURS + POUR_TIME, // eslint-disable-line
    weightSteps: [],
    activity: 'start',
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { onFinished } = this.props;
    const { activity } = this.state;

    if (activity === 'done' && prevState.activity !== 'done') {
      onFinished();
    }
  }

  render() {
    const { children, resetWeight, time } = this.props;
    const { activity, pourNumber, weightSteps } = this.state;

    if (typeof children !== 'function') {
      throw new Error(
        'This component uses render props, children must be invokable',
      );
    }

    return children({
      activity,
      weightSteps,
      pourNumber: pourNumber + 1, // For non-zero indexed people
      currentWeight:
        activity === 'done'
          ? sumArrayTo(weightSteps, pourNumber + 1 + resetWeight)
          : sumArrayTo(weightSteps, pourNumber) + resetWeight,
      targetWeight:
        activity === 'done'
          ? 0
          : sumArrayTo(weightSteps, pourNumber + 1) + resetWeight,
      timeToNextStep: getTimeToNextStep(this.state, time),
    });
  }
}

export default BrewTracker;
